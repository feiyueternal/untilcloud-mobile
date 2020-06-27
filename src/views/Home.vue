<template>
  <div>
    
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入课程编码"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
      <div>
        <van-cell
          is-link
          to="otherStu"
          :key="index"
          v-for="(item, index) in Info"
          @click="onClick(item)"
        >
          <van-row gutter="5" type="flex">
            <van-col span="8" offset="2">
              <van-image round width="5rem" height="5rem" :src="item.cover">
                <template v-slot:error>加载失败</template>
              </van-image>
            </van-col>
            <van-col span="8" offset="3">
              <van-row class="rr">
                <van-col>{{item.name}}</van-col>
              </van-row>
              <van-row></van-row>
              <van-row>
                <van-col v-if="item.id">{{item.id}}</van-col>
                <van-col v-else>暂无id</van-col>
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
  name: "TeacherCourse",
  data() {
    return {
      isLoading: true,
      Info: "",
      value: ""
    };
  },
  methods: {
    Load() {
      // var url="/userInfo"
      var url = "/index/class/stu/course/getJoin";
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
          this.$notify({ type: "danger", message: "获取列表失败" });
        });
    },
    //下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        this.Load();
      }, 1000);
      this.isLoading = true;
    },
    onClick(item) {
      // console.log(item)
      this.$store.commit("getCourseInfo", item);
    },
    onSearch() {
      var url = "/index/class/stu/course/join";
      var data = {cid: this.value};
      this.$http
        .get(url, { params: data })
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.Info = res.data.data;
            this.Load();
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取课程失败" });
        });
    },
    onCancel() {
      this.value = "";
    }
  },
  mounted() {
    this.Load();
  },
  created() {
    // this.Load();
  }
};
</script>

<style scoped>
.rr {
  padding-top: 10px;
  margin-top: 10px;
}
</style>
