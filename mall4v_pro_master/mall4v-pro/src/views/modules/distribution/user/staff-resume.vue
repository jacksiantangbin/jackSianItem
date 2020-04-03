<template>
  <el-dialog
    :title="'复职'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="150px">


      <el-form-item>
        <!-- <el-checkbox v-model="ischeckOne">分销员工下级关系全部解除</el-checkbox>
        <el-checkbox v-model="ischeckTwo">分销员工下级关系全部保留</el-checkbox> -->
        <el-radio-group v-model="state">
          <el-radio :label="0">分销员工下级关系全部解除</el-radio>
          <el-radio :label="1">分销员工下级关系全部保留</el-radio>
        </el-radio-group>
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
                state:0,
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
            init (distributionUserId) {
                this.distributionUserId = distributionUserId
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
                // this.$refs['dataForm'].validate((valid) => {
                //     if (valid) {
                        this.$http({
                            url: this.$http.adornUrl('/distribution/distributionUser'),
                            method: 'put',
                            data: this.$http.adornData({
                                distributionUserId:this.distributionUserId,
                                staffState:'1',
                                isBind:this.state
                            })
                        }).then(({ data }) => {
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
                //     }
                // })
            }
        }
    }
</script>
<style lang="scss">
  .groupActivity-input {
    width: 60%;
  }
</style>
