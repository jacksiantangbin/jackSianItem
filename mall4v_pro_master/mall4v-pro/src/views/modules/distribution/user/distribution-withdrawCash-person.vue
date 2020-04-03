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
                slot="nickName" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.nickName}}
      </template>

      <template slot-scope="scope"
                slot="userMobile" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.userMobile}}
      </template>

      <template slot-scope="scope"
                slot="bankNumber" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.bankNumber}}
      </template>

      <template slot-scope="scope"
                slot="bankName" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.bankName}}
      </template>

      <template slot-scope="scope"
                slot="name" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.name}}
      </template>

      <template slot-scope="scope"
                slot="tenantName" v-if="scope.row.wemekeTenant">
        {{scope.row.wemekeTenant.tenantName}}
      </template>


      <template slot-scope="scope"
                slot="menu">
        <el-button v-if="scope.row.state === 0"
                   type="primary"
                   size="small"
                   icon="el-icon-edit"
                   @click="updateToSuccess(scope.row.withdrawCashId)">设为已提现</el-button>
      </template>

    </avue-crud>

  </div>
</template>
<script>
import { tableOption } from '@/crud/distribution/user/personWithdraw'
export default {
  data () {
    return {
      createdateRange: [],

      dataForm: {
        userMobile: null,

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
      dataListSelections: []
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
        url: this.$http.adornUrl('/distribution/distributionWithdrawCash/page'),
          // url: this.$http.adornUrl('/distribution/distributionProd/page'),
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
    },
    // 新增 / 修改
    updateToSuccess (withdrawCashId) {
      this.$confirm(`确定进行[设为已提现]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/distribution/distributionWithdrawCash/toSuccess/' + withdrawCashId),
          method: 'put'
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      })
    }
  }
}
</script>
<style lang="scss">
.input_t {
    width:100px;
  }
</style>
