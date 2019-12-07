const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paidImg: '/img/group.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: '订单详情',
    // })
    this.setData({
      orderId: options.orderId,
      orderSource: options.orderSource
    })
    this.orderDetailData()
  },
  orderDetailData: function () {
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.orderSource = that.data.orderSource
    data.isSale = 1 
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  publish_evaluate: function (e) {
    var orderId = e.currentTarget.dataset.orderId
    var orderSource = e.currentTarget.dataset.orderSource
    var title = e.currentTarget.dataset.title;
    var store = e.currentTarget.dataset.store;
    var price = e.currentTarget.dataset.price;
    var standardPrice = e.currentTarget.dataset.standardprice;
    var storeAddress = e.currentTarget.dataset.storeaddress;
    var itemId = e.currentTarget.dataset.itemid;
    var staffId = e.currentTarget.dataset.staffid;
    var orgId = e.currentTarget.dataset.orgid;
    wx.navigateTo({
      url: '../../../../pages/order/evaluate/index/index?orderId=' + orderId + '&orderSource=' + orderSource + '&title=' + title + '&store=' + store + '&price=' + price + '&standardPrice=' + standardPrice + '&storeAddress=' + storeAddress + '&staffId=' + staffId + '&orgId=' + orgId + '&itemId=' + itemId,
    })
  },
})