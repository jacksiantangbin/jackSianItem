<template>
  <el-dialog class="mod-coupon-add-or-update"
             :title="dataForm.id ? '修改租户' : '新增租户'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="180px">

     <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="dataForm.name"
                  placeholder="姓名" class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="租户手机号"
                    prop="tenantPhone">
        <el-input v-model="dataForm.tenantPhone"
                  placeholder="租户手机号" class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="租户名称"
                    prop="tenantName">
        <el-input v-model="dataForm.tenantName"
                  placeholder="租户名称"
                  :disabled="dataForm.id !== 0" class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="登录账号"
                    prop="userAccount">
        <el-input v-model="dataForm.userAccount"
                  placeholder="登录账号"
                  :disabled="dataForm.id !== 0" class="groupActivity-input"></el-input>
      </el-form-item>

      <el-form-item label="统一社会信用代码"
                    prop="unifiedSocialCreditCode">
        <el-input v-model="dataForm.unifiedSocialCreditCode"
      placeholder="统一社会信用代码" class="groupActivity-input"></el-input>
      </el-form-item>

<!--      <el-form-item label="营业执照照片"-->
<!--                      prop="businessLicenseImage">-->
<!--          <pic-upload v-model="dataForm.businessLicenseImage"></pic-upload>-->
<!--        </el-form-item>-->

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
import PicUpload from '@/components/pic-upload'
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
        unifiedSocialCreditCode:'',
        businessLicenseImage:'',
        userAccount:'',
        tenantName:'',
        couponName: '',
        imgUrl:'',
        userName:'',
        loginNum:'',
        cardNum:'',
        tenantPhone:'',
        name:''
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
        //   businessLicenseImage: [
        //   { required: true, message: '营业执照照片不能为空', trigger: 'blur' }
        // ],
          name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
          tenantName: [
          { required: true, message: '租户名称不能为空', trigger: 'blur' }
        ],
          userAccount: [
          { required: true, message: '登录账号不能为空', trigger: 'blur' }
        ],
          unifiedSocialCreditCode: [
          { required: true, message: '统一信用代码不能为空', trigger: 'blur' }
        ],
          tenantPhone: [
            { required: true, message: '手机号不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ]
      }
    }
  },
  components: {
    PicUpload
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
        url: this.$http.adornUrl(`/distribution/wemekeTenant/info/${this.dataForm.id}`),
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
                message: '姓名不能为空',
                type: 'error',
                duration: 1500
            })
            return
        }
      // if (!this.dataForm.imgUrl) {
      //     this.$message({
      //       message: '营业执照照片不能为空',
      //       type: 'error',
      //       duration: 1500
      //     })
      //     return
      // }

      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          this.$http({
            url: this.$http.adornUrl(`/distribution/wemekeTenant`),
            method: this.dataForm.id ? 'put' : 'post',
              data: this.$http.adornData(param)
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
