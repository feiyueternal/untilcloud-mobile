<template>
<div>
  <div class="Teatmp">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="暂无更多数据"
      @load="load_more_items"
    >
        <van-cell
            class="ee"
            size="large"
            use-label-slot=true
          v-for="item in hito"
          :key="item.id"
          :title="'模式：'+item.mode"
          >
          <van-cell :title="item.startTime"></van-cell>
          <van-cell :title="item.endTime"></van-cell>
        </van-cell>
       
    </van-list>
  </div>
</div>
</template>

<script>


export default {
  name: 'TeaHistorySign',
  data() {
    return {
      courseid: '',
      hito:{},
      finished: false,
        loading: false,
         offset: 0,
        page: 0,
        limit: 10,
    }
    
  },
  methods:{
     getCourseInfo() {
      this.courseid = this.$store.state.courseInfo.id;
    },
    getAllSign(){
        // var url="/class/signIn/all",
        var url="/index/class/signIn/all"
        var data={
            cid:this.courseid
        }
        this.$http.get(url,{params:data}).then(res =>{
            if(res.data.code==200){
                this.hito=res.data.data
                console.log(this.hito)
            }
        }).catch(err =>{
            console.log(err)
            this.$notify({ type: "danger", message: "获取签到历史失败" });
        })
    },
    load_more_items: function() {
            this.page += 1;
            this.offset = this.limit * this.page;
            this.getAllSign()
        },
    
  },
  mounted(){
    this.getCourseInfo()
    this.getAllSign()
  },
  created(){
    
  }
}
</script>

<style scoped>
.Teatmp{
    margin: auto auto;
}
.ee{
    font-size: 20px;
    text-align: center;
}
.van-cell--large .van-cell__title{
    font-size: 20px;
    text-align: center;
}
</style>
