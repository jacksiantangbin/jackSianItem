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

<!--      <template slot-scope="scope"-->
<!--                slot="nickName">-->
<!--        {{scope.row.user.nickName}}-->
<!--      </template>-->

<!--      <template slot-scope="scope"-->
<!--                slot="parentNickName">-->
<!--        {{scope.row.distributionUser.nickName}}-->
<!--      </template>-->

    </avue-crud>
  </div>
</template>

<script>
import { tableOption } from '@/crud/distribution/user/distributionAbout'
export default {
  data () {
    return {
      dataForm: {
        userName: '',
        parentName: '',
        state: '',
        invalidReason: '',
        bindTime: [],
        invalidTime: []
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 20 // 每页显示多少条
      },
      searchForm: {},
      dataList: [],
      tableOption: tableOption,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
  },
  methods: {
    // 点击查询
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    },
    // 获取数据列表
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionUserBind/getUser'),
        method: 'get',
        params: this.$http.adornParams(Object.assign({
          current: page ? page.currentPage : 1,
          size: page ? page.pageSize : 20
        }, this.searchForm))
      }).then(({ data }) => {
        this.page.total = data.total
        this.page.pageSize = data.size
        this.page.currentPage = data.current

        this.dataList = data
        this.dataListLoading = false
      })
    }
  }
}
</script>
