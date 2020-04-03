<template>
  <div class="mod-admin-orderRefund">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @refresh-change="refreshChange">
      <template slot-scope="scope"
                slot="menuLeft">
        <el-button v-if="isAuth('order:refund:save')"
                   icon="el-icon-plus"
                   type="primary"
                   size="small"
                   @click="addOrUpdateHandle()">导出报表</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button v-if="isAuth('order:refund:update')"
                   icon="el-icon-view"
                   size="small"
                   type="primary"
                   @click="viewOrderHandle(scope.row.orderNumber)">查看订单</el-button>
        <el-button v-if="isAuth('order:refund:update')"
                   icon="el-icon-edit"
                   size="small"
                   type="primary"
                   @click="refundHandle(scope.row.refundId)">处理退款</el-button>
      </template>
    </avue-crud>
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
    <order-info v-if="orderInfoVisible"
                ref="OrderInfo"
                @refreshDataList="refreshChange"></order-info>
  </div>
</template>

<script>
import { tableOption } from '@/crud/order/orderRefund'
import AddOrUpdate from './refundOrderInfo'
import OrderInfo from './orderInfo'
export default {
  data () {
    return {
      dataList: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      searchForm: {},
      dataListLoading: false,
      tableOption: tableOption,
      addOrUpdateVisible: false,
      orderInfoVisible: false
    }
  },
  components: {
    AddOrUpdate,
    OrderInfo
  },
  created () {
    // 携带参数查询
    this.searchForm = this.$route.query
    this.getDataList(this.page)
  },
  activated () {
    // 携带参数查询
    var query = this.$route.query
    if (Object.keys(query).length > 0) {
      this.searchForm = this.$route.query
      this.getDataList(this.page)
    }
  },
  methods: {
    getDataList (page, params) {
      params = this.searchForm
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/order/refund/page'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          'current': page.currentPage,
          'size': page.pageSize,
          'startTime': params ? (params.applyTime ? params.applyTime[0] : null) : null, // 开始时间
          'endTime': params ? (params.applyTime ? params.applyTime[1] : null) : null, // 结束时间
          'refundSn': params ? (params.refundSn ? params.refundSn : null) : null,
          'orderNumber': params ? (params.orderNumber ? params.orderNumber : null) : null,
          'returnMoneySts': params ? (params.returnMoneySts ? params.returnMoneySts : null) : null
        }))
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 查看订单
    viewOrderHandle (id) {
      this.orderInfoVisible = true
      this.$nextTick(() => {
        this.$refs.OrderInfo.init(id)
      })
    },
    // 新增 / 修改
    refundHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    deleteHandle (id) {
      this.$confirm('确定进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/orderRefund/' + id),
          method: 'delete',
          data: this.$http.adornData({})
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.refreshChange()
            }
          })
        })
      }).catch(() => { })
    },
    // 刷新回调用
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page, params)
    }
  }
}
</script>
<style lang="scss">
.mod-admin-orderRefund {
}
</style>
