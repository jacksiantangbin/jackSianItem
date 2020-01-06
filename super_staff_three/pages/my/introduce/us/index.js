const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: '/img/logo.png',
    LJ_introduce: '',


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '关于我们',
    })
    this.usData()
  },
  usData: function() {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.usUrl,data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          aboutUs: res.data.aboutUs,
        })
        if (res.data.aboutUs.logo) {
          that.setData({
            logo: that.data.logo
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