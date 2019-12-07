const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backPage: 0,
    storeTop: '/img/storeTop.png',
    tanentHolder: '/img/tanentHolder.png',
    tanentVip: '/img/tanentVip.png',
    tanentActivity: '/img/tanentActivity.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.tenantListData()
  },
  tenantListData: function() {
    var that = this
    var data = {};
    util.request(api.tenantList, data).then(function(res) {
      if (res.errno == 0) {
        app.globalData.tenantLength = res.data.tenantList.length
        that.setData({
          tenantList: res.data.tenantList
        });
      }
    });
  },

  tenantDetail: function(e) {
    app.globalData.tenantId = e.currentTarget.dataset.tenantId
    app.globalData.tenantName = e.currentTarget.dataset.tenantName
    var that = this
    var data = {};
    data.tenantId = app.globalData.tenantId
    util.request(api.checkShareHolder, data).then(function(res) {
      if (res.errno == 0) {
        if (res.data.state == true) {
          wx.navigateBack({
            delta: 1
          })
          var _userInfo = wx.getStorageSync('userInfo');
          if (_userInfo) {
            _userInfo.memberCount = res.data.user.memberCount;
            wx.setStorageSync('userInfo', _userInfo);
          }
          if (res.data.user.isHolder){
            app.globalData.isShareholder = res.data.user.isHolder
          }else{
            app.globalData.isShareholder = 0
          }
          if (res.data.user.staffId) {
            app.globalData.superStaff = res.data.user.staffId
          } else {
            app.globalData.superStaff = 0
          }
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
    if (app.globalData.tenantId) {
      this.setData({
        tenantId: app.globalData.tenantId
      })
    }
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
    this.tenantListData();
    setTimeout(function() {
      wx.stopPullDownRefresh();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function(ops) {
  //   var userId = app.globalData.userId
  //   if (ops.from === 'button') {

  //   }
  //   return {
  //     title: '美丽圈小程序',
  //     path: 'pages/store/list/index?fromUserId=' + userId,
  //     success: function (res) {

  //     },
  //   }
  // }
})