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
                   @click="settlementHandle(scope.row.id)">查看结算</el-button>
      </template>

    </avue-crud>

    <!-- 批量操作 -->
    <lose-batch v-if="loseBatchVisible"
                ref="loseBatch"
                @refreshDataList="refreshChange"></lose-batch>

    <add-settlement v-if="addSettlementVisible"
                ref="addSettlement"
                @refreshDataList="refreshChange"></add-settlement>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/account/personMakemoney'
    import LoseBatch from './lose-bacth-handle'
    import AddSettlement from './add-settlement'
    export default {
        data () {
            return {
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                dataForm:{},
                searchForm: {},
                dataList: [],
                tableOption: tableOption,
                dataListLoading: false,
                dataListSelections: [],
                addOrUpdateVisible: false,
                loseBatchVisible:false,
                addSettlementVisible:false
            }
        },
        components: {
            LoseBatch,
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
                    url: this.$http.adornUrl('/distribution/distributionWithdrawCash/page'),
                    method: 'get',
                    params: this.$http.adornParams(Object.assign({
                        current: page ? page.currentPage : 1,
                        size: page ? page.pageSize : 20,
                        list: '2'
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
            // 批量打款失败
            makeMoneyLoseHandle(id){
                var ids = id ? [id] : this.dataListSelections.map(item => {
                    return item.id
                })
                this.loseBatchVisible = true
                this.$nextTick(() => {
                    this.$refs.loseBatch.init(ids)
                })
            },
            settlementHandle(id){
                this.addSettlementVisible = true
                this.$nextTick(() => {
                    this.$refs.addSettlement.init(id)
                })
            }
        }
    }
</script>
<style lang="scss">

</style>
