<template>
  <div class="courseEdit">
    <van-nav-bar title left-text="返回" left-arrow @click-left="onClickLeft" />
    <form>
      <van-row>
        <van-col offset="6" span="12">
          
          <!-- <van-uploader
            :after-read="afterRead"
            upload-text="上传头像"
            max-size="1*1024*1024"
            result-type="file"
          >
            <van-image width="7rem" height="7rem" :src="courseInfo.cover">
              <template v-slot:error>加载失败</template>
            </van-image>
          </van-uploader> -->

          <van-image width="10rem" height="10rem" :src="courseInfo.qrcode">
              <template v-slot:error>加载失败</template>
            </van-image>
        </van-col>
        
      </van-row>

      <van-row>
        <van-col span="12">
          <van-field label="ID：" v-model="courseInfo.id" disabled></van-field>
        </van-col>
        <van-col offset="0" span="12">
          <van-field label="课程：" v-model="courseInfo.name"></van-field>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">
          <van-field
            readonly
            clickable
            name="picker"
            :value="courseInfo.grade"
            label="选择年级："
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
        </van-col>
        <van-col span="12">
          <van-field
            readonly
            clickable
            name="picker"
            :value="courseInfo.semester"
            label="选择学期："
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
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">
          <van-field
            readonly
            clickable
            name="picker"
            :value="courseInfo.school"
            label="选择学校："
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
        </van-col>
        <van-col span="12">
          <van-field
            readonly
            clickable
            name="picker"
            :value="courseInfo.college"
            label="选择学院："
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
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">
          <van-field
            readonly
            clickable
            name="picker"
            :value="courseInfo.major"
            label="选择专业："
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
        </van-col>
        <van-col span="12">
          <van-field label="老师：" v-model="courseInfo.teacher"></van-field>
        </van-col>
      </van-row>

      <van-row>
        <van-col span="12">
          <van-field label="学习要求：" v-model="courseInfo.learnRequire"></van-field>
        </van-col>
        <van-col span="12">
          <van-field label="教学计划：" v-model="courseInfo.teachProgress"></van-field>
        </van-col>
      </van-row>

      <van-field label="考试安排：" v-model="courseInfo.examArrange"></van-field>
    </form>
    <van-row>
      <van-col offset="4" span="6">
        <van-button @click="editCourse()" type="primary" size="large">修改课程</van-button>
      </van-col>
      <van-col offset="4" span="6">
        <van-button @click="delCourse()" type="danger" size="large">删除课程</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: "courseEdit",
  data() {
    return {
      showPicker1: false,
      showPicker2: false,
      showPicker3: false,
      showPicker4: false,
      showPicker5: false,
      // courseInfo: "",
      courseInfo: "",
      Info: "",
      grade_values: [],
      grade_select: [],
      term_values: [],
      term_select: [],
      school_values: [],
      school_select: [],
      college_values: [],
      college_select: [],
      major_values: [],
      major_select: []
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ name: "TeacherCourse" });
    },
    editCourse() {
      var url = "/index/class/course/edit";
      // var url = "/class/course/edit";
      var data = {
        id: this.courseInfo.id,
        name: this.courseInfo.name,
        grade: this.courseInfo.grade,
        semester: this.courseInfo.semester,
        school: this.courseInfo.school,
        college: this.courseInfo.college,
        major: this.courseInfo.major,
        teacher: this.courseInfo.teacher,
        learnRequire: this.courseInfo.learnRequire,
        teachProgress: this.courseInfo.teachProgress,
        examArrange: this.courseInfo.examArrange,
        schoolId: this.courseInfo.schoolId,
        collegeId: this.courseInfo.collegeId
      };
      this.$http
        .put(url, data)
        .then(res => {
          // console.log(data)
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.$router.push({ name: "TeacherCourse" });
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "编辑失败" });
        });
    },
    delCourse() {
      var url = "/index/class/course/delete";
      // var url = "/class/course/delete";
      var data = {
        cid: this.courseInfo.id
      };
      console.log(data);
      this.$http
        .get(url, { params: data })
        .then(res => {
          // console.log(data)
          if (res.data.code == 200) {
            console.log(res.data.data);
            this.$router.push({ name: "TeacherCourse" });
          } else {
            this.$notify({ type: "danger", message: res.data.message });
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "删除失败" });
        });
    },
    onConfirm1(value, index) {
      this.courseInfo.school = value;
      this.showPicker1 = false;
      var Id = this.school_values[index].id;
      this.courseInfo.schoolId = Id;
      this.courseInfo.college = null;
      this.courseInfo.major = null;
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
      this.courseInfo.college = value;
      this.showPicker2 = false;
      var Id = this.college_values[index].id;
      this.courseInfo.collegeId = Id;
      this.courseInfo.major = null;
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
      this.courseInfo.major = value;
      this.showPicker3 = false;
    },
    onConfirm4(value, index) {
      this.courseInfo.grade = value;
      this.showPicker4 = false;
    },
    onConfirm5(value, index) {
      this.courseInfo.semester = value;
      this.showPicker5 = false;
    },
    getGrade() {
      var grade_url = `/index/userInfo/get/777`;
      // var grade_url = `/userInfo/get/777`;
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
      // var term_url = `/userInfo/get/666`;
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
      if (this.courseInfo.schoolId) {
        setTimeout(() => {
          console.log("getcollege");
          // var college_url = `/userInfo/school/get/${this.Info.schoolId}`;
          var college_url = `/index/userInfo/school/get/${this.courseInfo.schoolId}`;
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
            if (this.courseInfo.collegeId) {
              setTimeout(() => {
                console.log("getmajor");
                // var major_url = `/userInfo/school/get/${this.Info.collegeId}`;
                var major_url = `/index/userInfo/school/get/${this.courseInfo.collegeId}`;
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
    Load() {
      // var url="/class/course/getCreate";
      var url = "/index/class/course/getCreate";
      this.$http
        .get(url)
        .then(res => {
          if (res.data.code == 200) {
            this.Info = res.data.data;
            console.log(this.Info);
            for (var i = 0; i < this.Info.length; i++) {
              if (this.courseInfo.id == this.Info[i].id) {
                this.$store.commit("getCourseInfo", this.Info[i]);
                console.log(this.Info[i].id);
                break;
              } else {
                continue;
              }
            }
            this.getCourseInfo();
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "danger", message: "获取列表失败" });
        });
    },
    getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo);
    },
    afterRead(file) {
      // console.log(file);
      // var url = "/class/course/cover";
      var url = "/index/class/course/cover";
      var data = new window.FormData();

      data.append("file", file.file);
      data.append("id", this.courseInfo.id);
      this.$http
        .post(url, data)
        .then(res => {
          console.log(res.data);
          if (res.data.code == 200) {
            this.$notify({ type: "success", message: "头像更换成功" });
            this.Load();

            // this.getCourseInfo();
            // console.log(this.Info)
          }
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: "error", message: "头像更换失败" });
        });
    }
  },

  mounted() {
    this.Load();
    this.loadSelect();
    this.getGrade();
    this.getTerm();
    this.getCourseInfo();
  }
};
</script>

<style scoped>
</style>;
