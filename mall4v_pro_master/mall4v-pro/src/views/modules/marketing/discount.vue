<template>
  <div class="mod-discount">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @on-load="getDataList">
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('admin:discount:save')"
                   @click="addOrUpdateHandle()">新增</el-button>
      </template>

      <template slot-scope="scope"
                slot="status">
        <el-tag v-if="scope.row.status === 1"
                size="small">开启</el-tag>
        <el-tag v-else
                size="small"
                type="danger">关闭</el-tag>
      </template>

      <template slot-scope="scope"
                slot="menu">

        <el-button v-if="isAuth('admin:discount:update')"
                   type="primary"
                   icon="el-icon-edit"
                   size="small"
                   @click="addOrUpdateHandle(scope.row.discountId)">编辑活动</el-button>
        <el-button v-if="isAuth('admin:discount:update')"
                   type="primary"
                   icon="el-icon-view"
                   size="small"
                   @click="showProds(scope.row.discountId)">查看商品</el-button>
        <el-button v-if="isAuth('admin:discount:delete')"
                   type="danger"
                   icon="el-icon-delete"
                   size="small"
                   @click="deleteHandle(scope.row.discountId)">删除</el-button>

      </template>
    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './discountProd-add-or-update'
import { tableOption } from '@/crud/marketing/discount'
export default {
  data () {
    return {
      dataForm: {
        discountName: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      searchForm: {},
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableOption: tableOption

    }
  },
  components: {
    AddOrUpdate
  },
  methods: {
    // 获取数据列表
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/discount/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize
            },
            this.searchForm
          )
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增
    addOrUpdateHandle (id) {
      this.$router.push({ path: '/discountInfo', query: { discountId: id } })
    },
    // 查看商品
    showProds (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.showProd(id, 1)
      })
    },
    // 删除
    deleteHandle (id) {
      this.$confirm(`确定进行[删除]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl('/admin/discount/' + id),
            method: 'delete',
            data: this.$http.adornData({}, false)
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList(this.page)
              }
            })
          })
        })
        .catch(() => { })
    },
    // 条件查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    // 多选变化
    selectionChange (val) {
      this.dataListSelections = val
    }
  }
}
</script>
