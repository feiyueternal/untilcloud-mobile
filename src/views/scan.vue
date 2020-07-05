<template>

  <div class="msgbox">
    <van-nav-bar title="扫一扫" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="header">
      <i class="mui-icon mui-icon-back"></i>
    </div>
    <div id="code">
      <div
        style="width:14rem;height:14rem; background-color: #fff; margin: 15% auto 5%; text-align: center"
      ></div>
      <p class="tip" style="text-align: center">...载入中...</p>
    </div>
    <p>将二维码放入框内，即可自动扫描</p>
    <div class="sweep" @click="sweep">开始扫码</div>
  </div>
</template>

<script>
export default {
  name: "scan",
  data() {
    return {
      scan: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "Home" });
    },
    sweep: function () {
      // 扫一扫方法
      cordova.plugins.barcodeScanner.scan(
        function (result) {
          // alert("We got a barcode\n" +
          //   "Result: " + result.text + "\n" +
          //   "Format: " + result.format + "\n" +
          //   "Cancelled: " + result.cancelled)
          value = Number(result.text);
          // var url = `/index/class/stu/course/get/${this.value}`;
      var url = `/class/stu/course/get/${this.value}`;
      
      // var data = {cid: this.value};
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.Info = res.data.data;
            this.$store.commit('getCourseInfo', res.data.data);
            this.$router.push({ name: "showCourse" });
            // this.Load();
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "课程不存在" });
        });
        },
        function (error) {
          alert(error)
        }
      )
    }


    
  },
  mounted() {},
  created() {}
};
</script>

<style scoped>
</style>
