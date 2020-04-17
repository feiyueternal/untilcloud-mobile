<template>
  <!-- <div class="login-poster" :style="bgImg"> -->
      <div class="bgImg" :style="bgImg">
    <div class="login">
      <form @submit.prevent="handleLogin">
        <van-cell-group class="login-info">
          <van-field
            v-model.trim="user.userCode"
            required
            clearable
            label="用户名"
            placeholder="请输入用户名"
          />

          <van-field
            v-model.trim="user.password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            right-icon="question-o"
            required
            clearable
            autocomplete
            @click-right-icon="$toast('忘记密码')"
          />
        </van-cell-group>
        <van-button type="primary" size="large">登录</van-button>
      </form>
    </div>
  </div>
</template>

<script>
import log from "@/assets/image/background1.jpg";

export default {
  data() {
    return {
      user: { userCode: "", password: "" },
      bgImg: {
        backgroundImage:
          "url(" + require("../assets/image/background1.jpg") + ") "
      }
    };
  },
  created() {},
  methods: {
    // 登录功能
    handleLogin() {
      if (this.user.userCode === "") {
        this.$toast({ message: "请您输入用户名", duration: 1000 });
        return false;
      }
      if (this.user.password === "") {
        this.$toast({ message: "请您输入密码", duration: 1000 });
        return false;
      }
      //   this.$store.dispatch('Login', this.user).then(() => {
      // 判断路由是否代餐,带参就去到重定向参数地址,否则就去首页
      // if (this.$router.query.redirect) {
      //   this.$router.replace({ path: this.$router.query.redirect }) // 阻止返回上一页直接到了首页
      // } else {
      //   this.$router.replace({ path: '/user' })
      // }
      console.log("111");
      //   }).catch((error) => {
      //     // 错误提示消息,组件提示
      //     this.$toast({ message: error, duration: 1000 })
      //   })
    }
  }
};
</script>

<style lang="less" scoped>
.login {
//   background-color: #fff;
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
    margin-left: 5%;
  }
  .van-button--primary {
    color: #fff;
    background-color: #ff595f;
    border-color: #ff595f;
  }
  .van-button--large {
    width: 90%;
    margin-top: 10vw;
    margin-left: 5%;
    height: 5%;
    line-height: 245%;
  }
}
.bgImg {
  background-size: cover;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
