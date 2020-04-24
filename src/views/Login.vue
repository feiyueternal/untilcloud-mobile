<template>
  <div>
    <div class="login">
      <span class="title">登录</span>
      <van-overlay :show="show">
        <van-loading vertical type="spinner" color="#1989fa"></van-loading>
      </van-overlay>
      <van-tabs type="card" @click="tabsClick">
        <van-tab title="账号密码登录">
          <!-- <form @submit.prevent="handleLogin"> -->
          <form>
            <div class="login-info">
              <van-field
                v-model.trim="userlogin.username"
                required
                clearable
                left-icon="friends"
                label="账号"
                @blur="user_test"
                :error-message="err_user.username"
                placeholder="请输入账号"
              />

              <van-field
                v-model.trim="userlogin.password"
                type="password"
                left-icon="lock"
                label="密码"
                placeholder="请输入密码"
                required
                clearable
                :error-message="err_user.password"
                @blur="user_test"
                autocomplete
              />
            </div>
          </form>
        </van-tab>
        <van-tab title="手机号登录">
          <form>
            <div class="login-info">
              <van-field
                v-model.trim="phonelogin.phone"
                required
                clearable
                type="digit"
                left-icon="phone"
                label="手机号"
                @blur="phone_test"
                :error-message="err_phone.phone"
                placeholder="请输入手机号"
              />

              <van-field
                v-model.trim="phonelogin.verificationCode"
                type="digit"
                left-icon="lock"
                label="验证码"
                placeholder="请输入验证码"
                required
                clearable
                @blur="phone_test"
                :error-message="err_phone.verificationCode"
                autocomplete
              >
                <template #button>
                  <van-button
                    size="small"
                    type="primary"
                    @click="getCode"
                    native-type="button"
                    :disabled="disabled"
                  >{{btntxt}}</van-button>
                </template>
              </van-field>
            </div>
          </form>
        </van-tab>
        <van-button @click="handleLogin" type="primary" size="large">登录</van-button>
        <van-row>
          <van-col span="8">
            <van-button plain type="info" @click="toForget">忘记密码</van-button>
          </van-col>
          <van-col offset="8" span="8">
            <van-button plain type="info" @click="toRegister">注册账号</van-button>
          </van-col>
        </van-row>
      </van-tabs>
      <footer class="a-footer">copyright @ 2020 福州大学 到云 工程实践07组</footer>
    </div>
    <div class="bgImg" :style="bgImg"></div>
  </div>
</template>

<script>
import log from "@/assets/image/background1.jpg";

export default {
  name: "Login",
  data() {
    return {
      userlogin: { username: "", password: "" },
      err_user: { username: "", password: "" },
      phonelogin: { phone: "", verificationCode: "" },
      err_phone: { phone: "", verificationCode: "" },
      bgImg: {
        backgroundImage:
          "url(" + require("../assets/image/background1.jpg") + ") "
      },
      time: 0, //验证码倒计时
      disabled: false, //验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字
      show: false, //遮罩层
      nowactive: 0
    };
  },
  methods: {
    timer() {
      if (this.time > 0) {
        this.time--;
        this.btntxt = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
      } else {
        this.time = 0;
        this.btntxt = "获取验证码";
        this.disabled = false;
      }
    },
    getCode() {
      if (this.phonelogin.phone) {
        var data = {
          phone: this.phonelogin.phone,
          count: 4
        };
        var url = "/index/common/getVerificationCode";
        this.$http
          .get(url, { params: data })
          .then(res => {
            if (res.data.code == 200) {
              this.$notify({ type: "success", message: "发送成功" });
              this.$dialog.alert({
                message: "验证码为" + res.data.data
              });
              this.time = 60;
              this.disabled = true;
              this.timer();
            }
          })
          .catch(err => {
            console.log(err);
            this.$notify({ type: "danger", message: "发送失败" });
          });
      } else {
        this.$toast("请输入手机号");
      }
    },
    //表单验证
    user_test() {
      let test = new Promise((resolve, reject) => {
        if (this.userlogin.username == "") {
          this.err_user.username = "请输入账号";
          resolve(false);
        } else if (this.userlogin.password == "") {
          this.err_user.username = "";
          this.err_user.password = "请输入密码";
          resolve(false);
        } else {
          this.err_user.username = "";
          this.err_user.password = "";
          resolve(true);
        }
      });
      return test;
    },
    phone_test() {
      let test = new Promise((resolve, reject) => {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (this.phonelogin.phone == "") {
          this.err_phone.phone = "请输入手机号";
          resolve(false);
        } else if (!reg.test(this.phonelogin.phone)) {
          this.err_phone.phone = "手机号格式不正确";
          resolve(false);
        } else if (this.phonelogin.verificationCode == "") {
          this.err_phone.phone = "";
          this.err_phone.verificationCode = "请输入验证码";
          resolve(false);
        } else {
          this.err_phone.phone = "";
          this.err_phone.verificationCode = "";
          resolve(true);
        }
      });
      return test;
    },
    tabsClick(name, title) {
      this.nowactive = name;
      console.log(this.nowactive);
    },
    // 登录功能
    handleLogin() {
      this.show = true;
      setTimeout(() => {
        if (this.nowactive == 0) {
          var data = {
            account: this.userlogin.username,
            password: this.userlogin.password
          };
          var url = "/index/common/login";
          this.user_test().then(res => {
            this.toLogin(url, data);
          });
        } else {
          var data = {
            phone: this.phonelogin.phone,
            verificationCode: this.phonelogin.verificationCode
          };
          var url = "/index/common/phoneLogin";
        }
        this.phone_test().then(res => {
          this.toLogin(url, data);
        });
        this.show = false;
      }, 700);
    },
    toLogin(url, data) {
      this.$http
        .get(url, { params: data })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$store.commit("login", res.data.data);
            this.$notify({ type: "success", message: "欢迎~" });
            this.$router.push({ name: "Home" }); //占位
            this.show = false;
          } else {
            console.log(res);
            this.$toast(res.data.message);
            this.show = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.show = false;
        });
    },
    toRegister() {
      this.$router.push({ name: "About" }); //占位
    },
    toForget() {
      this.$router.push({ name: "ForgetPassword" }); //占位
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  z-index: 6; /*将内容至于上层*/
  position: absolute; /*设置内容层绝对定位*/
  &-poster {
    width: 100%;
    height: 100%;
    background-size: cover;
    display: block;
  }
  &-info {
    margin-top: 15vw;
    border-radius: 10px;
  }
  &-btn {
    margin-top: 15vw;
    width: 90%;
  }
  .van-button--primary {
    color: #fff;
    background-color: #ff595f;
    border-color: #ff595f;
    // background-color: #008b8b;
    // border-color: #008b8b;
    border-radius: 10px;
  }
  .van-button--large {
    width: 80%;
    margin-top: 15vw;
    height: 5%;
    line-height: 245%;
  }
  .van-tabs {
    // background: rgba(252, 250, 250, 0.5);
    width: 80%;
    left: 10%;
    right: 10%;
    border-radius: 10px;
  }
  .van-field {
    border-radius: 10px;
    margin-top: 10px;
  }
}
.van-loading {
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
.van-button--info {
  margin-top: 5vw;
  margin-bottom: 5vw;
  border: 0ch;
  background-color: rgba(0, 0, 0, 0);
  font-size: 16px;
}
.bgImg {
  background-size: cover;
  filter: blur(3px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.title {
  display: inline-block;
  margin-top: 40px;
  font-size: 64px;
  margin-bottom: 40px;
}
.a-footer {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 18px;
  color: black;
}
</style>
