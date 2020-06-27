<template>
  <div class="TeaCourseEdit">
    
  </div>
</template>

<script>


export default {
  name: 'TeaCourseEdit',
  data() {
    return {
      courseInfo: ''
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
