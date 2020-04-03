<template>
  <div class="mod-transport">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @search-reset="searchReset"
               @on-load="getDataList">

      <template slot-scope="scope"
                slot="name" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.name}}
      </template>

      <template slot-scope="scope"
                slot="shopownerName" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.shopownerName}}
      </template>

      <template slot-scope="scope"
                slot="shopownerPhone" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.shopownerPhone}}
      </template>

      <template slot-scope="scope"
                slot="userAccount" v-if="scope.row.wemekeStore">
        {{scope.row.wemekeStore.userAccount}}
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
        {{scope.row.wemekeStoreWallet.storeAmount}}
      </template>


      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth"
                   @click.stop="addOrUpdateHandle()">新增门店</el-button>
      </template>

      <template slot-scope="scope"
                slot="menu">
        <el-button type="danger"
                   size="small"
                   icon="el-icon-video-play"
                   v-if="scope.row.wemekeStore.storeState != 0"
                   @click="offHandle(scope.row.wemekeStore.id)">停用</el-button>
        <el-button type="success"
                   size="small"
                   icon="el-icon-video-play"
                   v-if="scope.row.wemekeStore.storeState == 0 "
                   @click="openHandle(scope.row.wemekeStore.id)">启用</el-button>
        <el-button type="primary"
                   size="small"
                   icon="el-icon-edit"
                   v-if="scope.row.wemekeStore.storeState != 0"
                   @click="addOrUpdateHandle(scope.row.wemekeStore.id)">修改</el-button>
        <el-button type="danger"
                   size="small"
                   icon="el-icon-delete"
                   v-if="scope.row.wemekeStore.storeState == 0"
                   @click="deleteHandle(scope.row.wemekeStore.id)">删除</el-button>
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if="isAuth"
                   @click="passWordHandle(scope.row.wemekeStore.id)">密码修改</el-button>
      </template>
    </avue-crud>


    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>

    <!-- 弹窗, 密码修改 -->
    <pass-word v-if="passWordVisible"
               ref="passWord"
               @refreshDataList="refreshChange"></pass-word>
  </div>
</template>

<script>
    import { tableOption } from '@/crud/shop/manage'
import AddOrUpdate from './store-add-or-update'
import PassWord from './store-pass-word'
export default {
  data () {
    return {
      dataForm: {
          id: 0,
          staffName:'',
          storeName:'',
          staffPhone:'',
          userAccount:''
      },
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      passWordVisible:false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      searchForm: {},
      tableOption: tableOption
    }
  },
  components: {
      AddOrUpdate,
      PassWord
  },
  methods: {
    // 获取数据列表
    getDataList (page) {
        var obj = {}
        obj.current = page == null ? this.page.currentPage : page.currentPage,
            obj.size = page == null ? this.page.pageSize : page.pageSize
        if(this.$store.state.user.tenantId){
            obj.tenantId=this.$store.state.user.tenantId
        }
        if(this.$store.state.user.storeId){
            obj.storeId=this.$store.state.user.storeId
        }
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/wemekeStore/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            obj,
            this.searchForm
          )
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
      // 新增 / 修改
      addOrUpdateHandle (val) {
          this.addOrUpdateVisible = true
          this.$nextTick(() => {
              this.$refs.addOrUpdate.init(val)
          })
      },
      passWordHandle (val) {
          this.passWordVisible = true
          this.$nextTick(() => {
              this.$refs.passWord.init(val)
          })
      },
      offHandle(id){
          this.$confirm(`账号停用后所有佣金将不会计算！`, '您确认停用租户账号！', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          })
              .then(() => {
                  let param = {
                      'id': id,
                      'storeState': '0'
                  }
                  this.$http({
                      url: this.$http.adornUrl(`/distribution/wemekeStore`),
                      method: 'put',
                      data: this.$http.adornData(param)
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
              })
              .catch(() => {

              })
      },
      openHandle(id){
          this.$confirm(`您确认启用租户账号！`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          })
              .then(() => {
                  let param = {
                      'id': id,
                      'storeState': '1'
                  }
                  this.$http({
                      url: this.$http.adornUrl(`/distribution/wemekeStore`),
                      method: 'PUT',
                      data: this.$http.adornData(param)
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
              })
              .catch(() => {

              })
      },
    // 删除
    deleteHandle (id) {
      this.$confirm(
        `确定进行[${id ? '删除' : '批量删除'}]门店操作?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeStore/${id}`),
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
        })
        .catch(() => { })
    },

    // 条件查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    // 刷新回调用
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    // 多选变化
    selectionChange (val) {
      this.dataListSelections = val
    },
      // 清空自定义数据
      searchReset (params) {
          this.dateRange = []
          this.searchForm = params
          this.getDataList(this.page)
      }
  }
}
</script>




<!--<template>-->
<!--  <div class="mod-hotSearcch">-->

<!--    <avue-crud ref="crud"-->
<!--               :page="page"-->
<!--               :data="dataList"-->
<!--               :table-loading="dataListLoading"-->
<!--               :option="tableOption"-->
<!--               @search-change="searchChange"-->
<!--               @on-load="getDataList"-->
<!--               @refresh-change="refreshChange"-->
<!--               @selection-change="selectionChange">-->
<!--      <template slot="menuLeft">-->
<!--        <el-button type="primary"-->
<!--                   icon="el-icon-plus"-->
<!--                   size="small"-->
<!--                   v-if="isAuth"-->
<!--                   @click.stop="addOrUpdateHandle()">新增门店</el-button>-->
<!--      </template>-->

<!--      <template slot-scope="scope"-->
<!--                slot="menu">-->
<!--        <el-button type="danger"-->
<!--                   icon="el-icon-video-play"-->
<!--                   size="small"-->
<!--                   v-if="scope.row.tenantState == 0"-->
<!--                   @click="offHandle(scope.row.id)">停用</el-button>-->
<!--        <el-button type="danger"-->
<!--                   icon="el-icon-video-play"-->
<!--                   size="small"-->
<!--                   v-if="scope.row.tenantState != 0 "-->
<!--                   @click="openHandle(scope.row.id)">启用</el-button>-->
<!--        <el-button type="primary"-->
<!--                   icon="el-icon-edit"-->
<!--                   size="small"-->
<!--                   v-if="scope.row.tenantState == 0"-->
<!--                   @click="addOrUpdateHandle(scope.row.id)">修改</el-button>-->
<!--        <el-button type="primary"-->
<!--                   icon="el-icon-delete"-->
<!--                   size="small"-->
<!--                   v-if="scope.row.tenantState != 0"-->
<!--                   @click="deleteHandle(scope.row.id)">删除</el-button>-->
<!--        <el-button type="primary"-->
<!--                   icon="el-icon-edit"-->
<!--                   size="small"-->
<!--                   v-if="isAuth"-->
<!--                   @click="passWordHandle(scope.row.id)">密码修改</el-button>-->
<!--      </template>-->

<!--    </avue-crud>-->

<!--    &lt;!&ndash; 弹窗, 新增 / 修改 &ndash;&gt;-->
<!--    <add-or-update v-if="addOrUpdateVisible"-->
<!--                   ref="addOrUpdate"-->
<!--                   @refreshDataList="refreshChange"></add-or-update>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--    import { tableOption } from '@/crud/shop/manage'-->
<!--    import AddOrUpdate from './store-add-or-update'-->
<!--    export default {-->
<!--        data () {-->
<!--            return {-->
<!--                dataForm: {-->
<!--                    id: 0,-->
<!--                    staffName:'',-->
<!--                    storeName:'',-->
<!--                    staffPhone:'',-->
<!--                    userAccount:''-->
<!--                },-->
<!--                dataList: [],-->
<!--                page: {-->
<!--                    total: 0, // 总页数-->
<!--                    currentPage: 1, // 当前页数-->
<!--                    pageSize: 10 // 每页显示多少条-->
<!--                },-->
<!--                searchForm: {},-->
<!--                dataListLoading: false,-->
<!--                dataListSelections: [],-->
<!--                addOrUpdateVisible: false,-->
<!--                tableOption: tableOption-->
<!--            }-->
<!--        },-->
<!--        components: {-->
<!--            AddOrUpdate-->
<!--        },-->
<!--        methods: {-->
<!--            // 获取数据列表-->
<!--            getDataList (page) {-->
<!--                this.dataListLoading = true-->
<!--                this.$http({-->
<!--                    url: this.$http.adornUrl('/admin/hotSearch/page'),-->
<!--                    method: 'get',-->
<!--                    params: this.$http.adornParams(Object.assign({-->
<!--                        current: page ? page.currentPage : 1,-->
<!--                        size: page ? page.pageSize : 20-->
<!--                    }, this.searchForm))-->
<!--                }).then(({ data }) => {-->
<!--                    this.page.total = data.total-->
<!--                    this.page.pageSize = data.size-->
<!--                    this.page.currentPage = data.current-->
<!--                    this.dataList = data.records-->
<!--                    this.dataListLoading = false-->
<!--                })-->
<!--            },-->
<!--            // 多选回调-->
<!--            selectionChange (list) {-->
<!--                this.dataListSelections = list-->
<!--            },-->
<!--            // 新增 / 修改-->
<!--            addOrUpdateHandle (id) {-->
<!--                this.addOrUpdateVisible = true-->
<!--                this.$nextTick(() => {-->
<!--                    this.$refs.addOrUpdate.init(id)-->
<!--                })-->
<!--            },-->

<!--            passWordHandle (val) {-->
<!--                this.passWordVisible = true-->
<!--                this.$nextTick(() => {-->
<!--                    this.$refs.passWord.init(val)-->
<!--                })-->
<!--            },-->
<!--            offHandle(){-->

<!--            },-->
<!--            openHandle(){-->

<!--            },-->
<!--            // 点击查询-->
<!--            searchChange (params) {-->
<!--                this.searchForm = params-->
<!--                this.getDataList(this.page)-->
<!--            },-->
<!--            // 删除-->
<!--            deleteHandle (row, index) {-->
<!--                var ids = row.hotSearchId ? [row.hotSearchId] : this.dataListSelections.map(item => {-->
<!--                    return item.hotSearchId-->
<!--                })-->
<!--                this.$confirm(`确定进行[${row.hotSearchId ? '删除' : '批量删除'}]操作?`, '提示', {-->
<!--                    confirmButtonText: '确定',-->
<!--                    cancelButtonText: '取消',-->
<!--                    type: 'warning'-->
<!--                }).then(() => {-->
<!--                    this.$http({-->
<!--                        url: this.$http.adornUrl('/admin/hotSearch'),-->
<!--                        method: 'delete',-->
<!--                        data: this.$http.adornData(ids, false)-->
<!--                    }).then(({ data }) => {-->
<!--                        this.$message({-->
<!--                            message: '操作成功',-->
<!--                            type: 'success',-->
<!--                            duration: 1500,-->
<!--                            onClose: () => {-->
<!--                                this.refreshChange()-->
<!--                            }-->
<!--                        })-->
<!--                    })-->
<!--                }).catch(() => { })-->
<!--            },-->
<!--            // 刷新回调用-->
<!--            refreshChange () {-->
<!--                this.page = this.$refs.crud.$refs.tablePage.defaultPage-->
<!--                this.getDataList(this.page)-->
<!--            }-->
<!--        }-->
<!--    }-->
<!--</script>-->




