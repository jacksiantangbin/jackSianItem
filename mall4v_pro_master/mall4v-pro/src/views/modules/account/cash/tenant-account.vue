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


      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   size="small"
                   v-if="isAuth"
                   @click="settlementHandle(scope.row.id)">查看结算</el-button>
      </template>

    </avue-crud>

    <add-settlement v-if="addSettlementVisible"
                    ref="addSettlement"
                    @refreshDataList="refreshChange"></add-settlement>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/account/tenantAccount'
    import AddSettlement from './add-settlement-tenant'
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
                tableOption: tableOption,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                addSettlementVisible:false
            }
        },
        components: {
            AddSettlement
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
                        list:'3'
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
            settlementHandle(id){
                this.addSettlementVisible = true
                this.$nextTick(() => {
                    this.$refs.addSettlement.init(id)
                })
            },
        }
    }
</script>
<style lang="scss">

</style>
