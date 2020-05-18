<template>
  <div class="home">
    <span class="text-t">{{name}},Welcome</span>
   
    <van-button @click="test" type="primary" size="large">测试</van-button>
    <textarea name="test" id="test" cols="30" rows="10" v-model="text"></textarea>
  </div>
</template>

<script>


export default {
  name: 'Home',
  data() {
    return {
    //   img:logo,
      name:"",
      text:''
    }
    
  },
  methods:{
    init(){
      this.name=this.$store.state.CLouduser.username
      console.log(this.$store.state.CLouduser.username)
    },
    test() {
        var url = "http://47.98.142.113:8443/api/admin/perm/all";
        this.$http
          .get(url)
          .then(res => {
            // this.ss=res.data
            if (res.data.code == 200) {
              this.$notify({ type: "success", message: "发送成功" });
              this.text = res.data.data;
            }
          })
          .catch(err => {
            console.log(err);
            this.ss=err
            this.$notify({ type: "danger", message: "发送失败" });
          });
    }
  },
  mounted(){
    this.init()
  },
  created(){
    this.init()
  }
}
</script>

<style scoped>
.text-t{
  text-align: center;
  color: black;
  font-size: 20px;
  line-height: 64px;
}
.imgf{
  width: 90%;
  height: 90%;
  background-size: cover;
}
</style>
