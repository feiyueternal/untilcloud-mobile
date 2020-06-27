<template>
  <div id="app">
    <van-nav-bar title="" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-tabbar v-model="active" active-color="#07c160">
      <van-tabbar-item
      icon="manager"
      to="/otherStu">
        <span>成员</span>
      </van-tabbar-item>

      <van-tabbar-item
      to="/stuSign" 
      icon="fire">
        <span>签到</span>
      </van-tabbar-item>

      <van-tabbar-item
        to="/message"
        icon="chat">
        消息
      </van-tabbar-item>
    </van-tabbar>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      active: 0,
    }
  },
  mounted(){
      
  },
  watch: {
    
  },
  methods: {
    onClickLeft() {
       this.$router.push({ name: "Home" });
    }
  },
}
</script>
<style scoped>
</style>