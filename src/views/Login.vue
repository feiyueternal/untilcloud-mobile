<template>
  <div class="bgImg" :style="bgImg">
    <span class="title">登录</span>
    <div class="login">
      <van-overlay :show="show">
        <van-loading vertical type="spinner" color="#1989fa">

        </van-loading>
      </van-overlay>
      <van-tabs type="card" @click="tabsClick">
        <van-tab title="账号密码登录">
          <!-- <form @submit.prevent="handleLogin"> -->
          <form>
            <van-cell-group class="login-info">
              <van-field
                v-model.trim="userlogin.username"
                required
                clearable
                left-icon="friends"
                label="账号"
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
                autocomplete
              />
            </van-cell-group>
          </form>
        </van-tab>
        <van-tab title="手机号登录">
          <form>
            <van-cell-group class="login-info">
              <van-field
                v-model.trim="phonelogin.phone"
                required
                clearable
                left-icon="phone"
                label="手机号"
                placeholder="请输入手机号"
              />

              <van-field
                v-model.trim="phonelogin.verificationCode"
                type="password"
                left-icon="lock"
                label="验证码"
                placeholder="请输入验证码"
                required
                clearable
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
            </van-cell-group>
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
    </div>
  </div>
</template>

<script>
import log from "@/assets/image/background1.jpg";

export default {
  data() {
    return {
      userlogin: { username: "", password: "" },
      phonelogin: { phone: "", verificationCode: "" },
      bgImg: {
        backgroundImage:
          "url(" + require("../assets/image/background1.jpg") + ") "
      },
      time: 0, //验证码倒计时
      disabled: false, //验证码按钮可用
      btntxt: "获取验证码", //验证码按钮文字
      show:false,//遮罩层
      nowactive:0,
    };
  },
  created() {},
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
        console.log(data);
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
      }
    },
    tabsClick(name, title){
        this.nowactive=name
        console.log(this.nowactive)
    },
    // 登录功能
    handleLogin() {
        this.show=true
        setTimeout(() => {

            this.show=false

        }, 700);
    },
    toRegister(){
        this.$router.push({ name: "About" });//占位
    },
    toForget(){
        this.$router.push({ name: "About" });//占位
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  &-poster {
    width: 100%;
    height: 100%;
    background-size: cover;
    display: block;
  }
  &-info {
    margin-top: 15vw;
  }
  &-btn {
    margin-top: 10vw;
    width: 90%;
  }
  .van-button--primary {
    color: #fff;
    background-color: #ff595f;
    border-color: #ff595f;
  }
  .van-button--large {
    width: 80%;
    margin-top: 10vw;
    height: 5%;
    line-height: 245%;
  }
  .van-tabs {
    background: rgba(252, 250, 250, 0.5);
  }
}
.van-loading{
  width: 40px;
  height: 40px;
  top: 50%;
  left: 50%;
  transform: translateX(-50%)
}
.van-button--info{
    margin-top: 5vw;
    margin-bottom: 5vw;
    border: 0ch;
    background-color: rgba(0, 0, 0, 0);
    font-size: 16px;
}
.bgImg {
  background-size: cover;
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
}
</style>
