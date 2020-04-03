<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog title="提现申请" :close-on-click-modal="false" :visible.sync="visible">
      <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit ()" label-width="180px">

        <el-form-item label="银行卡号" prop="bankCard">
          <el-input v-model="bankCard" placeholder="银行卡号" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label=""
                      size="mini"
                      prop="accountType">
          <el-radio-group v-model="accountType">
            <el-radio :label="1">对公账户</el-radio>
            <el-radio :label="2">对私账户</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="开户银行" prop="bankName">
          <el-input v-model="bankName" placeholder="开户银行" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="开户支行" prop="openBank">
          <el-input v-model="openBank" placeholder="开户支行" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="name">
          <el-input v-model="name" placeholder="姓名" class="groupActivity-input" :disabled="id > 0"></el-input>
        </el-form-item>

        <el-form-item label="提现金额" prop="amount">
          <el-input v-model="amount" placeholder="提现金额" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="身份证号" prop="cardNumber">
          <el-input v-model="cardNumber" placeholder="身份证号" class="groupActivity-input" :disabled="id > 0"></el-input>
        </el-form-item>

        <el-form-item label="身份证正反面(法人／老板)" v-if="id > 0">
          <pic-upload prop="frontImage" v-model="frontImage"></pic-upload>
          <pic-upload prop="backImage" v-model="backImage"></pic-upload>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import TinyMce from '@/components/tiny-mce'
  import MulPicUpload from '@/components/mul-pic-upload'
  import PicUpload from '@/components/pic-upload'
  export default {

    data() {

      return {
        dataForm: {
          'time': [],
          'id': '',
          'msgTitle': '',
          'isTop': 0,
          'content': '',
          'pic': '',
          'msgType': 0,
          bankUser: '',
        },
        id: 0,
        tenantId: '',
        bankCard: '',
        frontImage: '',
        backImage: '',
        cardNumber: '',
        accountType: 0,
        bankName: '',
        openBank: '',
        name: '',
        walletId: '',
        amount: '',

        state: '',
        distributionUser: {},
        wemekeTenant: {},
        wemekeTenantIdentity: {},
        imgs: '',
        addProdVisible: false,
        visible: false,
        resourcesUrl: window.SITE_CONFIG.resourcesUrl,
        dataRule: {
          bankUser: [{
            required: true,
            message: '请输入内容',
            trigger: 'blur'
          }]
        }
      }
    },
    components: {
      TinyMce,
      MulPicUpload,
      PicUpload
    },
    methods: {
      init(wallId) {

        this.wallId = wallId
        this.visible = true
        this.$nextTick(() => {
          this.$refs.dataForm.resetFields()
        })
        this.getDataList()

      },
      getDataList() {
        if (this.$store.state.user.tenantId) {
          var tenantId = this.$store.state.user.tenantId
        }
        this.$http({
          url: this.$http.adornUrl(`/distribution/wmekeTenantIdentity/info/${tenantId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({
          data
        }) => {
          this.id = data.id
          this.tenantId = data.tenantId,
          this.bankCard = data.bankCard,
          this.frontImage = data.frontImage,
          this.backImage = data.backImage
          this.cardNumber = data.cardNumber
          this.accountType = parseInt(data.accountType)
          this.bankName = data.bankName
          this.openBank = data.openBank
          this.name = data.name
        })
      },
      // 表单提交
      dataFormSubmit() {
        var obj = {}
        obj.bankCard = this.bankCard
        if (this.$store.state.user.tenantId) {
          obj.tenantId = this.$store.state.user.tenantId
        }
        if(this.id){
          obj.id = this.id
        }
        obj.bankCard = this.bankCard
        obj.frontImage = this.frontImage
        obj.backImage = this.backImage
        obj.cardNumber = this.cardNumber
        obj.accountType = this.accountType
        obj.bankName = this.bankName
        obj.openBank = this.openBank

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
              this.$http({
                url: this.$http.adornUrl(`/distribution/wmekeTenantIdentity`),
                method: 'post',
                data: this.$http.adornData(obj)
              }).then(({
                data
              }) => {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.$refs['dataForm'].resetFields()
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
                this.$http({
                  url: this.$http.adornUrl('/distribution/wemekeTenantWithdrawCash'),
                  method: 'post',
                  params: this.$http.adornParams(Object.assign({
                    tenantId: this.$store.state.user.tenantId,
                    walletId: this.wallId,
                    amount: this.amount,
                    bankCard:this.bankCard,
                    accountType:this.accountType,
                    bankName:this.bankName,
                    openBank:this.openBank
                  })
                  )
                }).then(() => {
                  this.visible = false
                  this.$emit('refreshDataList')
                })
              })
            }
        })
      }
    }
  }
</script>
<style lang="scss">
  .groupActivity-input {
    width: 60%;
  }
</style>
