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
        <van-image class="image" round width="5rem" height="5rem">
          <template v-slot:error>加载失败</template>
        </van-image>
      </van-uploader>
      <van-field label="课程" v-model="Info.name"></van-field>
      <van-field
        readonly
        clickable
        name="picker"
        :value="Info.grade"
        label="选择年级"
        placeholder="点击选择"
        @click="showPicker4 = true"
      />
      <van-popup v-model="showPicker4" position="bottom">
        <van-picker
          show-toolbar
          :columns="grade_select"
          @confirm="onConfirm4"
          @cancel="showPicker4 = false"
        />
      </van-popup>
      <!-- <van-field label="课程" v-model="Info.name"></van-field> -->

      <!-- <van-field label="年级" type="number" v-model="Info.grade"></van-field> -->

      <!-- <van-field label="学期" type="number" v-model="Info.semester"></van-field> -->
      <!-- <van-field label="学校" v-model="Info.school"></van-field> -->
       <van-field
        readonly
        clickable
        name="picker"
        :value="Info.semester"
        label="选择学期"
        placeholder="点击选择"
        @click="showPicker5 = true"
      />
      <van-popup v-model="showPicker5" position="bottom">
        <van-picker
          show-toolbar
          :columns="term_select"
          @confirm="onConfirm5"
          @cancel="showPicker5 = false"
        />
      </van-popup>
      
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
      <!-- <van-field label="学校ID" v-model="Info.schoolId"></van-field> -->
      <!-- <van-field label="学院" v-model="Info.college"></van-field> -->
      <!-- <van-field label="学院ID" v-model="Info.collegeId"></van-field> -->
      <!-- <van-field label="专业" v-model="Info.major"></van-field> -->
      <van-field label="老师" v-model="Info.teacher"></van-field>
      <van-field label="学习要求" v-model="Info.learnRequire"></van-field>
      <van-field label="教学计划" v-model="Info.teachProgress"></van-field>
      <van-field label="考试安排" v-model="Info.examArrange"></van-field>
    </form>
    <van-button @click="create" type="primary" size="large" block>创建</van-button>
  </div>
</template>

<script>
export default {
  name: "CreateCourse",
  data() {
    return {
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      Info: {
        file: "",
        name: "",
        grade: "",
        semester: "",
        school: "",
        schoolId: "",
        college: "",
        collegeId: "",
        major: "",
        teacher: "",
        learnRequire: "",
        teachProgress: "",
        examArrange: ""
      },
      grade_values: [],
      grade_select: [],
      term_values: [],
      term_select: [],
      school_values: [],
      school_select: [],
      college_values: [],
      college_select: [],
      major_values: [],
      major_select: [],
      formdata: new window.FormData()
    };
  },
  methods: {
    getGrade() {
      var grade_url = `/index/userInfo/get/777`;
      this.$http
        .get(grade_url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            var tmp = res.data.data;
            this.grade_select = [];
            for (var i = 0; i < tmp.length; i++) {
              this.grade_select.push(tmp[i].name);
            }
            this.grade_values = tmp;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "获取年级失败" });
        });
    },
    getTerm() {
      var term_url = `/index/userInfo/get/666`;
      this.$http
        .get(term_url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            var tmp = res.data.data;
            this.term_select = [];
            for (var i = 0; i < tmp.length; i++) {
              this.term_select.push(tmp[i].name);
            }
            this.term_values = tmp;
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "获取学期失败" });
        });
    },
    onConfirm1(value, index) {
      this.Info.school = value;
      this.showPicker1 = false;
      var Id = this.school_values[index].id;
      this.Info.schoolId = Id;
      this.Info.college = null;
      this.Info.major = null;
      // var college_url = `/userInfo/school/get/${Id}`;
      var college_url = `/index/userInfo/school/get/${Id}`;
      this.$http
        .get(college_url)
        .then(res => {
          if (res.data.code == 200) {
            var tmp = res.data.data;
            this.college_select = [];
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
      this.Info.major = null;
      // var major_url = `/userInfo/school/get/${Id}`;
      var major_url = `/index/userInfo/school/get/${Id}`;
      this.$http
        .get(major_url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            var tmp = res.data.data;
            this.major_select = [];
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
    onConfirm4(value, index) {
      this.Info.grade = value;
      this.showPicker4 = false;
    },
    onConfirm5(value, index) {
      this.Info.semester = value;
      this.showPicker5 = false;
    },
    loadSelect() {
      // var school_url = "/userInfo/school/get";
      var school_url = "/index/userInfo/school/get";
      var tmp = [];
      this.$http
        .get(school_url)
        .then(res => {
          if (res.data.code == 200) {
            console.log(res.data.data);
            tmp = res.data.data;
            this.school_select = [];
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
          console.log("getcollege");
          // var college_url = `/userInfo/school/get/${this.Info.schoolId}`;
          var college_url = `/index/userInfo/school/get/${this.Info.schoolId}`;
          this.$http
            .get(college_url)
            .then(res => {
              if (res.data.code == 200) {
                console.log("college");
                console.log(res.data.data);
                var tmp = res.data.data;
                this.college_select = [];
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
                console.log("getmajor");
                // var major_url = `/userInfo/school/get/${this.Info.collegeId}`;
                var major_url = `/index/userInfo/school/get/${this.Info.collegeId}`;
                this.$http
                  .get(major_url)
                  .then(res => {
                    if (res.data.code == 200) {
                      console.log(res.data.data);
                      var tmp = res.data.data;
                      this.major_select = [];
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
      this.formdata.append("schoolId", this.Info.schoolId);
      this.formdata.append("collegeId", this.Info.collegeId);
      console.log(this.formdata);
      this.$http
        .post(url, this.formdata)
        .then(res => {
          // console.log(data)
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.Info = "";
            this.$router.push({ name: "TeacherCourse" }); 
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
  mounted() {
    // this.Load();
    this.getGrade();
    this.getTerm();
    setTimeout(() => {
      // console.log(this.Info);
      this.loadSelect();
    }, 500);
  },
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
