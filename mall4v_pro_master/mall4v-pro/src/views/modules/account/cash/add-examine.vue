<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog title="'审核'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit ()"
               label-width="180px">

        <el-form-item label="银行卡号" prop="bankNumber" v-if="distributionUser.bankNumber">
          <el-input v-model="distributionUser.bankNumber"
                    placeholder="银行卡号"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="姓名" prop="nickName" v-if="distributionUser.nickName">
          <el-input v-model="distributionUser.nickName"
                    placeholder="姓名"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="开户银行" prop="bankName" v-if="distributionUser.bankName">
          <el-input v-model="distributionUser.bankName"
                    placeholder="开户银行"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="提现金额" prop="amount" v-if="dataForm.amount">
          <el-input v-model="dataForm.amount"
                    placeholder="提现金额"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="身份证正反面(法人／老板)" v-if="distributionUser.identityCardPicFront">
        <pic-upload prop="identityCardPicFront"
                    v-model="distributionUser.identityCardPicFront"></pic-upload>
          <pic-upload prop="identityCardPicFront"
                      v-model="distributionUser.identityCardPicBack"></pic-upload>
      </el-form-item>


        <el-form-item label="申请时间" prop="times" v-if="dataForm.createTime">
          <el-input v-model="dataForm.createTime"
                    placeholder="申请时间"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="发放状态"
                      size="mini"
                      prop="state">
          <el-radio-group v-model="state">
            <el-radio :label="3">通过</el-radio>
            <el-radio :label="2">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="不通过原因"
            prop="content" v-if="state == 2">
            <tiny-mce v-model="dataForm.refuseReason"
                      ref="tinyMce"
                      v-if="visible"></tiny-mce>
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
    import TinyMce from '@/components/tiny-mce'
    import MulPicUpload from '@/components/mul-pic-upload'
    import PicUpload from '@/components/pic-upload'
    export default {

        data () {

            return {
                dataForm: {
                    'time': [],
                    'withdrawCashId': '',
                    'msgTitle': '',
                    'isTop': 0,
                    'content': '',
                    'pic': '',
                    'msgType': 0,
                    bankUser:'',
                    withdrawCashId:'',

                },
                state:3,
                distributionUser:{},
                imgs:'',
                addProdVisible: false,
                visible: false,
                resourcesUrl: window.SITE_CONFIG.resourcesUrl,
                dataRule: {

                    bankUser: [
                        { required: true, message: '请输入内容', trigger: 'blur' }
                    ]
                }
            }
        },
        components: {
            TinyMce,
            MulPicUpload,
            PicUpload
        },
        methods: {
            init (data) {
                this.dataForm.withdrawCashId = data
                this.visible = true
                this.$nextTick(() => {
                    this.$refs.dataForm.resetFields()
                })
                if (this.dataForm.withdrawCashId) {
                    this.getDataList()
                }
            },
            getDataList () {
                // type  1:销员  0：租户

                this.$http({
                    url: this.$http.adornUrl(`/distribution/distributionWithdrawCash/info/${this.dataForm.withdrawCashId}`),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({ data }) => {
                    this.dataForm = data
                    this.distributionUser = data.distributionUser
                })
            },
            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {

                        this.$http({
                            url: this.$http.adornUrl(`/distribution/distributionWithdrawCash/updateState`),
                            method:'put',
                            data: this.$http.adornData({
                                withdrawCashId:this.dataForm.withdrawCashId,
                                state:this.state,
                                refuseReason:this.dataForm.refuseReason
                            })
                        }).then(({ data }) => {
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
