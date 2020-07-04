<template>
<div>
<van-nav-bar title="发起签到" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="Teatmp">
       <van-col span="4">
      </van-col>
      <van-col span="8">
    <van-button round icon="clock-o" type="default" @click="openTime">限时签到</van-button>
    </van-col>
      <van-col span="8">
    <van-button round icon="good-job-o" type="default" @click="openGes">手势签到</van-button>
    </van-col>
  </div>
</div>
</template>

<script>


export default {
  name: 'Teatmp',
  data() {
    return {
      coueseInfo: ''
    }
    
  },
  methods:{
     getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.$store.state.rolesData)
      console.log(this.courseInfo)
    },
    openTime(){
      this.$router.push({name:"TeaTimeSign"})
    },
    openGes(){
      this.$router.push({name:"TeaGesSign"})
    },
    onClickLeft(){
        this.$router.push({ name: "TeaSign" });
    },
    
  },
  mounted(){
    this.getCourseInfo()
     //监听返回键
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
.Teatmp{
    margin: 30px auto;
}
</style>
