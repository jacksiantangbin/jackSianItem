<template>
  <div class="mod-distribution-auditing">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @row-update="dataFormSubmit"
               @search-change="searchChange"
               @on-load="getDataList">

      <template slot-scope="scope"
                slot="parentNickName">
        {{scope.row.parentNickName}}
      </template>

      <template slot-scope="scope"
                slot="sysUsername">
        <div v-if="scope.row.modifier === 0">
          系统
        </div>
        <div v-if="scope.row.sysUsername != null">
          {{scope.row.sysUsername}}
        </div>
        <div v-if="scope.row.sysUsername === null">
          无
        </div>

      </template>

      <template slot-scope="scope"
                slot="sumOfConsumption">
        <span v-if="scope.row.sumOfConsumption === null">
          0
        </span>
        <span v-else>
          {{scope.row.sumOfConsumption}}
        </span>

      </template>

      <template slot-scope="scope"
                slot="expenseNumber">
        <span v-if="scope.row.expenseNumber === null">
          0
        </span>
        <span v-else>
          {{scope.row.expenseNumber}}
        </span>
      </template>

      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   v-if="scope.row.state === 0 && isAuth('distribution:distributionAuditing:update')"
                   @click="addOrUpdateHandle(scope.row,true)">审核</el-button>

        <el-button type="success"
                   size="small"
                   icon="el-icon-view"
                   v-if="scope.row.state !== 0 && isAuth('distribution:distributionAuditing:info')"
                   @click="addOrUpdateHandle(scope.row,false)">查看</el-button>
      </template>

    </avue-crud>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/user/distributionAuditing'
import AddOrUpdate from './distribution-auditing-update'
export default {
  data () {
    return {
      dataForm: {

        // 手机号
        userMobile: '',
        // 状态
        state: '',
        // 时间区间
        dateRange: [],
        nickName: '',
        // 自定义查询
        customQuery: '',
        startTime: null,
        endTime: null,
        startExpenseNumber: '',
        endExpenseNumber: '',
        startPayAmount: '',
        endPayAmount: ''
      },
      searchForm: {},
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
    // 新增 / 修改
    addOrUpdateHandle (data, isEdit) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(data, isEdit)
      })
    },
    // 点击查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page, params)
    },
    // 刷新回调
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    // 获取数据列表
    getDataList (page) {
      this.dataListLoading = true
      var params = Object.assign(this.searchChange, {})
      // 日期赋值
      if (params && params.dateRange) {
        params.startTime = params.dateRange[0]
        params.endTime = params.dateRange[1]
        params.dateRange = null
      }
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionAuditing/page'),
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
    // 表单提交
    dataFormSubmit (row, index, done, loading) {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          this.$http({
            url: this.$http.adornUrl(`/distribution/distributionAuditing`),
            method: 'put',
            data: this.$http.adornData(
              param
              , false)
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
              }
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.mod-distribution-auditing {
  .separator {
    line-height: 2.5;
    display: inline-block;
    margin-right: 8px;
  }
}
</style>

