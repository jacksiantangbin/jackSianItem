<template>
  <el-dialog title="退款处理"
             :close-on-click-modal="false"
             :visible.sync="visible"
             width="80%">
    <el-form :model="dataForm"
             ref="dataForm"
             @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <div class="mod-order-refundOrderInfo">
        <div class="content">
          <div class="order-number">
            <div class="num-cont">
              <el-form-item label="退款编号:">
                <span class="text">{{dataForm.refundSn}}</span>
              </el-form-item>
              <el-form-item>
                <div v-if="dataForm.applyType == 1">
                  <el-steps :active="onlyRefundStepsStatus"
                            align-center
                            :process-status="onlyRefundProcessStatus">
                    <el-step title="买家 申请退款"></el-step>
                    <el-step title="商家 同意退款"></el-step>
                    <el-step title="退款成功"></el-step>
                  </el-steps>
                </div>
                <div v-else>
                  <el-steps :active="stepsStatus"
                            align-center
                            :process-status="processStatus">
                    <el-step title="买家 申请退货退款"></el-step>
                    <el-step title="商家 同意退货退款"></el-step>
                    <el-step title="买家 已发货"></el-step>
                    <el-step title="商家 确认收货"></el-step>
                    <el-step title="退款成功"></el-step>
                  </el-steps>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="order-state">
            <div class="state-cont">
              <div class="state-title">
                <el-form-item label="退货类型:">
                  <template slot-scope="scope">
                    <el-tag v-if="dataForm.applyType == 1"
                            size="small"
                            type="warning">仅退款</el-tag>
                    <el-tag v-if="dataForm.applyType == 2"
                            size="small"
                            type="warning">退货退款</el-tag>
                  </template>
                </el-form-item>
                <el-form-item label="退货方式:">
                  <template slot-scope="scope">
                    <el-tag v-if="dataForm.refundType == 1"
                            size="small"
                            type="warning">整单退款</el-tag>
                    <el-tag v-if="dataForm.refundType == 2"
                            size="small"
                            type="warning">单个物品退款</el-tag>
                  </template>
                </el-form-item>
                <el-form-item v-if="dataForm.decisionTime && !dataForm.refundTime">
                  <el-button type="primary"
                             size="small"
                             plain
                             @click="refundRequest(dataForm.refundSn)">发放退款</el-button>
                  <el-button type="primary"
                             size="small"
                             plain
                             @click="refundRevocation(dataForm.refundSn)">撤回上一步</el-button>
                </el-form-item>
              </div>

              <div class="order-info">
                <div class="order-details">
                  <div class="detail-title">
                    <img src="~@/assets/img/car.png"
                         alt="">
                    <span class="prompt">退货详情</span>
                  </div>
                  <div class="detail-cont">
                    <div class="detail01">
                      <div class="text-width">
                        <!-- <span class="revise-addr"
                              @click="changeAddr(dataForm.addrOrderId)">
                          <img src="~@/assets/img/revise.png"
                               alt="" />修改地址
                        </span> -->
                        <el-form-item label="订单编号:">
                          <span>{{dataForm.orderNumber}}</span>
                        </el-form-item>
                        <el-form-item label="实付总额:">
                          <span>{{dataForm.orderAmount}}</span>
                        </el-form-item>
                        <el-form-item label="退款金额:">
                          <span>{{dataForm.refundAmount}}</span>
                        </el-form-item>
                        <el-form-item label="申请时间:">
                          <span>{{dataForm.applyTime}}</span>
                        </el-form-item>
                        <el-form-item label="退款原因:">
                          <span>{{dataForm.buyerReason}}</span>
                        </el-form-item>
                        <el-form-item label="退款说明:">
                          <span>{{dataForm.buyerDesc}}</span>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                  <template v-if="this.dataForm.refundDelivery && this.dataForm.refundDelivery.deyNu">
                    <div class="detail-title">
                      <img src="~@/assets/img/car.png"
                           alt="">
                      <span class="prompt">物流详情</span>
                    </div>
                    <div class="detail-cont">
                      <div class="detail01">
                        <div class="text-width">
                          <el-form-item v-if="this.dataForm.refundDelivery && this.dataForm.refundDelivery.deyName"
                                        label="物流名称:">
                            <span>{{this.dataForm.refundDelivery.deyName}}</span>
                          </el-form-item>
                          <el-form-item v-if="this.dataForm.refundDelivery && this.dataForm.refundDelivery.deyNu"
                                        label="物流编号:">
                            <span>{{this.dataForm.refundDelivery.deyNu}}</span>
                          </el-form-item>
                          <el-form-item v-if="this.dataForm.refundDelivery && this.dataForm.refundDelivery.senderRemarks"
                                        label="买家备注:">
                            <span>{{this.dataForm.refundDelivery.senderRemarks}}</span>
                          </el-form-item>
                          <el-form-item v-if="this.dataForm.refundDelivery && this.dataForm.refundDelivery.senderMobile"
                                        label="买家电话:">
                            <span>{{this.dataForm.refundDelivery.senderMobile}}</span>
                          </el-form-item>
                        </div>
                      </div>

                    </div>
                  </template>
                </div>
                <div class="buyers">
                  <div class="detail-title">
                    <img width="18px"
                         height="18px"
                         src="~@/assets/img/buyer.png"
                         alt=""
                         style="margin-right:15px">
                    <el-form-item label="退货凭证:"
                                  style="margin-top:22px"
                                  label-width="74px">
                    </el-form-item>
                  </div>
                  <div class="buyers-info">
                    <div class="detail02">
                      <div class="refundImg"
                           v-for="(item,index) in refundphotos"
                           :key="index">
                        <el-popover placement="right"
                                    title=""
                                    trigger="click">
                          <img slot="reference"
                               :src="resourcesUrl + item"
                               style="height: 150px !important; width: auto !important"
                               class="showLicense">
                          <img :src="resourcesUrl + item"
                               style="max-height: 720px;max-width: 720px" />
                        </el-popover>
                      </div>
                    </div>
                  </div>
                  <template v-if="this.dataForm.refundDelivery && this.dataForm.refundDelivery.imgs">
                    <div class="detail-title"
                         style="margin-top:40px">
                      <img width="18px"
                           height="18px"
                           src="~@/assets/img/buyer.png"
                           alt=""
                           style="margin-right:15px">
                      <el-form-item label="物流凭证:"
                                    style="margin-top:22px"
                                    label-width="74px">
                      </el-form-item>
                    </div>
                    <div class="buyers-info">
                      <div class="detail02">
                        <div class="refundImg"
                             v-for="(item,index) in refundDeliveryPhotos"
                             :key="index">
                          <el-popover placement="right"
                                      title=""
                                      trigger="click">
                            <img slot="reference"
                                 :src="resourcesUrl + item"
                                 style="height: 150px !important; width: auto !important"
                                 class="showLicense">
                            <img :src="resourcesUrl + item"
                                 style="max-height: 720px;max-width: 720px" />
                          </el-popover>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
              <div class="item-list">
                <el-table :data="dataForm.orderItems"
                          border>
                  <el-table-column prop=""
                                   label="退款商品">
                    <template slot-scope="scope">
                      <img :src="resourcesUrl + scope.row.pic"
                           width="100"
                           height="100" />
                      <span>{{scope.row.prodName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="price"
                                   label="单价"
                                   width="180"
                                   align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.price}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="count"
                                   label="数量"
                                   width="180"
                                   align="center">
                    <template slot-scope="scope">
                      <span v-if="dataForm.refundType == 1">{{scope.row.prodCount}}</span>
                      <span v-if="dataForm.refundType == 2">{{dataForm.goodsNum}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="productTotalAmount"
                                   label="物品总价"
                                   width="180"
                                   align="center">
                    <template slot-scope="scope">
                      <span v-if="dataForm.refundType == 1">{{scope.row.productTotalAmount}}</span>
                      <span v-if="dataForm.refundType == 2">{{bigProductTotalAmount(scope.row.price, dataForm.goodsNum)}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="actualTotal"
                                   label="实付金额"
                                   width="180"
                                   align="center">
                    <template slot-scope="scope">
                      <span v-if="dataForm.refundType == 1">{{scope.row.actualTotal}}</span>
                      <span v-if="dataForm.refundType == 2">{{bigActualTotal(scope.row.actualTotal, scope.row.prodCount)}}</span>
                      <el-tag v-if="scope.row.shareReduce > 0"
                              type="danger"
                              size="mini"
                              effect="dark">惠</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column v-if="dataForm.refundType == 2"
                                   prop="productTotalAmount"
                                   label="退款金额"
                                   width="180"
                                   align="center">
                    <template slot-scope="scope">
                      <span>{{dataForm.refundAmount}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div v-if="dataForm.returnMoneySts === 1"
                   class="sellerRemark">
                <el-row>
                  <el-col :span="2">
                    <div>申请审批:</div>
                  </el-col>
                  <el-col :span="22">
                    <div>
                      <el-radio-group v-model="isAgreeRefund">
                        <!-- <el-radio :label="1">待审核</el-radio> -->
                        <el-radio :label="2">{{dataForm.applyType === 1 ? '同意退款' : '同意'}}</el-radio>
                        <el-radio :label="3">不同意</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="sellerRemark"
                   v-if="dataForm.applyType === 2">
                <el-row>
                  <el-col :span="2">
                    <div>收货地址：</div>
                  </el-col>
                  <el-col :span="22">
                    <div v-if="dataForm.returnMoneySts == 1">
                      <el-select v-model="dataForm.refundAddrId"
                                 placeholder="请选择">
                        <el-option v-for="item in addrList"
                                   :key="item.refundAddrId"
                                   :label="item.province+item.city+item.area+item.addr"
                                   :value="item.refundAddrId">
                        </el-option>
                      </el-select>
                    </div>
                    <div v-if="dataForm.refundDelivery">{{this.dataForm.refundDelivery.receiverAddr}}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div v-if="dataForm.shipTime && !dataForm.cancelTime && !dataForm.rejectTime"
                   class="sellerRemark">
                <el-row>
                  <el-col :span="2">
                    <div>退货状态:</div>
                  </el-col>
                  <el-col :span="22">
                    <div>
                      <el-radio-group v-model="isReceiver"
                                      :disabled="dataForm.returnMoneySts != 3">
                        <!-- <el-radio :label="1">待审核</el-radio> -->
                        <el-radio :label="1">已收货</el-radio>
                        <el-radio :label="0">未收货</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div v-if="dataForm.shipTime && !dataForm.cancelTime && !dataForm.rejectTime"
                   class="sellerRemark">
                <el-row>
                  <el-col :span="2">
                    <div>退货申请:</div>
                  </el-col>
                  <el-col :span="22">
                    <div>
                      <el-radio-group v-model="isAgreeRefund"
                                      :disabled="dataForm.returnMoneySts != 3">
                        <!-- <el-radio :label="1">待审核</el-radio> -->
                        <el-radio :label="2">同意退款</el-radio>
                        <el-radio :label="3">拒绝退款</el-radio>
                      </el-radio-group>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="sellerRemark"
                   v-if="isAgreeRefund === 3">
                <el-row>
                  <el-col :span="2">
                    <div>拒绝原因：</div>
                  </el-col>
                  <el-col :span="22">
                    <div>
                      <el-input type="textarea"
                                v-model="dataForm.rejectMessage"
                                :rows="4"></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div class="sellerRemark">
                <el-row>
                  <el-col :span="2">
                    <div>商家备注:</div>
                  </el-col>
                  <el-col :span="22">
                    <div>
                      <el-input type="textarea"
                                v-model="dataForm.sellerMsg"
                                :disabled="dataForm.returnMoneySts != 1"
                                :rows="4"></el-input>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div style="float:right">
                <el-form-item>
                  <el-row>
                    <el-button v-if="dataForm.returnMoneySts === 1"
                               type="primary"
                               size="mini"
                               plain
                               @click="checkHandel()">确认处理</el-button>
                    <el-button v-if="dataForm.returnMoneySts === 3"
                               type="primary"
                               size="mini"
                               plain
                               @click="returnMoneyHandle()">确定处理</el-button>
                  </el-row>
                </el-form-item>
              </div>
            </div>
          </div>

          <div class="order-log">
            <div class="log-title">
              <span>退款日志</span>
            </div>
            <div class="log-cont">
              <el-form-item v-if="dataForm.applyTime"
                            label-width="10px">
                <span>{{dataForm.applyTime}} 提交退款申请,等待商家处理</span>
              </el-form-item>
              <el-form-item v-if="dataForm.applyType === 2 && dataForm.handelTime"
                            label-width="10px">
                <span>{{dataForm.handelTime}} 商家已处理,等待买家发货</span>
              </el-form-item>

              <el-form-item v-if="dataForm.applyType === 1 && dataForm.handelTime"
                            label-width="10px">
                <span>{{dataForm.handelTime}} 商家已处理,等待商家退款</span>
              </el-form-item>
              <el-form-item v-if="dataForm.shipTime"
                            label-width="10px">
                <span>{{dataForm.shipTime}} 买家发货,等待商家收货</span>
              </el-form-item>
              <el-form-item v-if="dataForm.receiveTime"
                            label-width="10px">
                <span>{{dataForm.receiveTime}} 商家已收货，等待商家同意退款</span>
              </el-form-item>
              <el-form-item v-if="dataForm.decisionTime"
                            label-width="10px">
                <span>{{dataForm.decisionTime}} 同意退款，等待发放退款</span>
              </el-form-item>
              <el-form-item v-if="dataForm.refundTime"
                            label-width="10px">
                <span>{{dataForm.refundTime}} 退款成功</span>
              </el-form-item>

              <el-form-item v-if="dataForm.handelTime && dataForm.returnMoneySts === -1"
                            label-width="10px">
                <span>{{dataForm.updateTime}} 退款关闭</span>
              </el-form-item>
              <el-form-item v-if="dataForm.returnMoneySts === 6"
                            label-width="10px">
                <span>{{dataForm.cancelTime}} 退款关闭 买家已撤销</span>
              </el-form-item>
              <el-form-item v-if="dataForm.returnMoneySts == 7"
                            label-width="10px">
                <span>{{dataForm.rejectTime}} 退款失败 商家已拒绝</span>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <!-- 弹窗, 新增 / 修改 -->
    <!-- <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="refreshChange"></add-or-update> -->
  </el-dialog>
</template>

<script>
// import AddOrUpdate from './order-addr'
import Big from 'big.js'
export default {
  data () {
    return {
      visible: false,
      addrList: [],
      dataForm: {
        // refundId: '',
        // shopId: '',
        // orderId: '',
        // orderNumber: '',
        // orderAmount: '',
        // orderItemId: '',
        // refundSn: '',
        // flowTradeNo: '',
        // outRefundNo: '',
        // payType: '',
        // payTypeName: '',
        // userId: '',
        // goodsNum: '',
        // refundAmount: '',
        // applyType: '',
        // refundSts: '',
        // returnMoneySts: '',
        // applyTime: '',
        // handelTime: '',
        // refundTime: '',
        // photoFiles: '',
        // buyerMsg: '',
        // sellerMsg: '',
        // shipTime: '',
        // receiveTime: '',
        // receiveMessage: '',
        // rejectMessage: '',
        // refundAddrId: null,
        // refundApplySts: null,
        // refundDelivery: {
        //   receiverAddr: '',
        //   receiverName: '',
        //   receiverMobile: '',
        //   receiverTelephone: ''
        // }
      },
      refundphotos: [],
      refundDeliveryPhotos: [],
      receiveMessage: '',
      isAgreeReceiver: '',
      isAgreeRefund: 2,
      isReceiver: 0,
      resourcesUrl: window.SITE_CONFIG.resourcesUrl,
      addOrUpdateVisible: false,
      devyVisible: false,
      refundAddr: '',
      deyNu: '',
      deyName: '',
      senderMobile: '',
      senderRemarks: ''
    }
  },
  components: {
    // AddOrUpdate,
  },
  watch: {
    visible: function () {
      if (!this.visible) {
        this.devyVisible = false
        this.addOrUpdateVisible = false
      }
    }
  },
  computed: {
    onlyRefundStepsStatus: function () {
      let index = 0
      if (this.dataForm.handelTime) {
        index++
      }
      if (this.dataForm.cancelTime || this.dataForm.refundTime || this.dataForm.rejectTime || this.dataForm.refundTime || this.dataForm.rejectTime) {
        index++
      }
      return index
    },
    onlyRefundProcessStatus: function () {
      switch (this.dataForm.returnMoneySts) {
        case 1:
        case 2:
          return 'finish'
        case 5:
          return 'success'
        default:
          return 'error'
      }
    },

    stepsStatus: function () {
      let index = 0
      if (this.dataForm.handelTime) {
        index++
      }
      if (this.dataForm.shipTime) {
        index++
      }
      if (this.dataForm.receiveTime) {
        index++
      }
      if (this.dataForm.cancelTime || this.dataForm.refundTime || this.dataForm.rejectTime || this.dataForm.refundTime || this.dataForm.rejectTime) {
        index++
      }
      return index
    },
    processStatus: function () {
      switch (this.dataForm.returnMoneySts) {
        case 1:
        case 2:
        case 3:
        case 4:
          return 'finish'
        case 5:
          return 'success'
        default:
          return 'error'
      }
    }

  },
  methods: {
    init (id) {
      this.dataForm.refundId = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
      })
      this.refundphotos = []
      this.refundDeliveryPhotos = []
      this.receiveMessage = ''
      this.isAgreeRefund = 2
      if (this.dataForm.refundId) {
        this.$http({
          url: this.$http.adornUrl(`/order/refund/info/${this.dataForm.refundId}`),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({ data }) => {
          this.dataForm = data
          if (this.dataForm.photoFiles) {
            this.refundphotos = this.dataForm.photoFiles.split(',')
          }
          if (this.dataForm.refundDelivery && this.dataForm.refundDelivery.imgs) {
            this.refundDeliveryPhotos = this.dataForm.refundDelivery.imgs.split(',')
          }
          this.getRefundAddrList()
        })
      }
    },

    getDataList () {
      this.$http({
        url: this.$http.adornUrl(`/order/refund/info/${this.dataForm.refundId}`),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.dataForm = data
      })
    },
    // 表单提交
    dataFormSubmit () {
    },
    // 修改地址
    changeAddr (val) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(val)
      })
    },

    // 确认收货
    confirmHandel () {
    },

    /**
     * 加载收货地址模板
     */
    getRefundAddrList () {
      this.$http({
        url: this.$http.adornUrl('/shop/refundAddr/list'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.addrList = data
        if (this.dataForm.refundAddrId) {
          let index = this.addrList.findIndex(item => item.refundAddrId === this.dataForm.refundAddrId)
          if (index || index === 0) {
            let refAddr = this.addrList[index]
            this.refundAddr = refAddr.province + refAddr.city + refAddr.area + refAddr.addr
          }
        }
      })
    },

    /**
     * 提交处理
     */
    checkHandel () {
      let tempRefundAddrId = this.isAgreeRefund === 2 ? this.dataForm.refundAddrId : undefined
      this.$http({
        url: this.$http.adornUrl(`/order/refund/process`),
        method: 'put',
        data: this.$http.adornData({
          refundId: this.dataForm.refundId,
          refundSts: this.isAgreeRefund,
          refundSn: this.dataForm.refundSn,
          rejectMessage: this.dataForm.rejectMessage,
          sellerMsg: this.dataForm.sellerMsg,
          refundAddrId: tempRefundAddrId
        })
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
    },

    /**
     * 确定退款
     */
    returnMoneyHandle () {
      this.$http({
        url: this.$http.adornUrl(`/order/refund/returnMoney`),
        method: 'put',
        data: this.$http.adornData({
          refundId: this.dataForm.refundId,
          refundSts: this.isAgreeRefund,
          refundSn: this.dataForm.refundSn,
          rejectMessage: this.dataForm.rejectMessage,
          sellerMsg: this.dataForm.sellerMsg,
          isReceiver: this.isReceiver
        })
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
    },
    /**
     * 退款请求（发放退款）
     */
    refundRequest (refundSn) {
      this.$http({
        url: this.$http.adornUrl(`/order/refund/refundRequest`),
        method: 'put',
        data: refundSn
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
    },
    /**
     * 撤回上一步（返回同意退款前）
     */
    refundRevocation (refundSn) {
      this.$http({
        url: this.$http.adornUrl(`/order/refund/refundRevocation`),
        method: 'put',
        data: refundSn
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
    },

    // 精度运算-乘法
    bigProductTotalAmount: function (a, b) {
      return new Big(a).times(b)
    },
    // 精度运算-除法
    bigActualTotal: function (a, b) {
      if (a == null) {
        return ''
      }
      return new Big(a).div(b).times(this.dataForm.goodsNum)
    }
  }
}
</script>


<style lang="scss" scoped>
.mod-order-refundOrderInfo {
  height: 100%;
  width: 100%;
  font: 14px Arial, "PingFang SC", "Hiragino Sans GB", STHeiti,
    "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
  color: #495060;

  .content {
    margin: 0 20px;
  }

  .content .steps {
    margin-top: 50px;
  }

  .order-number .number-text {
    font-weight: bold;
  }

  .order-number .text {
    font-size: 14px;
    color: #8a8a8a;
  }

  .order-state .state-title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title-left span {
    font-weight: bold;
  }

  .title-left .text {
    color: red;
  }

  .state-title .title-mid {
    display: flex;
    align-items: center;
  }

  .title-mid img {
    width: 18px;
    height: 18px;
  }

  .title-mid .mid-text {
    color: red;
  }

  .title-mid .text {
    color: #8a8a8a;
  }

  .content .order-state {
    position: relative;
    margin-top: 50px;
    /* border-bottom: 1px solid #e9eaec; */
  }

  .order-state .order-info {
    width: 100%;
    /* border-top: 1px solid #e9eaec; */
    margin: 50px 0;
    display: flex;
  }

  .order-info img {
    width: 18px;
    height: 18px;
    margin-right: 15px;
  }

  .order-info .detail-title {
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
  }

  .order-info .detail-title img {
    height: 18px !important;
    width: 18px !important;
  }

  .order-info .order-details {
    width: 50%;
    border-right: 1px solid #e9eaec;
  }

  .order-info .detail-cont {
    position: relative;
  }

  .detail-cont .detail01 {
    display: flex;
    height: 100%;
    line-height: 25px;
    margin-top: 15px;
  }

  .sellerRemark {
    /* display: flex;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e9eaec; */
    margin-top: 20px;
  }

  .sellerRemark .sellerRemark-title {
    height: 120px;
    line-height: 120px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    width: 5%;
  }

  .sellerRemark .content {
    height: 120px;
    line-height: 120px;
    float: right;
    margin-bottom: 30px;
    width: 95%;
  }

  .detail01 .text-width {
    width: 100%;
  }

  .detail02 .text-width {
    width: 100%;
  }

  .detail-cont .revise-addr {
    color: #4395ff;
    position: absolute;
    top: 15px;
    right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .order-info .detail-cont {
    border-top: 1px dashed #e9eaec;
    margin: 15px 20px 0 0;
  }

  .order-info .buyers {
    width: 100%;
    margin-left: 20px;
  }

  .buyers .buyers-info {
    border-top: 1px dashed #e9eaec;
    margin-top: 15px;
    position: relative;
  }

  .buyers .detail02 {
    display: flex;
    height: 100%;
    line-height: 25px;
    margin-top: 15px;
  }

  .buyers img {
    width: 100px;
  }

  .buyers .buyers-info .detail02 .refundImg {
    display: flex;
    flex-wrap: wrap;
  }

  .buyers .buyers-info .detail02 .refundImg img {
    width: 150px;
    height: 150px;
  }

  .buyers .revise-remarks {
    color: #4395ff;
    position: absolute;
    top: 15px;
    right: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .order-state .item-info {
    padding-left: 70%;
    margin: 25px 0;
  }

  .item-info span {
    margin-bottom: 15px;
    line-height: 30px;
  }

  .item-info .text {
    position: absolute;
    right: 0;
  }

  .item-info .amount {
    font-size: 18px;
    color: red;
  }

  .order-log .log-title {
    margin-top: 20px;
    height: 50px;
    width: 100%;
    line-height: 50px;
    font-weight: bold;
    border-bottom: 1px dashed #e9eaec;
  }

  .order-log .log-cont {
    margin-top: 15px;
    color: #4395ff;
  }
}
</style>



