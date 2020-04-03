<template>
  <div class="mod-admin-groupTeam">
    <avue-crud ref="crud"
               :page="page"
               :data="dataList"
               :table-loading="dataListLoading"
               :option="tableOption"
               @search-change="searchChange"
               @on-load="getDataList"
               @refresh-change="refreshChange">
      <template slot-scope="scope"
                slot="menu">
        <el-button icon="el-icon-view"
                   size="small"
                   type="primary"
                   @click="viewGroupTeamInfo(scope.row.groupTeamId)">查看同团订单</el-button>
      </template>

      <!-- 参团人数 -->
      <template slot-scope="scope"
                slot="groupNumber">
        <span>{{scope.row.joinNum}}/{{scope.row.groupNumber}}</span>
      </template>

    </avue-crud>
    <group-team-info v-if="groupTeamInfoVisible"
                     ref="groupTeamInfo"></group-team-info>
  </div>
</template>

<script>
import { tableOption } from '@/crud/group/groupTeam'
import GroupTeamInfo from './groupTeam-info'
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
      groupTeamInfoVisible: false
    }
  },
  components: {
    GroupTeamInfo
  },
  created () {
  },
  mounted () {
  },
  methods: {
    getDataList (page) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/group/team/page'),
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
    /**
     * 刷新回调
     */
    refreshChange () {
      this.getDataList(this.page)
    },
    // 查看同团订单
    viewGroupTeamInfo (id) {
      this.groupTeamInfoVisible = true
      this.$nextTick(() => {
        this.$refs.groupTeamInfo.init(id)
      })
    },
    searchChange (params) {
      this.searchForm = params
      this.getDataList(this.page)
    }
  }
}
</script>
<style lang="scss">
.mod-admin-groupTeam {
}
</style>
