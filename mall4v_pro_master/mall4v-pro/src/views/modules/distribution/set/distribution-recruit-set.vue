<template>
  <div class="distribution-recruit-set gray-box top-redius border-bottom-gray">
    <div class="title">招募推广</div>
    <el-form ref="dataForm"
             label-width="80px"
             size="mini"
             class="set-form"
             label-position="left"
             :rules="dataRule"
             :model="dataForm">

      <el-form-item label="推广开关"
                    prop="state">
        <el-radio-group v-model="dataForm.state">
          <el-radio :label='0'>关闭</el-radio>
          <el-radio :label='1'>开启</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="封面图片">
        <pic-upload v-model="dataForm.pic" />
      </el-form-item>

      <el-form-item label="推广标题"
                    prop="title">
        <el-input v-model="dataForm.title"
                  style="width:180px">
        </el-input>
      </el-form-item>

      <el-form-item label="推广内容"
                    prop="content">
        <tiny-mce v-model="dataForm.content"
                  style="width:900px"></tiny-mce>
      </el-form-item>

    </el-form>
    <el-button @click="dataFormSubmit()">保存</el-button>
  </div>
</template>

<script>
import PicUpload from '@/components/pic-upload'
import TinyMce from '@/components/tiny-mce'

export default {
  components: {
    PicUpload,
    TinyMce
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionRecruitSet/info'),
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
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          this.$http({
            url: this.$http.adornUrl(`/distribution/distributionRecruitSet`),
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
      })
    }
  },
  data () {
    return {
      addOrUpdateVisible: false,
      dataForm: {
        'pic': '',
        'title': '',
        'content': ''
      },
      dataRule: {
        title: [
          { required: true, message: '请输入标题', trigger: 'brue' },
          { max: 255, message: '长度在 255 个字符内', trigger: 'brue' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'brue' }
        ]
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
