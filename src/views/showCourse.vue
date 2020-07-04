<template>
  <div>
    <van-nav-bar title="课程信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <form>
      <van-image width="100" height="100" :src="courseInfo.cover" />
      <van-field label="ID" v-model="courseInfo.id" disabled></van-field>
      <van-field label="课程" v-model="courseInfo.name" disabled></van-field>
      <van-field label="年级" v-model="courseInfo.grade" disabled></van-field>
      <van-field label="学期" v-model="courseInfo.semester" disabled></van-field>
      <van-field label="学校" v-model="courseInfo.school" disabled></van-field>
      <van-field label="学院" v-model="courseInfo.college" disabled></van-field>
      <van-field label="专业" v-model="courseInfo.major" disabled></van-field>
      <van-field label="老师" v-model="courseInfo.teacher" disabled></van-field>
      
    </form>
    <van-button @click="join" type="primary" size="large" :disabled="btn" block>加入</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courseInfo: "",
      btn: false,
    };
  },

  methods: {
    Check() {
      // var url="/class/stu/course/getJoin";
      var url = "/index/class/stu/course/getJoin";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            for (var i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].id == this.courseInfo.id) {
                this.btn = true;
                console.log('repeat')
                break;
              } else {
                continue;
              }
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取列表失败" });
        });
    },
    join() {
    //   this.Check();
      // var url = "/class/stu/course/join";
      var url = "/index/class/stu/course/join";
      var data = { cid: this.courseInfo.id };
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.$notify({ type: "success", message: "加入成功" });
            this.$router.push({ name: "Home" });
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取课程失败" });
        });
    },
    getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo);
    },
    onClickLeft() {
      this.$router.push({ name: "Home" });
    }
  },
  mounted() {
    this.getCourseInfo();
    this.Check();
  },
  created() {},
  computed: {}
};
</script>

<style scoped>
</style>