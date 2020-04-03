<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog title="查看结算"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit ()"
               label-width="180px">

        <el-form-item label="银行卡号" prop="bankNumber" v-if="wemekeTenantIdentity.bankNumber">
          <el-input v-model="wemekeTenantIdentity.bankNumber"
                    placeholder="银行卡号"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="开户银行" prop="bankName" v-if="wemekeTenantIdentity.bankNumber">
          <el-input v-model="wemekeTenantIdentity.bankName"
                    placeholder="开户银行"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="开户支行" v-if="wemekeTenantIdentity.openBank">
          <el-input v-model="wemekeTenantIdentity.openBank"
                    placeholder="开户银行"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="提现金额" prop="amount">
          <el-input v-model="dataForm.amount"
                    placeholder="提现金额"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="申请时间" prop="createTime">
          <el-input v-model="dataForm.createTime"
                    placeholder="申请时间"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="更新时间" prop="updateTime">
          <el-input v-model="dataForm.updateTime"
                    placeholder="更新时间"
                    :disabled="dataForm.withdrawCashId !== 0" class="groupActivity-input"></el-input>
        </el-form-item>

        <el-form-item label="发放状态:" prop="state" v-if="dataForm.state = 1">
           <span>打款成功</span>
        </el-form-item>

        <el-form-item label="不通过原因"
                      prop="refuseReason" v-if="dataForm.state == 2">
          <el-col>
            <el-input v-model="dataForm.refuseReason"
                      type="textarea"
                      placeholder="不通过原因" :disabled="dataForm.withdrawCashId !== 0"></el-input>
          </el-col>
        </el-form-item>


      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="dataFormSubmit()">返回</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

    export default {

        data () {

            return {
                dataForm: {

                },
                imgs:'',
                addProdVisible: false,
                visible: false,
                resourcesUrl: window.SITE_CONFIG.resourcesUrl,
                dataRule: {


                }
            }
        },
        components: {

        },
        methods: {
            init (id) {
                this.dataForm.withdrawCashId = id
                this.visible = true
                this.$nextTick(() => {
                    this.$refs.dataForm.resetFields()
                })
                if (this.dataForm.withdrawCashId) {
                    this.getDataList()
                }
            },
            getDataList () {
                this.$http({
                    url: this.$http.adornUrl(`/distribution/wemekeTenantWithdrawCash/info/${this.dataForm.withdrawCashId}`),
                    method: 'get',
                    params: this.$http.adornParams()
                }).then(({ data }) => {
                    this.dataForm = data
                    this.distributionUser = data.distributionUser
                })
            },
            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].resetFields()
                this.visible = false
                this.$emit('refreshDataList')
            }
        }
    }
</script>
<style lang="scss">
  .mod-hotSearch-add-or-update{

  }
  .groupActivity-input{
    width:60%;
  }
</style>
