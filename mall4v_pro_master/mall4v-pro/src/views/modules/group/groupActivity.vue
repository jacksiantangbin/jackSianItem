<template>
  <div class="mod-admin-groupActivity">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @refresh-change="refreshChange">
      <template slot-scope="scope"
                slot="menuLeft">
        <el-button v-if="isAuth('group:activity:save')"
                   icon="el-icon-plus"
                   type="primary"
                   size="small"
                   @click="addOrUpdateHandle()">新建拼团活动</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button v-if="scope.row.status === 2 && isAuth('group:activity:update')"
                   style="color: #67C23A"
                   icon="el-icon-video-play"
                   type="text"
                   size="mini"
                   @click="activeGroupActivity(scope.row.groupActivityId)">启用</el-button>
        <el-button v-if="isAuth('group:activity:update')"
                   icon="el-icon-edit"
                   size="small"
                   type="text"
                   @click="addOrUpdateHandle(scope.row.groupActivityId)">编辑活动</el-button>
        <el-button v-if="isAuth('group:prod:update')"
                   icon="el-icon-s-opportunity"
                   size="small"
                   type="text"
                   @click="manageGroupProdHandle(scope.row.groupActivityId)">管理活动商品</el-button>
        <el-button v-if="isAuth('group:activity:update')"
                   icon="el-icon-folder-delete"
                   size="small"
                   type="text"
                   @click="invalidActivityHandle(scope.row)">失效活动
          <el-tooltip class="item"
                      effect="dark"
                      content="“使失效”即立即结束且不可再编辑，未成团订单将自动关闭并退款，已成团订单仍需及时处理。失效后的商品活动可删除。"
                      placement="right">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-button>
        <el-button v-if="isAuth('group:activity:delete')"
                   type="text"
                   :disabled="scope.row.status !== 2 && (scope.row.activityStatus === 1 || scope.row.activityStatus === 2)"
                   icon="el-icon-delete"
                   size="small"
                   style="color:red"
                   @click="deleteHandle(scope.row)">删除</el-button>
      </template>
      <template slot-scope="scope"
                slot="menuLeft">
        <el-button v-if="isAuth('group:activity:save')"
                   icon="el-icon-plus"
                   type="primary"
                   size="small"
                   @click="addOrUpdateHandle()">新建拼团活动</el-button>
      </template>
      <template slot-scope="scope"
                slot="groupNumber">
        <el-tag size="mini">{{scope.row.groupNumber}}人团</el-tag>
      </template>
      <template slot-scope="scope"
                slot="activityStatus">
        <el-tag type="info"
                v-if="scope.row.activityStatus === 1 && scope.row.status === 2"
                size="mini">未启用</el-tag>
        <el-tag v-if="scope.row.activityStatus === 1 && scope.row.status !== 2"
                size="mini">未开始</el-tag>
        <el-tag type="success"
                v-if="scope.row.activityStatus === 2"
                size="mini">进行中</el-tag>
        <el-tag type="warning"
                v-if="scope.row.activityStatus === 3"
                size="mini">已结束</el-tag>
        <el-tag type="danger"
                v-if="scope.row.activityStatus === 4"
                size="mini">已失效</el-tag>
      </template>
    </avue-crud>
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
  </div>
</template>

<script>
import { tableOption } from '@/crud/group/groupActivity'
import AddOrUpdate from './groupActivity-add-or-update'
export default {
  data () {
    return {
      dataList: [],
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      searchForm: {},
      dataListLoading: false,
      tableOption: tableOption,
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/group/activity/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize
            },
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
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    deleteHandle (row) {
      this.$confirm('确定删除【' + row.activityName + '】活动吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/group/activity/' + row.groupActivityId),
          method: 'delete',
          data: this.$http.adornData({})
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
    /**
     * 刷新回调
     */
    refreshChange (isRouteToGroupProd, groupActivityId) {
      if (isRouteToGroupProd === 1) {
        this.$router.push({
          path: '/groupProds',
          query: { activityId: groupActivityId }
        })
      }
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    // 管理拼团活动商品
    manageGroupProdHandle (groupActivityId) {
      this.visible = false
      this.$router.push({
        path: '/groupProds',
        query: { activityId: groupActivityId }
      })
    },
    // 失效活动活动
    invalidActivityHandle (row) {
      this.$confirm('确定失效【' + row.activityName + '】活动吗？' +
        '失效后如果活动开启了模拟成团，拼团中的团单仍需要处理', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/group/activity/invalid/' + row.groupActivityId),
            method: 'PUT',
            data: this.$http.adornData({})
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList(this.page)
              }
            })
          })
        }).catch(() => { })
    },
    // 启用拼团活动
    activeGroupActivity (groupActivityId) {
      this.$http({
        url: this.$http.adornUrl('/group/activity/active/' + groupActivityId),
        method: 'PUT',
        data: this.$http.adornData({})
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.getDataList(this.page)
          }
        })
      })
    }
  }
}
</script>
<style lang="scss">
.mod-admin-groupActivity {
}
</style>
