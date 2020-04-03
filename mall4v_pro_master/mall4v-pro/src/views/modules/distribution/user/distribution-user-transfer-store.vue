<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog :title="'分销员转店'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="150px">

        <el-form-item label="原门店名称"
                      prop="storeName">
          <el-input v-model="storeName"
                    placeholder="原门店名称" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="新门店名称" prop="storeId">
          <el-col :span="8">
            <el-select v-model="storeId"
                       style="width: 250px"
                       placeholder="请选择新门店名称">
              <el-option v-for="item in dataForm"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-col>
        </el-form-item>
      </el-form>

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
    import { isMobile } from '@/utils/validate'
export default {
  data () {
      var validateMobile = (rule, value, callback) => {
          if (!isMobile(value)) {
              callback(new Error('手机号格式错误'))
          } else {
              callback()
          }
      }

    return {
      dataForm: {

      },
      tagList:{

      },
      storeId:'',
      storeName:'',
      newStoreName:'',
      addProdVisible: false,
      visible: false,
      dataRule: {

      }
    }
  },
  components: {
  },
  methods: {
    init (id,storeName) {
      this.visible = true
      this.id = id
      this.storeName = storeName
      if (this.id) {
          this.getDataList()
      }
    },
    getDataList () {
      var obj = {}
      if(this.$store.state.user.tenantId){
         obj.tenantId=this.$store.state.user.tenantId
      }
        this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeStore/list`),
            method: 'get',
            params: this.$http.adornParams(obj)
        }).then(({ data }) => {
            this.dataForm = data
        })
    },
    // 表单提交
    dataFormSubmit () {
      var obj = {}
      obj.distributionUserId = this.id
      if(this.$store.state.user.tenantId){
         obj.tenantId=this.$store.state.user.tenantId
      }
      obj.storeId = this.storeId
        this.$refs['dataForm'].validate((valid) => {
            if (valid) {
                this.$http({
                    url: this.$http.adornUrl(`/distribution/distributionUser`),
                    method: 'put',
                    data: this.$http.adornData(obj)
                }).then(({data}) => {
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.visible = false
                            this.$emit('refreshDataList')
                        }
                    })
                })
            }
        })
    }
  }

}
</script>
<style lang="scss">
  .groupActivity-input{
    width:60%;
  }
</style>
