<template>
  <div>
    <div>
      <van-nav-bar title="发起手势签到" left-text left-arrow @click-left="onClickLeft" />
    </div>

    <tea-gesture-unlock @firstDown="onceDraw" @onDrawDone="fromNinePoint"></tea-gesture-unlock>
    <van-row>
      <van-col offset="4" span="6">
        <van-button @click="back" type="primary" size="large">返回</van-button>
      </van-col>
      <van-col offset="4" span="6">
        <van-button @click="endSign" type="danger" size="large">结束签到</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import TeaGestureUnlock from "./TeaGestureUnlock";
import AMap from "AMap";
export default {
  components: { TeaGestureUnlock },
  data() {
    return {
      firstPwd: "", // 用来存创建密码时第一次输入的密码，便于和第二次比较
      regOrLogin: "reg", // 传给子组件用于判断是注册还是登陆
      isShowConfirm: false, // 是否显示confirm密码
      courseInfo: "",
      courseid: "",
      latit: null,
      longt: null,
      csuid: null,
      flag: 0, //0 当前无签到; 1 当前有签到
      err: null,
      signRe: null,
      gesPassword: ""
    };
  },

  methods: {
    getLocation() {
      // 从高德地图api获取浏览器定位
      const that = this;
      AMap.plugin("AMap.Geolocation", function() {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000
        });

        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);

        function onComplete(data) {
          // data是具体的定位信息
          console.log(data);
          that.latit = data.position.lat;
          that.longt = data.position.lng;
          that.start_btn = false;
          console.log(that.longt);
        }

        function onError() {
          // 定位出错
          that.getLatLngLocation();
          this.$dialog
            .alert({
              message: "定位出错了"
            })
            .then(() => {
              this.start_btn = true;
            });
        }
      });
    },
    getLatLngLocation() {
      AMap.plugin("AMap.CitySearch", function() {
        let citySearch = new AMap.CitySearch();
        citySearch.getLocalCity(function(status, result) {
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            AMap.plugin("AMap.Geocoder", function() {
              let geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: result.adcode
              });
              let lnglat = result.rectangle.split(";")[0].split(",");
              geocoder.getAddress(lnglat, function(status, data) {
                if (status === "complete" && data.info === "OK") {
                  console.log(data);
                }
              });
            });
          }
        });
      });
    },
    checknowSign() {
      var url = "/class/stu/signIn/now";
      // var url = "/index/class/stu/signIn/now";

      var data = {
        cid: this.courseInfo.id
      };
      //   console.log(this.courseid);
      console.log(data);
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            if (res.data.data != null) {
              this.signRe = null;
              this.flag = 1;
              console.log(this.flag);
              this.end_btn = false;
              this.csuid = res.data.data.id;
              this.signRe = res.data.data;
            } else {
              this.flag = 0;
            }
            console.log(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    endSign() {
      this.checknowSign();
      setTimeout(() => {
        var url = "/class/signIn/end";
        // var url = "/index/class/signIn/end";
        var data = {
          csuid: this.csuid
        };
        console.log(data);
        this.$http
          .get(url, { params: data })
          .then(res => {
            if (res.data.code == 200) {
              this.timer(0, 0);
              this.$notify({ type: "success", message: "结束签到成功" });
            } else {
              this.$notify({ type: "danger", message: "结束签到失败" });
            }
            console.log(res.data.data);
          })
          .catch(err => {
            console.log(err);
            this.$notify({ type: "danger", message: "结束签到出错" });
          });
      });
    },
    getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo);
    },
    back() {
      this.$router.push({ name: "Teatmp" });
    },
    onClickLeft() {
      this.$router.push({ name: "Teatmp" });
    },
    onceDraw(e) {
      if (e.success) {
        console.log("第一次");
        this.isShowConfirm = true;
      }
    },
    fromNinePoint(e) {
      if (e.success) {
        console.log("父组件：", e.pwd, "手势密码设置完成，登录");
        this.send(e.pwd.join(""));
      }
    },
    getGesPassword() {
      this.gesPassword = this.$store.state.createPassword;
    },
    send() {
      console.log(123);
      //   this.user_test();
      // this.$store.commit('getCreatePassword', item);
      
      this.checknowSign();
      setTimeout(() => {
        this.$nextTick(() => {
          console.log(this.flag);
          if (this.flag == 0) {
            var url = "/class/signIn/add";
            this.getGesPassword();
            // var url = "/index/class/signIn/add";
            if (this.latit == null || this.longt == null) {
              this.$dialog
                .alert({
                  message: "获取不到位置 无法创建签到"
                })
                .then(() => {
                  this.start_btn = true;
                });
            } else {
              var data = {
                mode: "gesture",
                value: this.gesPassword.toString(),
                longitude: this.longt,
                latitude: this.latit,
                course: {
                  id: this.courseInfo.id
                }
              };
              console.log(this.flag);
              console.log(data);
              this.$http
                .post(url, data)
                .then(res => {
                  if (res.data.code == 200) {
                    //   this.start_btn = true;
                    this.$notify({ type: "success", message: "创建签到成功" });
                    //   this.timer(this.sign_time, 0);
                    setTimeout(() => {
                      this.checknowSign();
                      // this.end_btn = false;
                    }, 300);
                  }
                })
                .catch(err => {
                  console.log(err);
                  this.$notify({ type: "danger", message: "创建签到失败" });
                });
            }
          } else {
            this.$dialog
              .alert({
                message: "正在进行签到 请勿重复添加"
              })
              .then(() => {
                this.start_btn = true;
              });
          }
        });
      }, 300);
    },
    // 跳过
    skip() {
      this.$router.push({ name: "TeacherCourse" });
    }
  },

  mounted() {
    setTimeout(() => {
      this.start_btn = true;
      this.$nextTick(() => {
        this.getLocation();
        this.getCourseInfo();
        // this.countTime();
      });
    }, 300);
    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false); //false阻止默认事件
    }
  },
  created() {
    this.getLocation();
  },
  computed: {},
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false); //false阻止默认事件
  }
};
</script>

<style lang="less" scoped>
.createGesture {
  height: 100%;
}
.picture {
  padding-top: 0.533rem;
  text-align: center;
  img {
    height: 3rem;
  }
}
.words {
  text-align: center;
  color: #498bcb;
  p:nth-child(1) {
    margin: 0.267rem 0;
    font-size: 0.723rem;
  }
  p:nth-child(2) {
    font-size: 0.373rem;
  }
}
.bottom {
  z-index: 2000;
  margin-top: 0.3rem /* 30/37.5 */;
  width: 100%;
  p {
    padding: 0 0.5rem;
    font-size: inherit;
  }
  div {
    margin: 0.353rem 0 0.337rem;
  }
}
</style>