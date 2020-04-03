<template>
  <div class="mod-distribution-distributionUserWalletBill">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @refresh-change="refreshChange">

      <template slot-scope="scope"
                slot="nickName">
        {{scope.row.distributionUser? scope.row.distributionUser.nickName: ''}}
      </template>

      <!-- <template slot-scope="scope"
                slot="username">
        <span v-if="scope.row.type === 1">
          {{scope.row.sysUser.username}}
        </span>
        <span v-if="scope.row.type === 0">
          系统
        </span>
      </template> -->
    </avue-crud>

  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/user/distributionUserWalletBill'
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
  created () {
  },
  mounted () {
  },
  methods: {
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionUserWalletBill/pageAndUser'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          current: page == null ? this.page.currentPage : page.currentPage,
          size: page == null ? this.page.pageSize : page.pageSize
        }, params))
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
    rowDel: function (row, index) {
      this.$confirm('确定进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/distribution/distributionUserWalletBill/' + row.id),
          method: 'delete',
          data: this.$http.adornData({})
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
      }).catch(() => { })
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
