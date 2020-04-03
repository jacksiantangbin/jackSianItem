<template>
  <div class="mod-admin-groupActivity">
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
    import tenantExamine from './tenant-examine'
    import tenantMakemoney from './tenant-make-money'
    import tenantAccount from './tenant-account'
    export default {
        data () {
            return {

            }
        },
        components: {
            tenantExamine,
            tenantMakemoney,
            tenantAccount
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
