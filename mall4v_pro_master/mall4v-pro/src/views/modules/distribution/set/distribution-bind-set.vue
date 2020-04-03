<template>
  <div class="distribution-bind-set gray-box top-redius border-bottom-gray">
    <div class="title">客户绑定设置</div>
    <el-form ref="dataForm"
             label-width="100px"
             size="mini"
             class="set-form"
             label-position="left"
             :model="dataForm">
      <el-form-item label="业绩归属">
        <el-radio-group v-model="dataForm.attribution">
          <el-radio :label='0'>允许绑定，关系链优先</el-radio>
          <el-radio :label='1'>不绑定，分享人优先</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="绑定场景">
        <!-- <el-checkbox v-model="dataForm.bindScene.follow">关注公众号</el-checkbox> -->
        <el-checkbox v-model="dataForm.bindScene.buy">下单</el-checkbox>
        <el-checkbox v-model="dataForm.bindScene.sweepCode">扫码直接绑定</el-checkbox>
        <span class="tips">客户在未绑定状态下符合勾选的1个节点即可绑定关系链</span>
      </el-form-item>

      <el-form-item label="抢客方式">
        <el-checkbox v-model="dataForm.rob.buy">下单</el-checkbox>
        <el-checkbox v-model="dataForm.rob.sweepCode">扫码</el-checkbox>
        <span class="tips">客户不在保护期内可被其他分销员通过勾选的途径抢客</span>
      </el-form-item>

      <el-form-item label="绑定时间"
                    class="input-group">
        <el-radio-group v-model="isBindDay"
                        @change="removeBindDay()">
          <el-radio :label='false'>永久绑定</el-radio>
          <el-radio :label='true'>限时绑定</el-radio>
        </el-radio-group>

        <el-input v-model.number="dataForm.bindDay"
                  style="width:240px"
                  v-bind:disabled="!isBindDay">
          <template slot="append">天</template>
        </el-input>
      </el-form-item>

      <el-form-item label="保护时间"
                    class="input-group">
        <el-radio-group v-model="isProtectDay"
                        @change="removeProtectDay()">>
          <el-radio :label='false'>永久保护</el-radio>
          <el-radio :label='true'>限时保护</el-radio>
        </el-radio-group>

        <el-input v-model.number="dataForm.protectDay"
                  style="width:240px"
                  v-bind:disabled="!isProtectDay">
          <template slot="append">天</template>
        </el-input>
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
        url: this.$http.adornUrl('/distribution/distributionBindSet/info'),
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
      if (data.bindDay != null && data.bindDay !== -1) {
        this.isBindDay = true
      } else {
        this.dataForm.bindDay = null
      }
      if (data.protectDay != null && data.protectDay !== -1) {
        this.isProtectDay = true
      } else {
        this.isProtectDay.protectDay = null
      }
    },
    // 提交表单
    dataFormSubmit () {
      this.$http({
        url: this.$http.adornUrl(`/distribution/distributionBindSet`),
        method: 'put',
        data: this.$http.adornData({
          'bindId': this.dataForm.bindId,
          'attribution': this.dataForm.attribution,
          'rob': this.dataForm.rob,
          'protectDay': this.dataForm.protectDay,
          'bindScene': this.dataForm.bindScene,
          'bindDay': this.dataForm.bindDay
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
      isProtectDay: false,
      isBindDay: false,
      dataForm: {
        'attribution': 1,
        'rob': {
          buy: false,
          sweepCode: false
        },
        'protectDay': 1,
        'bindScene': {
          follow: false,
          buy: false,
          sweepCode: false
        },
        'bindDay': 1
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
