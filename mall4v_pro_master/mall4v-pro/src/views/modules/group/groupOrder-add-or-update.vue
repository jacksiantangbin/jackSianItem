<template>
  <el-dialog :title="!dataForm.groupOrderId ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="团单id"
                    prop="groupOrderId">
        <el-input v-model="dataForm.groupOrderId"></el-input>
      </el-form-item>
      <el-form-item label="拼团id"
                    prop="groupBuyId">
        <el-input v-model="dataForm.groupBuyId"></el-input>
      </el-form-item>
      <el-form-item label="商品id"
                    prop="groupGoodsId">
        <el-input v-model="dataForm.groupGoodsId"></el-input>
      </el-form-item>
      <el-form-item label="商品名称"
                    prop="goodsName">
        <el-input v-model="dataForm.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="参团人数"
                    prop="joinNum">
        <el-input v-model="dataForm.joinNum"></el-input>
      </el-form-item>
      <el-form-item label="成团人数"
                    prop="groupNum">
        <el-input v-model="dataForm.groupNum"></el-input>
      </el-form-item>
      <el-form-item label="拼团状态(0:待拼，1:成功，2:失败)"
                    prop="status">
        <el-input v-model="dataForm.status"></el-input>
      </el-form-item>
      <el-form-item label="拼团开始时间"
                    prop="startTime">
        <el-input v-model="dataForm.startTime"></el-input>
      </el-form-item>
      <el-form-item label="拼团结束时间"
                    prop="endTime">
        <el-input v-model="dataForm.endTime"></el-input>
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
      roleList: [],
      dataForm: {
        groupOrderId: null,
        groupBuyId: null,
        groupGoodsId: null,
        goodsName: null,
        joinNum: null,
        groupNum: null,
        status: null,
        startTime: null,
        endTime: null
      },
      dataRule: {
      }
    }
  },
  methods: {
    init (groupOrderId) {
      this.dataForm.groupOrderId = groupOrderId || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.groupOrderId) {
          this.$http({
            url: this.$http.adornUrl('/admin/groupOrder/info/' + this.dataForm.groupOrderId),
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
            url: this.$http.adornUrl('/admin/groupOrder'),
            method: this.dataForm.groupOrderId ? 'put' : 'post',
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
