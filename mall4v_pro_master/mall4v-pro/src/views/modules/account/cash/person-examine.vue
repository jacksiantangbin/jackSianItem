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




      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('admin:coupon:save')"
                   :disabled="dataListSelections.length <= 0"
                   @click.stop="addBatchHandle()">批量审核</el-button>

        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('admin:coupon:save')"
                   :disabled="dataListSelections.length <= 0"
                   @click.stop="goOutBatchHandleMore(withdrawCashId)">批量导出打款</el-button>

      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   size="small"
                   @click="examineHandle(scope.row.withdrawCashId)"  v-if="scope.row.state == 0">审核</el-button>

        <el-button type="primary"
                   size="small"
                   @click="goOutBatchHandle(scope.row.withdrawCashId)" v-if="scope.row.state == 3">导出打款</el-button>
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
    import { tableOption } from '@/crud/account/personExamine'
    import AddBatch from './add-bacth-handle'
    import AddExamine from './add-examine'
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
                withdrawCashId:'',
                searchForm: {},
                dataList: [],
                dataForm:{},
                tableOption: tableOption,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                addExamineVisible:false,
                addBatchVisible: false
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
            selectionChange (list) {
                this.dataListSelections = list
            },
            searchChange (params) {
                this.searchForm = params
                this.getDataList(this.page)
            },
            getDataList (page) {
               this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/distribution/distributionWithdrawCash/page'),
                    method: 'get',
                    params: this.$http.adornParams(Object.assign({
                        current: page ? page.currentPage : 1,
                        size: page ? page.pageSize : 20,
                        list: '1'
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
            },
            // 批量审核
            addBatchHandle(){
                var states = this.dataListSelections.map(item => {
                    return item.state
                })
                if (states.includes(3)) {
                    this.waringFun()
                    return;
                }else{
                    var ids = this.dataListSelections.map(item => {
                        return item.withdrawCashId
                    })
                    this.addBatchVisible = true
                    this.$nextTick(() => {
                        this.$refs.addBatch.init(ids)
                    })
                }

            },
            // 单个审核
            examineHandle(withdrawCashId){
                this.addExamineVisible = true
                this.$nextTick(() => {
                    this.$refs.addExamine.init(withdrawCashId)
                })
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
                        return item.withdrawCashId
                    })
                    this.$confirm(`导出打款后将会展示打款信息`, `确定进行[${withdrawCashId ? '导出打款' : '批量导出打款'}]操作?`, {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http({
                            url: this.$http.adornUrl('/distribution/distributionWithdrawCash/distributionWithdrawCashListExcel'),
                            method: 'get',
                            params: this.$http.adornParams({
                                withdrawCashIds:withdrawCashIds.toString()
                            })
                        }).then(({ data }) => {
                            var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
                            const fileName = '销售信息整理.xls'
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
                        url: this.$http.adornUrl('/distribution/distributionWithdrawCash/distributionWithdrawCashExcel'),
                        method: 'get',
                        params: this.$http.adornParams({
                            withdrawCashId:withdrawCashId
                        })
                    }).then(({ data }) => {
                        var blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' })
                        const fileName = '销售信息整理.xls'
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
        }
    }
</script>
<style lang="scss">

</style>
