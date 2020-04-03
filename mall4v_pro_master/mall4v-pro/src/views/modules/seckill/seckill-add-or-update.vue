<template>
  <div>
    <el-dialog :title="!dataForm.seckillId ? '新增' : '查看'"
               :close-on-click-modal="false"
               :visible.sync="visible">
      <el-form :model="dataForm"
               :rules="dataRule"
               ref="dataForm"
               @keyup.enter.native="dataFormSubmit()"
               label-width="80px">
        <el-form-item label="活动名称"
                      prop="seckillName">
          <el-input v-model="dataForm.seckillName"
                    style="width:200px"
                    :disabled="!!dataForm.seckillId"></el-input>
        </el-form-item>
        <el-form-item label="活动时间"
                      prop="dateRange">
          <el-date-picker v-model="dataForm.dateRange"
                          type="datetimerange"
                          range-separator="至"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :disabled="!!dataForm.seckillId">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="活动标签"
                      prop="seckillTag">
          <el-input v-model="dataForm.seckillTag"
                    style="width:200px"
                    :disabled="!!dataForm.seckillId"></el-input>
        </el-form-item>
        <el-form-item label="每人限购"
                      prop="maxNum">
          <el-checkbox v-model="dataForm.hasMaxNum"
                       @click="handlerChangeMaxNum"
                       :disabled="!!dataForm.seckillId">开启限购</el-checkbox>
          <span v-show="dataForm.hasMaxNum">
            每人可购买
            <el-input-number v-model="dataForm.maxNum"
                             controls-position="right"
                             :min="1"
                             :max="1000"
                             size="mini"
                             style="width:100px"
                             :disabled="!!dataForm.seckillId"></el-input-number>
            件
          </span>

        </el-form-item>
        <el-form-item label="订单取消"
                      prop="maxCancelTime">
          买家，
          <el-input-number v-model="dataForm.maxCancelTime"
                           :min="2"
                           :max="15"
                           controls-position="right"
                           size="mini"
                           style="width:100px"
                           :disabled="!!dataForm.seckillId"></el-input-number>
          分钟未支付订单，订单取消
        </el-form-item>
        <el-form-item label="商品">
          <el-button plain
                     @click="prodsSelectHandle()"
                     style="float:left"
                     v-if="!dataForm.seckillId">选择商品</el-button>
          <el-alert title="警告：秒杀商品采用独立库存，请合理安排"
                    type="warning"
                    :closable="false"
                    style="width:295px;float:left;height:40px;margin-left: 10px;">
          </el-alert>

        </el-form-item>
        <el-form-item>
          <el-card :body-style="{ padding: '0px' }"
                   style="height: 160px;width: 120px"
                   v-if="prod != null">
            <img :src="prod.pic"
                 style="height:104px;width:100%">
            <div class="card-prod-bottom">
              <span class="card-prod-name">{{prod.prodName}}</span>
              <el-button type="text"
                         class="card-prod-name-button"
                         @click="deleteProd">删除</el-button>
            </div>
          </el-card>
        </el-form-item>
        <el-form-item v-if="skuList.length">
          <el-table :data="skuList"
                    border
                    style="width: 100%; margin-top: 20px">
            <el-table-column prop="prodName"
                             label="商品名称"
                             width="250">
              <template slot-scope="scope">
                {{scope.row.prodName}}
              </template>
            </el-table-column>
            <el-table-column prop="price"
                             label="销售价"
                             width="201">
              <template slot-scope="scope">
                <el-input-number :precision="2"
                                 :step="0.01"
                                 :min="0.01"
                                 :max="scope.row.price"
                                 v-model="scope.row.seckillPrice"
                                 :disabled="!!(!scope.row.status || dataForm.seckillId)">
                </el-input-number>
                <div>
                  价格（元）：{{scope.row.price}}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="stocks"
                             label="库存"
                             width="201">
              <template slot-scope="scope">
                <el-input-number type="number"
                                 v-model="scope.row.seckillStocks"
                                 :min="0"
                                 :disabled="!!(!scope.row.status || dataForm.seckillId)"></el-input-number>
                <div>
                  现有库存：{{scope.row.stocks}}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text"
                           size="small"
                           @click="changeSkuStatus(`${scope.$index}`)"
                           v-if="scope.row.status">禁用</el-button>
                <el-button type="text"
                           size="small"
                           @click="changeSkuStatus(`${scope.$index}`)"
                           v-else>启用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary"
                   @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
    <!-- 商品选择弹窗-->
    <prods-select v-if="prodsSelectVisible"
                  ref="prodsSelect"
                  :isSingle="true"
                  :dataUrl="'/seckill/seckill/canSekcillProdPage'"
                  @refreshSelectProds="selectSeckillProd"></prods-select>
  </div>
</template>

<script>
import ProdsSelect from '@/components/prods-select'
export default {
  data () {
    return {
      visible: false,
      prodsSelectVisible: false,

      dataForm: {
        dateRange: [],
        seckillId: null,
        seckillName: null,
        startTime: null,
        endTime: null,
        seckillTag: null,
        maxNum: 1,
        hasMaxNum: false,
        maxCancelTime: 2
      },
      prod: null,
      skuList: [],
      dataRule: {
        startTime: [
          { required: true, message: '时间不可为空', trigger: 'blur' }
        ],
        seckillName: [
          { required: true, message: '活动名称不可为空', trigger: 'blur' }
        ],
        maxCancelTime: [
          { required: true, message: '订单取消时间不可为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    ProdsSelect
  },
  methods: {
    init (seckillId) {
      this.dataForm.seckillId = seckillId || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        this.prod = null
        this.skuList = []
        if (this.dataForm.seckillId) {
          this.$http({
            url: this.$http.adornUrl('/seckill/seckill/info/' + this.dataForm.seckillId),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            data.seckill.dateRange = [data.seckill.startTime, data.seckill.endTime]
            this.dataForm = data.seckill
            this.dataForm.hasMaxNum = !!data.seckill.hasMaxNum
            this.prod = data.prod
            this.getSkuList(data.prod.prodId, data.seckillSkus)
          })
        }
      })
    },
    getSkuList (prodId, seckillSkus) {
      this.$http({
        url: this.$http.adornUrl('/sku/getAllSkuList'),
        method: 'get',
        params: this.$http.adornParams({
          prodId: prodId
        })
      }).then(({ data }) => {
        if (seckillSkus) {
          data.forEach(sku => {
            seckillSkus.forEach(seckillSku => {
              if (sku.skuId === seckillSku.skuId) {
                sku.seckillStocks = seckillSku.seckillStocks
                sku.seckillPrice = seckillSku.seckillPrice
              }
            })
          })
        }
        this.skuList = data
      })
    },
    // 表单提交
    dataFormSubmit () {
      // 秒杀不能更新
      if (this.dataForm.seckillId) {
        this.visible = false
        return
      }
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (!this.prod) {
            this.$message({
              message: '请选择活动商品',
              type: 'error'
            })
            return
          }
          if (!this.dataForm.hasMaxNum) {
            this.dataForm.maxNum = -1
          }
          this.dataForm.startTime = this.dataForm.dateRange[0]
          this.dataForm.endTime = this.dataForm.dateRange[1]
          this.dataForm.prodId = this.prod.prodId
          this.dataForm.seckillSkus = this.skuList.filter(sku => sku.status)

          let paramData = Object.assign({}, this.dataForm)
          paramData.hasMaxNum = this.dataForm.hasMaxNum ? 1 : 0
          this.$http({
            url: this.$http.adornUrl('/seckill/seckill'),
            method: 'post',
            data: this.$http.adornData(paramData)
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
    },
    // 显示添加指定商品弹框
    prodsSelectHandle () {
      this.prodsSelectVisible = true
      this.$nextTick(() => {
        this.$refs.prodsSelect.init(this.dataForm.discountProds)
      })
    },
    handlerChangeMaxNum (val) {
      if (val) {
        this.dataForm.maxNum = 1
      } else {
        this.dataForm.maxNum = -1
      }
    },
    // 添加指定商品
    selectSeckillProd (prods) {
      if (prods) {
        this.prod = prods[0]
        this.getSkuList(prods[0].prodId)
      }
    },
    deleteProd () {
      this.prod = null
      this.skuList = []
    },
    changeSkuStatus (tagIndex) {
      this.skuList[tagIndex].status = this.skuList[tagIndex].status ? 0 : 1
    }
  }
}
</script>
