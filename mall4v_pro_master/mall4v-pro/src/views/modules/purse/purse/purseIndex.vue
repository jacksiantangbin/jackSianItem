<template>
  <div class="mod-admin-groupActivity">
    <h1>废掉</h1>
    <el-tabs>
      <el-tab-pane label="审核列表">
        <tenantExamine />
      </el-tab-pane>
      <el-tab-pane label="打款列表">
        <tenantMakemoney />
      </el-tab-pane>
      <el-tab-pane label="结算列表">
        <tenantAccount />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

    export default {
        data () {
            return {

            }
        },
        components: {

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
