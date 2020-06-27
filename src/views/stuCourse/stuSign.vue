<template>
  <div class="stuSign">
    
  </div>
</template>

<script>


export default {
  name: 'stuSign',
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
