<template>
  <div class="mod-distribution-award">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @row-del="deleteHandle"
               @selection-change="selectionChange">
      <template slot-scope="scope"
                slot="username">
        {{scope.row.sysUser.username}}
      </template>

      <template slot-scope="scope"
                slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   @click.stop="addOrUpdateHandle(scope.row)">新增</el-button>

        <el-button type="danger"
                   size="small"
                   @click.stop="deleteHandle"
                   :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">

        <el-button type="success"
                   size="small"
                   icon="el-icon-view"
                   @click="addOrUpdateHandle(scope.row,false)">查看</el-button>

        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   @click="addOrUpdateHandle(scope.row,true)">编辑</el-button>
      </template>

    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/awardList'
import AddOrUpdate from './distribution-award-add-or-update'
export default {
  data () {
    return {
      dataForm: {
        awardName: ''
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
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
    addOrUpdateHandle (data, isEdit) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(data, isEdit)
      })
    },
    // 点击查询
    searchChange (params) {
      this.getDataList(this.page, params)
    },
    // 刷新回调
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    // 获取数据列表
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionAward/page/anduser'),
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
    // 删除
    deleteHandle (row, index) {
      var ids = row.awardId ? [row.awardId] : this.dataListSelections.map(item => {
        return item.awardId
      })
      this.$confirm(`确定进行[${row.awardId ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/admin/distributionAward'),
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
