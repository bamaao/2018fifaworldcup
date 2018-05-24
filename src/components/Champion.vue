<template>
	<el-row class="container">
		<el-row>
			<center><h2>世界杯冠军竞猜</h2></center>
		</el-row>
		<el-row>
			<center>合约地址：n1tdMPtZKbe3kz2scUzepZT6KcymkHSPUgU</center>
			<center>返奖率：99%，有效期为公开结果后60天内</center>
			<center>只支持https://github.com/ChengOrangeJu/WebExtensionWallet</center>
			<center>投注截止北京时间218年6月14日23点整</center>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="BAR" border>巴西</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="GER" border>德国</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="ESP" border>西班牙</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="ARG" border>阿根廷</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="FRA" border>法国</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="BEL" border>比利时</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="POR" border>葡萄牙</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="GBR" border>英格兰</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="URU" border>乌拉圭</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="COL" border>哥伦比亚</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="CRO" border>克罗地亚</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="RUS" border>俄罗斯</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="MEX" border>墨西哥</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="POL" border>波兰</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="SUI" border>瑞士</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="DEN" border>丹麦</el-radio>
			</el-col>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="SRB" border>塞尔维亚</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="SWE" border>瑞典</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="PER" border>秘鲁</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="JPN" border>日本</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="NGR" border>尼日利亚</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="SEN" border>塞内加尔</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="EGY" border>埃及</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="ISL" border>冰岛</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="TUN" border>突尼斯</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="AUS" border>澳大利亚</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="MAR" border>摩洛哥</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="KOR" border>韩国</el-radio>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-radio v-model="champion" label="IRI" border>伊朗</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="CRC" border>哥斯达黎加</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="PAN" border>巴拿马</el-radio>
			</el-col>
			<el-col :span="5">
				<el-radio v-model="champion" label="KSA" border>沙特</el-radio>
			</el-col>
		</el-row>
		<br/>
		</br/>
		<el-row :gutter="20" v-show="betShow">
			<el-col :span="5">
				<el-input v-model="input" placeholder="请输入投注额度(NAS)"></el-input>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click.native="dialogVisible = true">投注</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">
				<el-input v-model="nasAddress" placeholder="请输入钱包地址"></el-input>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click.native="stakeInfo">查看投注信息</el-button>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click.native="settleInfo" v-show="settleShow">查看中奖信息</el-button>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click.native="settle" v-show="settleShow">结算</el-button>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="5">{{message}}</el-col>
		</el-row>

		<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
		  <span>确认投注?</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="startBetting">确 定</el-button>
		  </span>
		</el-dialog>
	</el-row>
  
</template>

<script>
	var serialNumber
	var intervalQuery

	//return of search,
    function cbSearch(resp) {
        var result = resp.result    ////resp is an object, resp.result is a JSON string
        //console.log("return of rpc call: " + JSON.stringify(result))
        if (result === 'null'){
            console.log("null")
        } else{
            //if result is not null, then it should be "return value" or "error message"
            try{
                result = JSON.parse(result)
            }catch (err){
                //result is the error message
            }
            if (!!result.key){      //"return value"
                
            } else {        //"error message"
               
            }
        }
    }

    export default {
		data() {
			return {
				nasAddress: '',
				champion: 'BAR',
				input: 0.1,
				betShow: false,
				settleShow: false,
				dialogVisible: false,
				message: ''
			}
		},
		mounted: function() {//Init
			var self = this
			var from = "n1S4drtbKWkSFSEk77Mjym2Vb9D6FJcBzWf"
			var dappAddress = ContractAddress
			var value = "0"
			var nonce = "0"
			var gas_price = "1000000"
        	var gas_limit = "2000000"
			var callFunction = "info"
			var callArgs = '[]'
			var contract = {
				"function": callFunction,
				"args": callArgs
			}
			neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
		        var result = resp.result
		        console.log("详细信息:" + result)
		        if(result === 'null') {
		        	//this.$message(resp)
		        }else {
			        try{
	                	result = JSON.parse(result)
	                	
	                	var now = new Date().getTime();
	                	if(now < result.beginTimestamp) {
	                		self.betShow = true
	                	}
	                	if(result.isOutcomeSet) {
	                		if(now > result.deadline) {
	                			self.settleShow = false
	                		}else {
	                			self.settleShow = true
	                		}
	                		self.champion = result.outcome;
	                	}
	            	}catch (err){
	            		//this.$message(err)
		            }
			    }
		    }).catch(function (err) {
		        //this.$message(err)
		    })
		},
		methods: {
			startBetting() {
				var self = this
				this.dialogVisible = false
				var to = ContractAddress
				console.log("result:" + isNaN(this.input))
				if(!isNaN(this.input)) {
					var value = Number(this.input)
					if(value > 0) {
						var callFunction = "stake"
						var callArgs = '["' + this.champion + '"]'
						var options = {
							callback: NebPay.config.testnetUrl
						}
						serialNumber = nebPay.call(to, value,callFunction, callArgs, options)
						intervalQuery = setInterval(function() {
							self.funcInterval()
						}, 10000)
					} 
				}else {
					this.$message("无效的投注额!")
				}
			},
			funcInterval() {
				var self = this;
				nebPay.queryPayInfo(serialNumber).then(function(resp) {
					//console.log("tx result:" + resp)
					var respObject = JSON.parse(resp)
					//console.log("respObject:" + respObject)
					if(respObject.code === 0 && respObject.data.status === 1) {
						clearInterval(intervalQuery)
						self.$message("成功!")
					}
				}).catch(function(err) {
					console.log(err)
				})
			},
			settle() {
				var self = this
				var to = ContractAddress
				var value = "0"
				var callFunction = "settle"
				var callArgs = '[]'
				var options = {
					callback: NebPay.config.testnetUrl
				}
				serialNumber = nebPay.call(to, value,callFunction, callArgs, options)
				intervalQuery = setInterval(function() {
					self.funcInterval()
				}, 10000)
			},
			stakeInfo() {
				var self = this
				var from = this.nasAddress
				if(Account.isValidAddress(from)) {
					// console.log("address:" + AccAddress)
					var dappAddress = ContractAddress
					var value = "0"
					var nonce = "0"
					var gas_price = "1000000"
	        		var gas_limit = "2000000"
					var callFunction = "getStakeInfos"
					var callArgs = '["' + this.champion + '"]'
					var contract = {
						"function": callFunction,
						"args": callArgs
					}
					neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
						//console.log("result:" + resp.result)
			            //self.$message(resp.result)
			            self.message = resp.result
			        }).catch(function (err) {
			            console.log("error:" + err.message)
			        })
				}else {
					this.$message("无效的钱包地址!")
				}
			},
			settleInfo() {
				var self = this
				var from = this.nasAddress
				if(Account.isValidAddress(from)) {
					// console.log("address:" + AccAddress)
					var dappAddress = ContractAddress
					var value = "0"
					var nonce = "0"
					var gas_price = "1000000"
	        		var gas_limit = "2000000"
					var callFunction = "getAwardAmount"
					var callArgs = '[]'
					var contract = {
						"function": callFunction,
						"args": callArgs
					}
					neb.api.call(from,dappAddress,value,nonce,gas_price,gas_limit,contract).then(function (resp) {
						//console.log("result:" + resp.result)
			            //self.$message(resp.result)
			            self.message = resp.result
			        }).catch(function (err) {
			            console.log("error:" + err.message)
			        })
				}else {
					this.$message("无效的钱包地址!")
				}
			},
			handleClose(done) {
				this.$confirm('确认关闭?').then(_ => {this.stakeInfo()}).catch(_ => {})
			}
		}
	}
	
</script>
