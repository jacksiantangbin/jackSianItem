<template>
  <div class="mod-hotSearch-add-or-update">
   <el-dialog :title="`查看转店记录`"
               :close-on-click-modal="false"
               :visible.sync="visible">

     <avue-crud ref="crud"
                :page="page"
                :data="dataList"
                v-model="dataForm"
                :table-loading="dataListLoading"
                :option="tableOption">

     </avue-crud>
     <span slot="footer"
           class="dialog-footer">
       <el-button type="primary" @click="visible = false">取消</el-button>
     </span>
   </el-dialog>
  </div>
</template>

<script>
 import { tableOption } from '@/crud/distribution/user/show-store'
    export default {
        data () {
            return {
                dataForm: {
                    // 分销员手机号
                    mobile: null,
                    // 邀请人手机号
                    parentMobile: null,
                    // 加入时间区间
                    dateRange: []
                },
                page: {
                    total: 0, // 总页数
                    currentPage: 1, // 当前页数
                    pageSize: 20 // 每页显示多少条
                },
                visible: false,
                distributionUserId:'',
                searchForm: {},
                dataList: [],
                dataListLoading: false,
                tableOption: tableOption,
            }
        },
        components: {
        },

        methods: {
          init (id) {
            console.log()
            this.distributionUserId = id
            this.visible = true
            this.dataListLoading = true
            this.getDataList()
          },
          // 获取数据列表
          getDataList (page) {
            var obj = {}
            if(this.$store.state.user.tenantId){
               obj.tenantId=this.$store.state.user.tenantId
            }
            obj.distributionUserId = this.distributionUserId

              this.$http({
                  url: this.$http.adornUrl('/distribution/wemekeStaffRecord'),
                  method: 'get',
                  params: this.$http.adornParams(obj)
              }).then(({ data }) => {
                  this.dataList = data
                  this.dataListLoading = false
              })
          }
        }
    }
</script>
