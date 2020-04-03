<template>
  <el-dialog :title="!dataForm.refundId ? '新增' : '修改'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="记录ID"
                    prop="refundId">
        <el-input v-model="dataForm.refundId"></el-input>
      </el-form-item>
      <el-form-item label="店铺ID"
                    prop="shopId">
        <el-input v-model="dataForm.shopId"></el-input>
      </el-form-item>
      <el-form-item label="订单ID"
                    prop="orderId">
        <el-input v-model="dataForm.orderId"></el-input>
      </el-form-item>
      <el-form-item label="订单流水号"
                    prop="orderNumber">
        <el-input v-model="dataForm.orderNumber"></el-input>
      </el-form-item>
      <el-form-item label="订单总金额"
                    prop="orderAmount">
        <el-input v-model="dataForm.orderAmount"></el-input>
      </el-form-item>
      <el-form-item label="订单项ID 全部退款是0"
                    prop="orderItemId">
        <el-input v-model="dataForm.orderItemId"></el-input>
      </el-form-item>
      <el-form-item label="退款编号"
                    prop="refundSn">
        <el-input v-model="dataForm.refundSn"></el-input>
      </el-form-item>
      <el-form-item label="订单支付流水号"
                    prop="flowTradeNo">
        <el-input v-model="dataForm.flowTradeNo"></el-input>
      </el-form-item>
      <el-form-item label="第三方退款单号(微信退款单号)"
                    prop="outRefundNo">
        <el-input v-model="dataForm.outRefundNo"></el-input>
      </el-form-item>
      <el-form-item label="订单支付方式 1 微信支付 2 支付宝"
                    prop="payType">
        <el-input v-model="dataForm.payType"></el-input>
      </el-form-item>
      <el-form-item label="订单支付名称"
                    prop="payTypeName">
        <el-input v-model="dataForm.payTypeName"></el-input>
      </el-form-item>
      <el-form-item label="买家ID"
                    prop="userId">
        <el-input v-model="dataForm.userId"></el-input>
      </el-form-item>
      <el-form-item label="退货数量"
                    prop="goodsNum">
        <el-input v-model="dataForm.goodsNum"></el-input>
      </el-form-item>
      <el-form-item label="退款金额"
                    prop="refundAmount">
        <el-input v-model="dataForm.refundAmount"></el-input>
      </el-form-item>
      <el-form-item label="申请类型:1,仅退款,2退款退货"
                    prop="applyType">
        <el-input v-model="dataForm.applyType"></el-input>
      </el-form-item>
      <el-form-item label="处理状态:1为待审核,2为同意,3为不同意"
                    prop="refundSts">
        <el-input v-model="dataForm.refundSts"></el-input>
      </el-form-item>
      <el-form-item label="处理退款状态: 0:退款处理中 1:退款成功 -1:退款失败"
                    prop="returnMoneySts">
        <el-input v-model="dataForm.returnMoneySts"></el-input>
      </el-form-item>
      <el-form-item label="申请时间"
                    prop="applyTime">
        <el-input v-model="dataForm.applyTime"></el-input>
      </el-form-item>
      <el-form-item label="卖家处理时间"
                    prop="handelTime">
        <el-input v-model="dataForm.handelTime"></el-input>
      </el-form-item>
      <el-form-item label="退款时间"
                    prop="refundTime">
        <el-input v-model="dataForm.refundTime"></el-input>
      </el-form-item>
      <el-form-item label="文件凭证json"
                    prop="photoFiles">
        <el-input v-model="dataForm.photoFiles"></el-input>
      </el-form-item>
      <el-form-item label="申请原因"
                    prop="buyerMsg">
        <el-input v-model="dataForm.buyerMsg"></el-input>
      </el-form-item>
      <el-form-item label="卖家备注"
                    prop="sellerMsg">
        <el-input v-model="dataForm.sellerMsg"></el-input>
      </el-form-item>
      <el-form-item label="物流公司名称"
                    prop="expressName">
        <el-input v-model="dataForm.expressName"></el-input>
      </el-form-item>
      <el-form-item label="物流单号"
                    prop="expressNo">
        <el-input v-model="dataForm.expressNo"></el-input>
      </el-form-item>
      <el-form-item label="发货时间"
                    prop="shipTime">
        <el-input v-model="dataForm.shipTime"></el-input>
      </el-form-item>
      <el-form-item label="收货时间"
                    prop="receiveTime">
        <el-input v-model="dataForm.receiveTime"></el-input>
      </el-form-item>
      <el-form-item label="收货备注"
                    prop="receiveMessage">
        <el-input v-model="dataForm.receiveMessage"></el-input>
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
        refundId: null,
        shopId: null,
        orderId: null,
        orderNumber: null,
        orderAmount: null,
        orderItemId: null,
        refundSn: null,
        flowTradeNo: null,
        outRefundNo: null,
        payType: null,
        payTypeName: null,
        userId: null,
        goodsNum: null,
        refundAmount: null,
        applyType: null,
        refundSts: null,
        returnMoneySts: null,
        applyTime: null,
        handelTime: null,
        refundTime: null,
        photoFiles: null,
        buyerMsg: null,
        sellerMsg: null,
        expressName: null,
        expressNo: null,
        shipTime: null,
        receiveTime: null,
        receiveMessage: null
      },
      dataRule: {
      }
    }
  },
  methods: {
    init (refundId) {
      this.dataForm.refundId = refundId || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.refundId) {
          this.$http({
            url: this.$http.adornUrl('/admin/orderRefund/info/' + this.dataForm.refundId),
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
            url: this.$http.adornUrl('/admin/orderRefund'),
            method: this.dataForm.refundId ? 'put' : 'post',
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
