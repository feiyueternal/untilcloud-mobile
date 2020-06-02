<template>
  <div>
    <van-nav-bar title="修改个人信息" left-text="返回" left-arrow @click-left="onClickLeft" />
    <form>
      <van-uploader
        :after-read="afterRead"
        upload-text="上传头像"
        max-size="1*1024*1024"
        result-type="file"
      >
        <van-image round width="5rem" height="5rem" :src="Info.cover">
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-uploader>

      <van-field label="姓名" v-model="Info.name"></van-field>

      <van-field label="昵称" v-model="Info.nickname"></van-field>
      <van-field label="性别" v-model="Info.sex">
        <template #input>
          <van-radio-group v-model="Info.sex" direction="horizontal">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        name="picker"
        :value="Info.school"
        label="选择学校"
        placeholder="点击选择"
        @click="showPicker1 = true"
      />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="school_select"
          @confirm="onConfirm1"
          @cancel="showPicker1 = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        :value="Info.college"
        label="选择学院"
        placeholder="点击选择"
        @click="showPicker2 = true"
      />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="college_select"
          @confirm="onConfirm2"
          @cancel="showPicker2 = false"
        />
      </van-popup>

      <van-field
        readonly
        clickable
        name="picker"
        :value="Info.major"
        label="选择专业"
        placeholder="点击选择"
        @click="showPicker3 = true"
      />
      <van-popup v-model="showPicker3" position="bottom">
        <van-picker
          show-toolbar
          :columns="major_select"
          @confirm="onConfirm3"
          @cancel="showPicker3 = false"
        />
      </van-popup>

      <van-field label="选择身份" v-model="Idenid">
        <template #input>
          <van-radio-group v-model="Idenid" direction="horizontal">
            <van-radio name="3">我是老师</van-radio>
            <van-radio name="5">我是学生</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field required label="学号/工号" v-model="Info.ino"></van-field>
    </form>
    <van-button round size="large" @click="Save" type="info">保存</van-button>
  </div>
</template>

<script>
export default {
  name: "ChangeMyinfo",
  data() {
    return {
      Info: "",
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      isLoading: true,
      Idenid: 5,
      school_values: [],
      school_select: [],
      college_values: [],
      college_select: [],
      major_values: [],
      major_select: []
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
            this.Info = res.data.data;
            console.log(this.Info);
            this.Idenid = res.data.data.roles[0].id;
            this.Idenid = this.Idenid + "";
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取用户失败" });
        });
    },
    onClickLeft() {
      this.$router.push({ name: "Myinfo" });
    },
    afterRead(file) {
      console.log(file);
      // var url="/userInfo/cover"
      var url = "/index/userInfo/cover";
      var data = new window.FormData();
      data.append("file", file.file);
      this.$http
        .post(url, data)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$notify({ type: "success", message: "头像更换成功" });
            this.Load();
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "头像更换失败" });
        });
    },
    onConfirm1(value, index) {
      this.Info.school = value;
      this.showPicker1 = false;
      var Id = this.school_values[index].id;
      this.Info.schoolId = Id;
      this.Info.college=null
      this.Info.major=null
      // var college_url=`/sys/school/get/${Id}`
      var college_url = `/index/sys/school/get/${Id}`;
      this.$http
        .get(college_url)
        .then(res => {
          if (res.data.code == 200) {
            var tmp = res.data.data;
            this.college_select=[]
            for (var i = 0; i < tmp.length; i++) {
              this.college_select.push(tmp[i].name);
            }
            this.college_values = tmp;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "获取学院失败" });
        });
    },
    onConfirm2(value, index) {
      this.Info.college = value;
      this.showPicker2 = false;
      var Id = this.college_values[index].id;
      this.Info.collegeId = Id;
      this.Info.major=null
      // var major_url=`/sys/school/get/${Id}`
      var major_url = `/index/sys/school/get/${Id}`;
      this.$http
        .get(major_url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            var tmp = res.data.data;
            this.major_select=[]
            for (var i = 0; i < tmp.length; i++) {
              this.major_select.push(tmp[i].name);
            }
            this.major_values = tmp;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "获取专业失败" });
        });
    },
    onConfirm3(value, index) {
      this.Info.major = value;
      this.showPicker3 = false;
    },
    loadSelect() {
      // var school_url='/sys/school/get'
      var school_url = "/index/sys/school/get";
      var tmp = [];
      this.$http
        .get(school_url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            tmp = res.data.data;
            this.school_select=[]
            for (var i = 0; i < tmp.length; i++) {
              this.school_select.push(tmp[i].name);
            }
            this.school_values = tmp;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "获取学校失败" });
        });
      if (this.Info.schoolId) {

        setTimeout(() => {
          console.log("getcollege")
          // var college_url=`/sys/school/get/${schoolId}`
          var college_url = `/index/sys/school/get/${this.Info.schoolId}`;
          this.$http
            .get(college_url)
            .then(res => {
              if (res.data.code == 200) {
                console.log("college")
                console.log(res.data.data);
                var tmp = res.data.data;
                this.college_select=[]
                for (var i = 0; i < tmp.length; i++) {
                  this.college_select.push(tmp[i].name);
                }
                this.college_values = tmp;
              }
            })
            .catch(err => {
              console.log(err);
              this.$notify({ type: "error", message: "获取学院失败" });
            });
        }, 500);
        setTimeout(() => {
          this.$nextTick(() => {
            if (this.Info.collegeId) {

              setTimeout(() => {
                console.log("getmajor")
                // var major_url=`/sys/school/get/${collegeId}`
                var major_url = `/index/sys/school/get/${this.Info.collegeId}`;
                this.$http
                  .get(major_url)
                  .then(res => {
                    if (res.data.code == 200) {
                      console.log(res.data.data);
                      var tmp = res.data.data;
                      this.major_select=[]
                      for (var i = 0; i < tmp.length; i++) {
                        this.major_select.push(tmp[i].name);
                      }
                      this.major_values = tmp;
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    this.$notify({ type: "error", message: "获取专业失败" });
                  });
              }, 500);
            }
          });
        }, 500);
      }
    },
    Save() {
      // var url="/userInfo"
      var url = "/index/userInfo";
      var NumofId = Number(this.Idenid);
      var data = {
        id: this.Info.id,
        nickname: this.Info.nickname,
        ino: this.Info.ino,
        sex: this.Info.sex,
        school: this.Info.school,
        college: this.Info.college,
        major: this.Info.major,
        roles: [
          {
            id: NumofId
          }
        ],
        name: this.Info.name,
        schoolId: this.Info.schoolId,
        collegeId: this.Info.collegeId
      };
      // console.log(data);
      this.$http
        .put(url, data)
        .then(res => {
          if (res.data.code == 200) {
            this.$notify({ type: "success", message: "保存信息成功" });
            this.Load();
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "保存信息失败" });
        });
    }
  },
  mounted() {
    this.Load();
    setTimeout(() => {
      console.log(this.Info)
      this.loadSelect();
    }, 500);
  }
};
</script>
<style scoped>
</style>