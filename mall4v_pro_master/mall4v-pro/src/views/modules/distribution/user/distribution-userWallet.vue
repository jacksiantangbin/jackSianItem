<template>
  <div>
    <div class="topbox">
      <div>
        <h3>可提现金额</h3>
        <h3>{{settledAmount}}</h3>
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
    <div class="mod-distribution-distributionUserWallet">

      <avue-crud ref="crud"
                 :page="page"
                 :data="dataList"
                 :table-loading="dataListLoading"
                 :option="tableOption"
                 @search-change="searchChange"
                 @on-load="getDataList"
                 @search-reset="searchReset"
                 @refresh-change="refreshChange">


        <template slot="search">
          <el-col :md="10"
                  :xs="24">
            <el-form-item label="申请时间">
              <el-date-picker v-model="dateRange"
                              type="datetimerange"
                              range-separator="至"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </template>

        <template slot-scope="scope"
                  slot="tenantName" v-if="scope.row.wemekeTenant">
          {{scope.row.wemekeTenant.tenantName}}
        </template>

        <template slot-scope="scope"
                  slot="bankCard">
          {{scope.row.bankCard}}
        </template>


        <template slot-scope="scope"
                  slot="bankName">
          {{scope.row.bankName}} - {{scope.row.openBank}}
        </template>

        <template slot-scope="scope"
                  slot="menuLeft">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="small"
                     @click.stop="addOrUpdateHandle()"
                     v-if="isAuth">提现申请</el-button>
        </template>

<!--        <template slot-scope="scope"-->
<!--                  slot="menu">-->
<!--          <el-button type="text"-->
<!--                     size="small"-->
<!--                     v-if="isAuth('admin:distributionUserWallet:update')"-->
<!--                     @click="addOrUpdateHandle(scope.row)">修改</el-button>-->
<!--          <el-button type="text"-->
<!--                     size="small"-->
<!--                     v-if="isAuth('distribution:distributionUserWallet:delete')"-->
<!--                     @click="deleteHandle(scope.row.walletId)">删除</el-button>-->
<!--        </template>-->
      </avue-crud>
      <add-or-update v-if="addOrUpdateVisible"
                     ref="addOrUpdate"
                     @refreshDataList="refreshChange"></add-or-update>
    </div>
  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/user/distributionUserWallet'
import AddOrUpdate from './distribution-userWallet-update'
export default {
  data () {
    return {
        search: {
            slot: ''
        },
        wallId:'',
        unsettledAmount: 0.00,      //待结算佣金
        settledAmount: 0.00,         //可提现佣金
        addupAmount: 0.00,
        dataList: [],
        dateRange: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      searchForm: {},
      dataListLoading: false,
      tableOption: tableOption,
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  created () {
  },
  mounted () {
      this.dataListLoading = true
      if(this.$store.state.user.tenantId){
          var tenantId = this.$store.state.user.tenantId
      }
      this.$http({
          url: this.$http.adornUrl(`/distribution/wemekeTenantWallet/info/${tenantId}`),
          method: 'get',
          params: this.$http.adornParams()
      }).then(({ data }) => {
          this.unsettledAmount = data.unsettledAmount
          this.settledAmount = data.settledAmount
          this.addupAmount = data.addupAmount
          this.wallId = data.id
          this.dataListLoading = false
      })


  },
  methods: {
    getDataList (page) {
        var obj = {}
        obj.current = page == null ? this.page.currentPage : page.currentPage,
            obj.size = page == null ? this.page.pageSize : page.pageSize,
            obj.startTime = this.dateRange === null ? null : this.dateRange[0], // 开始时间
            obj.endTime = this.dateRange === null ? null : this.dateRange[1] // 结束时间
        if(this.$store.state.user.tenantId){
            obj.tenantId=this.$store.state.user.tenantId
        }
        if(this.$store.state.user.storeId){
            obj.storeId=this.$store.state.user.storeId
        }

      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/wemekeTenantWithdrawCash/page'),
        method: 'get',
        params: this.$http.adornParams(Object.assign(
            obj,
            this.searchForm))
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle () {
        if(this.$store.state.user.tenantId){
            var tenantId = this.$store.state.user.tenantId
        }
        this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeTenantWithdrawCash/getByTenantId/${tenantId}`),
            method: 'get',
            data: this.$http.adornData({})
        }).then((data) => {
            var wallId = this.wallId
            if(data.data.id){
              this.$confirm('提现进行中！此次提现结束可再次提现。', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                })
            }else{
              this.addOrUpdateVisible = true
              this.$nextTick(() => {
                  this.$refs.addOrUpdate.init(wallId)
              })
            }
        })
    },
    // 刷新回调
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
      searchReset (params) {
          this.dateRange = []
          this.searchForm = params
          this.getDataList(this.page)
      }
  }
}
</script>

<style lang="scss" scoped>
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
