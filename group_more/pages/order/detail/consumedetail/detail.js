const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paidImg: '/img/group.png',
    showModal: false,
    success: '/img/success.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.setNavigationBarTitle({
    //   title: '订单详情',
    // })
    var orderState = null
    if (options.orderState){
      orderState = options.orderState
    }
    this.setData({
      orderId: options.orderId,
      orderSource: options.orderSource,
      orderState: orderState
    })
    this.orderDetailData()
    var time1 = new Date().getTime();
    this.setData({
      time1: time1
    })
    console.log(this.data.time1)
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
  // onShareAppMessage: function() {

  // },
  my_bespokedetail: function(e) {
    var orderId = e.currentTarget.dataset.orderId
    this.setData({
      showModal: true,
      orderId: orderId
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    console.log(888)
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    this.hideModal();
    data.tenantId = app.globalData.tenantId
    util.request(api.consumeOrder, data).then(function (res) {
      if (res.data.state == true) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          success: function (res) {
            setTimeout(function () {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }
        })
        // that.setData({
        //   isTrue: true
        // })
        // var that = this
        // setTimeout(function () {
        //   that.setData({
        //     isTrue: false
        //   })
        // }, 1000)
      }
      if (res.data.state == false) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    });
  },
  // hide: function() {
  //   this.setData({
  //     isTrue: false
  //   })
  // },

  orderDetailData: function () {
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.orderSource = that.data.orderSource
    data.isSale = 1 
    data.tenantId = app.globalData.tenantId
    util.request(api.orderDetail, data).then(function (res) {
      if (res.errno == 0) {
        var datas = res.data.apiOrderBean;
        datas.orderTime = util.toDate2(datas.orderTime);
        datas.bespeakDate = util.toDate2(datas.bespeakDate);
        that.setData({
          apiOrderBean: res.data.apiOrderBean,
        });
      }
    });
  },
  my_gobespokedetail:function(){
    var orderId = this.data.orderId;
    var orderSource = this.data.orderSource;
    wx.navigateTo({
      url: '../../../../pages/my/bespoke/item/index?orderId=' + orderId + '&orderType=' + orderSource
    })
  }
})