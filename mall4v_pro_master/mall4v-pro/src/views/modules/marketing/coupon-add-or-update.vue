<template>
  <el-dialog class="mod-coupon-add-or-update"
             :title="dataForm.couponId ? '修改优惠券' : '新增优惠券'"
             :close-on-click-modal="false"
             :visible.sync="visible">
    <el-form :model="dataForm"
             :rules="dataRule"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="100px">
      <el-form-item label="优惠券名称"
                    prop="couponName">
        <el-input v-model="dataForm.couponName"
                  placeholder="优惠券名称"
                  :disabled="dataForm.couponId !== 0"></el-input>
      </el-form-item>
      <el-form-item label="优惠券副标题"
                    prop="subTitle">
        <el-input v-model="dataForm.subTitle"
                  placeholder="优惠券副标题"
                  :disabled="dataForm.couponId !== 0"></el-input>
      </el-form-item>
      <el-form-item label="投放状态"
                    size="mini"
                    prop="putonStatus">
        <el-radio-group v-model="dataForm.putonStatus">
          <el-radio :label="0">等待投放</el-radio>
          <el-radio :label="1">投放</el-radio>
          <el-radio :label="-1">取消投放</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠券类型"
                    size="mini"
                    prop="couponType">
        <el-radio-group v-model="dataForm.couponType"
                        :disabled="dataForm.couponId !== 0">
          <el-radio :label="1">代金券</el-radio>
          <el-radio :label="2">折扣券</el-radio>
          <!-- <el-radio :label="3">兑换券</el-radio> -->
        </el-radio-group>
      </el-form-item>
      <el-form-item label="减免金额"
                    prop="reduceAmount"
                    v-if="dataForm.couponType === 1">
        <el-input v-model="dataForm.reduceAmount"
                  placeholder="减免金额"
                  type="number"
                  :disabled="dataForm.couponId !== 0"><template slot="append">元</template></el-input>
      </el-form-item>
      <el-form-item label="折扣额度"
                    prop="couponDiscount"
                    v-if="dataForm.couponType === 2">
        <el-input v-model="dataForm.couponDiscount"
                  placeholder="折扣额度"
                  type="number"
                  :disabled="dataForm.couponId !== 0"><template slot="append">折</template></el-input>
      </el-form-item>
      <el-form-item label="使用条件"
                    prop="cashCondition">
        消费金额满 <el-input v-model="dataForm.cashCondition"
                  placeholder="使用条件"
                  type="number"
                  :disabled="dataForm.couponId !== 0"><template slot="append">元</template></el-input>
      </el-form-item>
      <el-form-item label="生效时间"
                    np
                    size="mini"
                    prop="validTimeType">
        <el-radio-group v-model="dataForm.validTimeType"
                        :disabled="dataForm.couponId !== 0">
          <el-radio :label="1">固定时间</el-radio>
          <el-radio :label="2">领取后生效</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开始时间"
                    prop="startTime"
                    v-if="dataForm.validTimeType === 1">
        <el-date-picker :disabled="dataForm.couponId !== 0"
                        v-model="dataForm.startTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间"
                    prop="endTime"
                    v-if="dataForm.validTimeType === 1">
        <el-date-picker v-model="dataForm.endTime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="领券以后"
                    prop="afterReceiveDays"
                    v-if="dataForm.validTimeType === 2">
        <el-input v-model="dataForm.afterReceiveDays"
                  type="number"
                  :disabled="dataForm.couponId !== 0"><template slot="append">天</template></el-input>
      </el-form-item>
      <el-form-item label="有效天数"
                    prop="validDays"
                    v-if="dataForm.validTimeType === 2">
        <el-input v-model="dataForm.validDays"
                  type="number"
                  :disabled="dataForm.couponId !== 0"><template slot="append">天</template></el-input>
      </el-form-item>
      <el-form-item label="每人限领"
                    prop="limitNum">
        <el-input v-model="dataForm.limitNum"
                  type="number"><template slot="append">张</template></el-input>
      </el-form-item>
      <el-form-item label="库存"
                    prop="stocks">
        <el-input v-model="dataForm.stocks"
                  type="number"
                  :disabled="dataForm.couponId !== 0"><template slot="append">张</template></el-input>
      </el-form-item>
      <el-form-item label="适用商品"
                    size="mini"
                    prop="suitableProdType">
        <el-radio-group v-model="dataForm.suitableProdType">
          <el-radio :label="0">全部商品参与</el-radio>
          <el-radio :label="1">指定商品参与</el-radio>
          <el-radio :label="2">指定商品不参与</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button plain
                   v-if="dataForm.suitableProdType === 1 || dataForm.suitableProdType === 2"
                   @click="prodsSelectHandle()">选择商品</el-button>
      </el-form-item>
      <!-- 商品 -->
      <el-form-item style="width:1200px"
                    v-if="dataForm.suitableProdType !== 0">
        <el-row>
          <el-col :span="3"
                  v-for="(couponProd, index) in dataForm.couponProds"
                  :key="index">
            <el-card :body-style="{ padding: '0px' }"
                     style="height: 160px;width: 120px">
              <img :src="couponProd.pic"
                   style="height:104px;width:100%">
              <div class="card-prod-bottom">
                <span class="card-prod-name">{{couponProd.prodName}}</span>
                <el-button type="text"
                           class="card-prod-name-button"
                           @click="deleteProd(index)">删除</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
    <!-- 商品选择弹窗-->
    <prods-select v-if="prodsSelectVisible"
                  ref="prodsSelect"
                  @refreshSelectProds="selectCouponProds"></prods-select>
  </el-dialog>
</template>

<script>
import ProdsSelect from '@/components/prods-select'
export default {
  data () {
    var validate = (rule, value, callback) => {
      if (!/^[1-9]\d*$|^[1-9]\d*\.\d\d?$|^0\.\d\d?$/.test(value)) {
        callback(new Error('请输入保留两位小数的正数'))
      } else {
        callback()
      }
    }
    var validateTime = (rule, value, callback) => {
      if (Date.parse(this.dataForm.startTime) >= Date.parse(this.dataForm.endTime)) {
        callback(new Error('开始时间不能小于或等于结束时间'))
      } else {
        callback()
      }
    }
    return {
      visible: false,
      dataForm: {
        couponId: 0,
        couponName: '',
        subTitle: '',
        couponType: 1,
        reduceAmount: 0,
        couponDiscount: 0,
        cashCondition: 0,
        validTimeType: 1,
        startTime: null,
        endTime: null,
        afterReceiveDays: 0,
        validDays: 0,
        stocks: 1,
        suitableProdType: 0,
        limitNum: 1,
        putonStatus: 0,
        couponProds: []
      },
      page: {
        total: 0, // 总页数
        currentPage: 1, // 当前页数
        pageSize: 10 // 每页显示多少条
      },
      errorTip: false,
      dataListSelections: [],
      prodsSelectVisible: false,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      dataRule: {
        couponName: [
          { required: true, message: '优惠券名称不能为空', trigger: 'blur' }
        ],
        couponType: [
          { required: true, message: '优惠券类型不能为空', trigger: 'blur' }
        ],
        reduceAmount: [
          { required: true, message: '减免金额不能为空', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        limitNum: [
          { required: true, message: '限领数量不能为空', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        couponDiscount: [
          { required: true, message: '折扣额度不能为空', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '开始时间不能为空', trigger: 'blur' },
          { validator: validateTime, trigger: 'blur' }
        ],
        endTime: [
          { required: true, message: '结束时间不能为空', trigger: 'blur' },
          { validator: validateTime, trigger: 'blur' }
        ],
        cashCondition: [
          { required: true, message: '使用条件不能为空', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        validTimeType: [
          { required: true, message: '生效时间不能为空', trigger: 'blur' }
        ],
        stocks: [
          { required: true, message: '库存不能为空', trigger: 'blur' },
          { validator: validate, trigger: 'blur' }
        ],
        suitableProdType: [
          { required: true, message: '适用商品类型不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    ProdsSelect
  },
  watch: {
    visible: function () {
      if (this.visible === false) {
        this.prodsSelectVisible = false
      }
    }
  },
  methods: {
    // 获取数据列表
    init (couponId) {
      this.dataForm.couponId = couponId || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
      })
      if (this.dataForm.couponId) {
        this.getDataList()
      }
    },
    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/admin/coupon/info/${this.dataForm.couponId}`),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.dataForm = data
      })
    },
    // 选择点击事件
    selectChangeHandle (selection) {
      this.dataList.forEach((tableItem) => {
        let selectedProdIndex = selection.findIndex((selectedProd) => {
          if (!selectedProd) {
            return false
          }
          return selectedProd.prodId === tableItem.prodId
        })
        let dataSelectedProdIndex = this.dataListSelections.findIndex((dataSelectedProd) => dataSelectedProd.prodId === tableItem.prodId)
        if (selectedProdIndex > -1 && dataSelectedProdIndex === -1) {
          this.dataListSelections.push(tableItem)
        } else if (selectedProdIndex === -1 && dataSelectedProdIndex > -1) {
          this.dataListSelections.splice(dataSelectedProdIndex, 1)
        }
      })
    },
    // 显示添加指定商品弹框
    prodsSelectHandle () {
      this.prodsSelectVisible = true
      this.$nextTick(() => {
        this.$refs.prodsSelect.init(this.dataForm.couponProds)
      })
    },
    // 删除指定商品
    deleteProd (index) {
      this.dataForm.couponProds.splice(index, 1)
    },
    // 添加指定商品
    selectCouponProds (prods) {
      if (prods) {
        this.dataForm.couponProds = prods
      }
    },
    // 表单提交
    dataFormSubmit () {
      if (this.errorTip) {
        this.$message({
          message: '数量不能小于0',
          type: 'error',
          duration: 1500
        })
        return
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/admin/coupon`),
            method: this.dataForm.couponId ? 'put' : 'post',
            data: this.$http.adornData({
              'couponId': this.dataForm.couponId || undefined,
              'couponName': this.dataForm.couponName,
              'subTitle': this.dataForm.subTitle,
              'couponType': this.dataForm.couponType,
              'reduceAmount': this.dataForm.reduceAmount,
              'couponDiscount': this.dataForm.couponDiscount,
              'cashCondition': this.dataForm.cashCondition,
              'validTimeType': this.dataForm.validTimeType,
              'startTime': this.dataForm.startTime,
              'endTime': this.dataForm.endTime,
              'afterReceiveDays': this.dataForm.afterReceiveDays,
              'validDays': this.dataForm.validDays,
              'stocks': this.dataForm.stocks,
              'suitableProdType': this.dataForm.suitableProdType,
              'limitNum': this.dataForm.limitNum,
              'putonStatus': this.dataForm.putonStatus,
              'couponProds': this.dataForm.couponProds
            })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.dataForm.couponProds = []
                this.$emit('refreshDataList', this.page)
                this.visible = false
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
.mod-coupon-add-or-update {
}
</style>
