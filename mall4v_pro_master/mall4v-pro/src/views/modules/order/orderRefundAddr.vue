<template>
  <el-dialog :modal="false"
             title="请选择收货地址"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="收货地址">
        <el-select v-model="dataForm.refundAddrId"
                   placeholder="请选择">
          <el-option v-for="item in addrList"
                     :key="item.refundAddrId"
                     :label="item.province+item.city+item.area+item.addr"
                     :value="item.refundAddrId">
          </el-option>
        </el-select>
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
        refundAddrId: null
      },
      addrList: [],
      dataRule: {
        refundAddrId: [
          { required: true, message: '收货地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init () {
      this.$http({
        url: this.$http.adornUrl('/shop/refundAddr/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.addrList = data
      })
    },
    // 表单提交
    dataFormSubmit () {

    }
  }
}
</script>
