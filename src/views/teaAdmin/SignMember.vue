<template>
  <div>
    <van-nav-bar title="已签到成员" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="Teatmp">
      <div>签到开始时间:{{startTime}}</div>
      <div>签到结束时间:{{endTime}}</div>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多数据"
        @load="load_more_items"
      >
        <van-cell-group>
          <div v-for="(item,index) in hito" :key="item.id">
            <div class="oo">
              <span>&nbsp;&nbsp;{{index+1}}&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <!-- <div class="emmm"> -->
              <span>{{item.ino}}&nbsp;&nbsp;</span>
              <span>&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;</span>
              <span>&nbsp;&nbsp;{{item.time}}&nbsp;&nbsp;</span>
              <!-- </div> -->
            </div>
          </div>
        </van-cell-group>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignMember",
  data() {
    return {
      csiid: null,
      hito: {},
      finished: false,
      loading: false,
      offset: 0,
      page: 0,
      limit: 10,
      startTime: null,
      endTime: null
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "TeaHistorySign" });
    },
    getthisSign() {
      var url = "/class/signIn/stu";
      // var url="/index/class/signIn/stu"
      var data = {
        csiid: this.csiid
      };
      // console.log(data)
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.hito = res.data.data;
            console.log(this.hito);
            this.finished = true;
            this.loading = false;
          }else{
            this.$notify({ type: "danger", message: "获取签到结果失败" });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取签到结果失败" });
        });
    },
    load_more_items: function() {
      this.finished = false;
      this.loading = true;
      this.page += 1;
      this.offset = this.limit * this.page;
      if(this.id!=null||this.id!=undefined){
        setTimeout(() =>{
          console.log("1")
        this.getthisSign();
      },50)
      }
      
    },
    getThey() {
      this.csiid = this.$route.params.id;
      this.startTime = this.$route.params.startTime;
      this.endTime = this.$route.params.endTime;
    }
  },
  mounted() {
    // this.getThey();
    this.csiid = this.$route.params.id;
      this.startTime = this.$route.params.startTime;
      this.endTime = this.$route.params.endTime;
    // this.$nextTick(() =>{
    //     this.getthisSign();
    //   })
    
      if(this.$route.params.id!=null||this.$route.params.id!=undefined){
        setTimeout(() =>{
        this.getthisSign();
        console.log("2")
      },50)
      }

    if (window.history && window.history.pushState) {
      history.pushState(null, null, document.URL);
      window.addEventListener("popstate", this.onClickLeft, false); //false阻止默认事件
    }
  },
  created() {
    
  },
  destroyed() {
    window.removeEventListener("popstate", this.onClickLeft, false); //false阻止默认事件
  },
  watch: {
    '$route'() {
      // this.getThey();
      this.csiid = this.$route.params.id;
      this.startTime = this.$route.params.startTime;
      this.endTime = this.$route.params.endTime;
      console.log(this.$route.params.id)
      if(this.$route.params.id!=null||this.$route.params.id!=undefined){
        setTimeout(() =>{
        this.getthisSign();
        console.log("3")
      },50);
      }
      
    }
  }
};
</script>

<style scoped>
.Teatmp {
  margin: auto auto;
}
.ee {
  font-size: 20px;
  text-align: center;
}
.van-cell--large .van-cell__title {
  font-size: 20px;
  text-align: center;
}
.emmm {
  text-align: center;
}
.oo {
  border: 1px solid #918b8b;
  text-align: center;
}
</style>
