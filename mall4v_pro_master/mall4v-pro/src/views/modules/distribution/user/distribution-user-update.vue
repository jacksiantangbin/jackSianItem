<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog :title="'新增分销员'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="80px">

        <el-form-item label="姓名"
                      prop="nickName">
          <el-input v-model="dataForm.nickName"
                    placeholder="姓名" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="手机号"
                      prop="userMobile">
          <el-input v-model="dataForm.userMobile"
                    placeholder="手机号" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="选择门店" prop="storeId">
          <el-col :span="8">
            <el-select v-model="dataForm.storeId"
                       style="width: 250px"
                       placeholder="请选择门店">
              <el-option v-for="item in storeList"
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
      data:{
       storeId:'',
       nickName:'',
       userMobile:'',
      },
      addProdVisible: false,
      visible: false,
      dataRule: {
          nickName: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
          userMobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
              { validator: validateMobile, trigger: 'blur' }
        ],
        storeId: [
          { required: true, message: '请选择门店', trigger: 'blur' },
        ]
      }
    }
  },
  components: {
  },
  methods: {
    init (data) {
      this.visible = true
      this.getDataList()
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
            this.storeList = data
        })
    },
    // 表单提交
    dataFormSubmit () {
        if (!this.dataForm.storeId) {
            this.$message({
                message: '门店不能为空',
                type: 'error',
                duration: 1500
            })
            return
        }
    
        var obj = {}
        obj.nickName = this.nickName
        obj.userMobile = this.userMobile
        if(this.$store.state.user.tenantId){
            obj.tenantId=this.$store.state.user.tenantId
        }
        if(this.$store.state.user.storeId){
            obj.storeId=this.$store.state.user.storeId
        }
        this.$refs['dataForm'].validate((valid) => {
            if (valid) {
                this.$http({
                    url: this.$http.adornUrl(`/distribution/distributionUser`),
                    method: 'put',
                    data: this.$http.adornData(
                        obj
                        )
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
