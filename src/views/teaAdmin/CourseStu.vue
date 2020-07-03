<template>
  <div class="CourseStu">
    <van-nav-bar title="" left-text="??" left-arrow @click-left="onClickLeft" />
  </div>
</template>

<script>


export default {
  name: 'CourseStu',
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
    onClickLeft() {
      this.$router.push({ name: "TeacherCourse" });
      // history.back()
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
