const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPay: 1,
    item_price: '199',
    item_name: '森林补水',
    order_num: '7894561230.12',
    resultImg: '/img/pay_result_fail.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function(options) {
    var bespeakStartTime = null
    if (options.bespeakStartTime) {
      bespeakStartTime = options.bespeakStartTime
    }
    var orgId = null
    if (options.orgId) {
      orgId = options.orgId
    }
    this.setData({
      bespeakStartTime: bespeakStartTime,
      orderId: options.orderId,
      orderCode: options.orderCode,
      lastPrice: options.lastPrice/100,
      title: options.title,
      payid: options.payid,
      itemType: options.itemType,
      orgId: orgId
    })
    var str = this.data.lastPrice
    if (str.length > 4) {
      var money = str.slice(0, 4)
    }else{
      var money = str
    }
    this.setData({
      money: money
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },
  backPay: function() {
    var that = this
    var lastPrice = that.data.lastPrice
    var orderCode = that.data.orderCode
    var title = that.data.title
    var orderId = that.data.orderId
    var data = {}
    var userInfo = wx.getStorageSync('userInfo');
    data.openId = userInfo.openId
    data.orderId = that.data.orderId
    data.tenantId = app.globalData.tenantId
    util.request(api.getPayParams, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          isPay: 0
        })
        wx.requestPayment({
          timeStamp: res.data.wxPayMpOrderResult.timeStamp,
          nonceStr: res.data.wxPayMpOrderResult.nonceStr,
          package: res.data.wxPayMpOrderResult.packageValue,
          signType: res.data.wxPayMpOrderResult.signType,
          paySign: res.data.wxPayMpOrderResult.paySign,
          success(res) {
            wx.navigateTo({
              url: '../../../pages/pay/result/payResult?orderCode=' + orderCode + '&lastPrice=' + lastPrice + '&title=' + title,
            })
          },
          fail(res) {

          }
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.navigateBack({
      delta: 1
    })
    // var itemType = this.data.itemType
    // var itemId = this.data.payid
    // var orgId = this.data.orgId
    // if (itemType == 1){
    //   wx.redirectTo({
    //     url: '../../../pages/item/detail/detail?itemId=' + itemId + '&pageType=2' + '&orgId=' + orgId
    //   })
    // } else if (itemType == 2) {
    //   wx.redirectTo({
    //     url: '../../../pages/activity/groupdetail/index?groupId=' + itemId
    //   })
    // } else if (itemType == 3) {
    //   wx.redirectTo({
    //     url: '../../../pages/activity/activitydetail/index?activityId=' + itemId
    //   })
    // }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  // } ,

  navigateToBespeak: function(e) {
    var id = this.data.payid
    var bespeakStartTime = this.data.bespeakStartTime
    var orderId = this.data.orderId
    var orderSource = 2
    var itemType = this.data.itemType
    // if (itemType == 1) {
    //   if (bespeakStartTime != '') {
    //     wx.navigateTo({
    //       url: '../../../pages/order/detail/paydetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&display=0'
    //     })
    //   } else {
    //     wx.navigateTo({
    //       url: '../../../pages/order/detail/paydetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&display=0'
    //     })
    //   }

    // } 
    // if (itemType == 2) {
      wx.navigateTo({
        url: '../../../pages/order/detail/paydetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&groupId=' + id
      })
    // }
    //  else if (itemType == 3) {
    //   wx.navigateTo({
    //     url: '../../../pages/order/detail/paydetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&display=0'
    //   })
    // }
  },
  // bespokedetail: function(e) {
  //   //支付页面
  //   var orderId = this.data.orderId
  //   var orderType = this.data.itemType
  //   wx.navigateTo({
  //     url: '../../../pages/my/bespoke/item/index?orderId=' + orderId + '&orderType=' + orderType
  //   })
  // },
})