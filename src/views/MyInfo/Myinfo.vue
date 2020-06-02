<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <div>
    <van-cell is-link to="ChangeMyinfo">
      <van-row gutter="5" type="flex">
        <van-col span="8" offset="2">
          <van-image
            round
            width="5rem"
            height="5rem"
            :src="Info.cover"
          >
            <template v-slot:error>加载失败</template>
          </van-image>
        </van-col>
        <van-col span="8" offset="3">
          <van-row class="rr">
            <van-col>{{Info.name}}</van-col>
          </van-row>
          <van-row></van-row>
          <van-row>
            <van-col v-if="Info.ino">{{Info.ino}}</van-col>
            <van-col v-else>暂无学号/工号</van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-cell>
    </div>
</van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: "Myinfo",
  data() {
    return {
      Info: "",
      isLoading: true
    };
  },
  methods: {
    Load() {
      // var url="/userInfo"
      var url = "/index/userInfo";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.Info = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取用户失败" });
        });
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.Load();
      }, 1000);
      this.isLoading = true;
    }
  },
  mounted() {
    this.Load();
  }
};
</script>
<style scoped>
.rr {
  padding-top: 10px;
  margin-top: 10px;
}
</style>