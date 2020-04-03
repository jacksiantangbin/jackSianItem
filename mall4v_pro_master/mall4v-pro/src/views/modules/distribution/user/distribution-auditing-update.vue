<template>
  <div class="mod-auditing-add-or-update">
    <el-dialog :title="'分销员审核'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="150px">
        <el-form-item label="审核"
                      size="mini"
                      prop="state">
          <el-radio-group v-model="dataForm.state"
                          :disabled="!isEdit">
            <el-radio :label="1">审核通过</el-radio>
            <el-radio :label="-1">不通过</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item v-if="dataForm.state == -1"
                      label="原因"
                      prop="reason">
          <el-select v-model="dataForm.reason"
                     :readonly="!isEdit">
            <el-option label="资料不足"
                       :value="0"></el-option>
            <el-option label="条件不足"
                       :value="1"></el-option>
            <el-option label="不招人"
                       :value="2"></el-option>
            <el-option label="其他"
                       :value="-1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备注"
                      prop="remarks">
          <el-input type="textarea"
                    placeholder="备注"
                    v-model="dataForm.remarks"
                    :readonly="!isEdit"></el-input>
        </el-form-item>

        <el-form-item label="消息提示"
                      prop="msg">
          <el-input type="textarea"
                    placeholder="不填写也会发送默认消息给申请人"
                    v-model="dataForm.msg"
                    :readonly="!isEdit"></el-input>
        </el-form-item>

        <el-form-item label="操作人"
                      v-if="!isEdit"
                      prop="sysUsername">
          <div v-if="dataForm.modifier === 0">
            系统
          </div>
          <el-input v-else
                    v-model="dataForm.sysUsername"
                    :readonly="!isEdit"></el-input>
        </el-form-item>

        <el-form-item label="操作时间"
                      v-if="!isEdit"
                      prop="updateTime">
          <el-input v-model="dataForm.updateTime"
                    :readonly="!isEdit"></el-input>
        </el-form-item>

        <el-form-item label="查看用户申请资料">
          <el-button @click="info(dataForm)">点击查看</el-button>
        </el-form-item>

      </el-form>
      <span slot="footer"
            v-if="isEdit"
            class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>

    <!-- 弹窗, 新增 / 修改 -->
    <Info v-if="infoVisible"
          ref="info"></Info>
  </div>
</template>

<script>
import Info from './distribution-user-info'
export default {
  data () {
    return {
      isEdit: true,
      dataForm: {
        'auditingId': null,
        'state': null,
        'reason': null,
        'remarks': null,
        'msg': null
      },
      addProdVisible: false,
      infoVisible: false,
      visible: false,
      dataRule: {
        state: [
          { required: true, message: '请选择审核状态', trigger: 'change' }
        ],
        reason: [
          { required: true, message: '请选择不通过原因', trigger: 'blur' }
        ],
        remarks: [
          { max: 255, message: '长度在 255 个字符内', trigger: 'blur' }
        ],
        msg: [
          { max: 1000, message: '长度在 255 个字符内', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    Info
  },
  methods: {
    init (data, isEdit) {
      this.isEdit = isEdit
      this.dataForm = Object.assign(this.dataForm, data)
      this.visible = true
    },
    // 新增 / 修改
    info (data) {
      this.infoVisible = true
      this.$nextTick(() => {
        this.$refs.info.init(data)
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          this.$http({
            url: this.$http.adornUrl(`/distribution/distributionAuditing`),
            method: 'put',
            data: this.$http.adornData(
              param
              , false)
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
