<template>
  <div class="mod-reward-rules-config"
       style="width:40%">
    <el-form :model="dataForm"
             ref="dataForm"
             label-width="130px">

      <el-form-item label="佣金等级奖励"
                    align="center"
                    min-width="180px"
                    fit>
        <template slot-scope="scope">

          <div v-for="(item,index) in dataForm.commissionLevel"
               :key="index">
            <el-row>
              <el-col :span="5">
                <div>
                  <div v-if="scope.$index>0">
                    <el-input type="number"
                              :v-model="dataForm.commissionLevel[scope.$index-1].max+0.01">
                    </el-input>
                  </div>
                  <div v-else>
                    <el-input type="number"
                              v-model="dataForm.commissionLevel[index].min">

                    </el-input>
                  </div>
                </div>
              </el-col>
              <el-col :span="1">
                <div>
                  ~
                </div>
              </el-col>
              <el-col :span="5">
                <div>
                  <el-form-item>
                    <el-input type="number"
                              v-model="dataForm.commissionLevel[index].max"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="7">
                <div>
                  <div>
                    <el-form-item>
                      <el-input type="number"
                                v-model="dataForm.commissionLevel[index].commissionRate">
                        <template slot="append">
                          <span>%</span>
                        </template>
                      </el-input>
                    </el-form-item>
                  </div>
                </div>
              </el-col>
              <el-col :span="3">
                <div class="button">
                  <el-button @click="addLevels(item,index)">添加</el-button>
                  <el-button @click="removeLevels(item,index)">移除</el-button>
                </div>
              </el-col>
            </el-row>

          </div>
        </template>
      </el-form-item>

      <el-form-item label="签到金额区间"
                    prop="videoMaxDuration">
        <div class="check-in-config">
          <el-input v-model="dataForm.checkInRules.minAmount">
          </el-input>
          <span>-</span>
          <el-input v-model="dataForm.checkInRules.maxAmount">
            <template slot="append">
              <span>元</span>
            </template>
          </el-input>
        </div>

      </el-form-item>

      <el-form-item label="红包发放"
                    prop="uploadFiles">
        <el-radio-group v-model="dataForm.sendRewardConfig.isAutoToSend">
          <el-radio :label="0">自动审核</el-radio>
          <el-radio :label="1">手动审核</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="最小提现金额"
                    prop="videoMaxDuration">
        <el-input v-model="dataForm.sendRewardConfig.minMoney">
          <template slot="append">
            <span>元</span>
          </template>
        </el-input>
      </el-form-item>

    </el-form>
    <el-button type="primary"
               @click="dataFormSubmit()">确定</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      dataForm: {
        // 佣金等级
        commissionLevel: [{
          // 默认等级
          min: 0,
          max: 0,
          commissionRate: 0
        }],
        // 签到设置
        checkInRules: {
          minAmount: 0.0,
          maxAmount: 0.0
        },
        // 提现配置
        sendRewardConfig: {
          isAutoToSend: 0,
          minMoney: 0.0
        }
      }

    }
  },
  created () {

  },
  methods: {
    getData () {
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.$http({
          url: this.$http.adornUrl('/factory/config/getFactoryConfig'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm = data
        })
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$http({
        url: this.$http.adornUrl('/factory/config/setFactoryConfig'),
        method: 'put',
        data: this.$http.adornData(
          this.dataForm)
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visible = false
          }
        })
      })
    },
    // 添加等级
    addLevels (row, index) {
      if (!row.max) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '等级最大值不能为空'
        })
        return
      }
      if (row.min < 0) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '等级最小值不能小于0'
        })
        return
      }
      if (row.min >= row.max) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '等级最小值不能大于最大值'
        })
        return
      }
      if (row.commissionRate < 0) {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: '佣金比例不能小于0'
        })
        return
      }

      let level = {
        // 默认等级
        min: parseFloat(row.max) + 0.01,
        max: 0,
        commissionRate: 0
      }
      this.dataForm.commissionLevel.push(level)
    },
    // 移除等级
    removeLevels (row, index) {
      this.dataForm.commissionLevel.splice(index, 1)
    }
  }
}
</script>
<style lang="scss">
.mod-reward-rules-config {
  .commision-rate {
    display: inline;
  }
  .check-in-config {
    display: flex;
    flex-direction: row;
  }
  .button {
    margin-left: 10px;
    display: flex;
    flex-direction: row;
  }
}
</style>

