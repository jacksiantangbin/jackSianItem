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
                slot="menu">
        <el-button type="success"
                   size="small"
                   @click="restoreHandle(scope.row.distributionUserId)"
                   v-if="isAuth">复职</el-button>

        <el-button type="primary"
                   size="small"
                   icon="el-icon-delete"
                   v-if="isAuth"
                   @click="deleteHandel(scope.row.distributionUserId)">删除</el-button>
      </template>

    </avue-crud>

<staff-resume v-if="staffResumeVisible"
                  ref="staffResume"
                  @refreshDataList="refreshChange"></staff-resume>
  </div>
</template>
<script>
    import { tableOption } from '@/crud/distribution/user/distributionUser-leave'
    import staffResume from './staff-resume.vue'
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
                staffResumeVisible:false
            }
        },
        components: {
           staffResume

        },
        methods: {
            // 复职
            restoreHandle (distributionUserId) {
              this.staffResumeVisible = true
              this.$nextTick(() => {
                  this.$refs.staffResume.init(distributionUserId)
              })
                // this.$confirm(`此分销员复职之日起，分销员的收益将会计算！`, '确认分销员复职操作?', {
                //     confirmButtonText: '确定',
                //     cancelButtonText: '取消',
                //     type: 'warning'
                // }).then(() => {
                    // this.$http({
                    //     url: this.$http.adornUrl('/distribution/distributionUser'),
                    //     method: 'put',
                    //     data: this.$http.adornData({
                    //         distributionUserId:distributionUserId,
                    //         staffState:'1'
                    //     })
                    // }).then(({ data }) => {
                    //     this.$message({
                    //         message: '操作成功',
                    //         type: 'success',
                    //         duration: 1500,
                    //         onClose: () => {
                    //             this.refreshChange()
                    //         }
                    //     })
                    // })
                // }).catch(() => { })
            },
            // 删除
            deleteHandel(distributionUserId){
                this.$confirm(`确认删除此分销员？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl(`/distribution/distributionUser/${distributionUserId}`),
                        method: 'delete',
                        data: this.$http.adornData(distributionUserId, false)
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

            // 点击查询
            searchChange (params) {
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
                        staffState:'0'
                    }, this.searchForm))
                }).then(({ data }) => {
                    this.dataList = data.records
                    this.dataListLoading = false
                })
            }
        }
    }
</script>
