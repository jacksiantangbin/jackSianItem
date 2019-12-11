<template>
<div>
  <div>{{item}}</div>
  <test-top></test-top>
</div>
</template>

<script>
  import TestTop from '../components/test/TestTop'

  export default {
    name: 'TestOne',
    components: {TestTop},
    data(){
      return{
        item:'啊是分身乏术地方'
      }

    }
  }
</script>

<style scoped>

</style>
