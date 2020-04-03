<template>
  <div class="mod-hotSearch-add-or-update">
   <el-dialog :title="`二维码`"
               :close-on-click-modal="false"
               :visible.sync="visible">

        <el-tree
          :props="props"
          :load="loadNode"
          lazy
          show-checkbox
          @check-change="handleCheckChange">
        </el-tree>

<el-table :data="dataList"
              border
              row-key="categoryId"
              style="width: 100%;">
        <el-table-column prop="categoryName"
                         header-align="center"
                         treeKey="categoryId"
                         width="150"
                         label="分类名称">
        </el-table-column>
</el-table>
     <span slot="footer"
           class="dialog-footer">
       <el-button type="primary" @click="visible = false">取消</el-button>
     </span>

   </el-dialog>
  </div>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
    export default {
        data () {
            return {
                props: {
                  label: 'name',
                  children: 'zones'
                },
                count:1,
                dataForm: {

                },
                page: {

                },
                visible: false,
                distributionUserId:'',

            }
        },
        components: {
        },

        methods: {
          init (id) {
            this.distributionUserId = id
            this.visible = true
            this.getDataList()
          },
          // 获取数据列表
          getDataList (page) {
          //   var obj = {}
          //   obj.distributionUserId = this.distributionUserId

          //     this.$http({
          //         url: this.$http.adornUrl('/p/wx/jsapi/generalShareCode'),
          //         method: 'post',
          //         params: this.$http.adornParams(obj)
          //     }).then(({ data }) => {
          //         this.dataList = data
          //         this.dataListLoading = false
          //     })
            this.dataListLoading = true
            this.$http({
              url: this.$http.adornUrl('/prod/category/list'),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({ data }) => {
              this.dataList = treeDataTranslate(data, 'categoryId', 'parentId')
              this.dataListLoading = false
            })
          },



          handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate);
          },
          handleNodeClick(data) {
            console.log(data);
          },
          loadNode(node, resolve) {
            if (node.level === 0) {
              return resolve([{ name: 'region1' }, { name: 'region2' }]);
            }
            if (node.level > 3) return resolve([]);

            var hasChild;
            if (node.data.name === 'region1') {
              hasChild = true;
            } else if (node.data.name === 'region2') {
              hasChild = false;
            } else {
              hasChild = Math.random() > 0.5;
            }

            setTimeout(() => {
              var data;
              if (hasChild) {
                data = [{
                  name: 'zone' + this.count++
                }, {
                  name: 'zone' + this.count++
                }];
              } else {
                data = [];
              }

              resolve(data);
            }, 500);
          }
        }
    }
</script>
