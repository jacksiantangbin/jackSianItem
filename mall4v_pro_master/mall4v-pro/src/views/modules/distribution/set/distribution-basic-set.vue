<template>
  <div class="distribution-bind-set gray-box top-redius border-bottom-gray">
    <div class="title">分销基本设置</div>
    <el-form ref="dataForm"
             label-width="110px"
             size="mini"
             class="set-form"
             label-position="left"
             :model="dataForm">
      <el-form-item label="分销开关">
        <el-radio-group v-model="dataForm.distrbutionSwitch">
          <el-radio :label='0'>关闭</el-radio>
          <el-radio :label='1'>开启</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="互购佣金">
        <el-radio-group v-model="dataForm.parallelDeal">
          <el-radio :label='0'>关闭</el-radio>
          <el-radio :label='1'>开启</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="自购佣金">
        <el-radio-group v-model="dataForm.ownBuyAward">
          <el-radio :label='0'>关闭</el-radio>
          <el-radio :label='1'>开启</el-radio>
        </el-radio-group>
      </el-form-item>

      <!-- <el-form-item label="会员价自购佣金">
        <el-radio-group v-model="dataForm.vipBuyAward">
          <el-radio :label='0'>关闭</el-radio>
          <el-radio :label='1'>开启</el-radio>
        </el-radio-group>
      </el-form-item> -->
      <!--
      <el-form-item label="默认成交奖励">
        <el-select placeholder="请选择"
                   filterable
                   v-model="dataForm.defaultBuyAwardId">
          <el-option label="无奖励"
                     :value='-1'></el-option>
          <el-option v-for="item in AwardDataList"
                     :key="item.awardId"
                     :label="item.awardName"
                     :value="item.awardId">
          </el-option>
        </el-select>
      </el-form-item> -->
      <!--
      <el-form-item label="默认邀请奖励">
        <el-select placeholder="请选择"
                   filterable
                   v-model="dataForm.defaultInvitationAwardId">
          <el-option label="无奖励"
                     :value='-1'></el-option>
          <el-option v-for="item in AwardDataList"
                     :key="item.awardId"
                     :label="item.awardName"
                     :value="item.awardId">
          </el-option>
        </el-select>
      </el-form-item> -->

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
        url: this.$http.adornUrl('/distribution/distributionBasicSet/info'),
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
      this.$http({
        url: this.$http.adornUrl(`/distribution/distributionBasicSet`),
        method: this.dataForm.basicSetId ? 'put' : 'post',
        data: this.$http.adornData({
          'basicSetId': this.dataForm.basicSetId,
          'distrbutionSwitch': this.dataForm.distrbutionSwitch,
          'parallelDeal': this.dataForm.parallelDeal,
          'ownBuy': this.dataForm.ownBuy,
          'ownBuyAward': this.dataForm.ownBuyAward,
          'vipBuyAward': this.dataForm.vipBuyAward,
          'settlementMethod': this.dataForm.settlementMethod,
          'defaultBuyAwardId': this.dataForm.defaultBuyAwardId,
          'defaultInvitationAwardId': this.dataForm.defaultInvitationAwardId
        })
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500
        })
      }).catch(() => {

      })
    },
    removeProtectDay () {
      this.dataForm.protectDay = null
    },
    removeBindDay () {
      this.dataForm.bindDay = null
    }
  },
  data () {
    return {
      addOrUpdateVisible: false,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      AwardDataList: [],
      dataForm: {
        'distrbutionSwitch': 0,
        'parallelDeal': 0,
        'ownBuy': 0,
        'ownBuyAward': 0,
        'vipBuyAward': 0,
        'settlementMethod': 0,
        'defaultBuyAwardId': -1,
        'defaultInvitationAwardId': -1
      },
      rules: {

      }
    }
  }
}
</script>
<style lang="scss">
.distribution-bind-set {
  .input-group .el-form-item--mini {
    display: inline-block;
  }
  .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>
