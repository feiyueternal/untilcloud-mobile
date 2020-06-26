<template>
  <div class="CreateCourse">
    <form>
      <van-uploader
        class="upload"
        :after-read="afterRead"
        upload-text="上传图片"
        max-size="1*1024*1024"
        result-type="file"
      >
        <van-image class="image" round width="3rem" height="3rem">
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-uploader>
      <van-row>
        <van-col>
          <van-field label="课程" v-model="Info.name"></van-field>
        </van-col>
        <van-col>
          <van-field label="年级" type="number" v-model="Info.grade"></van-field>
        </van-col>
      </van-row>

      <van-field label="学期" type="number" v-model="Info.semester"></van-field>
      <van-field label="学校" v-model="Info.school"></van-field>
      <van-field label="学院" v-model="Info.college"></van-field>
      <van-field label="专业" v-model="Info.major"></van-field>
      <van-field label="老师" v-model="Info.teacher"></van-field>
      <van-field label="学习要求" v-model="Info.learnRequire"></van-field>
      <van-field label="教学计划" v-model="Info.teachProgress"></van-field>
      <van-field label="考试安排" v-model="Info.examArrange"></van-field>
    </form>
    <van-button @click="create" type="primary" size="large">创建</van-button>
  </div>
</template>

<script>
export default {
  name: "CreateCourse",
  data() {
    return {
      Info: {
        file: "",
        name: "",
        grade: "",
        semester: "",
        school: "",
        college: "",
        major: "",
        teacher: "",
        learnRequire: "",
        teachProgress: "",
        examArrange: ""
      },
      formdata: new window.FormData()
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      // var data = new window.FormData();
      // this.formdata.append("file", file.file);
      // this.Info.file = data;
      // console.log(data)
      this.Info.file = file.file;
    },
    create() {
      var url = "/index/class/course/add";
      this.formdata.append("cover", this.Info.file);
      this.formdata.append("name", this.Info.name);
      this.formdata.append("grade", this.Info.grade);
      this.formdata.append("semester", this.Info.semester);
      this.formdata.append("school", this.Info.school);
      this.formdata.append("college", this.Info.college);
      this.formdata.append("major", this.Info.major);
      this.formdata.append("teacher", this.Info.teacher);
      this.formdata.append("learnRequire", this.Info.learnRequire);
      this.formdata.append("teacherProgress", this.Info.teacherProgress);
      this.formdata.append("examArrange", this.Info.examArrange);
      console.log(this.formdata);
      this.$http
        .post(url, this.formdata)
        .then(res => {
          // console.log(data)
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.Info = '';
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "创建失败" });
        });
    }
  },
  mounted() {},
  created() {}
};
</script>

<style scoped>
.image {
  padding-top: 5px;
  margin-top: 5px;
  margin-left: 5px;
  padding-left: 5px;
}
</style>
