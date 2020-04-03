<template>
  <el-dialog
    :title="'批量审核'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">


<!--      <el-form-item label="密码" prop="password" :class="{ 'is-required': !dataForm.id }">-->
<!--        <el-input v-model="dataForm.password" type="password" placeholder="密码" class="groupActivity-input"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="确认密码" prop="comfirmPassword" :class="{ 'is-required': !dataForm.id }">-->
<!--        <el-input v-model="dataForm.comfirmPassword" type="password" placeholder="确认密码" class="groupActivity-input"></el-input>-->
<!--      </el-form-item>-->

      <el-form-item label="审核:">
       <span>审核</span>
      </el-form-item>

      <el-form-item label="审核" size="mini" prop="status">
        <el-radio-group v-model="state">
          <el-radio :label="3">通过</el-radio>
          <el-radio :label="2">不通过</el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item label="不通过原因"
                    prop="refuseReason" v-if="state == 2">
        <el-col>
          <el-input v-model="refuseReason"
                    type="textarea"
                    placeholder="不通过原因"></el-input>
        </el-col>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
    import TinyMce from '@/components/tiny-mce'
    export default {
        data () {


            return {
                refuseReason:'',
                hdasShopDelivery:false,
                type:'',
                state:3,
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
        components: {
            TinyMce
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
            //     this.$http({
            //         url: this.$http.adornUrl(`/admin/coupon/info/${this.dataForm.couponId}`),
            //         method: 'get',
            //         params: this.$http.adornParams()
            //     }).then(({ data }) => {
            //         this.dataForm = data
            //     })
            },


            // 表单提交
            dataFormSubmit () {
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        this.$http({
                            url: this.$http.adornUrl(`/distribution/wemekeTenantWithdrawCash/updateStateList`),
                            method:'put',
                            data: this.$http.adornData({
                                'withdrawCashIds': this.ids,
                                wemekeTenantWithdrawCash:{
                                    'state': this.state,
                                    refuseReason:this.refuseReason.toString()
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
