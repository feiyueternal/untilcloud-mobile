<template>
  <div class="otherStu">
        <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>


export default {
  name: 'otherStu',
  data() {
    return {
      courseInfo: '',
    }
    
  },
  methods:{
   getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo)
    },
    onClickLeft(){
      this.$router.push({ name: "Home" });
    }
  },
  mounted(){
     this.getCourseInfo()
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
