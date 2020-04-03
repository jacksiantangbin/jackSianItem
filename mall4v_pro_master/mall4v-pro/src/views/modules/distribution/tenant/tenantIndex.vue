<template>
  <div class="mod-marketing-coupon">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @search-reset="searchReset"
               @on-load="getDataList">

      <template slot="menuLeft">
        <el-button type="primary"
                   icon="el-icon-plus"
                   size="small"
                   v-if="isAuth"
                   @click.stop="addOrUpdateHandle()">新增</el-button>
      </template>



      <template slot-scope="scope"
                slot="menu">
        <el-button type="danger"
                   icon="el-icon-video-play"
                   size="small"
                   v-if="scope.row.tenantState != 0"
                   @click="offHandle(scope.row.id)">停用</el-button>
        <el-button type="success"
                   icon="el-icon-video-play"
                   size="small"
                   v-if="scope.row.tenantState == 0 "
                   @click="openHandle(scope.row.id)">启用</el-button>
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if="scope.row.tenantState != 0"
                   @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="scope.row.tenantState == 0"
                   @click="deleteHandle(scope.row.id)">删除</el-button>
         <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if="isAuth"
                   @click="passWordHandle(scope.row.id)">密码修改</el-button>
      </template>
    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
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
import AddOrUpdate from './tenant-add-or-update'
import PassWord from './tenant-pass-word'
import { tableOption } from '@/crud/tenant/tenant'
export default {
  data () {
    return {
      search: {
        slot: ''
      },
      dataForm: {
        orderNumber: '',
          tenantState: null,
        type:null,
      },
      dateRange: [],

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
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/wemekeTenant/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize,
              'name': this.dataForm.name,
              'tenantName': this.dataForm.tenantName,
              'tenantPhone':this.dataForm.tenantPhone
            },
            this.searchForm
          ), false
        )
      }).then(({ data }) => {
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    orderStatus () {

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
    //停用
    offHandle (id) {
      this.$confirm(`账号停用后所有佣金将不会计算！`, '您确认停用租户账号！', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
            let param = {
                'id': id || undefined,
                'tenantState': '0'
            }
          this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeTenant`),
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
     // 启用
    openHandle (id) {
      this.$confirm(`您确认启用租户账号！`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
            let param = {
                'id': id || undefined,
                'tenantState': '1'
            }
          this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeTenant`),
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
      this.$confirm(`您确认删除租户?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeTenant/${id}`),
            method: 'delete',
            data: this.$http.adornData(id)
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
<style lang="scss">
.mod-order-order {
  .tit {
    display: flex;
    height: 45px;
    align-items: center;
  }
  .tit .item {
    padding: 0 10px;
    width: 10%;
    text-align: center;
  }
  .tit .product {
    width: 25%;
  }
  .prod-tit {
    padding: 10px;
    background: #f8f8f9;
    border-left: 1px solid #dddee1;
    border-top: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
  }
  .prod-tit span {
    margin-right: 15px;
  }
  .prod-cont {
    display: flex;
    border-top: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    border-left: 1px solid #dddee1;
    color: #495060;
  }
  .prod-cont .item {
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    // width: 10%;
    border-right: 1px solid #dddee1;
    text-align: center;
    height: 100%;
  }
  .prod-cont .item span {
    display: block;
  }
  .prod-cont .prod-item {
    // width: 38%;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #dddee1;
  }
  .prod-name {
    width: 55%;
    text-align: left;
  }
  .prod-price {
    position: absolute;
    right: 40px;
    text-align: center;
  }
  .prod-price span {
    display: block;
    margin-bottom: 10px;
  }
  .prod-name .prod-info {
    display: block;
    color: #80848f;
    margin-top: 30px;
  }
  .prod-cont .items.name {
    display: flex;
    position: relative;
    padding: 20px;
    // height: 100px;
    border-bottom: 1px solid #dddee1;
  }
  .prod-cont .items.name:last-child {
    border-bottom: none;
  }
  .prod-image {
    margin-right: 20px;
    width: 100px;
    height: 100px;
  }
  .prod-image img {
    width: 100px;
    height: 100px;
  }
  .item span {
    display: block;
    margin-bottom: 10px;
  }
  .item .operate {
    color: #2d8cf0;
  }
  .item .totalprice {
    color: #c00;
  }
  .prod .remark {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background-color: #e8f7f6;
    border-left: 1px solid #dddee1;
    border-right: 1px solid #dddee1;
    border-bottom: 1px solid #dddee1;
    margin-bottom: 20px;
  }
  .buyer-remark {
    padding: 0 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
