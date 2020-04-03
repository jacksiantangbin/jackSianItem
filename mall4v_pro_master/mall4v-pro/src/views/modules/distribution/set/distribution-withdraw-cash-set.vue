<template>
  <div class="distribution-withdraw-cash-set gray-box top-redius border-bottom-gray">
    <div class="title">提现设置</div>
    <el-form ref="dataForm"
             label-width="70px"
             size="mini"
             class="set-form"
             label-position="left"
             :model="dataForm">

      <el-form-item label="结算时间">
        <el-radio-group v-model="dataForm.settlementTime">
          <el-radio :label='0'>交易完成后结算佣金</el-radio>
          <el-radio :label='1'>售后维权处理期结束后，再结算佣金</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="结算方式">
        <el-radio-group v-model="dataForm.settlementMode">
          <el-radio :label='0'>系统结算</el-radio>
          <el-radio :label='1'>人工结算</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="提现设置">
        <el-radio-group v-model="dataForm.settlementAutoSet">
          <!-- <el-radio :label='0'>自动提现，每完成一笔订单，立即发送红包</el-radio> -->
          <el-radio :label='1'>用户手动发起提现</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="打款方式">
        <el-radio-group v-model="dataForm.modeOfPayment">
          <el-radio :label='0'>微信红包</el-radio>
          <el-radio :label='1'>企业付款到微信零钱</el-radio>
        </el-radio-group>
      </el-form-item> -->

      <el-form-item label="单笔提现">
        <span class="input-tips">金额不低于</span>
        <el-input v-model.number="dataForm.amountMin"
                  style="width:180px">
          <template slot="append">元</template>
        </el-input>

        <span class="input-tips">,不高于</span>
        <el-input v-model.number="dataForm.amountMax"
                  style="width:180px">
          <template slot="append">元</template>
        </el-input>
        <span class="tips">微信企业付款单笔最低1元，单笔单日最高2W元（微信现金红包单次申请最多200元）</span>
      </el-form-item>

      <el-form-item label="提现频次"
                    style="width:200px">
        <el-select v-model="dataForm.frequency"
                   placeholder="请选择"
                   style="display:inline-black">
          <el-option label="每天"
                     :value="1"></el-option>
          <el-option label="每周"
                     :value="7"></el-option>
          <el-option label="每月"
                     :value="30"></el-option>
          <el-option label="无限制"
                     :value="-1"></el-option>
        </el-select>
        <el-input v-model.number="dataForm.number"
                  style="width:180px;display:inline-black">
          <template slot="append">次</template>
        </el-input>

      </el-form-item>

      <el-form-item label="打款说明">
        <el-input type="textarea"
                  style="width:300px"
                  v-model="dataForm.paymentExplain"
                  witdt="230"></el-input>
        <br>
        <span class="tips">打款说明填写后将于提现申请页面显示</span>
      </el-form-item>

    </el-form>
    <el-button @click="dataFormSubmit()">保存</el-button>
  </div>
</template>

<script>
export default {
  components: {

  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionWithdrawCashSet/info'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.setDate(data)
        }
        this.dataListLoading = false
      })
    },
    // 设置数据
    setDate (data) {
      this.dataForm = data
    },
    // 提交表单
    dataFormSubmit () {
      let param = this.dataForm
      this.$http({
        url: this.$http.adornUrl(`/distribution/distributionWithdrawCashSet`),
        method: 'put',
        data: this.$http.adornData(param)
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500
        })
      }).catch(() => {

      })
    }
  },
  data () {
    return {
      addOrUpdateVisible: false,
      dataForm: {
        'settlementTime': 0,
        'settlementMode': 0,
        'settlementAutoSet': 0,
        'frequency': 1,
        'amountMax': 0,
        'amountMin': 0,
        'paymentExplain': '',
        'modeOfPayment': 0
      },
      rules: {

      }
    }
  }
}
</script>
<style lang="scss">
.distribution-withdraw-cash-set {
  .input-tips {
    font-size: 12px;
  }
}
</style>
