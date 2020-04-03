<template>
  <div class="mod-groupActivity">
    <el-dialog :title="!dataForm.groupActivityId ? '新建拼团活动' : '编辑拼团活动'"
               :close-on-click-modal="false"
               :visible.sync="visible"
               width="50%">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               label-width="200px">
        <el-form-item label="活动名称"
                      prop="activityName">
          <el-input placeholder="输入活动名称"
                    :disabled="dataForm.activityStatus > 2"
                    v-model="dataForm.activityName"
                    class="groupActivity-input"></el-input>
        </el-form-item>
        <!-- <el-form-item label="关联商品"
                      prop="activityName">
          <div>
            <el-col :span="5"
                    v-for="(groupProd, index) in dataForm.groupProds"
                    :key="index">
              <el-card :body-style="{ padding: '0px' }"
                       style="height: 160px;width: 120px">
                <img :src="groupProd.pic"
                     style="height:104px;width:100%">
                <div class="card-prod-bottom">
                  <span class="card-prod-name">{{groupProd.prodName}}</span>
                  <el-button type="text"
                             class="card-edit-sku-button"
                             @click="editSkuhandle(groupProd.prodId)">编辑</el-button>
                  <el-button type="text"
                             class="card-prod-name-button"
                             @click="deleteProd(index)">删除</el-button>
                </div>
              </el-card>
            </el-col>
            <el-col>
              <el-button type="primary"
                         plain
                         size="mini"
                         :style="dataForm.groupProds?'':'margin-top:160px;'"
                         @click="selectProdHandle()">选择商品</el-button>
            </el-col>

          </div>

        </el-form-item> -->
        <el-form-item label="活动开始时间"
                      prop="startTime">
          <el-date-picker v-model="dataForm.startTime"
                          :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1 : false"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          class="date-picker"
                          placeholder="选择活动开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="活动结束时间"
                      prop="endTime">
          <el-date-picker v-model="dataForm.endTime"
                          :disabled="dataForm.activityStatus ? dataForm.activityStatus > 2 : false "
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          class="date-picker"
                          placeholder="选择活动结束时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="活动开始时间"
                      prop="selectTime">
          <el-date-picker v-model="selectTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          :onPick="checkTimeHandle()"
                          end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item> -->

        <el-form-item label="参团人数"
                      prop="groupNumber">
          <el-input type="number"
                    v-model="dataForm.groupNumber"
                    :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1: false"
                    class="groupActivity-input">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="成团有效期时间"
                      prop="groupValidTime">

          <el-input type="number"
                    :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1: false"
                    v-model="dataForm.groupValidTime"
                    class="groupActivity-input">
            <template slot="append">分钟</template>
          </el-input>

          <el-tooltip class="item"
                      effect="dark"
                      content="若设置30分钟，用户开团后，需要在30分钟内成团，超时则拼团失败"
                      placement="right">
            <i class="el-icon-question"></i>
          </el-tooltip>

        </el-form-item>
        <el-form-item label="限制购买"
                      prop="hasMaxNum">
          <el-radio-group :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1: false"
                          v-model="dataForm.hasMaxNum">
            <el-radio :label=0>关闭</el-radio>
            <el-radio :label=1>开启</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="dataForm.hasMaxNum"
                      label="限购数量"
                      prop="maxNum">
          <el-input v-model="dataForm.maxNum"
                    :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1: false"
                    class="groupActivity-input">
            <template slot="append">件/人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="模拟成团"
                      prop="hasRobot">
          <div>
            <el-radio-group :disabled="dataForm.activityStatus ? dataForm.activityStatus > 2: false"
                            v-model="dataForm.hasRobot">
              <el-radio :label=0>关闭</el-radio>
              <el-radio :label=1>开启</el-radio>
            </el-radio-group>
            <div class="auxiliary-font">
              <span>
                开启模拟成团后，拼团有效期内人数未满的团，系统将会以“虚拟用户”凑满人数，使该团拼团成功。
                你只需要对已付款参团的真实买家发货。建议合理开启，以提高成团率。
              </span>
            </div>

          </div>
        </el-form-item>
        <el-form-item label="团长优惠"
                      prop="hasLeaderPrice">
          <el-radio-group :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1: false"
                          v-model="dataForm.hasLeaderPrice">
            <el-radio :label=0>关闭</el-radio>
            <el-radio :label=1>开启</el-radio>
          </el-radio-group>
          <div class="auxiliary-font">
            开启团长(开团人)优惠后，团长将享受更优惠价格，有助于提高开团率和成团率。
          </div>
          <div class="auxiliary-font font-color-red">
            注意：开启“模拟成团”时，团长也能享受团长优惠，请谨慎设置，避免资金损失。
          </div>
        </el-form-item>
        <el-form-item label="凑团模式"
                      prop="hasGroupTip">
          <el-radio-group :disabled="dataForm.activityStatus ? dataForm.activityStatus > 2: false"
                          v-model="dataForm.hasGroupTip">
            <el-radio :label=0>关闭</el-radio>
            <el-radio :label=1>开启</el-radio>
          </el-radio-group>
          <div class="auxiliary-font">
            开启凑团后，对于未参团的买家，活动商品详情页会显示未成团的团列表，买家可以直接任选一个参团，提升成团率。
          </div>
        </el-form-item>
        <el-form-item label="活动预热"
                      prop="isPreheat">
          <el-radio-group :disabled="dataForm.activityStatus ? dataForm.activityStatus !== 1: false"
                          v-model="dataForm.isPreheat">
            <el-radio :label=0>关闭</el-radio>
            <el-radio :label=1>开启</el-radio>
          </el-radio-group>
          <div class="auxiliary-font">开启后，商品详情页展示未开始的拼团活动，但活动开始前用户无法拼团购买</div>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false"
                   size="mini">取消</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="dataFormSubmit()">提交</el-button>
        <el-button type="primary"
                   size="mini"
                   @click="submitAndManageProds()">提交并管理活动商品</el-button>
      </span>

      <!-- 商品选择弹窗  测试完之后添加这个链接  dataUrl='/group/prod/getNotGroupProdPage'-->
      <prods-select v-if="groupSelectProdVisible"
                    ref='ProdsSelect'
                    @refreshSelectProds="selectGroupProds"></prods-select>
    </el-dialog>

  </div>

</template>

<script>
import ProdsSelect from '@/components/prods-select'
export default {
  data () {
    var validateTime = (rule, value, callback) => {
      if (rule.field === '"endTime"' && new Date() > Date.parse(value)) {
        callback(new Error('活动时间不能少于当前时间'))
      }
      if (Date.parse(this.dataForm.startTime) >= Date.parse(this.dataForm.endTime)) {
        callback(new Error('结束时间不能小于或等于开始时间'))
      } else if (this.dataForm.status === 1 && this.dataForm.groupActivityId && Date.parse(this.validEndTime) > Date.parse(this.dataForm.endTime)) {
        callback(new Error('结束时间只能延长，不能小于原本设定值'))
      } else {
        callback()
      }
    }
    var validateGroupNumber = (rule, value, callback) => {
      if (this.dataForm.groupNumber < 2) {
        callback(new Error('成团人数不能小于2人'))
      } else {
        callback()
      }
    }
    var validateGroupValidTime = (rule, value, callback) => {
      if (this.dataForm.groupValidTime < 15) {
        callback(new Error('成团有效时间不能小于15分钟'))
      } else if (this.dataForm.groupValidTime > 24 * 60) {
        callback(new Error('成团有效时间不能大于一天(1440分钟)'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      groupSelectProdVisible: false,
      roleList: [],
      selectTime: [],
      dataForm: {
        groupActivityId: null,
        shopId: null,
        activityName: null,
        status: null,
        startTime: null,
        endTime: null,
        groupValidTime: null,
        groupNumber: null,
        hasMaxNum: 0,
        maxNum: null,
        hasRobot: 0,
        hasLeaderPrice: 0,
        isPreheat: 0,
        hasGroupTip: 0,
        groupOrderCount: null,
        groupNumberCount: null,
        createTime: null,
        updateTime: null,
        groupProds: [],
        validEndTime: []
      },
      groupProdAndSkuLists: [],
      dataRule: {
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        groupNumber: [
          { required: true, message: '请输入成团人数', trigger: 'blur' },
          { validator: validateGroupNumber, trigger: 'blur' }
        ],
        groupValidTime: [
          { required: true, message: '请输入成团有效时间', trigger: 'blur' },
          { validator: validateGroupValidTime, trigger: 'blur' }
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
    ProdsSelect
  },
  methods: {
    init (groupActivityId) {
      this.dataForm.groupActivityId = groupActivityId || null
      this.dataForm.activityStatus = null
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.groupActivityId) {
          this.$http({
            url: this.$http.adornUrl('/group/activity/info/' + this.dataForm.groupActivityId),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            this.dataForm = data
            this.validEndTime = data.endTime
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/group/activity'),
            method: this.dataForm.groupActivityId ? 'put' : 'post',
            data: this.$http.adornData(this.dataForm)
          }).then(({ data }) => {
            this.selectTime = []
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
    },
    // 选择商品操作
    selectProdHandle () {
      this.groupSelectProdVisible = true
      this.$nextTick(() => {
        this.$refs.ProdsSelect.init(this.dataForm.groupProds)
      })
    },
    // 选商品回调
    selectGroupProds (prods) {
      if (prods) {
        let prodIds = []
        this.dataForm.groupProds = prods
        for (let index = 0; index < prods.length; index++) {
          prodIds.push(prods[index].prodId)
        }
        this.getProdAndSkuListsByProdIds(prodIds)
        prodIds = []
      }
    },
    // 通过商品id列表，查询所有的对应的sku列表
    getProdAndSkuListsByProdIds (prodIds) {
      if (prodIds) {
        this.$http({
          url: this.$http.adornUrl('/group/activity/getProdAndSkuLists?prodIds=' + prodIds),
          method: 'get',
          params: {}
        }).then(({ data }) => {
          this.groupProdAndSkuLists = data
        })
      }
    },
    // 删除活动商品
    deleteProd (index) {
      this.dataForm.groupProds.splice(index, 1)
    },
    // 提交并管理活动商品
    submitAndManageProds () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl('/group/activity'),
            method: this.dataForm.groupActivityId ? 'put' : 'post',
            data: this.$http.adornData(this.dataForm)
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
                if (!this.dataForm.groupActivityId) {
                  this.dataForm.groupActivityId = data
                }
                this.$emit('refreshDataList', 1, this.dataForm.groupActivityId)
              }
            })
          })
        }
      })
    }

  }
}
</script>
<style lang="scss">
.mod-groupActivity {
  .date-picker {
    width: 60%;
  }
  .card-prod-bottom {
    position: relative;
    text-align: left;
    .card-prod-name {
      margin: auto;
      padding: 0 6px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 118px;
      display: inline-block;
    }
    .card-prod-name-button {
      position: absolute;
      top: 24px;
      right: 10px;
    }
    .card-edit-sku-button {
      position: absolute;
      top: 24px;
      left: 10px;
    }
  }
  .groupActivity-input {
    width: 60%;
  }
  .auxiliary-font {
    font-size: 12px;
    color: #cbc0cb;
    line-height: 20px;
  }
  .font-color-red {
    color: crimson;
  }
}
</style>
