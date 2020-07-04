<template>
  <div>
    <van-nav-bar title="二维码" left-text="返回" left-arrow @click-left="onClickLeft" />
    <van-image width="200" height="200" :src="QR" />
  </div>
</template>

<script>
export default {
  data() {
    return {
        QR: ''
    };
  },

  methods: {
    onClickLeft() {
      this.$router.push({ name: "courseEdit" });
    },
    getQR() {
        this.QR = this.$store.state.QR;
        console.log(this.QR);
    }
  },

  mounted() {
      this.getQR(); 
  },
  created() {},
  computed: {}
};
</script>

<style scoped>
</style>