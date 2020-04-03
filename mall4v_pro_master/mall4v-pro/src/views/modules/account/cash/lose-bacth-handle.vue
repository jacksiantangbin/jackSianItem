<template>
  <el-dialog
    :title="'打款失败提示！'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">


      <el-form-item>
        <el-checkbox v-model="ischeckOne">收款人的姓名，账户以及开户行信息错误，导致转账失败</el-checkbox>
        <el-checkbox v-model="ischeckTwo">收款人银行账户失效（例如注销等）</el-checkbox>
        <el-checkbox v-model="ischeckThree">收款人在银行预留的身份证信息到期或差半年快要到期</el-checkbox>
      </el-form-item>


    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>

    export default {
        data () {

            return {
                ischeckOne:false,
                ischeckTwo:false,
                ischeckThree:false,
                type:'',
                status:0,
                tagList: {
                    tags:[
                        { title:'1234' }
                    ]
                },
                visible: false,
                roleList: [],
                dataForm: {

                },
                dataRule: {

                }
            }
        },
        methods: {
            init (ids) {
                this.ids = ids
                this.visible = true
                this.$nextTick(() => {
                    this.$refs.dataForm.resetFields()
                })
                if (this.dataForm.couponId) {
                    this.getDataList()
                }
            },
            getDataList () {
                // this.$http({
                //     url: this.$http.adornUrl(`/admin/coupon/info/${this.dataForm.couponId}`),
                //     method: 'get',
                //     params: this.$http.adornParams()
                // }).then(({ data }) => {
                //     this.dataForm = data
                // })
            },


            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`distribution/distributionWithdrawCash/updateStateList`),
                            method:'put',
                            data: this.$http.adornData({
                                'withdrawCashIds': this.ids.toString(),
                                distributionWithdrawCash:{
                                    'state': -1,
                                    refuseReason:'收款人在银行预留的身份证'
                                }

                            })
                        }).then(({data}) => {
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
  .groupActivity-input {
    width: 60%;
  }
</style>
