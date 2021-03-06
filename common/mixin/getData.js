export const getData = {
	data(){
		return{
			isContinue:true,
			showNoData:true,
			dataList:[],
			url:'',
			queryData:{
				size:10,
				current:1
			},
			method:'',
			total:'',
		}
	},
	onShow(){
		// this.dataList=[]
		// this.getData()
	},
	methods:{
		getData(){
			uni.showLoading({
				title:'加载中'
			})
			this.$http({
				url:this.url,
				data:this.queryData,
				method:this.method,
			}).then(res=>{
				uni.hideLoading()
				if(res.data.records.length>1){
					this.showNoData=false
				}
				this.dataList=this.dataList.concat(res.data.records) 
				if(res.data.records.length>=10 ){
					this.isContinue=true
				}else{
					this.isContinue=false
				}
                // console.log(123123,this.url,this.dataList)
				this.total=res.data.total
				this.$forceUpdate()
			})
		}
	},
	// 上拉加载
	onReachBottom(){
		if(this.isContinue){
			this.queryData.current++
			this.getData()
		}
	},
}
