<template>
   <div class="mod-distribution-user">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList">

      <template slot-scope="scope"
                slot="storeCount" v-if="scope.row.wemekeTenantWallet">
        {{scope.row.wemekeTenantWallet.storeCount}}
      </template>

      <template slot-scope="scope"
                slot="unsettledAmount" v-if="scope.row.wemekeTenantWallet">
        {{scope.row.wemekeTenantWallet.unsettledAmount}}
      </template>

      <template slot-scope="scope"
                slot="settledAmount" v-if="scope.row.wemekeTenantWallet">
        {{scope.row.wemekeTenantWallet.settledAmount}}
      </template>

      <template slot-scope="scope"
                slot="tenantAmount" v-if="scope.row.wemekeTenantWallet">
        {{scope.row.wemekeTenantWallet.settledAmount + scope.row.wemekeTenantWallet.unsettledAmount}}
      </template>

    </avue-crud>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/distribution/user/achievementTenant'
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
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/wemekeTenant/pages'),
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

