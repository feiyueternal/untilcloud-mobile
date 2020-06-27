<template>
  <div class="TeaSign">
    
  </div>
</template>

<script>


export default {
  name: 'TeaSign',
  data() {
    return {
      coueseInfo: ''
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
