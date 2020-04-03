<template>
  <div class="mod-home">
    <!-- <p class="strong">严正声明：</p>
    <p class="content">亚米商城专业版并非一个开源软件，作者保留全部的权利。 擅自窃用，即属严重侵权行为，与盗窃无异。产生的一切任何后果责任由侵权者自负。
      擅自窃用，必将追究法律责任！！！</p> -->

    <!-- 数据 -->

    <!-- 实时概况板块 -->
    <div class="realtime-situation">
      <!-- 栏目标题行 -->
      <div class="title-line">
        <p class="blue-vertical"></p>
        <span class="title-txt">实时概况</span>
        <span class="title-time">更新时间：{{this.nowDate}}</span>
      </div>
      <!-- /栏目标题行 -->

      <!-- 实时概况 -->
      <div class="realtime">
        <div class="realtime-left">
          <p class="pay-amount-text">支付金额</p>
          <p class="pay-amount-num">{{dataInfo.payActualTotal}}</p>
          <p class="pay-amount-tips">昨天全天：更新中</p>
          <!-- 图表 -->
          <div class="realtime-chart-box"
               id="time-survey"
               style="width:100%;height:250px">
          </div>
          <!-- /图表 -->
        </div>
        <div class="realtime-right">
          <!-- 上 -->
          <div class="wrapper__summary">
            <!-- 支付客户数 -->
            <div class="summary__box">
              <div class="summary__item">
                <!-- 客户数icon -->
                <svg class="summary__svg"
                     width="40"
                     height="40">
                  <use xlink:href="#data-paid-customer">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 40 40"
                         id="data-paid-customer">
                      <g id="data-paid-customer_Symbols"
                         stroke="none"
                         stroke-width="1"
                         fill="none"
                         fill-rule="evenodd">
                        <g id="data-paid-customer_Group-16-Copy-8">
                          <g id="data-paid-customer_Group-16"
                             transform="translate(1.000000, 1.000000)"
                             stroke="#3388FF">
                            <circle id="data-paid-customer_Oval-4-Copy-2"
                                    cx="19"
                                    cy="19"
                                    r="18.5"></circle>
                          </g>
                          <g id="data-paid-customer_Page-1"
                             transform="translate(9.000000, 11.000000)"
                             stroke="#0983F6"
                             stroke-linecap="round"
                             stroke-linejoin="round">
                            <path d="M8.5572,7.2923 C8.3042,7.2923 7.7482,7.0643 7.5792,6.9803 C7.4112,6.7273 7.2432,6.3903 7.1592,5.9683 C7.4112,5.7153 7.5792,5.2943 7.7482,4.9573 C7.9162,4.8733 8.0012,4.7043 8.0852,4.5353 C8.1692,4.3673 8.2542,4.0303 8.1692,3.7773 L8.1692,3.6923 L8.0852,3.6083 C8.0852,3.6083 8.0012,3.6083 8.0012,3.5243 C8.1692,2.2603 7.9162,1.4173 7.3272,0.9953 C6.4002,0.3213 4.6292,0.3213 3.7032,1.0803 C3.1132,1.5853 2.9442,2.1753 3.1132,3.5243 L3.0292,3.5243 L2.9442,3.6083 L2.9442,3.6923 C2.9442,4.0303 2.9442,4.2823 3.1132,4.4513 C3.1972,4.6203 3.2822,4.7883 3.4502,4.8733 C3.6192,5.2943 3.7862,5.6313 4.1242,5.9683 C4.0392,6.3053 3.9552,6.5583 3.7862,6.8113 C3.6192,7.0643 3.3662,7.0643 3.0292,7.0643 L1.9332,7.0643 C0.7522,8.0753 0.4992,10.1823 0.4992,11.3623 C1.0902,11.9523 2.9132,12.1053 4.4432,12.2053"
                                  id="data-paid-customer_Stroke-1"></path>
                            <path d="M18.4566,10.0985 C18.0356,10.0985 17.6976,10.0985 17.4446,9.9305 C17.1926,9.5925 16.9396,9.0865 16.8546,8.4965 C17.1926,8.0755 17.5296,7.5695 17.6976,6.9795 C17.9506,6.8115 18.1196,6.6425 18.2036,6.3905 C18.3726,6.1375 18.3726,5.7155 18.3726,5.2095 L18.3726,5.0415 L18.2886,5.1255 C18.2036,5.1255 18.2036,5.0415 18.1196,5.0415 C18.3726,3.2715 18.0356,2.0915 17.1076,1.4165 C15.7596,0.4055 13.2306,0.4055 11.8826,1.5015 C11.0396,2.1755 10.7866,3.1025 11.0396,5.1255 C11.0396,5.1255 10.9556,5.1255 10.9556,5.2095 L10.7866,5.2945 L10.7866,5.4625 C10.7866,5.9685 10.8716,6.3055 10.9556,6.6425 C11.0396,6.8955 11.2086,7.1485 11.4616,7.2325 C11.6296,7.8225 11.9676,8.4125 12.3886,8.8345 C12.3046,9.3395 12.1356,9.7615 11.9676,10.0145 C11.7146,10.3515 11.3766,10.4355 10.8716,10.3515 L9.2696,10.3515 C7.5846,11.8685 7.2466,14.8185 7.1626,16.5885 C8.8486,18.2735 19.6366,18.1895 21.8276,16.5885 C22.0806,14.6495 21.1536,11.6155 19.8056,10.2665 C19.4686,10.0985 18.9626,10.0985 18.4566,10.0985 Z"
                                  id="data-paid-customer_Stroke-3"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </use>
                </svg>
                <!-- /客户数icon -->
                <div class="customer-number-info">
                  <p class="text-tit">支付客户数</p>
                  <p class="text-num">{{this.dataInfo.payUserCount}}</p>
                  <p class="text-tips">昨天全天：更新中</p>
                </div>
              </div>
            </div>
            <!-- /支付客户数 -->

            <!-- 支付订单数 -->
            <div class="summary__box">
              <div class="summary__item">
                <!-- 客户数icon -->
                <svg class="summary__svg"
                     width="40"
                     height="40">
                  <use xlink:href="#data-paid-order">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 40 40"
                         id="data-paid-order">
                      <g id="data-paid-order_Symbols"
                         stroke="none"
                         stroke-width="1"
                         fill="none"
                         fill-rule="evenodd">
                        <g id="data-paid-order_Group-16-Copy-7">
                          <g id="data-paid-order_Group-16"
                             transform="translate(1.000000, 1.000000)"
                             stroke="#3388FF">
                            <circle id="data-paid-order_Oval-4-Copy-2"
                                    cx="19"
                                    cy="19"
                                    r="18.5"></circle>
                          </g>
                          <g id="data-paid-order_Page-1"
                             transform="translate(12.000000, 10.000000)"
                             stroke="#0983F6"
                             stroke-linecap="round"
                             stroke-linejoin="round">
                            <path d="M13.0181,2.2989 L14.5171,2.2989 C15.1171,2.2989 15.6411,2.8239 15.6411,3.4239 L15.6411,18.1899 C15.6411,18.7899 15.1171,19.3139 14.5171,19.3139 L1.6241,19.3139 C1.0251,19.3139 0.4991,18.7899 0.4991,18.1899 L0.4991,3.4239 C0.4991,2.8239 1.0251,2.2989 1.6241,2.2989 L2.8241,2.2989"
                                  id="data-paid-order_Stroke-1"></path>
                            <path d="M4.8472,7.546 L11.2932,7.546"
                                  id="data-paid-order_Stroke-3"></path>
                            <path d="M4.8472,11.0689 L11.2932,11.0689"
                                  id="data-paid-order_Stroke-5"></path>
                            <path d="M4.8472,14.5919 L11.2932,14.5919"
                                  id="data-paid-order_Stroke-7"></path>
                            <path d="M9.0455,3.5733 L7.0965,3.5733 C6.4965,3.5733 5.9725,3.0483 5.9725,2.4483 L5.9725,1.6243 C5.9725,1.0243 6.4965,0.5003 7.0965,0.5003 L9.0455,0.5003 C9.6455,0.5003 10.1695,1.0243 10.1695,1.6243 L10.1695,2.4483 C10.0945,3.1233 9.6455,3.5733 9.0455,3.5733 Z"
                                  id="data-paid-order_Stroke-9"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </use>
                </svg>
                <!-- /客户数icon -->
                <div class="customer-number-info">
                  <p class="text-tit">支付订单数</p>
                  <p class="text-num">{{this.dataInfo.payOrderCount}}</p>
                  <p class="text-tips">昨天全天：更新中</p>
                </div>
              </div>
            </div>
            <!-- /支付订单数 -->

          </div>

          <!-- 下 -->
          <div class="wrapper__summary">
            <!-- 成功退款金额 -->
            <div class="summary__box">
              <div class="summary__item">
                <!-- 客户数icon -->
                <svg class="summary__svg"
                     width="40"
                     height="40">
                  <use xlink:href="#data-refund-price">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 40 40"
                         id="data-refund-price">
                      <g id="data-refund-price_Symbols"
                         stroke="none"
                         stroke-width="1"
                         fill="none"
                         fill-rule="evenodd">
                        <g id="data-refund-price_Group-16-Copy-6">
                          <circle id="data-refund-price_Oval-4-Copy-2"
                                  cx="20"
                                  cy="20"
                                  stroke="#3388FF"
                                  r="18.5"></circle>
                          <g id="data-refund-price_Page-1"
                             transform="translate(8.000000, 10.000000)"
                             stroke="#0983F6"
                             stroke-linecap="round"
                             stroke-linejoin="round">
                            <path d="M8.6223,12.5681 L16.1373,12.5681"
                                  id="data-refund-price_Stroke-1"></path>
                            <path d="M8.6223,9.4109 L16.1373,9.4109"
                                  id="data-refund-price_Stroke-2"></path>
                            <path d="M12.5451,9.4109 L12.5451,16.1989"
                                  id="data-refund-price_Stroke-3"></path>
                            <polyline id="data-refund-price_Stroke-4"
                                      points="10.1311 5.8669 12.5081 9.6559 14.8851 6.0249"></polyline>
                            <path d="M0.5002,8.3498 L2.3652,10.3138 C2.4252,4.9018 6.7682,0.5588 12.1802,0.4998 C17.5932,0.5588 21.9352,4.9018 21.9942,10.3138 C22.0542,15.7268 17.6522,20.1278 12.1802,20.1278 C8.5842,20.0888 5.4612,18.1598 3.7522,15.2818"
                                  id="data-refund-price_Stroke-5"></path>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </use>
                </svg>
                <!-- /客户数icon -->
                <div class="customer-number-info">
                  <p class="text-tit">成功退款金额</p>
                  <p class="text-num">{{this.dataInfo.refund}}</p>
                  <p class="text-tips">昨天全天：更新中</p>
                </div>
              </div>
            </div>
            <!-- /成功退款金额 -->

            <!-- 客单价 -->
            <div class="summary__box">
              <div class="summary__item">
                <!-- 客户数icon -->
                <svg class="summary__svg"
                     width="40"
                     height="40">
                  <use xlink:href="#data-unit-price">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         xmlns:xlink="http://www.w3.org/1999/xlink"
                         viewBox="0 0 40 40"
                         id="data-unit-price">
                      <g id="data-unit-price_Symbols"
                         stroke="none"
                         stroke-width="1"
                         fill="none"
                         fill-rule="evenodd">
                        <g id="data-unit-price_Group-16-Copy-5">
                          <g id="data-unit-price_Group-16"
                             transform="translate(1.000000, 1.000000)"
                             stroke="#3388FF">
                            <circle id="data-unit-price_Oval-4-Copy-2"
                                    cx="19"
                                    cy="19"
                                    r="18.5"></circle>
                          </g>
                          <g id="data-unit-price_Page-1"
                             transform="translate(9.000000, 11.000000)"
                             stroke="#0983F6"
                             stroke-linecap="round"
                             stroke-linejoin="round">
                            <path d="M9.7956,19.4544 C9.6326,19.6174 9.3086,19.6174 9.1456,19.4544 L0.6436,10.8444 C0.4806,10.6814 0.4266,10.3024 0.6436,10.1944 L10.3366,0.4994 L18.4056,0.9874 C18.7316,0.9874 18.8936,1.2584 18.9476,1.5294 L19.5976,9.7604 L10.0116,19.2384 L9.9576,19.2924 L9.7956,19.4544 Z"
                                  id="data-unit-price_Stroke-1"></path>
                            <path d="M9.5788,6.782 L13.3148,10.519"
                                  id="data-unit-price_Stroke-3"></path>
                            <path d="M7.6833,8.6775 L11.4193,12.4145"
                                  id="data-unit-price_Stroke-5"></path>
                            <path d="M11.2029,8.8401 L7.5749,12.4681"
                                  id="data-unit-price_Stroke-7"></path>
                            <polyline points="12.449 4.2366 11.637 8.4066 15.97 7.5406"
                                      id="data-unit-price_Stroke-9"></polyline>
                          </g>
                        </g>
                      </g>
                    </svg>
                  </use>
                </svg>
                <!-- /客户数icon -->
                <div class="customer-number-info">
                  <p class="text-tit">客单价</p>
                  <p class="text-num">{{this.dataInfo.onePrice}}</p>
                  <p class="text-tips">昨天全天：更新中</p>
                </div>
              </div>
            </div>
            <!-- /客单价 -->

          </div>

        </div>
      </div>

    </div>
    <!-- /实时概况板块 -->

    <!-- 整体看板 -->
    <div class="whole-plate">
      <!-- 栏目标题行 -->
      <div class="title-line">
        <p class="blue-vertical"></p>
        <span class="title-txt">整体看板</span>
      </div>
      <!-- /栏目标题行 -->
      <div class="related-income">
        <div class="related-income-item">
          <p class="item-tit">当天支付金额(元)</p>
          <p class="item-num">
            <span class="item-num-price">{{this.dataInfo.payActualTotal}}</span>
          </p>
        </div>
        <div class="related-income-item">
          <p class="item-tit">本月已完成(元)</p>
          <p class="item-num">
            <span class="item-num-price">{{this.sumPayActualTotal}}</span>
          </p>
        </div>
        <!-- <div class="related-income-item">
          <p class="item-tit">本月目标(元)</p>
          <p class="item-num">
            <a href="">去设置</a>
          </p>
        </div>
        <div class="related-income-item">
          <p class="item-tit">本月进度</p>
          <p class="item-num">
            <span>-</span>
          </p>
        </div> -->
      </div>
      <!-- 图表 -->
      <div class="integral-plate"
           id="integral-plate"
           style="width:100%;height:300px;"></div>

      <!-- /图表 -->

    </div>
    <!-- /整体看板 -->

    <!-- 退款看板 -->
    <div class="refund-plate">
      <!-- 栏目标题行 -->
      <div class="title-line">
        <p class="blue-vertical"></p>
        <span class="title-txt">退款看板</span>
      </div>
      <!-- /栏目标题行 -->
      <div class="refund-chart-box">
        <!-- 成功退款金额（元） -->
        <div class="successed-refund">
          <div class="refund-chart-msg">
            <div class="msg-tit-txt">
              <p class="msg-tit">成功退款金额（元）</p>
              <p class="msg-price">{{this.refundRateInfo.payActualTotal}}</p>
            </div>
            <div class="msg-txt-p">
              <!-- <p class="compare">
                <span class="compare-left">较前一日</span>
                <span class="compare-right">0.00%-</span>
              </p> 
              <p class="compare">
                <span class="compare-left">较上周同期
                </span>
                <span class="compare-right">0.00%-</span>
              </p>
              -->
            </div>
          </div>
          <!-- 图表 -->
          <div class="refund-chart"
               id="ref-chart"
               style="width:100%;height:250px"></div>
          <!--/ 图表 -->
        </div>

        <!-- 退款率 -->
        <div class="refund-rate-box">
          <div class="refund-chart-msg">
            <div class="msg-tit-txt">
              <p class="msg-tit">退款率</p>
              <p class="msg-price">{{this.refundRateInfo.refundRate}}%</p>
            </div>
            <!-- 
            <div class="msg-txt-p">
              <p class="compare">
                <span class="compare-left">较前一日</span>
                <span class="compare-right">0.00%-</span>
              </p>
              <p class="compare">
                <span class="compare-left">较上周同期
                </span>
                <span class="compare-right">0.00%-</span>
              </p>
            </div>
            -->
          </div>
          <!-- 图表 -->
          <div class="refund-chart"
               id="refPer-chart"
               style="width:100%;height:250px"></div>
          <!--/ 图表 -->
        </div>
      </div>

      <!-- 下 -->
      <div class="ranking-box">
        <div class="ranking-left">
          <div class="ranking-title">退款商品排行</div>
          <table class="table">
            <tr class="table-tit">
              <td class="table-tit-item rank">排名</td>
              <td class="table-tit-item prod">商品</td>
              <td class="table-tit-item ref">成功退款金额(元)</td>
            </tr>
            <tr v-for="(item,index) in refundRankForActualTotal"
                :key="index">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
              <td>{{item[2]}}</td>
            </tr>
          </table>

        </div>
        <div class="ranking-right">
          <div class="ranking-title">退款原因排行</div>
          <table class="table">
            <tr class="table-tit">
              <td class="table-tit-item ranks">排名</td>
              <td class="table-tit-item prods">原因</td>
              <td class="table-tit-item refs">成功退款金额(元)</td>
              <td class="table-tit-item prop">占比</td>
            </tr>
            <tr v-for="(item,index) in refundRankForCause"
                :key="index"
                class="table-tit">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
              <td>{{item[2]}}</td>
              <td>{{item[3]}}%</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- /退款看板 -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: [0, 1],
      sumPayActualTotal: 0.00,
      dataForm: {},
      nowActualTotal: [],
      nowDate: null,
      payYesterdayActualTotal: [],
      dataArray: [],
      timeArray: [],
      dataInfo: {},
      rate: [],
      refundRateInfo: [],
      refundRankForActualTotal: [],
      refundRankForCause: []
    }
  },
  mounted () {
    this.getpayActualTotalByDay()
    this.getpayActualTotalByHour()
    this.getOrderRefundDayByTime()
    this.getRefundInfo()
    this.getRefundRankingByProd()
    this.getRefundRankingByReason()
    this.getpayInfo()
    this.getRefSumEchartData()
    this.getRefPerEchartData()
    this.getIntegralPlate()
  },
  updated () {
    // this.getpayInfo()
  },
  methods: {
    getRealTimechartData () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      this.nowDate = year + seperator1 + month + seperator1 + strDate
      const myChart = this.$echarts.init(document.getElementById('time-survey'))
      const option = {
        // title: {
        //   text: '折线图堆叠'
        // },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今天', '昨天']
        },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '今天',
            type: 'line',
            stack: '总量',
            data: this.dataForm.nowActualTotal
          },
          {
            name: '昨天',
            type: 'line',
            stack: '总量',
            data: this.dataForm.payYesterdayActualTotal
          }
        ]

      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    getpayActualTotalByHour () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/getActualTotalByHour'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.dataForm = data
          this.getRealTimechartData()
          // this.nowActualTotal = JSON.parse('[' + this.dataForm.nowActualTotal + ']')
          // this.payYesterdayActualTotal = JSON.parse('[' + this.dataForm.nowActualTotal + ']')
          this.dataListLoading = false
        }
      })
    },
    getpayActualTotalByDay () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/getActualTotalByDay'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.dataArray = data
          this.dataListLoading = false
          this.dataForm = data
          this.timeArray = []
          this.dataArray = []
          for (var j = 0, len = this.dataForm.length; j < len; j++) {
            this.timeArray.push(this.dataForm[j].dates)
            this.dataArray.push(this.dataForm[j].payActualTotal)
            if (j === len - 1) { this.sumPayActualTotal = this.dataForm[j].onePrice }
          }
          this.getIntegralPlate()
          this.dataListLoading = false
        }
      })
    },
    getOrderRefundDayByTime () {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/getOrderRefundDayByTime'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.dataForm = data
          this.timeArray = []
          this.dataArray = []
          for (var j = 0, len = this.dataForm.length; j < len; j++) {
            this.timeArray.push(this.dataForm[j].refundDateToString)
            this.dataArray.push(this.dataForm[j].payActualTotal)
            this.rate.push(this.dataForm[j].refundRate)
          }
          this.getRefSumEchartData()
          this.getRefPerEchartData()
          this.dataListLoading = false
        }
      })
    },
    getpayInfo () {
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/orderPayByShopId'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.dataInfo = data
          this.dataListLoading = false
        }
      })
    },
    getRefundInfo () {
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/getOrderRefundByTime'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.refundRateInfo = data
          this.dataListLoading = false
        }
      })
    },
    getRefundRankingByProd () {
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/getRefundRankingByProd'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.dataForm = data
          for (var j = 0, len = this.dataForm.length; j < len; j++) {
            var refund = []
            refund.push(j + 1)
            refund.push(this.dataForm[j].refundPordName)
            refund.push(this.dataForm[j].payActualTotal)
            this.refundRankForActualTotal.push(refund)
          }

          this.dataListLoading = false
        }
      })
    },
    getRefundRankingByReason () {
      this.$http({
        url: this.$http.adornUrl('/admin/statisticsOrder/getRefundRankingByReason'),
        method: 'get'
      }).then(({ data }) => {
        if (data) {
          this.dataForm = data
          for (var j = 0, len = this.dataForm.length; j < len; j++) {
            var refund = []
            refund.push(j + 1)
            refund.push(this.dataForm[j].buyerReason)
            refund.push(this.dataForm[j].payActualTotal)
            refund.push(this.dataForm[j].refundRate)
            this.refundRankForCause.push(refund)
          }

          this.dataListLoading = false
        }
      })
    },
    getRefSumEchartData () {
      const myChart = this.$echarts.init(document.getElementById('ref-chart'))
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        // legend: {
        //   data: ['成功退款金额（元）']
        // },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeArray
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '成功退款金额（元）',
            type: 'line',
            stack: '金额',
            data: this.dataArray
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    getRefPerEchartData () {
      const myChart = this.$echarts.init(document.getElementById('refPer-chart'))
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.timeArray
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '退款率',
            type: 'line',
            stack: '金额',
            data: this.rate
            // data: [0, 0, 0, 0, 0, 0]
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    },
    getIntegralPlate () {
      const myChart = this.$echarts.init(document.getElementById('integral-plate'))
      const option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['全店支付金额']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.timeArray,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '全店支付金额',
            type: 'bar',
            barWidth: '60%',
            // data: [10, 52, 32, 17, 36, 28, 19, 34, 24]
            data: this.dataArray
          }
        ]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function () {
        myChart.resize()
      })
    }
  }
}
</script>

<style lang="scss">
.mod-home {
  // font-size: 1em;
  // line-height: 2em;
  // .strong {
  //   margin: 0;
  //   font-size: 17px;
  //   font-weight: bold;
  //   text-align: center;
  //   margin-bottom: 0.5em;
  // }
  // .content {
  //   font-size: 16px;
  //   padding: 0 30px;
  // }

  // 栏目标题行
  .title-line {
    background: #f8f8f8;
    padding: 12px;
    font-size: 14px;
    line-height: 1em;
  }
  .blue-vertical {
    display: inline-block;
    width: 3px;
    height: 1em;
    background: #155bd4;
    margin-right: 0.5em;
    vertical-align: middle;
  }
  .title-txt {
    color: #000;
    font-weight: bold;
    margin-right: 1em;
    vertical-align: middle;
  }
  .title-time {
    color: #999999;
    vertical-align: middle;
  }

  .realtime {
    display: flex;
    margin-top: 40px;
    margin-left: 20px;
    padding: 0;
  }

  /**
  实时概况
   */
  .realtime-situation {
    margin-bottom: 40px;
    //左边
    .realtime-left {
      flex: 1;
      width: 50%;
    }
    .pay-amount-text {
      font-weight: bold;
    }
    .pay-amount-num {
      font-size: 24px;
      min-height: 24px;
      font-weight: 700;
      margin: 10px 0;
      line-height: 24px;
    }
    .pay-amount-tips {
      color: #9b9b9b;
    }
    // 图表
    .realtime-chart-box {
      left: -40px !important;
      margin-top: 10px;
    }

    .wrapper__summary:nth-child(2) {
      margin-top: 120px;
    }
    // 右边
    .realtime-right {
      flex: 1;
      width: 50%;
    }
    .realtime .wrapper__summary {
      display: flex;
    }
    .realtime .wrapper__summary .summary__box {
      display: inline-flex;
      flex: 1;
      margin-left: 20px;
    }
    .realtime .wrapper__summary .summary__item {
      position: relative;
      width: 100%;
    }
    //客户数信息
    .customer-number-info {
      margin-left: 60px;
    }
    .text-tit {
      font-weight: 600;
    }
    .text-num {
      font-size: 24px;
      min-height: 24px;
      font-weight: 700;
      margin: 15px 0;
      line-height: 24px;
    }
    .text-tips {
      color: #9b9b9b;
    }
    // 客户数icon
    svg {
      fill: currentColor;
      vertical-align: middle;
    }
    .realtime .wrapper__summary .summary__svg {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  /**
  整体看板
   */
  .whole-plate {
    margin: 20px 0 30px;
    .related-income {
      margin: 30px 0 0 20px;
      display: flex;
      flex-wrap: wrap;
    }
    .related-income-item {
      flex: 1;
    }
    .item-tit {
      margin-bottom: 15px;
    }
    .item-num {
      height: 24px;
      line-height: 24px;
    }
    .item-num-price {
      font-size: 18px;
      font-weight: 700;
    }
    .item-num a {
      color: #155bd4;
      text-decoration: none;
    }
    .integral-plate {
      margin-top: 15px;
    }
  }

  /**
  退款看板
   */
  .refund-plate {
    //  上
    .refund-chart-box {
      display: flex;
      width: 100%;
      margin-top: 15px;
      .successed-refund,
      .refund-rate-box {
        display: flex;
        flex-direction: column;
        background: #fbfbfb;
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
      }
      .successed-refund {
        margin-right: 10px;
      }
      .refund-chart-msg {
        margin-bottom: 25px;
      }
      .msg-tit {
        font-size: 15px;
        margin-bottom: 15px;
      }
      .msg-price {
        margin: 6px 0;
        line-height: 26px;
        padding: 0;
        font-size: 24px;
        font-weight: bold;
        line-height: 1em;
      }
      .msg-txt-p {
        width: 146px;
      }
      .compare {
        color: #9b9b9b;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        padding: 5px;
      }
      .compare-left {
        margin-right: 10px;
        white-space: nowrap;
      }
    }
    // 下
    .ranking-box {
      margin-top: 10px;
      display: flex;
      width: 100%;
      .ranking-left,
      .ranking-right {
        display: flex;
        flex-direction: column;
        background: #fbfbfb;
        flex: 1;
        padding: 20px;
        box-sizing: border-box;
      }
      .ranking-left {
        margin-right: 10px;
      }
      .ranking-title {
        font-weight: 700;
        color: #333;
        margin-bottom: 10px;
      }
      .table {
        width: 100%;
        border: none;
        tr {
          border: none;
          height: 3em;
          line-height: 3em;
          background: #fbfbfb;
        }
        td {
          border: none;
        }
        .table-tit-item {
          color: #999;
          text-align: left;
        }
        .rank {
          width: 15%;
        }
        .prod {
          width: 50%;
        }
        .ref {
          width: 20%;
        }
        .ranks {
          width: 12%;
        }
        .prods {
          width: 40%;
        }
        .refs {
          width: 20%;
        }
        .prop {
          width: 8%;
          // text-align: center;
        }
      }
      .no-data {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
</style>

