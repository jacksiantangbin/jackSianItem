<template>
  <div class="mod-user">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :option="tableOption"
               @search-change="searchChange"
               @selection-change="selectionChange"
               @search-reset="searchReset"
               @on-load="getDataList">



    </avue-crud>

  </div>
</template>

<script>
import { tableOption } from '@/crud/user/user'
export default {
  data () {
    return {
      dataList: [],
      dataListLoading: false,
      dataListSelections: [],
      // addOrUpdateVisible: false,
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      searchForm: {}
    }
  },
  components: {
  
  },
  methods: {
    // 获取数据列表
    getDataList (page) {
        var obj ={};
        obj.current=page == null ? this.page.currentPage : page.currentPage
            obj.size= page == null ? this.page.pageSize : page.pageSize
        if(this.$store.state.user.tenantId){
           obj.tenantId=this.$store.state.user.tenantId
        }
        if(this.$store.state.user.storeId){
            obj.storeId=this.$store.state.user.storeId
        }
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionUserBind/getUser'),
        method: 'get',
        params: this.$http.adornParams(
          Object.assign(
            obj,
            this.searchForm
          )
        )
      }).then(({ data }) => {
        this.dataList = data
        this.page.total = data.total
        this.dataListLoading = false
      })
    },
    // 新增 / 修改
    // addOrUpdateHandle (id) {
    //   this.addOrUpdateVisible = true
    //   this.$nextTick(() => {
    //     this.$refs.addOrUpdate.init(id)
    //   })
    // },
    // 条件查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
      searchReset (params) {
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
    }
  }
}
</script>
