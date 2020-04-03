

<template>
  <div>
    <div class="topbox">
      <div>
        <h3>可提现金额</h3>
        <h3>{{addupAmount - unsettledAmount}}</h3>
      </div>

      <div>
        <h3>待结算金额</h3>
        <h3>{{unsettledAmount}}</h3>
      </div>

      <div>
        <h3>租户总金额</h3>
        <h3>{{addupAmount}}</h3>
      </div>
    </div>
    <div class="mod-admin-groupActivity">
      <el-tabs>
        <el-tab-pane label="分销员在职列表">
          <userStaff />
        </el-tab-pane>
        <el-tab-pane label="离职列表">
          <userLeave />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
    import userStaff from './distribution-user-staff'
    import userLeave from './distribution-user-leave'
    export default {
        data () {
            return {
        unsettledAmount: 0,      //待结算佣金
        settledAmount: 0,         //可提现佣金
        addupAmount: 0,
            }
        },
        components: {
            userStaff,
            userLeave
        },
        created () {
        },
        mounted () {
          this.dataListLoading = true
          var obj ={}
          if(this.$store.state.user.tenantId){
             obj.tenantId=this.$store.state.user.tenantId
          }
          if(this.$store.state.user.storeId){
              obj.storeId=this.$store.state.user.storeId
          }
          this.$http({
              url: this.$http.adornUrl(`/distribution/wemekeStoreWallet`),
              method: 'get',
              params: this.$http.adornParams(obj)
          }).then(({ data }) => {
            if(data.addAmount){
              this.unsettledAmount = data.unsettledAmount //待结算佣金
              this.addAmount = data.addAmount
            }
              this.dataListLoading = false
          })
        },
        methods: {

        }
    }
</script>
<style lang="scss">
 .topbox{
    width: 100%;
    height:60px;
    display: flex;
    align-items: center;
    color:#606266;
  }
  .topbox div{
    width: 16%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 60px;
    justify-content: space-around;
    margin-bottom: 30px;
  }
</style>
