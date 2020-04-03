<template>
  <div class="mod-distribution-prod">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @search-reset="searchReset"
               @selection-change="selectionChange">


      <template slot-scope="scope"
                slot="prodName">
        {{scope.row.product.prodName}}
      </template>

      <template slot-scope="scope"
                slot="pic">
        <img :src="scope.row.product.pic"
             width="100"
             height="100" />
      </template>

      <template slot-scope="scope"
                slot="price">
        {{scope.row.product.price}}
      </template>

      <template slot-scope="scope"
                slot="storeProp">
        {{scope.row.storeProp}}
      </template>

      <template slot-scope="scope"
                slot="staffProp">
        {{scope.row.staffProp}}
      </template>

      <template slot-scope="scope"
                slot="platformPrice">
        {{scope.row.platformPrice}}
      </template>


      <template slot-scope="scope"
                slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   @click.stop="addOrUpdateHandle()"
                   v-if="isAuth('distribution:distributionProd:save')">新增</el-button>

        <el-button type="danger"
                   size="small"
                   @click.stop="deleteHandle"
                   :disabled="dataListSelections.length <= 0"
                   v-if="isAuth('distribution:distributionProd:delete')">批量删除</el-button>
      </template>

      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   @click="addOrUpdateHandle(scope.row)"
                   v-if="isAuth('distribution:distributionProd:update')">修改</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('prod:prod:delete')"
                   @click="deleteHandle(scope.row)">删除</el-button>
      </template>

    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/distributionProd'
import AddOrUpdate from './distribution-prod-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        prodName: ''
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
    AddOrUpdate
  },
  methods: {
    // 多选回调
    selectionChange (list) {
      this.dataListSelections = list
    },
    // 新增 / 修改
    addOrUpdateHandle (data) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(data)
      })
    },
    // 点击查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    searchReset (params) {
        this.dateRange = []
        this.searchForm = params
        this.getDataList(this.page)
    },
    // 刷新回调
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    // 获取数据列表
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionProd/page'),
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
    // 删除
    deleteHandle (row, index) {
      var ids = row.distributionProdId ? [row.distributionProdId] : this.dataListSelections.map(item => {
        return item.distributionProdId
      })
      this.$confirm(`确定进行[${row.distributionProdId ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/distribution/distributionProd'),
          method: 'delete',
          data: this.$http.adornData(ids, false)
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
      })
    }
  }
}
</script>
