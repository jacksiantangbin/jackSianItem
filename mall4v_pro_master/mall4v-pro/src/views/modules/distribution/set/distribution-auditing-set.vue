<template>
  <div class="distribution-auditting-set gray-box top-redius border-bottom-gray">
    <div class="title">申请条件设置</div>
    <el-form ref="dataForm"
             :model="dataForm"
             :rules="rules"
             label-width="100px"
             class="set-form"
             size="mini">

      <el-form-item label="自动审核">
        <el-radio-group v-model="dataForm.autoCheck">
          <el-radio :label='0'>关闭</el-radio>
          <el-radio :label='1'>开启</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="申请条件">
        <!-- <div class="condition-item">
          <el-checkbox  disabled>验证手机号</el-checkbox>
          <span class="tips">选择多个条件时，需同时满足</span>
        </div> -->

        <!-- <div class="condition-item">
          <el-checkbox v-model="dataForm.auditingConditions.isFocus">关注公众号</el-checkbox>
        </div> -->
        <div class="condition-item">
          <el-checkbox v-model="isProd">购买指定商品</el-checkbox>
          <el-button plain
                     @click="prodsSelectHandle"
                     v-if="isProd">选择商品</el-button>
          <span class="tips">下单任意一件商品后计入</span>
          <el-row v-if="isProd">
            <div style="margin: 5px 10px 0px 0px;float:left"
                 v-for="(discountProd,index) in dataForm.auditingConditions.productDtoList"
                 :key="index">
              <el-card :body-style="{ padding: '0px' }"
                       style="height: 160px;width: 120px">
                <img :src=" discountProd.pic"
                     style="height:104px;width:100%">
                <div class="card-prod-bottom">
                  <span class="card-prod-name">{{discountProd.prodName}}</span>
                  <el-button type="text"
                             class="card-prod-name-button"
                             @click="deleteProd(index)">删除</el-button>
                </div>
              </el-card>

            </div>
          </el-row>

        </div>

        <div class="condition-item input-group">
          <el-checkbox v-model="isExpenseNumber"
                       @change="removeExpenseNumber"
                       class="input-checked">消费笔数大于等于</el-checkbox>
          <el-form-item prop="expenseNumber">
            <el-input v-model="dataForm.auditingConditions.expenseNumber"
                      style="width:240px"
                      v-bind:disabled="!isExpenseNumber">
              <template slot="append">次</template></el-input>
          </el-form-item>
          <span class="tips">下单次数，支付后计入</span>
        </div>

        <div class="condition-item input-group">
          <el-checkbox v-model="isExpenseAmount"
                       @change="removeExpenseAmount"
                       class="input-checked">消费金额大于等于</el-checkbox>
          <el-form-item prop="expenseAmount">
            <el-input v-model="dataForm.auditingConditions.expenseAmount"
                      style="width:240px"
                      v-bind:disabled="!isExpenseAmount">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <span class="tips">实付金额+积分抵扣+余额抵扣总金额，支付后计入</span>
        </div>

      </el-form-item>

      <el-form-item label="申请所需信息">
        <!-- <el-checkbox v-model="dataForm.auditingInfo.userMobile">绑定手机</el-checkbox> -->
        <el-checkbox v-model="dataForm.auditingInfo.realName">真实姓名</el-checkbox>
        <el-checkbox v-model="dataForm.auditingInfo.identityCardNumber">身份证号码</el-checkbox>
        <el-checkbox v-model="dataForm.auditingInfo.identityCardPic">身份证照片</el-checkbox>
      </el-form-item>
    </el-form>
    <!-- 商品选择弹窗-->
    <prods-select v-if="prodsSelectVisible"
                  ref="prodsSelect"
                  @refreshSelectProds="selectDistributionProds"></prods-select>
    <el-button @click="dataFormSubmit()">保存</el-button>
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
        url: this.$http.adornUrl('/distribution/distributionAuditingSet/info'),
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
      if (this.dataForm.auditingConditions.productDtoList == null) {
        this.dataForm.auditingConditions.productDtoList = []
      }
      if (this.dataForm.auditingConditions.expenseNumber > 0) {
        this.isExpenseNumber = true
      }
      if (this.dataForm.auditingConditions.expenseAmount > 0) {
        this.isExpenseAmount = true
      }
      if (this.dataForm.auditingConditions.prodList != null && this.dataForm.auditingConditions.prodList.length > 0) {
        this.isProd = true
      }
    },
    // 提交表单
    dataFormSubmit () {
      let auditingCondition
      if (this.dataForm.auditingConditions) {
        auditingCondition = JSON.parse(JSON.stringify(this.dataForm.auditingConditions))
        let prodList = []
        if (auditingCondition.productDtoList) {
          auditingCondition.productDtoList.forEach(element => {
            prodList.push(element.prodId)
          })
        }
        auditingCondition.prodList = prodList
        auditingCondition.productDtoList = undefined
      }
      this.$http({
        url: this.$http.adornUrl(`/distribution/distributionAuditingSet`),
        method: 'put',
        data: this.$http.adornData({
          'auditingSetId': this.dataForm.auditingSetId,
          'auditingConditions': auditingCondition,
          'auditingInfo': this.dataForm.auditingInfo,
          'autoCheck': this.dataForm.autoCheck
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

    // 清除消费次数数据
    removeExpenseAmount () {
      this.dataForm.auditingConditions.expenseAmount = null
    },
    // 清除消费金额数据
    removeExpenseNumber () {
      this.dataForm.auditingConditions.expenseNumber = null
    },
    // 显示添加指定商品弹框
    prodsSelectHandle () {
      this.prodsSelectVisible = true
      if (!this.dataForm.auditingConditions.productDtoList) {
        this.dataForm.auditingConditions.productDtoList = []
      }
      this.$nextTick(() => {
        this.$refs.prodsSelect.init(this.dataForm.auditingConditions.productDtoList)
      })
    },
    // 商品选择回调
    selectDistributionProds (prods) {
      if (prods) {
        this.dataForm.auditingConditions.productDtoList = []
        for (var i in prods) {
          this.dataForm.auditingConditions.productDtoList.push(prods[i])
        }
      }
    },
    // 删除指定商品
    deleteProd (index) {
      this.dataForm.auditingConditions.productDtoList.splice(index, 1)
    }
  },
  data () {
    // 消费次数校验规则
    var isExpenseNumber = (rule, value, callback) => {
      if (!this.isexpense_number) {
        callback()
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入整数'))
        return
      }
      if (parseInt(value) > 1000) {
        callback(new Error('请输入小于1000的数值'))
        return
      }
      if (parseInt(value) <= 0) {
        callback(new Error('请输入大于0的数值'))
        return
      }
      callback()
    }
    // 消费金额校验规则
    var isExpenseAmount = (rule, value, callback) => {
      if (!this.isexpense_amount) {
        callback()
      }
      // eslint-disable-next-line no-useless-escape
      var reg = /^(([0-9]+[\.]?[0-9]{1,2})|[1-9])$/
      if (!reg.test(value)) {
        callback(new Error('请输入整数或保留2位小数点的正数'))
        return
      }
      if (parseFloat(value) > 10000) {
        callback(new Error('请输入小于10000的数值'))
        return
      }
      callback()
    }
    return {
      prodsSelectVisible: false,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      // 表单数据
      // 是否指定商品
      isProd: false,
      // 是否指定用户
      isUser: false,
      // 是否指定单数
      isExpenseNumber: false,
      // 是否指定消费
      isExpenseAmount: false,
      dataForm: {
        // 申请条件
        'auditingConditions': {
          'isMobile': 0,
          'isFocus': 0,
          'userList': [],
          'prodList': [],
          'productDtoList': [],
          'expenseNumber': null,
          'expenseAmount': null
        },
        'auditingInfo': {
          'userMobile': false,
          'identityCardNumber': false,
          'realName': false,
          'identityCardPic': false
        },
        'autoCheck': 1
      },
      prodData: [],
      // 表单校验条件
      rules: {
        name: [
          { required: true, message: '请输入微客名称', trigger: 'blur' },
          { min: 1, max: 6, message: '长度在 1 到 6 个字符', trigger: 'blur' }
        ],
        expenseNumber: [
          { validator: isExpenseNumber, trigger: 'blur' }
        ],
        expenseAmount: [
          { validator: isExpenseAmount, trigger: 'blur' }
        ]

      }
    }
  }
}
</script>
<style lang="scss">
.distribution-auditting-set {
  .condition-item {
    margin-bottom: 10px;
  }
  .mod-marketing-distribution .valid-input {
    margin-left: 0px;
  }
  .input-group .el-form-item--mini {
    display: inline-block;
  }
  .input-checked {
    margin-right: 10px;
  }
}
</style>
