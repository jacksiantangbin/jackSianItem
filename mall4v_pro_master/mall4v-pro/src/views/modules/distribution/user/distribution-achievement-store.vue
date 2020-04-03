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
                slot="userAccount" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.userAccount}}
      </template>

      <template slot-scope="scope"
                slot="name" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.name}}
      </template>

      <template slot-scope="scope"
                slot="shopownerPhone" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.shopownerPhone}}
      </template>

      <template slot-scope="scope"
                slot="addAmount" v-if="scope.row.wemekeStoreWallet">
        {{scope.row.wemekeStoreWallet.addAmount}}
      </template>

      <template slot-scope="scope"
                slot="unsettledAmount" v-if="scope.row.wemekeStoreWallet">
        {{scope.row.wemekeStoreWallet.unsettledAmount}}
      </template>

      <template slot-scope="scope"
                slot="storeAmount" v-if="scope.row.wemekeStoreWallet">
        {{scope.row.wemekeStoreWallet.unsettledAmount + scope.row.wemekeStoreWallet.addAmount}}
      </template>

    </avue-crud>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/distribution/user/achievementStore'
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
                    url: this.$http.adornUrl('/distribution/wemekeStore/pages'),
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

