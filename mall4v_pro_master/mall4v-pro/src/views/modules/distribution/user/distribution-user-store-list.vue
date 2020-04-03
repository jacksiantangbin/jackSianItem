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

<!--      <template slot="menuLeft">-->
<!--        <el-button type="primary"-->
<!--                   icon="el-icon-plus"-->
<!--                   size="small"-->
<!--                   v-if="isAuth"-->
<!--                   @click.stop="addOrUpdateHandle()">新增分销员</el-button>-->
<!--      </template>-->

      <template slot-scope="scope"
                slot="menu">

        <el-button type="success"
                   size="small"
                   icon="el-icon-view"
                   @click="restoreHandle(scope.row.id)"
                   v-if="isAuth">复职</el-button>

        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   v-if="isAuth"
                   @click="deleteHandel(scope.row.id)">删除</el-button>
      </template>

    </avue-crud>


  </div>
</template>
<script>
    import { tableOption } from '@/crud/distribution/user/distributionUser'

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
                tranfersVisible: false
            }
        },
        components: {


        },
        methods: {
            // 复职
            restoreHandle (id) {
                this.$confirm(`此分销员复职之日起，分销员的收益将会计算！`, '确认分销员复职操作?', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/distribution/distributionMsg'),
                        method: 'delete',
                        data: this.$http.adornData(id, false)
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
            // 删除
            deleteHandel(id){
                this.$confirm(`确认删除此分销员？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        url: this.$http.adornUrl('/distribution/distributionMsg'),
                        method: 'delete',
                        data: this.$http.adornData(id, false)
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
                        size: page ? page.pageSize : 20
                    }, this.searchForm))
                }).then(({ data }) => {
                    this.dataList = data.records
                    this.dataListLoading = false
                })
            }
        }
    }
</script>
