<template>
  <div class="mod-marketing-distribution">
    <el-tabs>
      <el-tab-pane label="租户列表">
        <achievementTenant />
      </el-tab-pane>
      <el-tab-pane label="门店列表">
        <achievementStore />
      </el-tab-pane>
      <el-tab-pane label="分销员列表">
        <achievementPerson />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    import achievementTenant from './distribution-achievement-tenant.vue'
    import achievementStore from './distribution-achievement-store.vue'
    import achievementPerson from './distribution-achievement-person.vue'
export default {
  data () {
    return {

    }
  },
  components: {
      achievementTenant,
      achievementStore,
      achievementPerson
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
