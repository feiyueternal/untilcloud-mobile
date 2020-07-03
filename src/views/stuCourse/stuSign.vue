<template>
  <div>
    <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="stuSign">
    <van-col span="4"></van-col>
    <van-col span="8">
      <van-button plain icon="passed" type="warning" @click="gotoSign">参与签到</van-button>
    </van-col>
    <van-col span="8">
      <van-button plain icon="underway-o" type="info" @click="goHistory">历史签到</van-button>
    </van-col>
  </div>
  </div>
</template>

<script>
export default {
  name: "stuSign",
  data() {
    return {
      courseid: "",
      signinfo: []
    };
  },
  methods: {
    getCourseInfo() {
      this.courseid = this.$store.state.courseInfo.id;
      console.log(this.courseid);
    },
    onClickLeft(){
      this.$router.push({name:'Home'})
    },
    goHistory(){
      this.$router.push({name:"stuHistorySign"})
    },
    gotoSign() {
      // var url="/class/stu/signIn/now"
      var url = "/index/class/stu/signIn/now";

      var data = {
        cid: this.courseid
      };
      //   console.log(this.courseid);
      console.log(data);
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data != null) {
              this.signinfo = res.data.data;
              if (this.signinfo.mode == "time") {
                this.$router.push({
                  name: "stuTimeSign",
                  params: {
                    courseinfo: this.signinfo
                  }
                });
              } else {
              }
              console.log(this.signinfo);
            } else {
              this.$notify({ type: "danger", message: "当前无签到" });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getCourseInfo();
  },
  created() {}
};
</script>

<style scoped>
.stuSign {
  margin: 30px auto;
}
</style>
