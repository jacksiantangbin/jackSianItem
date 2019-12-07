// pages/order/index/index.js   
const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
    actEndTimeList: [],
    dialog: '/img/dialog.png',
    index_new: 0,
    index_group: 0,
    index_activity: 0,
    showModal: false,
    showModal_de:false,
    pay_group_showModal: false,
    success: '/img/success.png',
    backPage: 0,
    scrollH: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var time1 = util.toDate1(new Date())
    this.setData({
      time1: time1
    })
    this.myOrder1()

  },
  my_bespokedetail: function(e) {
    var that = this
    that.myOrder1()
    var orderId = e.currentTarget.dataset.orderId
    var state = e.currentTarget.dataset.groupState
    console.log(state)
    if (state == 1) {
      console.log(147)
      that.setData({
        showModal: true,
        orderId: orderId,
      })
    } else {
      console.log(148)
      wx.showToast({
        title: '待成团的订单暂不能核销',
        icon: 'none',
      })
    }
  },
  order_de:function(e){
    var orderId = e.currentTarget.dataset.orderId
     this.setData({
       showModal_de: true,
       orderId: orderId,
     })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  pay_group_preventTouchMove: function() {},
  pay_activity_preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false,
      showModal_de:false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  /**
   * 对话框确认按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  onConfirm: function() {
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    this.hideModal();
    data.tenantId = app.globalData.tenantId
    util.request(api.consumeOrder, data).then(function(res) {
      if (res.errno == 0) {
        if (res.data.state == true) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            success: function() {
              that.myOrder1()
            }
          })
        }
        if (res.data.state == false) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    });
  },
  onConfirm_de:function(){
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    this.hideModal(); 
    data.tenantId = app.globalData.tenantId
    util.request(api.delOrder, data).then(function (res) {
      if (res.errno == 0) {
        if (res.data.state == true) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            success: function () {
              that.myOrder1()
            }
          })
        }
        if (res.data.state == false) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
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
    var that = this
    that.myOrder1()
    // that.countDown()
    that.setData({
      scrollTop: 0
    })
  },
  //全部
  myOrder1: function() {
    var that = this
    var data = {};
    data.page = 1
    data.rows = 8
    data.dataType = 1 //订单
    data.isSale = 1
    data.tenantId = app.globalData.tenantId
    util.request(api.myOrderList, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.orderList;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["bespeakDate"] = util.toDate1(datas[i]["bespeakDate"])
        }
        that.setData({
          orderList: res.data.orderList,
          total1: res.data.total,
          backPage: 1
        });
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
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  bindScroll: function() {
    console.log(489)
    var that = this
    if (that.data.total1 > that.data.orderList.length) {
      console.log(490)
      that.myOrder1_Init()
      wx.showLoading({
        title: '玩命加载中',
      })
    } else {
      wx.showLoading({
        title: '已加载全部',
      })
    }
    setTimeout(function() {
      wx.hideLoading()
    }, 1000);
    
  },
  myOrder1_Init: function() {
    var that = this
    var data = {};
    data.page = that.data.backPage + 1
    data.rows = 8
    data.dataType = 1 //订单
    data.isSale = 1
    data.tenantId = app.globalData.tenantId
    util.request(api.myOrderList, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.orderList;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["bespeakDate"] = util.toDate1(datas[i]["bespeakDate"])
        }

        var orderListArr = that.data.orderList;
        for (var i = 0; i < res.data.orderList.length; i++) {
          orderListArr.push(res.data.orderList[i])
        }
        that.setData({
          orderList: orderListArr,
          backPage: that.data.backPage + 1
        })
        if (res.data.orderList.length <= 0) {
          that.setData({
            sayloading: '没有更多数据了…^_^'
          })
        }
      }
    });
  },
  
  sumDetail: function(e) {
    var groupId = e.currentTarget.dataset.groupId
    var orderId = e.currentTarget.dataset.orderId
    var orderSource = e.currentTarget.dataset.orderSource
    var orderState = e.currentTarget.dataset.orderState
    if (orderState == 1 || orderState == 0 || orderState == 9) {
      wx.navigateTo({
        url: '../../../pages/order/detail/paydetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&groupId=' + groupId,
      })
    }
    else if (orderState == 2) {
      wx.navigateTo({
        url: '../../../pages/order/detail/bespokedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&groupId=' + groupId,
      })
    }
    else if (orderState == 10) {
      wx.navigateTo({
        url: '../../../pages/order/detail/bespokedetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&orderState=' + orderState + '&groupId=' + groupId,
      })
    } else if (orderState == 6 || orderState == 7 || orderState == 8) {
      wx.navigateTo({
        url: '../../../pages/order/detail/refunddetail/detail?orderId=' + orderId + '&orderSource=' + orderSource + '&orderState=' + orderState + '&groupId=' + groupId,
      })
    }
  },
  go_groupPay: function(e) {
    var orderId = e.currentTarget.dataset.orderId
    var groupId = e.currentTarget.dataset.groupId
    wx.navigateTo({
      url: '../../../pages/pay/item4/itemPay?orderId=' + orderId + '&groupId=' + groupId
    })
  },
})