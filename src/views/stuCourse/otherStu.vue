<template>
  <div class="otherStu">
    
  </div>
</template>

<script>


export default {
  name: 'otherStu',
  data() {
    return {
      courseInfo: '',
    }
    
  },
  methods:{
   getCourseInfo() {
      this.courseInfo = this.$store.state.courseInfo;
      console.log(this.courseInfo)
    }
  },
  mounted(){
     this.getCourseInfo()
  },
  created(){
    
  }
}
</script>

<style scoped>

</style>
