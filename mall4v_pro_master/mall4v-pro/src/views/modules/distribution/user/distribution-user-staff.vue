<template>
  <div class="mod-distribution-user">
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
                slot="nickName" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.nickName}}
      </template>

      <template slot-scope="scope"
                slot="userMobile" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.userMobile}}
      </template>

      <template slot-scope="scope"
                slot="qrCode" v-if="scope.row.distributionUser">
        {{scope.row.distributionUser.qrCode}}
        <el-button type="text"
                   size="small"
                   @click="showCode(scope.row.distributionUserId)"
                   v-if="isAuth">查看</el-button>
      </template>

      <template slot-scope="scope"
                slot="settledAmount" v-if="scope.row.distributionUserWallet">
        {{scope.row.distributionUserWallet.settledAmount}}
      </template>

      <template slot-scope="scope"
                slot="unsettledAmount" v-if="scope.row.distributionUserWallet">
        {{scope.row.distributionUserWallet.unsettledAmount}}
      </template>

      <template slot-scope="scope"
                slot="addupAmount" v-if="scope.row.distributionUserWallet">
        {{scope.row.distributionUserWallet.addupAmount}}
      </template>

      <template slot-scope="scope"
                slot="storeName" v-if="scope.row.storeName">
        {{scope.row.storeName}}
        <el-button type="text"
                   size="small"
                   @click="showStore(scope.row.distributionUserId)"
                   v-if="isAuth">查看</el-button>
      </template>




      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth"
                   @click.stop="addOrUpdateHandle()">新增分销员</el-button>
      </template>

      <template slot-scope="scope"
                slot="menu">

        <el-button type="danger"
                   size="small"
                   @click="leaveHandle(scope.row.distributionUserId)"
                   v-if="isAuth">离职</el-button>

        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   v-if="isAuth"
                   @click="transferStore(scope.row.distributionUserId,scope.row.storeName)">转店</el-button>
      </template>

    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>

    <transfer-store v-if="tranfersVisible"
                   ref="transferStore"
                   @refreshDataList="refreshChange"></transfer-store>

    <show-store v-if="showVisible"
                  ref="showStore"
                  @refreshDataList="refreshChange"></show-store>
                  
    <show-code v-if="codeVisible"
                  ref="showCode"
                  @refreshDataList="refreshChange"></show-code>
  </div>
</template>
<script>
    import { tableOption } from '@/crud/distribution/user/distributionUser'
    import AddOrUpdate from './distribution-user-update'
    import TransferStore from './distribution-user-transfer-store'
    import ShowStore from './show-store-edit.vue'
    import ShowCode from './show-staff-code.vue'
    export default {
        data () {
            return {
                dataForm: {
                    // 分销员手机号
                    mobile: null,
                    // 邀请人手机号
                    parentMobile: null,
                    // 加入时间区间
                    dateRange: []
                },
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                searchForm: {},
                dataList: [],
                dataListLoading: false,
                tableOption: tableOption,
                addOrUpdateVisible: false,
                tranfersVisible: false,
                showVisible:false,
                codeVisible:false
            }
        },
        components: {
            AddOrUpdate,
            TransferStore,
            ShowStore,
            ShowCode
        },
        methods: {
          showCode(distributionUserId){
             this.codeVisible = true
             this.$nextTick(() => {
                 this.$refs.showCode.init(distributionUserId)
             })
          },
            // 新增 / 修改
            addOrUpdateHandle (data) {
                this.addOrUpdateVisible = true
                this.$nextTick(() => {
                    this.$refs.addOrUpdate.init(data)
                })
            },
            // 离职
            leaveHandle(distributionUserId){
                this.$confirm(`此分销员将不会得到佣金收益，此员工佣金收益归租户所有！`, '确认分销员离职操作?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/distribution/distributionUser'),
                        method: 'put',
                        data: this.$http.adornData({
                            distributionUserId:distributionUserId,
                            staffState:'0'
                        })
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
            },

            // 转店
            transferStore (distributionUserId,storeName) {
                this.tranfersVisible = true
                this.$nextTick(() => {
                    this.$refs.transferStore.init(distributionUserId,storeName)
                })
            },
            showStore(distributionUserId){
              this.showVisible = true
              this.$nextTick(() => {
                  this.$refs.showStore.init(distributionUserId)
              })
            },

            // 点击查询
            searchChange (params) {
                this.searchForm = params
                this.getDataList(this.page)
            },
            // 多选变化
            selectionChange (val) {
                this.dataListSelections = val
            },
            // 清空自定义数据
            searchReset (params) {
                this.searchForm = params
                this.getDataList(this.page)
            },
            // 刷新回调
            refreshChange () {
                this.page = this.$refs.crud.$refs.tablePage.defaultPage
                this.getDataList(this.page)
            },
            // 获取数据列表
            getDataList (page) {
                this.$http({
                    url: this.$http.adornUrl('/distribution/distributionUser/page'),
                    method: 'get',
                    params: this.$http.adornParams(Object.assign({
                        current: page ? page.currentPage : 1,
                        size: page ? page.pageSize : 20,
                        staffState: '1'
                    }, this.searchForm))
                }).then(({ data }) => {
                    this.dataList = data.records
                    this.dataListLoading = false
                })
            }
        }
    }
</script>
