<template>
  <div class="msgbox">
    <div class="header">
      <i class="mui-icon mui-icon-back" @click="back"></i>
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
    //   点击返回并关闭
    back: function() {
      this.$router.push({
        path: "/Home"
      });
    },
    plusReady() {
      const self = this;
      // 获取窗口
      self.scan = new plus.barcode.Barcode("code");
      self.scan.onmarked = self.onmarked;
      console.log(self.scan);
    },
    sweep() {
      const self = this;
      self.scan.start();
    },

    onmarked(type, result) {
      var text = "未知: ";

      switch (type) {
        case plus.barcode.QR:
          type = "QR";
          break;
        case plus.barcode.EAN13:
          type = "EAN13";
          break;
        case plus.barcode.EAN8:
          type = "EAN8";
          break;
        default:
          type = "其他" + type;
          break;
      }

      result = result.replace(/\n/g, "");

      // if (result.indexOf('http://') == 0 || result.indexOf('https://') == 0) {
      // 	plus.nativeUI.confirm("二维码类型：" + type + "\n扫描结果：" + result, function(i) {
      // 		if (i.index == 0) {
      // 			var urlStr = encodeURI(result)
      // 			plus.runtime.openURL(urlStr);
      // 		} else {
      // 			self.back(); //返回上个页面
      // 		}
      // 	}, '', ['打开', '取消']);
      // } else {
      // 	self.back(); //返回上个页面
      // 	plus.nativeUI.alert("二维码类型：" + type + "\n扫描结果：" + result + "\n文件路径：" + f)
      // }
      // var url = `/index/class/stu/course/get/${Number(result)}`
      var url = "/class/stu/course/get/${this.value}";

      // var data = {cid: this.value};
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            // this.Info = res.data.data;
            this.$store.commit("getCourseInfo", res.data.data);
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
    }
  },
  mounted() {
    const self = this;
    if (window.plus) {
      self.plusReady();
    } else {
      document.addEventListener("plusready", self.plusReady, false);
    }
    document.addEventListener(
      "DOMContentLoaded",
      function() {
        alert("DOMLoaded");
        self.domready = true;
        self.plusReady();
      },
      false
    );
  },
  created() {}
};
</script>

<style scoped>
</style>
