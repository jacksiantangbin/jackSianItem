<template>
  <div class="distribution-level-set gray-box bottom-redius">
    <div class="title">等级设置</div>
    <el-form label-width="100px"
             class="set-form"
             size="mini"
             :model="dataForm">
      <el-form-item label="奖励设置">
        <el-checkbox v-model="dataForm.awardSwitch"
                     :false-label='0'
                     :true-label='1'>默认奖励</el-checkbox>
        <el-checkbox v-model="dataForm.parentAwardSwitch"
                     :false-label='0'
                     :true-label='1'>邀请人奖励</el-checkbox>
        <el-checkbox v-model="dataForm.awardProportion"
                     :false-label='0'
                     :true-label='1'>按固定数值进行奖励</el-checkbox>
      </el-form-item>

      <el-form-item label="等级条件">
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.boundCustomers">绑定客户数</el-checkbox>
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.invitedVeeker">邀请分销员数</el-checkbox>
        <!-- <el-checkbox v-model="dataForm.levelSetConditionsSwitch.invitedCustomers">邀请客户数</el-checkbox> -->
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.payNumber">支付单数</el-checkbox>
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.addupAmount">积累收益</el-checkbox>
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.successOrderNumber">成交单数</el-checkbox>
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.successTradingVolume">成交金额</el-checkbox>
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.sumOfConsumption">消费金额</el-checkbox>
        <!-- <el-checkbox v-model="dataForm.levelSetConditionsSwitch.rechargeAmount">充值金额</el-checkbox> -->
        <el-checkbox v-model="dataForm.levelSetConditionsSwitch.commodity">购买指定商品</el-checkbox>
        <br>
        <span class="tips">至少需勾选一项，最少满足其中一项条件就可以升级</span>
        <el-table :data="dataForm.distributionLevels"
                  class="elTable">
          <el-table-column prop="name"
                           fixed
                           label="等级名称"
                           align="center">
            <template slot-scope="scope">
              <div class="table-template">
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.name'">
                    <el-input v-model.number="scope.row.name"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template></el-table-column>
          <el-table-column prop="conditionData.boundCustomers"
                           label="绑定客户数(人)"
                           align="center"
                           min-width="160px"
                           v-if="dataForm.levelSetConditionsSwitch.boundCustomers">
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.boundCustomers+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.boundCustomers'">
                    <el-input v-model.number="scope.row.conditionData.boundCustomers"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="conditionData.invitedVeeker"
                           label="邀请微客数(人)"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.invitedVeeker"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.invitedVeeker+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.invitedVeeker'">
                    <el-input v-model.number="scope.row.conditionData.invitedVeeker"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="conditionData.payNumber"
                           label="支付单数(单)"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.payNumber"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.payNumber+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.payNumber'">
                    <el-input v-model.number="scope.row.conditionData.payNumber"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="conditionData.addupAmount"
                           label="实收金额(元)"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.addupAmount"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.addupAmount+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.addupAmount'">
                    <el-input v-model.number="scope.row.conditionData.addupAmount"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="conditionData.successOrderNumber"
                           label="成交单数"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.successOrderNumber"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.successOrderNumber+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.successOrderNumber'">
                    <el-input v-model.number="scope.row.conditionData.successOrderNumber"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="conditionData.successTradingVolume"
                           label="成交金额(元)"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.successTradingVolume"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.successTradingVolume+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.successTradingVolume'">
                    <el-input v-model.number="scope.row.conditionData.successTradingVolume"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="conditionData.sumOfConsumption"
                           label="消费金额(元)"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.sumOfConsumption"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div v-if="scope.$index>0">
                  {{dataForm.distributionLevels[scope.$index-1].conditionData.sumOfConsumption+0.01}}
                </div>
                <div v-else>0</div>
                <div>~</div>
                <div class="table-input-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.conditionData.sumOfConsumption'">
                    <el-input v-model.number="scope.row.conditionData.sumOfConsumption"></el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="conditionData.commodity"
                           label="购买指定商品"
                           align="center"
                           v-if="dataForm.levelSetConditionsSwitch.commodity"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">

              <!-- <div v-for="(item, index) in scope.row.conditionData.commodity"
                   :key='index'>
                {{item.prodName}}
              </div> -->
              <div class="card-prod-container">
                <div v-for="(item, index) in scope.row.conditionData.commodity"
                     :key="index">
                  <el-card :body-style="{ padding: '0px' }"
                           style="height: 160px;width: 120px">
                    <img :src="item.pic"
                         style="height:104px;width:100%">
                    <div class="card-prod-bottom">
                      <span class="card-prod-name">{{item.prodName}}</span>
                      <el-button type="text"
                                 class="card-prod-name-button"
                                 @click="deleteProd(scope.row.conditionData.commodity,index)">删除</el-button>
                    </div>
                  </el-card>
                </div>
              </div>

              <el-button @click.native.prevent="prodsSelectHandle(scope.$index)"
                         type="text"
                         size="small">选择商品</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="awardNumber"
                           label="默认奖励"
                           align="center"
                           v-if="dataForm.awardSwitch === 1"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div class="table-input-box award-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.awardNumber'">
                    <el-input v-model.number="scope.row.awardNumber"
                              style="width:100px">
                      <template slot="append">
                        <span v-if="dataForm.awardProportion === 0">%</span>
                        <span v-else>元</span>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="parentAwardNumber"
                           label="邀请人奖励"
                           align="center"
                           v-if="dataForm.parentAwardSwitch === 1"
                           min-width="160px"
                           fit>
            <template slot-scope="scope">
              <div class="table-template">
                <div class="table-input-box award-box">
                  <el-form-item :prop="'distributionLevels.' + scope.$index + '.parentAwardNumber'">
                    <el-input v-model.number="scope.row.parentAwardNumber"
                              style="width:100px">
                      <template slot="append">
                        <span v-if="dataForm.awardProportion === 0">%</span>
                        <span v-else>元</span>
                      </template>
                    </el-input>
                  </el-form-item>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column fixed="right"
                           label="操作"
                           width="60">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.$index)"
                         type="text"
                         size="small">移除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button @click="addRow"
                   style="margin-top:15px">添加等级</el-button>

      </el-form-item>
    </el-form>

    <el-button @click="dataFormSubmit()">保存</el-button>

    <!-- 商品选择弹窗-->
    <prods-select v-if="prodsSelectVisible"
                  ref="prodsSelect"
                  @refreshSelectProds="selectDistributionProds"></prods-select>
  </div>

</template>

<script>
import ProdsSelect from '@/components/prods-select'
export default {
  components: {
    ProdsSelect
  },
  created () {
    this.getData()
  },
  methods: {
    // 获取数据
    getData () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/distribution/distributionLevelSet/info'),
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
      console.log(data)
      this.dataForm = data
      // 解析嵌套json
      this.dataForm.distributionLevels.forEach((item, index) => {
        this.dataForm.distributionLevels[index].conditionData = JSON.parse(item.conditionData)
      })
    },
    // 提交表单
    dataFormSubmit () {
      // 深拷贝
      var distributionLevels = JSON.parse(JSON.stringify(this.dataForm.distributionLevels))
      // 解析嵌套json
      distributionLevels.forEach((item, index) => {
        distributionLevels[index].conditionData = JSON.stringify(item.conditionData)
        item.distributionLevelConditionDataVO = null
      })

      this.$http({
        url: this.$http.adornUrl(`/distribution/distributionLevelSet`),
        method: 'put',
        data: this.$http.adornData({
          'awardSwitch': this.dataForm.awardSwitch,
          'parentAwardSwitch': this.dataForm.parentAwardSwitch,
          'levelSetId': this.dataForm.levelSetId,
          'levelSetConditionsSwitch': this.dataForm.levelSetConditionsSwitch,
          'levelIdList': this.dataForm.levelIdList,
          'distributionLevels': distributionLevels,
          'awardProportion': this.dataForm.awardProportion
        })
      }).then(({ data }) => {
        this.$message({
          message: '操作成功',
          type: 'success',
          duration: 1500
        })
        this.getData()
      }).catch(() => { })
    },
    // 删除列
    deleteRow (index) {
      if (this.dataForm.distributionLevels[index].level === 1) {
        this.$message({
          message: '默认等级不可移除',
          type: 'warning'
        })
        return
      }
      this.dataForm.distributionLevels.splice(index, 1)
    },
    // 增加列
    addRow: function () {
      if (this.dataForm.distributionLevels.length >= 5) {
        this.$message({
          message: '最多只能添加5个等级',
          type: 'warning'
        })
        return
      }
      var level = JSON.parse(JSON.stringify(this.dataForm.distributionLevels[0]))
      level.levelId = null
      level.level = this.dataForm.distributionLevels.length + 1
      if (level.conditionData.commodity) {
        level.conditionData.commodity = []
      }
      let levelNum = parseInt(this.dataForm.distributionLevels.length) + 1
      level.name = '等级' + levelNum
      this.dataForm.distributionLevels.push(level)
    },
    // 显示添加指定商品弹框
    prodsSelectHandle (index) {
      this.prodsSelectVisible = true
      this.index = index
      this.$nextTick(() => {
        this.$refs.prodsSelect.init(this.dataForm.distributionLevels[index].conditionData.commodity)
      })
    },
    // 商品选择回调
    selectDistributionProds (prods) {
      if (prods) {
        this.dataForm.distributionLevels[this.index].conditionData.commodity = prods
      } else {
        this.dataForm.distributionLevels[this.index].conditionData.commodity = []
      }
    },
    // 提取下标
    getIndex (field) {
      var i = parseInt(field.replace(/[^0-9]/ig, ''))
      if (i > 0) {
        return i - 1
      }
      return 0
    },
    // 删除指定商品
    deleteProd (data, index) {
      data.splice(index, 1)
    }
  },
  data () {
    return {
      index: 0,
      prodsSelectVisible: false,
      dataForm: {
        levelSetConditionsSwitch: {
          'boundCustomers': 0,
          'invitedVeeker': 0,
          'invitedCustomers': 0,
          'payNumber': 0,
          'addupAmount': 0,
          'successOrderNumber': 0,
          'successTradingVolume': 0,
          'sumOfConsumption': 0,
          'rechargeAmount': 0,
          'commodity': 0
        },
        'parentAwardSwitch': 0,
        'awardSwitch': 0,
        'distributionAward': {
          'awardId': null,
          'awardProportion': 0,
          'awardNumberSet': 0,
          'awardNumber': '',
          'parentAwardNumber': '',
          'parentAwardSet': 0
        },
        'levelIdList': '',
        'distributionLevels': [
          {
            'name': '默认等级',
            'conditionData': {
              boundCustomers: 0,
              invitedVeeker: 0,
              invitedCustomers: 0,
              payNumber: 0,
              addupAmount: 0,
              successOrderNumber: 0,
              successTradingVolume: 0,
              sumOfConsumption: 0,
              rechargeAmount: 0,
              commodity: []
            },
            'level': 1
          }
        ]
      }
    }
  }
}
</script>

<style lang="scss">
.distribution-level-set {
  .el-input__inner {
    padding: 2px;
    border-radius: 3px;
  }
  .el-form-item--mini.el-form-item,
  .el-form-item--small.el-form-item {
    margin-bottom: 0px;
  }
  .award-box {
    input {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
    }
    .el-input-group__append,
    .el-input-group__prepend {
      padding: 0 10px;
    }
  }
}
.level-table-box {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px;
}
.elTable th {
  padding: 10px 0 !important;
}
.elTable td {
  padding: 2px 0 !important;
}
.table-input-box {
  margin-top: 20px;
  width: 50px;
}
.table-template {
  text-align: center;
}
.table-template > * {
  display: inline-block;
  margin: auto;
}
.card-prod-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
