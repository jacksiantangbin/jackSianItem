<template>
  <div class="mod-admin-groupProd">
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
        <el-button v-if="isAuth('group:prod:save')"
                   icon="el-icon-arrow-left"
                   type="primary"
                   size="small"
                   @click="goBackHandle()">返回拼团活动</el-button>
        <el-button v-if="isAuth('group:prod:save')"
                   :disabled="groupActivity.activityStatus !=1"
                   icon="el-icon-plus"
                   type="primary"
                   size="small"
                   @click="selectProdHandle()">新增活动商品</el-button>
      </template>
      <template slot-scope="scope"
                slot="menu">
        <el-button v-if="isAuth('group:prod:update')"
                   icon="el-icon-edit"
                   size="small"
                   type="text"
                   @click="editSkuhandle(scope.row.groupProdId)">活动规格</el-button>
        <el-button v-if="isAuth('group:activity:update')"
                   icon="el-icon-folder-delete"
                   size="small"
                   type="text"
                   :disabled="scope.row.activityStatus !== 2|| scope.row.groupProdStatus === 2"
                   @click="invalidGroupProdHandle(scope.row)">失效商品
          <el-tooltip class="item"
                      effect="dark"
                      content="“失效活动商品”即立即结束且不可再编辑，未成团订单将自动关闭并退款，已成团订单仍需及时处理。失效后的商品活动可删除。"
                      placement="right">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-button>
        <el-button v-if="isAuth('group:prod:delete')"
                   type="danger"
                   icon="el-icon-delete"
                   size="text"
                   style="color:red"
                   :disabled="scope.row.activityStatus === 2 && scope.row.groupProdStatus === 1"
                   @click="deleteHandle(scope.row)">删除</el-button>
      </template>
      <template slot-scope="scope"
                slot="pic">
        <img :src="scope.row.pic"
             width="100"
             height="100" />
      </template>
      <template slot-scope="scope"
                slot="groupProdStatus">
        <el-tag type="info"
                v-if="scope.row.groupProdStatus === 1"
                size="mini">正常</el-tag>
        <el-tag type="warning"
                v-if="scope.row.groupProdStatus === 2"
                size="mini">已失效</el-tag>
      </template>
    </avue-crud>
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>

    <!-- 商品选择弹窗-->
    <prods-select v-if="selectGroupProdVisible"
                  ref='ProdsSelect'
                  dataUrl='/group/prod/getNotGroupProdPage'
                  @refreshSelectProds="selectGroupProds"></prods-select>
    <!-- 活动商品规格属性设置 -->
    <GroupProdSetting v-if="groupProdSettingVisible"
                      ref='GroupProdSetting'>
    </groupProdSetting>
  </div>
</template>

<script>
import GroupProdSetting from './groupProdSkuSetting'
import ProdsSelect from '@/components/prods-select'
import { tableOption } from '@/crud/group/groupProd'
import AddOrUpdate from './groupProd-add-or-update'
export default {
  data () {
    return {
      dataList: [],
      groupActivity: {},
      selectGroupProdVisible: false,
      groupProdSettingVisible: false,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      dataListLoading: false,
      tableOption: tableOption,
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate,
    ProdsSelect,
    GroupProdSetting
  },
  created () {

  },
  mounted () {
  },
  methods: {
    getDataList (page, params) {
      this.dataListLoading = true
      this.getActivityInfo()
      this.$http({
        url: this.$http.adornUrl('/group/prod/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize,
              groupActivityId: this.$route.query.activityId
            },
            params
          )
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 获取活动设置
    getActivityInfo () {
      if (!this.dataList.records) {
        this.$http({
          url: this.$http.adornUrl('/group/activity/info/' + this.$route.query.activityId),
          method: 'GET',
          data: this.$http.adornData({})
        }).then(({ data }) => {
          this.groupActivity = data
        })
      }
    },
    // 新增 / 修改
    addOrUpdateHandle (id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    deleteHandle (row) {
      this.$confirm('确定对【' + row.prodName + '】活动商品进行删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/group/prod/' + row.groupProdId),
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
    refreshChange () {
      this.page = this.$refs.crud.$refs.tablePage.defaultPage
      this.getDataList(this.page)
    },
    searchChange (params) {
      this.getDataList(this.page, params)
    },
    // 选择商品操作
    selectProdHandle () {
      this.selectGroupProdVisible = true
      this.$nextTick(() => {
        this.$refs.ProdsSelect.init()
      })
    },
    // 选择商品回调
    selectGroupProds (prods) {
      if (prods) {
        // 获取所有的商品
        let prodIds = []
        for (let index = 0; index < prods.length; index++) {
          prodIds.push(prods[index].prodId)
        }
        this.saveGroupProds(prodIds)
      }
    },
    // 保存活动商品
    saveGroupProds (prodIds) {
      this.$http({
        url: this.$http.adornUrl('/group/prod/saveByProdIds'),
        method: 'post',
        data: this.$http.adornData({
          'groupActivityId': this.$route.query.activityId,
          'prodIds': prodIds
        })
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
    },
    // 编辑活动sku
    editSkuhandle (groupProdId) {
      this.groupProdSettingVisible = true
      this.$nextTick(() => {
        this.$refs.GroupProdSetting.init(groupProdId)
      })
    },
    // 返回路由跳转
    goBackHandle () {
      this.$router.go(-1)
    },
    // 失效活动商品
    invalidGroupProdHandle (row) {
      this.$confirm('确定对【' + row.prodName + '】活动商品进行失效吗？' +
        '如果活动开启了失效后仍要对', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/group/prod/invalid/' + row.groupProdId),
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
    }
  }
}
</script>
<style lang="scss">
.mod-admin-groupProd {
}
</style>
