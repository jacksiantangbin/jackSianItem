<template>
  <div class="mod-weixin-material-select">
    <el-dialog :modal="false"
               title="选择素材"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <!-- <el-form :inline="true"
               :model="dataForm"
               @keyup.enter.native="getDataList()">
        <el-form-item>
          <el-input v-model="dataForm.mediaName"
                    placeholder="素材名称"
                    clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getDataList()">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList"
                border
                v-loading="dataListLoading"
                style="width: 100%;">
        <el-table-column header-align="center"
                         align="center"
                         label="选择">
          <template slot-scope="scope">
            <el-radio :label="scope.$index"
                      v-model="rowIndex">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="mediaName"
                         header-align="center"
                         align="center"
                         label="素材名称">
        </el-table-column>
        <el-table-column prop="mediaType"
                         header-align="center"
                         align="center"
                         label="素材类型">
          <template slot-scope="scope">
            <el-tag size="small">{{mediaTypes[scope.row.mediaType]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mediaUrl"
                         header-align="center"
                         align="center"
                         label="素材">
          <template slot-scope="scope">
            <a v-if="scope.row.mediaType === 'news'" :href="scope.row.news.url" target="_yami_weixin_news">查看</a>
            <img v-else-if="scope.row.mediaType === 'image'" :src="scope.row.content"/>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime"
                         header-align="center"
                         align="center"
                         label="更新时间">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="sizeChangeHandle"
                     @current-change="currentChangeHandle"
                     :current-page="pageIndex"
                     :page-sizes="[10, 20, 50, 100]"
                     :page-size="pageSize"
                     :total="totalPage"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination> -->
      <avue-crud ref="crud"
          :page="page"
          :data="dataList"
          :option="tableOption"
          @search-change="searchChange"
          @on-load="getDataList">
        <template slot-scope="scope" slot="rowIndex">
          <el-radio :label="scope.row.$index"
                    v-model="rowIndex">&nbsp;</el-radio>
        </template>
        <template slot-scope="scope" slot="content">
          <div v-if="scope.row.mediaType === 'text'">{{scope.row.content}}</div>
          <a v-else-if="scope.row.mediaType === 'news'" :href="scope.row.news.url" target="_blank">查看</a>
          <img v-else-if="scope.row.mediaType === 'image'" :src="scope.row.content"/>
        </template>
      </avue-crud>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { tableOption } from '@/crud/weixin/material-select'
export default {
  data () {
    return {
      visible: false,
      dataList: [],
      dataListLoading: false,
      rowIndex: 0,
      tableOption: tableOption,
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      }
    }
  },
  methods: {
    init (mediaType) {
      this.visible = true
      this.getDataList(this.page, {mediaType: mediaType})
    },
    // 获取数据列表
    getDataList (page, params) {
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
            params
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
    // 条件查询
    searchChange (params) {
      this.getDataList(this.page, params)
    },
    // 表单提交
    dataFormSubmit () {
      this.$emit('callBack', this.dataList[this.rowIndex])
      this.visible = false
    }
  }
}
</script>
