const util = require('../../../../../utils/util.js');
const api = require('../../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip: '/img/shareholder.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    if (options.wxUserId){
      that.setData({
        wxUserId: options.wxUserId
      })
    }
    that.holderDetail()
  },
  holderDetail: function() {
    var that = this
    var data = {};
    data.userId = that.data.wxUserId
    data.tenantId = app.globalData.tenantId
    util.request1(api.mySourceDetail, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          beanList: res.data.beanList,
          holder: res.data.shareholderRelationBean,
        });
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

  // }
})