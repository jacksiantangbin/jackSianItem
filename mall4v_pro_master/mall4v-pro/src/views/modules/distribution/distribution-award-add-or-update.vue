<template>
  <div class="mod-hotSearch-add-or-update">
    <el-dialog :title="'编辑奖励'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="100px">
        <!-- <el-form-item label="名称"
                      prop="awardName">
          <el-input v-model="dataForm.awardName"
                    placeholder="请填写名称"
                    controls-position="right"
                    :min="0"
                    :disabled="!isEdit"
                    label="名称"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="奖励物品"
                      prop="awardType">
          <el-select placeholder="请选择"
                     :disabled="!isEdit"
                     v-model="dataForm.awardType">
            <el-option label="无奖励"
                       :value='-1'></el-option>
            <el-option label="红包"
                       :value='0'></el-option>
            <el-option label="积分"
                       :value='1'></el-option>
            <el-option label="实物"
                       :value='2'></el-option>
            <el-option label="其他"
                       :value='-1'></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="奖励积分"
                      prop="awardId"
                      v-if="dataForm.awardType === 1">
          <el-select placeholder="请选择"
                     filterable
                     :disabled="!isEdit"
                     v-model="dataForm.relationId">
            <el-option label="无奖励"
                       :value='0'></el-option>
            <el-option v-for="item in pointsData"
                       :key="item.awardId"
                       :label="item.name"
                       :value="item.pointsId">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!--
        <el-form-item label="上级奖励"
                      prop="parentAwardId">
          <el-select placeholder="请选择"
                     filterable
                     :disabled="!isEdit"
                     v-model="dataForm.parentAwardId">
            <el-option label="无奖励"
                       :value='0'></el-option>
            <el-option v-for="item in awardData"
                       :key="item.awardId"
                       :label="item.awardName"
                       :value="item.awardId">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item label="奖励比例"
                      prop="awardType">
          <el-radio-group v-model="dataForm.awardProportion"
                          :disabled="!isEdit">
            <el-radio :label="0">按比例奖励</el-radio>
            <el-radio :label="1">按固定数值奖励</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="奖励设置"
                      prop="awardType">
          <el-radio-group v-model="dataForm.awardNumberSet"
                          :disabled="!isEdit">
            <el-radio :label="0">不根据等级奖励</el-radio>
            <el-radio :label="1">根据等级奖励</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="数额设置"
                      prop="awardType">
          <el-input-number v-model="dataForm.awardNumber"
                           v-if="dataForm.awardNumberSet === 0"
                           :precision="2"
                           :min="0"
                           :disabled="!isEdit"></el-input-number>
          <div v-if="dataForm.awardNumberSet === 1">
            <el-table :data="levelData"
                      height="250"
                      :disabled="!isEdit">
              <el-table-column prop="name"
                               label="名字"
                               width="180">
              </el-table-column>

              <el-table-column label="数额"
                               width="300">
                <template slot-scope="scope">
                  <el-input-number v-model="leveltableData[scope.$index]"
                                   :disabled="!isEdit"
                                   :precision="2"
                                   :min="0"></el-input-number>
                </template>
              </el-table-column>

            </el-table>
          </div>
        </el-form-item>

        <el-form-item label="上级奖励数额"
                      prop="awardType">
          <el-input-number v-model="dataForm.awardNumber"
                           v-if="dataForm.awardNumberSet === 0"
                           :precision="2"
                           :min="0"
                           :disabled="!isEdit"></el-input-number>
        </el-form-item>

        <el-form-item label="状态"
                      prop="awardType">
          <el-radio-group v-model="dataForm.state"
                          :disabled="!isEdit">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer"
            v-if="isEdit">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        'shopId': 0,
        'awardName': '',
        'awardType': 0,
        'awardCondition': '',
        'awardProportion': 0,
        'awardNumberSet': 0,
        'awardNumber': '',
        'parentAwardId': 0,
        'state': 1,
        'relationId': 0
      },
      leveltableData: [],
      // pointsData: [],
      // awardData: [],
      levelData: [],
      addProdVisible: false,
      visible: false,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      dataRule: {
      }
    }
  },
  components: {
  },
  created () {
    // this.getPointsDataList()
    // this.getAwardDataList()
    this.getLevelDataList()
  },
  methods: {
    init (data, isEdit) {
      this.visible = true
      this.isEdit = isEdit
      if (data) {
        this.dataForm = Object.assign(this.dataForm, data)
        // // 判断上级奖励id是否匹配
        // if (!this.awardData.includes(this.dataForm.parentAwardId)) {
        //   this.dataForm.parentAwardId = 0
        // }
        // // 判断上级奖励id是否匹配
        // if (!this.awardData.includes(this.dataForm.award)) {
        //   this.dataForm.parentAwardId = 0
        // }
        // 判断是否为根据等级奖励
        // if (this.dataForm.awardNumberSet === 1) {
        //   this.dataForm.awardNumber = JSON.parse(this.leveltableData)
        // }
      } else {
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
        })
      }
    },
    // 获取等级数据列表
    getLevelDataList () {
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionLevel/info'),
        method: 'get'
      }).then(({ data }) => {
        this.levelData = data
      })
    },
    // // 获取奖励数据列表
    // getAwardDataList () {
    //   this.$http({
    //     url: this.$http.adornUrl('/distribution/distributionAward/AwardNameAndId'),
    //     method: 'get',
    //     params: this.$http.adornParams({
    //       'state': 1
    //     })
    //   }).then(({ data }) => {
    //     this.awardData = data
    //   })
    // },
    // 获取积分数据列表
    // getPointsDataList () {
    //   this.dataListLoading = true
    //   this.$http({
    //     url: this.$http.adornUrl('/admin/points/page/name'),
    //     method: 'get',
    //     params: this.$http.adornParams({
    //       'state': 1
    //     })
    //   }).then(({ data }) => {
    //     this.pointsData = data.list
    //   })
    // },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          let param = this.dataForm
          this.$http({
            url: this.$http.adornUrl(`/distribution/distributionAward`),
            method: param.awardId ? 'put' : 'post',
            data: this.$http.adornData(param)
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
