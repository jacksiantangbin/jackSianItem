<template>
  <el-dialog :title="!dataForm.dvyId ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="物流公司"
                    prop="dvyName">
        <el-input v-model="dataForm.dvyName"></el-input>
      </el-form-item>
      <el-form-item label="公司主页"
                    prop="companyHomeUrl">
        <el-input v-model="dataForm.companyHomeUrl"></el-input>
      </el-form-item>
      <el-form-item label="公司编号"
                    prop="dvyNo">
        <el-input v-model="dataForm.dvyNo"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        dvyId: null,
        dvyName: null,
        companyHomeUrl: null,
        recTime: null,
        modifyTime: null,
        queryUrl: null,
        dvyNo: null
      },
      dataRule: {
      }
    }
  },
  methods: {
    init (dvyId) {
      this.dataForm.dvyId = dvyId || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.dvyId) {
          this.$http({
            url: this.$http.adornUrl('/admin/delivery/info/' + this.dataForm.dvyId),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            this.dataForm = data
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/admin/delivery'),
            method: this.dataForm.dvyId ? 'put' : 'post',
            data: this.$http.adornData(this.dataForm)
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
        }
      })
    }
  }
}
</script>
