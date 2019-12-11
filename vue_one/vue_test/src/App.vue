<template>
  <div id="app">
    <goods-list></goods-list>
    <test-top></test-top>
    <test-bottom></test-bottom>
    <shoop-list></shoop-list>
  </div>
</template>

<script>
import GoodsList from './components/GoodsList'
import TestTop from './components/test/TestTop'
import TestBottom from './components/test/TestBottom'
import ShoopList from './components/ShoopList'
export default {
  name: 'App',
  components: {ShoopList, TestBottom, TestTop, GoodsList}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
