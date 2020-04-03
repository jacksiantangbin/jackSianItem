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
                   v-if="isAuth('admin:coupon:save')"
                   @click.stop="addOrUpdateHandle()">新增</el-button>

      </template>

      <template slot="search">
        <el-col :md="10"
                :xs="24">
          <el-form-item label="投放时间">
            <el-date-picker v-model="dateRange"
                            type="datetimerange"
                            range-separator="至"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </template>
      <template slot-scope="scope"
                slot="overdueStatus">
        <el-tag v-if="scope.row.overdueStatus === 1"
                size="small">未过期</el-tag>
        <el-tag v-else
                size="small"
                type="danger">过期</el-tag>
      </template>
      <template slot-scope="scope"
                slot="couponType">
        <el-tag v-if="scope.row.couponType == 1"
                size="small">代金券</el-tag>
        <el-tag v-else-if="scope.row.couponType == 2"
                size="small">折扣券</el-tag>
        <el-tag v-else-if="scope.row.couponType == 3"
                size="small">兑换券</el-tag>
      </template>

      <template slot-scope="scope"
                slot="putonStatus">
        <el-tag v-if="scope.row.putonStatus === 1"
                size="small">已投放</el-tag>
        <el-tag v-else-if="scope.row.putonStatus === 0"
                size="small"
                type="danger">等待投放</el-tag>
        <el-tag v-else
                size="small"
                type="danger">取消投放</el-tag>
      </template>

      <template slot-scope="scope"
                slot="menu">
        <el-button type="primary"
                   icon="el-icon-edit"
                   size="small"
                   v-if="isAuth('admin:coupon:update')"
                   @click="addOrUpdateHandle(scope.row.couponId)">修改</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('admin:coupon:delete')"
                   @click="deleteHandle(scope.row.couponId)">删除</el-button>
      </template>
    </avue-crud>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible"
                   ref="addOrUpdate"
                   @refreshDataList="refreshChange"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './coupon-add-or-update'
import { tableOption } from '@/crud/marketing/coupon'
export default {
  data () {
    return {
      search: {
        slot: ''
      },
      dataForm: {
        orderNumber: '',
        status: null
      },
      dateRange: [],
      overdueOptions: [{
        value: 0,
        label: '过期'
      },
      {
        value: 1,
        label: '未过期'
      }],
      PutonOptions: [{
        value: -1,
        label: '取消投放'
      },
      {
        value: 0,
        label: '等待投放'
      },
      {
        value: 1,
        label: '已投放'
      }],
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
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
    AddOrUpdate
  },
  methods: {
    // 获取数据列表
    getDataList (page, params) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/coupon/page'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            {
              current: page == null ? this.page.currentPage : page.currentPage,
              size: page == null ? this.page.pageSize : page.pageSize,
              'couponName': this.dataForm.couponName,
              'overdueStatus': this.dataForm.overdueStatus,
              'putonStatus': this.dataForm.putonStatus,
              'startTime': this.dateRange === null ? null : this.dateRange[0], // 开始时间
              'endTime': this.dateRange === null ? null : this.dateRange[1] // 结束时间
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
    // 删除
    deleteHandle (id) {
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http({
            url: this.$http.adornUrl('/admin/coupon'),
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
    searchReset () {
      this.dateRange = []
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
