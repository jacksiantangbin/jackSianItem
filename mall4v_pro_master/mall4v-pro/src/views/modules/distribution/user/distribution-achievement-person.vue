<template>
  <div class="mod-distribution-user">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               v-model="dataForm"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
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
                slot="unsettledAmount" v-if="scope.row.distributionUserWallet">
        {{scope.row.distributionUserWallet.unsettledAmount}}
      </template>

      <template slot-scope="scope"
                slot="settledAmount" v-if="scope.row.distributionUserWallet">
        {{scope.row.distributionUserWallet.settledAmount}}
      </template>

      <template slot-scope="scope"
                slot="personAmount" v-if="scope.row.distributionUserWallet">
        {{scope.row.distributionUserWallet.settledAmount + scope.row.distributionUserWallet.unsettledAmount}}
      </template>

    </avue-crud>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/distribution/user/achievementPerson'
    export default {
        data () {
            return {
                createdateRange: [],
                dataForm: {
                    userMobile: null
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

        },
        methods: {
            searchChange (params) {
                this.searchForm = params
                this.getDataList(this.page)
            },
            getDataList (page) {
                this.dataListLoading = true
                this.$http({
                    url: this.$http.adornUrl('/distribution/distributionUser/pages'),
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
            }
        }
    }
</script>
<style lang="scss">
  .el-input {
    position: relative;
    font-size: 14px;
    display: inline-block;
    width: 90%;
  }
  .el-form-item__label{
    width: 90px;
  }
  .el-col-md-6 {
    width: 30%;
  }
</style>
