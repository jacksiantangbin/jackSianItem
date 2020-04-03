<template>
  <div class="mod-distribution-settlement">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @refresh-change="refreshChange">
      <template slot-scope="scope"
                slot="menu">
        <el-button type="text"
                   size="small"
                   v-if="isAuth('distribution:distributionUserIncome:update')"
                   @click="settlement(scope.row.orderNumber)">点击结算</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/user/distributionSettlement'
import AddOrUpdate from './distribution-userWallet-update'
export default {
  data () {
    return {
      dataList: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
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
  },
  methods: {
    // 订单状态修改为结算
    settlement (orderNumber) {
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionUserIncome/settlement'),
        method: 'put',
        data: this.$http.adornData(orderNumber, false)
      }).then(() => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getDataList()
          }
        })
      })
    },
    // 获取数据列表
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionUserIncome/settlementPage'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          current: page ? page.currentPage : 1,
          size: page ? page.pageSize : 20
        }, params))
      }).then(({ data }) => {
        this.page.total = data.total
        this.page.pageSize = data.size
        this.page.currentPage = data.current
        this.dataList = data.records
        this.dataListLoading = false
      })
    },
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getDataList(this.page)
    },
    searchChange (params) {
      this.getDataList(this.page, params)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
