<template>
	<el-row class="container">
		<el-row>
			<center><h2>世界杯冠军竞猜</h2></center>
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
		<el-row :gutter="20">
			<el-col :span="5">
				<el-input v-model="input" placeholder="请输入投注额度(NAS)"></el-input>
			</el-col>
			<el-col :span="5">
				<el-button type="primary" @click.native="startBetting">投注</el-button>
			</el-col>
			<el-col :span="5">
				<el-button type="info" @click.native="stakeInfo">查看投注信息</el-button>
			</el-col>
		</el-row>
	</el-row>
  
</template>

<script>
	var serialNumber
	var intervalQuery

	function funcIntervalQuery() {
		nebPay.queryPayInfo(serialNumber)
		.then(function(resp) {
			console.log("tx result:" + resp)
			var respObject = JSON.parse(resp)
			console.log("respObject:" + respObject)
			if(respObject.code === 0 && respObject.data.status === 1) {
				clearInterval(intervalQuery)
			}
		}).catch(function(err) {
			console.log(err)
		})
	}

	//return of search,
    function cbSearch(resp) {
        var result = resp.result    ////resp is an object, resp.result is a JSON string
        console.log("return of rpc call: " + JSON.stringify(result))
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
			var now = new Date().getTime();
			

			// var account = Account.NewAccount()

			return {
				champion: 'BAR',
				input: 0.1
			}
		},

		methods: {
			startBetting() {
				// this.input = 
				// this.champion = 
				var to = "n1jLATdV8TWZJFca2cFtTaK67Xv7jYAYLuA"
				var value = this.input
				var callFunction = "stake"
				var callArgs = '["' + this.champion + '"]'
				var options = {
					callback: NebPay.config.testnetUrl
				}
				serialNumber = nebPay.call(to, value,callFunction, callArgs, options)
				intervalQuery = setInterval(function() {
					funcIntervalQuery()
				}, 10000)
			},
			stakeInfo() {
				var from = ""//"n1YWPrrSTrm1tWyELAppvQdk3Uwpkzd9s5V"
				// console.log("address:" + AccAddress)
				var dappAddress = "n1jLATdV8TWZJFca2cFtTaK67Xv7jYAYLuA"
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
		            cbSearch(resp)
		        }).catch(function (err) {
		            //cbSearch(err)
		            console.log("error:" + err.message)
		        })
			}
			// startBetting() {
			// 	var to = "n1jLATdV8TWZJFca2cFtTaK67Xv7jYAYLuA"
			// 	var value = this.input
			// 	var callFunction = "stake"
			// 	var callArgs = '["' + this.champion + '"]'
			// 	nebPay.call(to, value, callFunction, callArgs, {
			// 		qrcode: {
			// 			showQRCode: false
			// 		},
			// 		listener: showMessage
			// 	})
			// }
		}
	}
	
</script>
