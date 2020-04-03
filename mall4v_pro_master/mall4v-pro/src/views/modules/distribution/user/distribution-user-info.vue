<template>
  <div class="mod-user-info">
    <el-dialog :title="'分销员信息'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="100px">

        <el-form-item label="分销员手机号"
                      prop="remarks">
          <el-input :readonly=true
                    v-model="dataForm.userMobile"></el-input>
        </el-form-item>

        <el-form-item label="身份证号码"
                      prop="identityCardNumber">
          <el-input :readonly=true
                    v-model="dataForm.identityCardNumber"></el-input>
        </el-form-item>

        <el-form-item label="真实姓名"
                      prop="realName">
          <el-input :readonly=true
                    v-model="dataForm.realName"></el-input>
        </el-form-item>

        <el-form-item label="身份证正面">
          <img :src="dataForm.identityCardPicFront"
               style="max-width: 100%">
        </el-form-item>

        <el-form-item label="身份证背面">
          <img :src="dataForm.identityCardPicBack"
               style="max-width: 100%">
        </el-form-item>

        <el-form-item label="手持身份证">
          <img :src="dataForm.identityCardPicHold"
               style="max-width: 100%">
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
      },
      addProdVisible: false,
      visible: false,
      dataRule: {
      }
    }
  },
  components: {
  },
  methods: {
    init (data) {
      this.visible = true
      this.dataForm = Object.assign(this.dataForm, data)
    }
  }

}
</script>
 