<template>
  <div>
    <div>
      <van-nav-bar title="手势签到" left-text left-arrow @click-left="onClickLeft" />
    </div>

    <van-button @click="back" type="primary" size="large">返回</van-button>
  </div>
</template>

<script>
import stuGestureUnlock from "./stuGestureUnlock";
import AMap from "AMap";
export default {
  data() {
    return {
      courseid: "",
      latit: null,
      longt: null,
      sign_btn: true,
      getinfo: null,
      still_sign: true,
      time_min: 0,
      time_sec: 0,
      signRe: null,
      gesPassword: '',
      password: ''
    };
  },

  methods: {
      getPassword() {
          this.password = this.$store.state.password;
      },
       getCourseId() {
      var info = this.$store.state.courseInfo;
      this.courseid = info.id;
      //   this.getinfo=this.$router.params.courseinfo
      console.log(this.getinfo);
      console.log(typeof(this.getinfo));
    },
    back() {
      this.$router.push({ name: "stuSign" });
    },
    onClickLeft() {
      this.$router.push({ name: "stuSign" });
    },
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
          that.latit = data.position.lat;
          that.longt = data.position.lng;
          that.sign_btn = false;
          console.log(that.latit,that.longt)
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
    getGesPassword() {
      this.gesPassword = this.$store.state.createPassword;
    },
    send() {
        this.getGesPassword();
        this.checknowSign();
      this.$nextTick(() =>{
        if (this.still_sign == true) {
        setTimeout(() => {
          this.$nextTick(() => {
            var url = "/class/stu/signIn";
            // var url = "/index/class/stu/signIn";
            console.log(this.latit,this.longt)
            if (this.latit == null || this.longt == null) {
              this.$dialog.alert({
                message: "获取不到位置 无法签到"
              });
            } else {
            //   var a=new Date()
            //   var b=this.transD(a)
            //   console.log(b)
              var data = {
                mode: "gesture",
                value: this.password.toString(),
                // time:b,
                longitude: this.longt,
                latitude: this.latit,
                courseSignIn: this.getinfo
              };
              console.log(data)
              this.$http
                .post(url, data)
                .then(res => {
                  // if (res.data.code == 200) {
                  //   this.$notify({ type: "success", message: "签到成功" });
                  // } else if (res.data.code == 701) {
                  //   this.$dialog
                  //     .alert({
                  //       message: "请勿重复签到"
                  //     })
                  //     .then(() => {
                  //       //   this.sign_btn = true;
                  //     });
                  // } else if (res.data.code == 702) {
                  //   this.$dialog
                  //     .alert({
                  //       message: "超出签到距离，签到失败"
                  //     })
                  //     .then(() => {
                  //       //   this.sign_btn = true;
                  //     });
                  // }
                  this.$dialog.alert({
                    message: res.data.message
                  });
                  console.log(res.data);
                })
                .catch(err => {
                  console.log(err);
                  this.$notify({ type: "danger", message: "签到失败" });
                });
            }
          });
        }, 300);
      } else {
        this.$dialog
          .alert({
            message: "签到已结束"
          })
          .then(() => {
            //   this.sign_btn = true;
          });
      }
      })
    },
     checknowSign() {
      var url = "/class/stu/signIn/now";
      // var url = "/index/class/stu/signIn/now";

      var data = {
        cid: this.courseid
      };
      //   console.log(this.courseid);
      console.log(data);
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.signRe = null;
            if (res.data.data != null) {
              
              this.still_sign = true;
              this.signRe = res.data.data;
              this.getinfo=res.data.data
            }else{
              this.still_sign=false
            }
            console.log(res.data.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },


  },

  mounted() {
      this.getPassword();
       this.sign_btn = true;
    setTimeout(() => {
      this.$nextTick(() => {
        this.getLocation();
        this.getCourseId(); 
        // this.countTime();
      });
    }, 300);
   //监听返回键
if (window.history && window.history.pushState) {
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', this.onClickLeft, false);//false阻止默认事件 
}
  },
  created() {
       this.getLocation();
    this.getCourseId(); 
    this.countTime();
    this.getinfo = this.$route.params.courseinfo;
  },
  computed: {},
   destroyed () {
    window.removeEventListener('popstate', this.onClickLeft, false);//false阻止默认事件
  },
};
</script>

<style scoped>
</style>