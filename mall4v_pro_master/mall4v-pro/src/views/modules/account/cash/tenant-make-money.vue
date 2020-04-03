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
                   v-if="isAuth('admin:coupon:save')"
                   @click.stop="addOrUpdateHandle()">打款成功导入</el-button>
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth('admin:coupon:save')"
                   :disabled="dataListSelections.length <= 0"
                   @click.stop="makeMoneyLoseHandle()">批量打款失败</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   size="small"
                   v-if="isAuth"
                   @click="makeMoneyWinHandle(scope.row.id)">打款成功</el-button>

        <el-button type="primary"
                   size="small"
                   v-if="isAuth"
                   @click="makeMoneyLoseHandle(scope.row.id)">打款失败</el-button>
      </template>

    </avue-crud>

    <!-- 批量操作 -->
    <lose-batch v-if="loseBatchVisible"
                      ref="loseBatch"
                      @refreshDataList="refreshChange"></lose-batch>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/account/tenantMakemoney'
    import LoseBatch from './lose-bacth-handle'
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
                dataForm:{},
                dataList: [],
                tableOption: tableOption,
                dataListLoading: false,
                dataListSelections: [],
                loseBatchVisible: false
            }
        },
        components: {
            LoseBatch
        },
        created () {

        },
        mounted () {

        },
        methods: {
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
                    url: this.$http.adornUrl('/distribution/wemekeTenantWithdrawCash/page'),
                    method: 'get',
                    params: this.$http.adornParams(Object.assign({
                        current: page ? page.currentPage : 1,
                        size: page ? page.pageSize : 20,
                        list:'2'
                    }, this.searchForm))
                }).then(({ data }) => {
                    this.page.total = data.total
                    this.page.pageSize = data.size
                    this.page.currentPage = data.current

                    this.dataList = data.records
                    this.dataListLoading = false
                })
            },
            // 刷新回调
            refreshChange () {
                this.page = this.$refs.crud.$refs.tablePage.defaultPage
                this.getDataList(this.page)
            },
            // 批量打款失败  单个打款失败
            makeMoneyLoseHandle(id){
                var ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.id
                })
                this.loseBatchVisible = true
                this.$nextTick(() => {
                    this.$refs.loseBatch.init(ids)
                })
            },
            // 打款成功
            makeMoneyWinHandle (id) {
                this.$confirm('打款成功', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/group/prod/' + id),
                        method: 'delete',
                        data: this.$http.adornData(id)
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
                }).catch(() => { })
            }
        }
    }
</script>
<style lang="scss">

</style>
