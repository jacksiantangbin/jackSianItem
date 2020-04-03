<template>
  <div class="mod-admin-groupActivity">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @search-reset="searchReset"
               @on-load="getDataList">

      <template slot-scope="scope"
                slot="tenantName" v-if="scope.row.wemekeTenant">
        {{scope.row.wemekeTenant.tenantName}}
      </template>

      <template slot-scope="scope"
                slot="bankCard" v-if="scope.row.wemekeTenantIdentity">
        {{scope.row.wemekeTenantIdentity.bankCard}}
      </template>

      <template slot-scope="scope"
                slot="bankName" v-if="scope.row.wemekeTenantIdentity">
        {{scope.row.wemekeTenantIdentity.bankName}}-{{scope.row.wemekeTenantIdentity.openBank}}
      </template>

      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth"
                   :disabled="dataListSelections.length <= 0"
                   @click.stop="addBatchHandle()">批量审核</el-button>
      </template>
      <!--  :disabled="dataListSelections.length <= 0" -->
      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth"
                   :disabled="dataListSelections.length <= 0"
                   @click.stop="goOutBatchHandleMore()">批量导出打款</el-button>


      </template>

      <template slot-scope="scope"
                slot="menu">
      <el-button type="primary"
                 size="small"
                 @click="examineHandle(scope.row.id)" v-if="scope.row.state == 0">审核</el-button>

        <el-button type="primary"
                   size="small"
                   @click="goOutBatchHandle(scope.row.id)" v-if="scope.row.state == 3">导出打款</el-button>
      </template>



    </avue-crud>
    <!-- 批量操作 -->
    <add-batch v-if="addBatchVisible"
               ref="addBatch"
               @refreshDataList="refreshChange"></add-batch>
    <!--审核-->
    <add-examine v-if="addExamineVisible"
               ref="addExamine"
               @refreshDataList="refreshChange"></add-examine>

  </div>
</template>

<script>
    import { tableOption } from '@/crud/account/tenantExamine'
    import AddBatch from './add-bacth-handle-tenant'
    import AddExamine from './add-examine-tenant'
    export default {
  data () {
    return {
        page: {
            total: 0, // 总页数
            currentPage: 1, // 当前页数
            pageSize: 20 // 每页显示多少条
        },
        dataForm:{

        },
        searchForm: {},
        dataList: [],
        dataForm:{},
        tableOption: tableOption,
        dataListLoading: false,
        dataListSelections: [],
        addBatchVisible: false,
        addExamineVisible: false
    }
  },
  components: {
      AddBatch,
      AddExamine
  },
  created () {

  },
  mounted () {

  },
  methods: {
      selectionChange (list) {
          this.dataListSelections = list
      },
      waringFun(){
          this.$confirm(`请勾选符合操作的数据！`, `提示`, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(()=>{
              this.getDataList(this.page)
          }).catch(() => {
              this.getDataList(this.page)
          })
      },
      searchChange (params) {
          this.searchForm = params
          this.getDataList(this.page)
      },
      getDataList (page) {
          this.dataListLoading = true
           this.$http({
               url: this.$http.adornUrl('/distribution/wemekeTenantWithdrawCash/page'),
               method: 'get',
               params: this.$http.adornParams(Object.assign({
                   current: page ? page.currentPage : 1,
                   size: page ? page.pageSize : 20,
                   list:'1',
               }, this.searchForm))
           }).then(({ data }) => {
               this.page.total = data.total
               this.page.pageSize = data.size
               this.page.currentPage = data.current

               this.dataList = data.records
               this.dataListLoading = false
           })
      },
      refreshChange () {
          this.page = this.$refs.crud.$refs.tablePage.defaultPage
          this.getDataList(this.page)
          console.log(123)
      },
      // 批量审核
      addBatchHandle(){
          var states = this.dataListSelections.map(item => {
              return item.state
          })
          // for (var i = 0; i < states.length; i++) {
              if (states.includes(3)) {
                  this.waringFun()
                  return;
              }else{
                  var ids = this.dataListSelections.map(item => {
                      return item.id
                  })
                  this.addBatchVisible = true
                  this.$nextTick(() => {
                      this.$refs.addBatch.init(ids)
                  })
              }
          // }
      },
      // 导出批量打款  单个打款
      goOutBatchHandleMore(withdrawCashId){
          var states = this.dataListSelections.map(item => {
              return item.state
          })
          if (states.includes(0)) {
              this.waringFun()
              return;
          }else{
              var withdrawCashIds = this.dataListSelections.map(item => {
                  return item.id
              })
              this.$confirm(`导出打款后将会展示打款信息`, `确定进行[${withdrawCashId ? '导出打款' : '批量导出打款'}]操作?`, {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
              }).then(() => {
                  this.$http({
                      url: this.$http.adornUrl('/distribution/wemekeTenantWithdrawCash/wemekeTenantWithdrawCashDtoListExcel'),
                      method: 'get',
                      params: this.$http.adornParams(Object.assign({
                          withdrawCashIds:withdrawCashIds.toString()
                      }))
                  }).then(({ data }) => {
                      var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
                      const fileName = '导出打款.xls'
                      const elink = document.createElement('a')
                      if ('download' in elink) { // 非IE下载
                          elink.download = fileName
                          elink.style.display = 'none'
                          elink.href = URL.createObjectURL(blob)
                          document.body.appendChild(elink)
                          elink.click()
                          URL.revokeObjectURL(elink.href) // 释放URL 对象
                          document.body.removeChild(elink)
                      } else { // IE10+下载
                          navigator.msSaveBlob(blob, fileName)
                      }
                  })
              }).catch(() => { })
          }

      },
      //单个
      goOutBatchHandle(withdrawCashId){
          var withdrawCashId = withdrawCashId
          this.$confirm(`导出打款后将会展示打款信息`, `确定进行[${withdrawCashId ? '导出打款' : '批量导出打款'}]操作?`, {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.$http({
                  url: this.$http.adornUrl('/distribution/wemekeTenantWithdrawCash/wemekeTenantWithdrawCashExcel'),
                  method: 'get',
                  params: this.$http.adornParams({
                    withdrawCashId:withdrawCashId
                  })
              }).then(({ data }) => {
                  var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
                  const fileName = '导出打款.xls'
                  const elink = document.createElement('a')
                  if ('download' in elink) { // 非IE下载
                      elink.download = fileName
                      elink.style.display = 'none'
                      elink.href = URL.createObjectURL(blob)
                      document.body.appendChild(elink)
                      elink.click()
                      URL.revokeObjectURL(elink.href) // 释放URL 对象
                      document.body.removeChild(elink)
                  } else { // IE10+下载
                      navigator.msSaveBlob(blob, fileName)
                  }
              })
          }).catch(() => { })

      },
      // 单个审核
      examineHandle(id){
          this.addExamineVisible = true
          this.$nextTick(() => {
              this.$refs.addExamine.init(id)
          })
      },
      searchReset (params) {
          this.searchForm = params
          this.getDataList(this.page)
      },
  }
}
</script>
<style lang="scss">

</style>
