const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item_name: '森林补水',
    order_num: '7894561230.12',
    resultImg: '/img/pay_result_success.png',
    item_price: '0',
    bespoke: '进行预约',
    isBespoke: 0,
    isType:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var bespeakStartTime = null
    var activityState = null
    var activityNum = null
    var orgId = null
    if (options.bespeakStartTime == 0 && options.bespeakStartTime != '') {
      bespeakStartTime = 0
    } else {
      bespeakStartTime = 1
    }
    if (options.orgId) {
      orgId = options.orgId
    }
    if (options.activityState) {
      activityState = options.activityState
    }
    if (options.activityNum <= 0) {
      activityNum = 0
    } else {
      activityNum = 1
    }
    this.setData({
      activityState: activityState,
      bespeakStartTime: bespeakStartTime,
      orderId: options.orderId,
      orderCode: options.orderCode,
      lastPrice: options.lastPrice/100,
      title: options.title,
      payid: options.payid,
      itemType: options.itemType,
      activityNum: activityNum,
      orgId: orgId
    })
    console.log(this.data.bespeakStartTime)
    console.log(this.data.itemType)
    var str = this.data.lastPrice
    if (str.length > 4) {
      var money = str.slice(0, 4)
    } else {
      var money = str
    }
    this.setData({
      money: money
    })
    this.myOrderActivityId()
  },
  myOrderActivityId:function(){
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.tenantId = app.globalData.tenantId
    util.request(api.myOrderActivityId, data).then(function (res) {
      if (res.errno == 0) {
        if (res.data.groupActivityId > 0){
          that.setData({
            groupActivityId: res.data.groupActivityId
          })
        }
      }
    });
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
    // if (itemType == 1) {
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
  onShareAppMessage: function(ops) {
    var url = "";
    var userId = app.globalData.userId
    var id = this.data.payid
    var itemType = this.data.itemType
    var orgId = this.data.orgId
    var orderId = this.data.orderId
    var groupActivityId = this.data.groupActivityId
    var tenantId = app.globalData.tenantId
    
    if (itemType == 1) {
      url = 'pages/item/detail/detail?fromUserId=' + userId + '&itemId=' + id + '&pageType=2' + '&orgId=' + orgId
    } else if (itemType == 2) {
      url = 'pages/activity/groupdetail/lumpDetail/lumpDetailIndex?fromUserId=' + userId + '&groupId=' + id + '&orderId=' + orderId + '&groupActivityId=' + groupActivityId + '&tenantId=' + tenantId
    } else if (itemType == 3) {
      url = 'pages/activity/activitydetail/index?fromUserId=' + userId + '&activityId=' + id
    }
    return {
      title: this.data.title,
      path: url,
    }
  },
  navigateToBespeak: function(e) {
    var id = this.data.payid
    var bespeakStartTime = this.data.bespeakStartTime
    var orderId = this.data.orderId
    var orderSource = this.data.itemType
    var itemType = this.data.itemType
    var activityState = this.data.activityState
    // if (itemType == 1) {
    //   if (bespeakStartTime != null && bespeakStartTime != 0) {
    //     wx.navigateTo({
    //       url: '../../../pages/order/detail/consumedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&display=0'
    //     })
    //   } else {
    //     wx.navigateTo({
    //       url: '../../../pages/order/detail/bespokedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&display=0'
    //     })
    //   }

    // } 
    if (itemType == 2) {
      // if (activityState == 1) {
        wx.navigateTo({
          url: '../../../pages/order/detail/bespokedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&groupId=' + id
        })
      // } 
      // else {
      //   wx.navigateTo({
      //     url: '../../../pages/order/detail/consumedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&activityState=0',
      //   })
      // }
    }
    //  else if (itemType == 3) {
    //   wx.navigateTo({
    //     url: '../../../pages/order/detail/bespokedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&display=0'
    //   })
    // }
  },
  // bespokedetail: function(e) {
  //   var orderId = this.data.orderId
  //   var orderType = this.data.itemType
  //   wx.redirectTo({
  //     url: '../../../pages/my/bespoke/item/index?orderId=' + orderId + '&orderType=' + orderType
  //   })
  // },
})