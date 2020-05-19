<template>
  <div>
    <div class="all">
      <van-overlay :show="show">
        <van-loading vertical type="spinner" color="#1989fa"></van-loading>
      </van-overlay>
      <van-nav-bar title="注册" left-text="返回登录页" left-arrow @click-left="onClickLeft" />

      <div class="card">
        <van-field
          label="手机号"
          v-model.trim="RegisterForm.phone"
          placeholder="请输入您的手机号码"
          type="number"
          :error-message="err_mes.phone"
          required
          clearable
        />
         <van-field
          label="邮箱"
          v-model.trim="RegisterForm.email"
          placeholder="请输入您的邮箱"
          type="email"
          :error-message="err_mes.phone"
          required
          clearable
        />
        <van-field
          label="姓名"
          v-model.trim="RegisterForm.name"
          placeholder="请输入您的姓名"
          
          :error-message="err_mes.phone"
          required
          clearable
        />
        <van-field
          label="密码"
          v-model.trim="RegisterForm.password"
          required
          type="password"
          :error-message="err_mes.password"
          right-icon="warning-o"
          @click-right-icon="$toast('密码由6-20个字符组成(包括字母、数字及下划线)')"
          placeholder="请输入密码"
          clearable
        />
        <van-field
          label="确认密码"
          required
          v-model.trim="RegisterForm.confirmps"
          type="password"
          :error-message="err_mes.confirmps"
          placeholder="再次输入密码"
          clearable
        />
        <van-field
          label="验证码"
          required
          :error-message="err_mes.verificationCode"
          v-model.trim="RegisterForm.verificationCode"
          type="digit"
          placeholder="请输入验证码"
          clearable
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
        <!-- <van-cell-group>
        <van-cell title="选择身份"/>-->
        <!-- <div>选择身份</div> -->
        <van-radio-group v-model="RegisterForm.role" direction="horizontal">
          <van-radio name="teacher">老师</van-radio>
          <van-radio name="student">学生</van-radio>
        </van-radio-group>
        <!-- </van-cell-group> -->

        <van-button size="large" type="primary" @click="regConfirm">确认注册</van-button>
         <div>{{ss}}</div>
      </div>
    </div>
    <div class="bgImg" :style="bgImg"></div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      ss:"",
      flag: false,
      bgImg: {
        backgroundImage:
          "url(" + require("../assets/image/background1.jpg") + ") "
      },
      show: false,
      RegisterForm: {
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        confirmps: "",
        role: "teacher",
        verificationCode: ""
      },
      err_mes: {
        username: "",
        password: "",
        name: "",
        phone: "",
        email: "",
        confirmps: "",
        verificationCode: ""
      },
      time: 0, //验证码倒计时
      disabled: false, //验证码按钮可用
      btntxt: "获取验证码" //验证码按钮文字
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "Login" });
    },
    //表单验证
    rp_test() {
      let test = new Promise((resolve, reject) => {
        const phone_reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        const password_reg = /^[_a-zA-Z0-9]{6,20}$/;
        const email_reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        this.flag = false;
        if (this.RegisterForm.phone == "") {
          this.err_mes.phone = "请输入手机号";
          resolve(false);
        } else if (!phone_reg.test(this.RegisterForm.phone)) {
          this.err_mes.phone = "手机号格式不正确";
          resolve(false);
        } else if (this.RegisterForm.email == "") {
          this.err_mes.email = "请输入邮箱";
          this.err_mes.phone = "";
        } else if (!email_reg.test(this.RegisterForm.email)) {
          this.err_mes.phone = "";
          this.err_mes.email = "请输入合法邮箱";
        } else if (this.RegisterForm.phone == "") {
          this.err_mes.phone = "";
          this.err_mes.email = "";
          this.err_mes.password = "请输入新密码";
          resolve(false);
        } else if (!password_reg.test(this.RegisterForm.password)) {
          this.err_mes.phone = "";
          this.err_mes.email = "";
          this.err_mes.password = "密码格式不规范";
          resolve(false);
        } else if (this.RegisterForm.confirmps == "") {
          this.err_mes.phone = "";
          this.err_mes.email = "";
          this.err_mes.password = "";
          this.err_mes.confirmps = "请再次输入新密码";
          resolve(false);
        } else if (this.RegisterForm.confirmps != this.RegisterForm.password) {
          this.err_mes.phone = "";
          this.err_mes.email = "";
          this.err_mes.password = "";
          this.err_mes.confirmps = "两次输入密码不一致";
          resolve(false);
        } else if (this.RegisterForm.verificationCode == "") {
          this.err_mes.phone = "";
          this.err_mes.email = "";
          this.err_mes.password = "";
          this.err_mes.confirmps = "";
          this.err_mes.verificationCode = "请输入验证码";
          resolve(false);
        } else {
          this.err_mes.phone = "";
          this.err_mes.email = "";
          this.err_mes.password = "";
          this.err_mes.confirmps = "";
          this.err_mes.verificationCode = "";
          resolve(true);
          this.flag = true;
        }
      });
      return test;
    },
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
      if (this.RegisterForm.phone) {
        var data = {
          phone: this.RegisterForm.phone,
          count: 4
        };
        // var url = "http://47.98.142.113:8443/api/common/getVerificationCode";
        var url="/common/getVerificationCode"
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
    regConfirm() {
      this.rp_test();
      if ((this.flag = true)) {
        var data = {
          phone: this.RegisterForm.phone,
          password: this.RegisterForm.password,
          email: this.RegisterForm.email,
          name: this.RegisterForm.name
        };
        // var url = `http://47.98.142.113:8443/api/common/register/mobile?verificationCode=${this.RegisterForm.verificationCode}&role=${this.RegisterForm.role}`;
        var url=`/common/register/mobile?verificationCode=${this.RegisterForm.verificationCode}&role=${this.RegisterForm.role}`
        console.log(url)
        this.$http
          .post(url, data)
          .then(res => {
            console.log(res);
            this.ss=res.data
            if (res.data.code == 200) {
              this.$notify({ type: "success", message: "注册成功" });
              this.$router.push({ name: "Login" });
            } else {
              console.log(res);
              this.$notify({ type: "danger", message: res.data.message });
            }
          })
          .catch(err => {
            console.log(err);
            this.ss=err
            this.$notify({ type: "danger", message: "注册失败" });
          });
      }
    }
  }
};
</script>
<style lang="less" scoped>
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
  background-color: rgba(78, 28, 28, 0);
  font-size: 16px;
}
.bgImg {
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(3px);
}
.title {
  display: inline-block;
  margin-top: 40px;
  font-size: 64px;
  margin-bottom: 40px;
}
.card {
  margin-top: 70px;
  width: 80%;
  margin-left: 10%;
  margin-right: 10%;
  border-radius: 10px;
}
.van-field {
  border-radius: 10px;
  margin-top: 15px;
}
.van-button--primary {
  color: #fff;
  background-color: #008b8b;
  border-color: #008b8b;
  border-radius: 10px;
}
.van-radio-group {
  margin-top: 15px;
  width: 80%;
  // margin-left: 10%;
  margin-right: 10%;
  border-radius: 10px;
  width: 321.52px;
  height: 44px;
  // padding-left: 0%;
}
.all {
  width: 100%;
  height: 100%;
  z-index: 6; /*将内容至于上层*/
  position: absolute; /*设置内容层绝对定位*/
  .van-button--large {
    width: 80%;
    margin-top: 10vw;
    height: 5%;
    line-height: 245%;
  }
}
</style>