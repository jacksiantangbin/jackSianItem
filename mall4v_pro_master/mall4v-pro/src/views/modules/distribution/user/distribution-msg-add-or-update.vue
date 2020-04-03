<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog title="公告管理"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit ()"
               label-width="90px">
        <el-form-item label="是否置顶"
                      prop="msgType">
          <el-radio-group v-model="dataForm.isTop">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间"
                      prop="startTime">
          <el-date-picker v-model="dataForm.startTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          placeholder="选择开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间"
                      prop="endTime">
          <el-date-picker v-model="dataForm.endTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题"
                      prop="msgTitle">
          <el-input v-model="dataForm.msgTitle"
                    placeholder="请填写标题"
                    controls-position="right"
                    :min="0"
                    label="标题"></el-input>
        </el-form-item>

        <!-- <el-form-item label="封面图片"
                      prop="pic">
          <pic-upload v-model="dataForm.pic"></pic-upload>
        </el-form-item> -->

        <el-form-item label="内容"
                      prop="content">
          <tiny-mce v-model="dataForm.content"
                    ref="tinyMce"
                    v-if="visible"></tiny-mce>
        </el-form-item>

        <!-- <el-form-item label="状态"
                      size="mini"
                      prop="state">
          <el-radio-group v-model="dataForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TinyMce from '@/components/tiny-mce'
import PicUpload from '@/components/pic-upload'
export default {

  data () {
    var validateTime = (rule, value, callback) => {
      if (Date.parse(this.dataForm.startTime) >= Date.parse(this.dataForm.endTime)) {
        callback(new Error('开始时间不能小于或等于结束时间'))
      } else {
        callback()
      }
    }
    return {
      dataForm: {
        'time': [],
        'msgId': 0,
        'msgTitle': '',
        'isTop': 0,
        'content': '',
        'pic': '',
        'msgType': 0,
        'state': 0,
        'startTime': '',
        'endTime': 0
      },
      addProdVisible: false,
      visible: false,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      dataRule: {
        msgTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 255, message: '长度在 255 个字符内', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' },
          { validator: validateTime, trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
          { validator: validateTime, trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    TinyMce,
    PicUpload
  },
  methods: {
    init (msgId) {
      this.dataForm.msgId = msgId || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
      if (this.dataForm.msgId) {
        this.getDataList()
      }
    },
    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/distribution/distributionMsg/info/${this.dataForm.msgId}`),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.dataForm = data
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          this.$http({
            url: this.$http.adornUrl(`/distribution/distributionMsg`),
            method: param.msgId ? 'put' : 'post',
            data: this.$http.adornData(param)
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.$refs['dataForm'].resetFields()
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
