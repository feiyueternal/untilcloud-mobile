<template>
  <div class="CourseStu">
<<<<<<< HEAD
    <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-cell is-link to="CourseStu" :key="index" v-for="(item, index) in stuList" >
      <van-row gutter="5" type="flex">
        <van-col span="8" offset="2">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="item.cover"
          >
            <template v-slot:error>加载失败</template>
          </van-image>
        </van-col>
        <van-col span="8" offset="3">
          <van-row class="rr">
            <van-col>{{item.name}}</van-col>
          </van-row>
          <van-row></van-row>
          <van-row>
            <van-col v-if="item.ino">{{item.ino}}</van-col>
            <van-col v-else>暂无学号</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-cell>
=======
    <van-nav-bar title="" left-text="??" left-arrow @click-left="onClickLeft" />
>>>>>>> 00a872c5e7c5c156208201ca190cd0c23e50a933
  </div>
</template>

<script>


export default {
  name: 'CourseStu',
  data() {
    return {
      courseInfo: '',
      stuList:''
    }
    
  },
  methods:{
    getStu() {
       var url = "/index/class/stu/course/stu";
      // var url = "/class/stu/course/stu";
      var data = {
        cid: this.courseInfo.id
      };
      // console.log(data);
      this.$http
        .get(url, { params: data })
        .then(res => {
          // console.log(data)
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.stuList = res.data.data;
            
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取学生失败" });
        });
    },
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
    this.getCourseInfo();
    this.getStu();
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
