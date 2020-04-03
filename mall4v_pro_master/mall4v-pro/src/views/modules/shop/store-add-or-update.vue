<template>
  <el-dialog class="mod-coupon-add-or-update"
             :title="dataForm.id ? '修改门店' : '新增门店'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="180px">

     <el-form-item label="门店名称"
                    prop="name">
        <el-input v-model="dataForm.name"
                  placeholder="门店名称" class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="店长手机号"
                    prop="shopownerPhone">
        <el-input v-model="dataForm.shopownerPhone"
                  placeholder="店长手机号" class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="店长姓名"
                    prop="shopownerName">
        <el-input v-model="dataForm.shopownerName"
                  placeholder="店长姓名"
                  class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="登录账号"
                    prop="userAccount">
        <el-input v-model="dataForm.userAccount"
                  placeholder="登录账号"
                  :disabled="dataForm.id !== 0" class="groupActivity-input"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
    <!-- 上传图片-->

  </el-dialog>
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
      visible: false,
      dataForm: {
        id: 0,
        staffName:'',
          storeName:'',
          staffPhone:'',
          userAccount:'',
          name:'',
          shopownerPhone:'',
          shopownerName:'',

      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      errorTip: false,
      dataListSelections: [],
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      dataRule: {
          name: [
          { required: true, message: '门店名称不能为空', trigger: 'blur' }
        ],
          shopownerPhone: [
              { validator: validateMobile, trigger: 'blur' }
          ]
      }
    }
  },
  components: {

  },
  watch: {

  },
  methods: {
    // 获取数据列表
    init (id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.dataForm.businessLicenseImage = ''
      })
      if (this.dataForm.id) {
        this.getDataList()
      }
    },
    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/distribution/wemekeStore/info/${this.dataForm.id}`),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.dataForm = data
      })
    },


    // 表单提交
    dataFormSubmit () {
        if (!this.dataForm.name) {
            this.$message({
                message: '门店名称不能为空',
                type: 'error',
                duration: 1500
            })
            return
        }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
            var obj = {}
          if(this.$store.state.user.tenantId){
              obj.tenantId = this.$store.state.user.tenantId
          }
          this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeStore`),
            method: this.dataForm.id ? 'put' : 'post',
              data: this.$http.adornData(param,obj)
            // data: this.$http.adornData({
              //   'id': this.dataForm.id || undefined,
              //   'name': this.dataForm.name,
              //   'tenantName': this.dataForm.tenantName,
              //   'tenantPhone':this.dataForm.tenantPhone,
              //   'unifiedSocialCreditCode': this.dataForm.unifiedSocialCreditCode,
              //   'businessLicenseImage':this.dataForm.businessLicenseImage,
              //   'userAccount':this.dataForm.userAccount
              // })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$emit('refreshDataList', this.page)
                this.visible = false
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
.mod-coupon-add-or-update {
}
.groupActivity-input{
  width:60%;
}
</style>
