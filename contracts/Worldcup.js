"use strict";

var StakeInfo = function (text) {
	if(text) {
		var o = JSON.parse(text);
		this.country = o.country;//国家
		this.amount = new BigNumber(o.amount);//投注额
		this.isSettled = o.isSettled;//是否已清算
		this.settleAmount = new BigNumber(o.settleAmount);//清算金额
		this.owner = o.owner;//拥有人
	}else {
		this.country = "";
		this.amount = new BigNumber(0);
		this.isSettled = false;
		this.settleAmount = new BigNumber(0);
		this.owner = "";
	}
};

StakeInfo.prototype.toString = function() {
	return JSON.stringify(this);
};

// var StakeMap = function(text) {
// 	if(text) {
// 		var o = JSON.parse(text);
// 		this.stakes = o.stakes;
// 	}else{
// 		this.stakes = new Map();
// 	}
// };

// StakeMap.prototype.toString = function() {
// 	return JSON.stringify(this);
// };

var WorldcupChampionContract = function () {
	LocalContractStorage.defineProperties(this, {
		beginTimestamp: null,//事件开始时间
		endTimestamp: null,//事件发生结束时间
		outcome: null,//结果
		_isOutcomeSet: null,//是否结果被设置
		owner: null,//合约拥有人
		reportTimestamp: null,//报告结果时间
		countries: null,//投注国家
		stakeAmount: null,//投注总额
		total: null//当前剩余总额
	});
	LocalContractStorage.defineMapProperty(this, "stakeOwners", {//每个用户的投注信息
		stringify: function(obj) {
			return obj.toString();
		},
		parse: function (str) {
			return new StakeInfo(str);
		}
	});
	LocalContractStorage.defineMapProperty(this, "stakeAmountMap", {//每个国家的投注总额
		stringify: function(obj) {
			return obj.toString();
		},
		parse: function(str) {
			return new BigNumber(str);
		}
	})
};

WorldcupChampionContract.prototype = {
	init: function (beginTimestamp, endTimestamp) {
		var begin = new Date(beginTimestamp);
		var end = new Date(endTimestamp);
		this.beginTimestamp = begin.getTime();
		this.endTimestamp = end.getTime();
		if(this.beginTimestamp >= this.endTimestamp) {
			throw new Error("Invalid Timestamp.");
		}
		if(this.beginTimestamp <= Date.now()) {
			throw new Error("Invalid Timestamp.");
		}
		if(this.beginTimestamp <= (Blockchain.transaction.timestamp/1000)) {
			throw new Error("Invalid Timestamp.");
		}
		this.outcome = "";
		this._isOutcomeSet = false;
		this.owner = Blockchain.transaction.from;
		this.countries = ["BAR", "GER","ESP", "ARG", "FRA", "BEL", "POR", "GBR",
		"URU", "COL", "CRO", "RUS", "MEX", "POL", "SUI", "DEN", 
		"SRB", "SWE", "PER", "JPN", "NGR", "SEN", "EGY", "ISL", 
		"TUN", "AUS", "MAR","KOR", "IRI", "CRC", "PAN", "KSA"];
		this.stakeAmount = new BigNumber(0);
		this.total = new BigNumber(0);
		this.reportTimestamp = 0;
	},
	_isValidCountry: function(_country) {
		for(var i = 0; i < this.countries.length; i++) {
			if(this.countries[i] == _country){
				return true;
			}
		}
		return false;
	},
	getBeginTimestamp: function() {
		return this.beginTimestamp;
	},
	getEndTimestamp: function() {
		return this.endTimestamp;
	},
	getAmount: function() {
		return this.stakeAmount;
	},
	getTotal: function() {
		return this.total;
	},
	stake: function(_country) {//投注
		if(!this._isValidCountry(_country)) {
			throw new Error("Invalid Country.");
		}
		var from = Blockchain.transaction.from;
		var value = Blockchain.transaction.value;
		value = new BigNumber(value);
		if(value.lte(new BigNumber(0))) {
			throw new Error("Invalid value.");
		}
		if(Blockchain.transaction.timestamp > (this.beginTimestamp/1000)) {
			throw new Error("Cannot Stake.");
		}
		if(Date.now() > this.beginTimestamp) {
			throw new Error("Cannot Stake.");
		}
		var stake = this.stakeOwners.get(from + '_' + _country);
		if(stake) {
			var amount = new BigNumber(stake.amount);
			stake.amount = amount.plus(value);
		}else {
			stake = new StakeInfo();
			stake.country = _country;
			stake.amount = value;
			stake.isSettled = false;
			stake.settleAmount = new BigNumber(0);
			stake.owner = from;
		}
		this.stakeOwners.put(from + '_' + _country, stake);
		//上面是个人
		//下面是每个结果投注
		var stakeAmountPerOutcome = this.stakeAmountMap.get(_country);
		if(stakeAmountPerOutcome) {
			stakeAmountPerOutcome = stakeAmountPerOutcome.plus(value);
		}else {
			stakeAmountPerOutcome = value;
		}
		this.stakeAmountMap.put(_country, stakeAmountPerOutcome);
		var this_stakeAmount = new BigNumber(this.stakeAmount);
		this.stakeAmount = this_stakeAmount.plus(value);
		this.total = this.stakeAmount;
		return true;
	},
	reportOutcome: function(_country) {//报告结果，一般只有一次机会,//Blockchain.transaction.timestamp seconds
		if(!this._isValidCountry(_country)) {
			throw new Error("Invalid Country.");
		}
		if(Blockchain.transaction.timestamp < (this.endTimestamp/1000)) {
			throw new Error("Match Time Has Not Arrived.");
		}
		if(Date.now() < this.endTimestamp) {
			throw new Error("Time Has Not Arrived.");
		}
		if(this.owner == Blockchain.transaction.from) {
			if(!this._isOutcomeSet) {
				this.outcome = _country;
				this._isOutcomeSet = true;
				this.reportTimestamp = Blockchain.transaction.timestamp * 1000;
			}
		}else {
			throw new Error("Invalid reporter.");
		}
	},
	// now: function() {
	// 	return Date.now();
	// },
	// timestamp: function() {
	// 	return Blockchain.transaction.timestamp * 1000;
	// },
	getOutcome: function() {//获取结果
		return this.outcome;
	},
	isOutcomeSet: function() {//结果是否被设置
		return this._isOutcomeSet;
	},
	settle: function() {//结算
		if(!this._isOutcomeSet) {
			throw new Error("Not Begining.");
		}
		var from = Blockchain.transaction.from;
		var timestamp = this.reportTimestamp + 2 * 30 * 24 * 60 * 60 * 1000;//报告时间加60天
		if(Blockchain.transaction.timestamp > (timestamp/1000)) {
			throw new Error("Time out.");
		}

		var stake = this.stakeOwners.get(from + '_' + this.outcome);
		var result = 0;
		if(stake) {
			if(stake.isSettled) {
				//TODO
				result = stake.settleAmount;
			}else {
				var settleAmount = new BigNumber(this.stakeAmount).mul(new BigNumber("0.99")).mul(stake.amount).dividedBy(this.stakeAmountMap.get(this.outcome));
				Blockchain.transfer(from, settleAmount);
				stake.isSettled = true;
				stake.settleAmount = settleAmount;
				this.stakeOwners.put(from + '_' + this.outcome, stake);
				var this_total = new BigNumber(this.total);
				this.total = this_total.minus(settleAmount);
				result = settleAmount;
			}
			
		}
		return result;

	},
	getAwardAmount: function() {//获取奖励金额
		if(this._isOutcomeSet) {
			var stake = this.stakeOwners.get(Blockchain.transaction.from + '_' + this.outcome);
			if(stake) {
				if(stake.isSettled) {
					return stake.settleAmount;
				}else {
					return new BigNumber(this.stakeAmount).mul(new BigNumber("0.99")).mul(stake.amount).dividedBy(this.stakeAmountMap(this.outcome));
				}
			}
		}
		return 0;
	},
	getStakeInfos: function(_country) {//获取投注信息
		if(this._isValidCountry(_country)) {
			return this.stakeOwners.get(Blockchain.transaction.from + '_' + _country);
		}
		throw new Error("Unknown Parameters.");
	},
	getAllStakeAmount: function(_country) {//获取所有投注额度信息
		if(this._isValidCountry(_country)) {
			return this.stakeAmountMap.get(_country);
		}
		return 0;
		
	},
	finalize: function() {//最终结算
		//超过60天没有领奖就把钱打到指定账户
		if(this._isOutcomeSet) {
			var timestamp = this.reportTimestamp + 2 * 30 * 24 * 60 * 1000;//60 days
			if(Blockchain.transaction.timestamp > (timestamp/1000)) {
				var this_total = new BigNumber(this.total);
				if(this_total.gt(new BigNumber(0))) {
					Blockchain.transfer(this.owner, this.total);
					this.total = new BigNumber(0);
					return;
				}
			}
		}
		throw new Error("Time Has Not Arrived.");
	},
	getDeadline: function() {//截止日期
		if(this._isOutcomeSet) {
			return this.reportTimestamp + 2 * 30 * 24 * 60 * 60 * 1000;//报告时间加60天
		}
		return 0;
	},
	info: function() {
		var result = {};
		result.beginTimestamp = this.beginTimestamp;
		result.isOutcomeSet = this._isOutcomeSet;
		if(this._isOutcomeSet) {
			result.outcome = this.outcome;
			result.deadline = this.getDeadline();
		}
		return result;
	}
};

module.exports = WorldcupChampionContract;
//n1qbsVpyecievtX11VJS8Xc1mo2xBaM7W52