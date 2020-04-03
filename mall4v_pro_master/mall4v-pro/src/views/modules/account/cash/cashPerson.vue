<template>
  <div class="mod-admin-groupActivity">
    <el-tabs>
      <el-tab-pane label="审核列表">
        <personExamine />
      </el-tab-pane>
      <el-tab-pane label="打款列表">
        <personMakemoney />
      </el-tab-pane>
      <el-tab-pane label="结算列表">
        <personAccount />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import personExamine from './person-examine'
    import personMakemoney from './person-make-money'
    import personAccount from './person-account'
export default {
  data () {
    return {

    }
  },
  components: {
      personExamine,
      personMakemoney,
      personAccount

  },
  created () {
  },
  mounted () {
  },
  methods: {

  }
}
</script>
<style lang="scss">

</style>
