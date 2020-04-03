<template>
  <div class="mod-marketing-distribution">
    <el-tabs>
      <el-tab-pane label="租户提现列表">
        <withdrawTenant />
      </el-tab-pane>
      <el-tab-pane label="分销员提现列表">
        <withdrawPerson />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import withdrawTenant from './distribution-withdrawCash-tenant.vue'
import withdrawPerson from './distribution-withdrawCash-person.vue'
export default {
  data () {
    return {
    
    }
  },
  components: {
    withdrawTenant,
    withdrawPerson
  },
  methods: {
    
  }
}
</script>
<style lang="scss">
/*
通用样式
*/
.mod-marketing-distribution {
  .sdp-top {
    .IsdistributionText {
      display: inline-block;
      padding-left: 10px;
    }
  }
}
</style>
