<template>
  <div class="mod-weixin-material">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList">
      <template slot="menuLeft">
        <el-button v-if="isAuth('weixin:material:sync')"
                   type="primary"
                   @click.stop="dataFormSubmit()">同步素材</el-button>
      </template>

      <template slot-scope="scope"
                slot="content">
        <div v-if="scope.row.mediaType === 'text'">{{scope.row.content}}</div>
        <a v-else-if="scope.row.mediaType === 'news'"
           :href="scope.row.news.url"
           target="_blank">查看</a>
        <img v-else-if="scope.row.mediaType === 'image'"
             :src="scope.row.content" />
      </template>

      <template slot-scope="scope"
                slot="menu">
        <el-button type="danger"
                   icon="el-icon-delete"
                   size="small"
                   v-if="isAuth('admin:user:delete')"
                   @click.stop="deleteHandle(scope.row.mediaId)">删除</el-button>
      </template>
    </avue-crud>
  </div>
</template>

<script>
import { tableOption } from '@/crud/weixin/material'
export default {
  data () {
    return {
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      searchForm: {}
    }
  },
  methods: {
    // 获取数据列表
    getDataList (page, params) {
      this.dataForm = params
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/weixin/material/page'),
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
        data.records.forEach(item => {
          if (item.mediaType === 'news') {
            item.news = JSON.parse(item.content)
          }
        })
        this.dataList = data.records
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 表单提交
    dataFormSubmit () {
      let dataForm = this.$refs.crud.$refs.headerSearch.$options.propsData.value
      if (!dataForm.mediaType) {
        this.$message.error('请选择素材类型')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '正在进行同步...'
      })
      this.$http({
        url: this.$http.adornUrl(`/weixin/material/sync/${dataForm.mediaType}`),
        method: 'post',
        data: this.$http.adornData({
        })
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            loading.close()
            this.getDataList()
          }
        })
      }).catch(() => {
        loading.close()
      })
    },
    // 条件查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page, params)
    },
    // 删除
    deleteHandle (id) {
      this.$confirm(`确定进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl(`/weixin/material/${id}`),
          method: 'delete'
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.getDataList()
            }
          })
        })
      }).catch(() => { })
    }
  }
}
</script>
<style lang="scss">
.mod-weixin-material {
  .el-table {
    img {
      max-height: 150px;
    }
  }
}
</style>
