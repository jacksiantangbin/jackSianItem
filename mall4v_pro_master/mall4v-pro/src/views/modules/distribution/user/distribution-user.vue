
<template>
  <div class="mod-admin-groupActivity">
    <el-tabs>
      <el-tab-pane label="分销员列表">
        <userStaff />
      </el-tab-pane>
      <el-tab-pane label="离职列表">
        <userLeave />
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
    import userStaff from './distribution-user-staff'
    import userLeave from './distribution-user-leave'
    export default {
        data () {
            return {

            }
        },
        components: {
            userStaff,
            userLeave
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
