<template>
<div>
<van-nav-bar title="发起签到" left-text="返回" left-arrow @click-left="onClickLeft" />
  <div class="TeaSign">
     
    <van-cell-group class="field">
      <van-field
        v-model.trim="sign_time"
        label="签到时长"
        placeholder="请输入签到时长（分钟）"
        input-align="center"
        type="digit"
        :error-message="err"
      />
    </van-cell-group>
    <van-button :disabled="start_btn" round type="info" @click="conSign">开始签到</van-button>
    <div></div>
    <div class="spp">
      <span>{{minute}}:{{second}}</span>
    </div>
    <div></div>
    <van-button :disabled="end_btn" round type="info" @click="endSign">结束签到</van-button>
    <van-dialog id="van-dialog" />
  </div>
</div>
</template>

<script>
import AMap from "AMap";

export default {
  name: "TeaTimeSign",
  data() {
    return {
      courseid: "",
      latit: null,
      longt: null,
      sign_time: null,
      start_btn: true,
      time_min: 0,
      time_sec: 0,
      end_btn: true,
      csuid: null,
      flag: 0, //0 当前无签到; 1 当前有签到
      err: null,
      time_flag: false,
      signRe: null
    };
  },
  methods: {
    getCourseId() {
      var info = this.$store.state.courseInfo;
      this.courseid = info.id;
      // console.log(this.courseid);
    },
    onClickLeft(){
        this.$router.push({ name: "Teatmp" });
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
    conSign() {
      this.flag = 0;
      this.user_test();
      if (this.time_flag == false) {
      } else {
        this.checknowSign();
        setTimeout(() => {
          this.$nextTick(() => {
            console.log(this.flag);
            if (this.flag == 0) {
                var url="/class/signIn/add"
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
                  mode: "time",
                  value: this.sign_time,
                  longitude: this.longt,
                  latitude: this.latit,
                  course: {
                    id: this.courseid
                  }
                };
                console.log(this.flag);
                console.log(data);
                this.$http
                  .post(url, data)
                  .then(res => {
                    if (res.data.code == 200) {
                      this.start_btn = true;

                      this.timer(this.sign_time, 0);
                      setTimeout(() => {
                        this.checknowSign();
                        this.end_btn = false;
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
      }
    },
    //表单验证
    user_test() {
      this.time_flag = false;
      let test = new Promise((resolve, reject) => {
        if (this.sign_time == ""|| this.sign_time==0) {
          this.err = "请输入签到时长,不可以是0噢";
          resolve(false);
        } else {
          this.err = "";
          this.time_flag = true;
          resolve(true);
        }
      });
      return test;
    },
    checknowSign() {
      var url="/class/stu/signIn/now"
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
            if (res.data.data != null) {
              this.signRe = null;
              this.flag = 1;
              console.log(this.flag);
              this.end_btn = false;
              this.csuid = res.data.data.id;
              this.signRe = res.data.data;
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
        _this.start_btn = false;
        _this.end_btn = true;
      }
      }, 1000);

      
    },
    endSign() {
      this.checknowSign()
      setTimeout(() => {
        var url="/class/signIn/end"
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
      })
      
    },
    num: function(n) {
      return n < 10 ? "0" + n : "" + n;
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
    setTimeout(() => {
      this.start_btn = true;
      this.$nextTick(() => {
        this.getLocation();
        this.getCourseId();
        this.countTime();
      });
    }, 300);
  },
  created() {
    this.getLocation();
    // this.getCourseId();
    // this.$nextTick(() => {
    //   this.checknowSign();
    // });
  },
  computed: {
    second: function() {
      return this.num(this.time_sec);
    },
    minute: function() {
      return this.num(this.time_min);
    }
  }
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
</style>
