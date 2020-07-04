<template>
  <div>
    <van-nav-bar title="已签到成员" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="Teatmp">
      <!-- <van-list
        v-model="loading"
        :finished="finished"
        finished-text="暂无更多数据"
        @load="load_more_items"
      >
        
        <van-cell-group>
          
            <div v-for="(item,index) in hito" :key="item.id">
              <van-cell is-link>
              <span>{{index}}</span>
              <div class="emmm">
                <span v-if="item.mode=='time'">限时签到&nbsp;&nbsp;</span>
                <span v-else>手势签到&nbsp;&nbsp;</span>
              </div>
              </van-cell>
            </div>
          
        </van-cell-group>
      </van-list> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "SignMember",
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
      this.$router.push({ name: "TeaHistorySign" });
    },
    getAllSign() {
      var url = "/class/signIn/all";
      // var url="/index/class/signIn/all"
      var data = {
        cid: this.courseid
      };
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            this.hito = res.data.data;
            console.log(this.hito);
            this.finished = true;
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取签到历史失败" });
        });
    },
    load_more_items: function() {
      this.finished = false;
      this.loading = true;
      this.page += 1;
      this.offset = this.limit * this.page;
      this.getAllSign();
    }
  },
  mounted() {
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
  text-align: center;
}
.van-cell--large .van-cell__title {
  font-size: 20px;
  text-align: center;
}
.emmm {
  text-align: center;
}
</style>
