<template>
<div>
 <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="stuSign">
   
    <div class="spp">
      <span>{{minute}}:{{second}}</span>
    </div>
    <van-button :disabled="sign_btn" round type="info" @click="conSign">签到</van-button>

    <van-dialog id="van-dialog" />
  </div>
</div>
</template>

<script>
import AMap from "AMap";

export default {
  name: "stuTimeSign",
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
      signRe: null
    };
  },
  methods: {
    getCourseId() {
      var info = this.$store.state.courseInfo;
      this.courseid = info.id;
      //   this.getinfo=this.$router.params.courseinfo
      console.log(this.getinfo);
      console.log(typeof(this.getinfo));
    },
    onClickLeft(){
      this.$router.push({name:'stuSign'})
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
    transD (date) {  
    var y = date.getFullYear();  
                var m = date.getMonth() + 1;  
                m = m < 10 ? ('0' + m) : m;  
                var d = date.getDate();  
                d = d < 10 ? ('0' + d) : d;  
                var h = date.getHours();  
                h=h < 10 ? ('0' + h) : h;  
                var minute = date.getMinutes();  
                minute = minute < 10 ? ('0' + minute) : minute;  
                var second=date.getSeconds();  
                second=second < 10 ? ('0' + second) : second;  
                return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second; 
},

    conSign() {
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
              var a=new Date()
              var b=this.transD(a)
              console.log(b)
              var data = {
                mode: "time",
                value: "1",
                time:b,
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
    timer(min, sec) {
      var _this = this;
      _this.time_min = min;
      _this.time_sec = sec;
      var time = window.setInterval(function() {
        if (_this.time_sec === 0 && _this.time_min !== 0) {
          _this.time_sec = 59;
          _this.time_min -= 1;
        } else if (_this.time_min === 0 && _this.time_sec === 0) {
          _this.time_sec = 0;
          window.clearInterval(time);
        } else {
          _this.time_sec -= 1;
        }
        if (_this.time_min == 0 && _this.time_sec == 0) {
          _this.sign_btn = true;
        }
      }, 1000);
    },
    countTime() {
      this.checknowSign();
      setTimeout(() => {
        this.$nextTick(() => {
          if (this.signRe != null) {
            this.start_btn = true;
            var now = new Date();
            var a = Number(this.signRe.endTime.slice(14, 16));
            var b = Number(this.signRe.endTime.slice(17, 19));
            var d = 0;
            var e = 0;
            if (now.getSeconds() > b) {
              e = 60 + b - now.getSeconds();
              a = a - 1;
            } else {
              e = b - now.getSeconds();
            }
            if (now.getMinutes() > a) {
              d = 60 + a - now.getMinutes();
            } else {
              d = a - now.getMinutes();
            }
            this.timer(d, e);
            this.end_btn = false;
          }
        });
      }, 300);
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
    }
  },
  watch: {
    second: {
      handler(newVal) {
        this.num(newVal);
      }
    },
    minute: {
      handler(newVal) {
        this.num(newVal);
      }
    }
  },
  mounted() {
    this.sign_btn = true;
    setTimeout(() => {
      this.$nextTick(() => {
        this.getLocation();
        this.getCourseId(); 
        this.countTime();
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
  computed: {
    second: function() {
      return this.num(this.time_sec);
    },
    minute: function() {
      return this.num(this.time_min);
    }
  },
   destroyed () {
    window.removeEventListener('popstate', this.onClickLeft, false);//false阻止默认事件
  },
};
</script>

<style scoped>
.field {
  margin: 30px auto;
  /* width: 80%; */
}
.spp {
  margin-top: 30px;
  margin-bottom: 30px;
}
.stuSign {
  margin: 70px auto;
}
</style>
