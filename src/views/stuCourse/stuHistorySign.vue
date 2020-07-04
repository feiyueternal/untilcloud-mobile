<template>
  <div>
    <van-nav-bar title="历史签到情况" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="Teatmp">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多数据"
        @load="load_more_items"
      >
        <!-- <van-cell
            class="ee"
            size="large"
            use-label-slot=true
          v-for="item in hito"
          :key="item.id"
          :title="'模式：'+item.mode"
          >
          <van-cell size="large" :title="item.time"></van-cell>
          <div class="ho">
          <div  v-if="item.isSignIn==false">未签到</div>
          <div v-else>已签到</div>
        </div>
        </van-cell>-->
        <van-cell-group>
          <div v-for="(item,index) in hito" :key="item.id">
            <div class="oo">
              <span>{{index+1}}</span>

              <span v-if="item.mode=='time'">&nbsp;&nbsp;限时签到</span>
              <span v-else>&nbsp;&nbsp;手势签到</span>

              <span>&nbsp;&nbsp;&nbsp;{{item.time}}&nbsp;&nbsp;&nbsp;</span>
              <div class="emmm">
                <span v-if="item.isSignIn==false">未签到&nbsp;&nbsp;</span>
                <span v-else>已签到&nbsp;&nbsp;</span>
              </div>
            </div>
          </div>
        </van-cell-group>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "stuHistorySign",
  data() {
    return {
      courseid: "",
      hito: {},
      finished: false,
      loading: false,
      offset: 0,
      page: 0,
      limit: 10
    };
  },
  methods: {
    getCourseInfo() {
      this.courseid = this.$store.state.courseInfo.id;
    },
    onClickLeft() {
      this.$router.push({ name: "stuSign" });
    },
    getAllSign() {
      var url = "/class/stu/signIn/all";
      // var url="/index/class/stu/signIn/all"
      var data = {
        cid: this.courseid
      };
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.hito = res.data.data;
            console.log(this.hito);
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取签到历史失败" });
        });
    },
    load_more_items: function() {
      this.page += 1;
      this.offset = this.limit * this.page;
      this.getAllSign();
    }
  },
  mounted() {
    this.getCourseInfo();
    this.getAllSign();

if (window.history && window.history.pushState) {
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', this.onClickLeft, false);//false阻止默认事件 
}

  },
  created() {},
   destroyed () {
    window.removeEventListener('popstate', this.onClickLeft, false);//false阻止默认事件
  },
};
</script>

<style scoped>
.Teatmp {
  margin: auto auto;
}
.ee {
  font-size: 20px;
}
.van-cell--large .van-cell__title {
  font-size: 20px;
}
.ho {
  text-align: center;
}
.emmm {
  text-align: right;
}
.oo{
  border: 1px solid #918b8b;
  text-align: left;
}
</style>
