<template>
  <div class="mod-distribution-income">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList">

      <template slot-scope="scope"
                slot="nickName">
        {{scope.row.distributionUser.nickName}}
      </template>

      <template slot-scope="scope"
                slot="userMobile">
        {{scope.row.distributionUser.userMobile}}
      </template>

      <template slot-scope="scope"
                slot="status">
        <span v-if="scope.row.order.status === 1">待付款</span>
        <span v-if="scope.row.order.status === 2">待发货</span>
        <span v-if="scope.row.order.status === 3">待收货</span>
        <span v-if="scope.row.order.status === 4">待评价</span>
        <span v-if="scope.row.order.status === 5">成功</span>
        <span v-if="scope.row.order.status === 6">失败</span>
      </template>

    </avue-crud>
  </div>
</template>
<script>
import { tableOption } from '@/crud/distribution/user/distributionIncome'
export default {
  data () {
    return {
      createdateRange: [],
      dataForm: {
        userMobile: null
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      searchForm: {},
      dataList: [],
      tableOption: tableOption,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
  },
  methods: {
    // 点击查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    // 获取数据列表
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionUserIncome/page/anduser'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          current: page ? page.currentPage : 1,
          size: page ? page.pageSize : 20
        }, this.searchForm))
      }).then(({ data }) => {
        this.page.total = data.total
        this.page.pageSize = data.size
        this.page.currentPage = data.current

        this.dataList = data.records
        this.dataListLoading = false
      })
    }
  }
}
</script>
