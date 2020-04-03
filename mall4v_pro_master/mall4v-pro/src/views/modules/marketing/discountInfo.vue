<template>
  <div class="mod-discountInfo">
    <el-form :model="dataForm"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="120px"
             style="width:700px">
      <el-form-item label="活动名称"
                    prop="discountName"
                    :rules="[{required: true, message: '不能为空'}]">
        <el-input v-model="dataForm.discountName"
                  placeholder="活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动时间">
        <el-col :span="10">
          <el-form-item prop="startTime"
                        :rules="[{required: true, message: '不能为空'}]">
            <el-date-picker v-model="dataForm.startTime"
                            type="datetime"
                            placeholder="选择开始日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="1">-</el-col>
        <el-col :span="10">
          <el-form-item prop="endTime"
                        :rules="[{required: true, message: '不能为空'}]">
            <el-date-picker v-model="dataForm.endTime"
                            type="datetime"
                            placeholder="选择结束日期"
                            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="活动类型"
                    size="mini"
                    prop="discountRule">
        <el-radio-group v-model="dataForm.discountRule">
          <el-radio :label="0">满钱减钱</el-radio>
          <el-radio :label="1">满件减钱</el-radio>
          <el-radio :label="2">满钱打折</el-radio>
          <el-radio :label="3">满件打折</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="减免类型"
                    size="mini"
                    prop="discountType"
                    v-if="dataForm.discountRule === 0 || dataForm.discountRule === 1">
        <el-radio-group v-model="dataForm.discountType"
                        @change="discountTypeChange">
          <el-radio :label="0">按满足最高层级减一次</el-radio>
          <el-radio :label="1">每满一次减一次</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="优惠金额上限"
                    prop="maxReduceAmount"
                    :rules="[{required: true, message: '不能为空'}]">
        <el-input v-model="dataForm.maxReduceAmount"
                  placeholder="优惠金额上限"></el-input>
      </el-form-item>
      <!-- 卡片 -->
      <el-form-item label="优惠内容">
        <el-card class="box-card"
                 v-for="(discountItem, index) in dataForm.discountItems"
                 :key="discountItem.discountItemId"
                 style="margin-bottom:30px">
          <div slot="header"
               class="clearfix"
               v-if="!dataForm.discountType">
            <span>活动层级 {{index+1}}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="deleteActivityClass(index)"
                       v-if="dataForm.discountItems.length > 1">删除</el-button>
          </div>
          <el-form-item class="text item"
                        label="条件"
                        style="margin-bottom:20px"
                        :rules="[{required: true, message: '不能为空'}]">
            满 <el-input size="small"
                      v-model="discountItem.needAmount"
                      style="width:200px">
              <template slot="append">{{discountItemTexts[0]}}</template>
            </el-input>
            <el-button type="text"
                       disabled>请输入大于等于0的2位小数</el-button>
          </el-form-item>
          <el-form-item class="text item"
                        label="优惠"
                        :rules="[{required: true, message: '不能为空'}]">
            减 <el-input size="small"
                      v-model="discountItem.discount"
                      style="width:200px">
              <template slot="append">{{discountItemTexts[1]}}</template>
            </el-input>
            <el-button type="text"
                       disabled>请输入大于0的2位小数</el-button>
          </el-form-item>
        </el-card>
      </el-form-item>
      <!-- 卡片 -->
      <el-form-item>
        <el-button plain
                   @click="addActivityClass()"
                   v-if="!dataForm.discountType">添加活动</el-button>
      </el-form-item>
      <el-form-item label="适用商品类型"
                    size="mini"
                    prop="suitableProdType"
                    :rules="[{required: true, message: '不能为空'}]">
        <el-radio-group v-model="dataForm.suitableProdType">
          <el-radio :label="0">全部商品参与</el-radio>
          <el-radio :label="1">指定商品参与</el-radio>
          <el-radio :label="2">指定商品不参与</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="width:1200px"
                    v-if="dataForm.suitableProdType !== 0">
        <el-row>
          <el-col :span="3"
                  v-for="(discountProd, index) in dataForm.discountProds"
                  :key="index">
            <el-card :body-style="{ padding: '0px' }"
                     style="height: 160px;width: 120px">
              <img :src="discountProd.pic"
                   style="height:104px;width:100%">
              <div class="card-prod-bottom">
                <span class="card-prod-name">{{discountProd.prodName}}</span>
                <el-button type="text"
                           class="card-prod-name-button"
                           @click="deleteProd(index)">删除</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button plain
                   v-if="dataForm.suitableProdType === 1 || dataForm.suitableProdType === 2"
                   @click="prodsSelectHandle()">选择商品</el-button>
      </el-form-item>
      <!-- 商品 -->
      <el-form-item label="状态"
                    size="mini"
                    prop="status">
        <el-radio-group v-model="dataForm.status">
          <el-radio :label="1">开启</el-radio>
          <el-radio :label="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer"
          class="dialog-footer">
      <el-button size="mini"
                 @click="closeTag()">取消</el-button>
      <el-button type="primary"
                 size="mini"
                 @click="dataFormSubmit()">确定</el-button>
    </span>
    <!-- 商品选择弹窗-->
    <prods-select v-if="prodsSelectVisible"
                  ref="prodsSelect"
                  @refreshSelectProds="selectDiscountProds"></prods-select>
  </div>
</template>

<script>
import ProdsSelect from '@/components/prods-select'
export default {
  data () {
    return {
      dataForm: {
        discountId: 0,
        discountName: '',
        discountRule: 0,
        discountType: 0,
        suitableProdType: 0,
        maxReduceAmount: 0,
        shopId: '',
        startTime: '',
        endTime: '',
        status: 0,
        discountItems: [],
        discountProds: []
      },
      prodsSelectVisible: false,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl
    }
  },
  components: {
    ProdsSelect
  },
  computed: {
    discountItemTexts: function () {
      let texts = []
      if (this.dataForm.discountRule === 0 || this.dataForm.discountRule === 2) {
        texts[0] = '元'
      } else {
        texts[0] = '件'
      }
      if (this.dataForm.discountRule === 0 || this.dataForm.discountRule === 1) {
        texts[1] = '元'
      } else {
        texts[1] = '折'
      }
      return texts
    }
  },
  activated () {
    // if (this.$route.query.discountId !== undefined) {
    //   sessionStorage.setItem('discountInfo-params', JSON.stringify(this.$route.query || '{}'))
    // }
    // let sessionStorageParams = JSON.parse(sessionStorage.getItem('discountInfo-params'))
    if (this.$route.query.discountId !== undefined) {
      this.dataForm.discountId = this.$route.query.discountId
      this.getDataList()
    }
  },
  watch: {
    'dataForm.discountRule': function (val) {
      if (val === 2 || val === 3) {
        this.dataForm.discountType = 0
      }
    }
  },
  methods: {
    getDataList () {
      this.$nextTick(() => {
        this.$refs.dataForm.resetFields()
        this.dataForm.discountItems = [{}]
      })
      if (this.dataForm.discountId) {
        this.$http({
          url: this.$http.adornUrl(`/admin/discount/info/${this.dataForm.discountId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm = data
        })
      }
    },
    // 添加活动层级
    addActivityClass () {
      this.dataForm.discountItems.push({})
    },
    // 删除活动层级
    deleteActivityClass (index) {
      this.dataForm.discountItems.splice(index, 1)
    },
    // 删除指定商品
    deleteProd (index) {
      this.dataForm.discountProds.splice(index, 1)
    },
    // 显示添加指定商品弹框
    prodsSelectHandle () {
      this.prodsSelectVisible = true
      this.$nextTick(() => {
        this.$refs.prodsSelect.init(this.dataForm.discountProds)
      })
    },
    // 添加指定商品
    selectDiscountProds (prods) {
      if (prods) {
        this.dataForm.discountProds = prods
      }
    },
    discountTypeChange () {
      this.dataForm.discountItems = [{}]
    },
    // 关闭当前标签页
    closeTag () {
      // this.$store.commit('common/removeMainActiveTab')
      this.$router.go(-1)
    },
    // 表单提交
    dataFormSubmit () {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/admin/discount`),
            method: this.dataForm.discountId ? 'put' : 'post',
            data: this.$http.adornData({
              'discountId': this.dataForm.discountId || undefined,
              'shopId': this.dataForm.shopId,
              'discountName': this.dataForm.discountName,
              'discountRule': this.dataForm.discountRule,
              'discountType': this.dataForm.discountType,
              'suitableProdType': this.dataForm.suitableProdType,
              'maxReduceAmount': this.dataForm.maxReduceAmount,
              'startTime': this.dataForm.startTime,
              'endTime': this.dataForm.endTime,
              'status': this.dataForm.status,
              'discountItems': this.dataForm.discountItems,
              'discountProds': this.dataForm.discountProds
            })
          }).then(({ data }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                // this.$store.commit('common/removeMainActiveTab')
                this.$router.go(-1)
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
.mod-discountInfo {
}
</style>
