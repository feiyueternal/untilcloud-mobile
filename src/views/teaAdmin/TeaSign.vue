<template>
<div>
  <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="TeaSign">
    
      <van-col span="4">
      </van-col>
      <van-col span="8">
    <van-button round icon="underway-o" type="info" @click="openHistory">历史签到</van-button>
      </van-col>
      <van-col span="8">
    <van-button round icon="bulb-o" type="warning"  @click="openSign">发起签到</van-button>
      </van-col>
  </div>
</div>
</template>

<script>


export default {
  name: 'TeaSign',
  data() {
    return {
      coueseInfo: ''
    }
    
  },
  methods:{
     getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo)
    },
    openSign(){
      this.$router.push({name:"Teatmp"})
    },
    openHistory(){
      this.$router.push({name:"TeaHistorySign"})
    },
    onClickLeft() {
      this.$router.push({ name: "TeacherCourse" });
      // history.back()
    }
  },
  mounted(){
    this.getCourseInfo()
    if (window.history && window.history.pushState) {
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', this.onClickLeft, false);//false阻止默认事件 
}
  },
  created(){
    
  },
  destroyed () {
    window.removeEventListener('popstate', this.onClickLeft, false);//false阻止默认事件
  },
}
</script>

<style scoped>
.TeaSign{
  margin: 30px auto;
  /* padding-top: 30px; */
}
</style>
