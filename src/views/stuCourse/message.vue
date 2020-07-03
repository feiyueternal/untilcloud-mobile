<template>
  
  <div class="message">
    <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
    <form>
      <van-field label="ID" v-model="courseInfo.id" disabled></van-field>
      <van-field label="课程" v-model="courseInfo.name" disabled></van-field>
      <van-field label="年级" v-model="courseInfo.grade" disabled></van-field>
      <van-field label="学期" v-model="courseInfo.semester" disabled></van-field>
      <van-field label="学校" v-model="courseInfo.school" disabled></van-field>
      <van-field label="学院" v-model="courseInfo.college" disabled></van-field>
      <van-field label="专业" v-model="courseInfo.major" disabled></van-field>
      <van-field label="老师" v-model="courseInfo.teacher" disabled></van-field>
      <van-field label="学习要求" v-model="courseInfo.learnRequire" disabled></van-field>
      <van-field label="教学计划" v-model="courseInfo.teachProgress" disabled></van-field>
      <van-field label="考试安排" v-model="courseInfo.examArrange" disabled></van-field>
    </form>
  </div>
</template>

<script>


export default {
  name: 'message',
  data() {
    return {
    courseInfo: '',
    }
    
  },
  methods:{
     onClickLeft() {
      this.$router.push({ name: "Home" });
    },
    getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo)
    },
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
