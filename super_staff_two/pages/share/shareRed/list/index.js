const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vip: '/img/shareholder.png',
    shareOver: '/img/shareDetail.png',
    backPage: 0,
  },

  /**
   * 生命周期函数--监听页面加
   */
  onLoad: function(options) {
    var that = this
    if (options.bonusId) {
      that.setData({
        bonusId: options.bonusId
      })
    }
    that.myShareDetail()
  },
  myShareDetail: function() {
    var that = this
    var data = {};
    data.page = 1
    data.rows = 12
    data.bonusId = that.data.bonusId
    data.tenantId = app.globalData.tenantId
    util.request(api.myShareDetail, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["recordTime"] = util.toDate5(datas[i]["recordTime"])
        }
        that.setData({
          shareRed: res.data.rows,
          total: res.data.total,
          backPage: 1,
        });
      }
    });
  },
  myShareDetailInit:function(){
    var that = this
    var data = {};
    data.page = that.data.backPage + 1
    data.rows = 12
    data.bonusId = that.data.bonusId
    data.tenantId = app.globalData.tenantId
    util.request(api.myShareDetail, data).then(function (res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["recordTime"] = util.toDate5(datas[i]["recordTime"])
        }
        var shareRedArr = that.data.shareRed;
        for (var i = 0; i < res.data.rows.length; i++) {
          shareRedArr.push(res.data.rows[i])
        }
        that.setData({
          shareRed: shareRedArr,
          backPage: that.data.backPage + 1
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
    if (this.data.total > this.data.shareRed.length) {
      this.myShareDetailInit();
      wx.showLoading({
        title: '玩命加载中',
      })
    } else {
      wx.showLoading({
        title: '已加载全部',
      })
    }
    setTimeout(function () {
      wx.hideLoading()
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})