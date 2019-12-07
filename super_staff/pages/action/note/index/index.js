const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    over_pay: '/img/over_pay.png',
    dialog: '/img/dialog_powder.png',
    backPage:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.actionPayNote()
  },
  actionPayNote: function() {
    var that = this
    var data = {}
    data.page = 1
    data.rows = 8
    data.tenantId = app.globalData.tenantId
    util.request(api.actionPaylUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["beginTime"] = util.toDate6(datas[i]["beginTime"])
          datas[i]["endTime"] = util.toDate6(datas[i]["endTime"])
          datas[i]["checkTime"] = util.toDate7(datas[i]["checkTime"])
        }
        that.setData({
          ckeckedList: res.data.rows,
          total: res.data.total,
          backPage:1,
        });
      }
    });
  },
  ckeckedListInit:function(){
    var that = this
    var data = {}
    data.page = that.data.backPage + 1
    data.rows = 8
    data.tenantId = app.globalData.tenantId
    util.request(api.actionPaylUrl, data).then(function (res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["beginTime"] = util.toDate6(datas[i]["beginTime"])
          datas[i]["endTime"] = util.toDate6(datas[i]["endTime"])
          datas[i]["checkTime"] = util.toDate7(datas[i]["checkTime"])
        }

        var ckeckedListArr = that.data.ckeckedList;
        for (var i = 0; i < res.data.rows.length; i++) {
          ckeckedListArr.push(res.data.rows[i])
        }
        that.setData({
          ckeckedList:ckeckedListArr,
          total: res.data.total,
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
  actionDetail: function (e) {
    var activityId = e.currentTarget.dataset.activityId
    var holderId = e.currentTarget.dataset.holderId
    var checkId = e.currentTarget.dataset.checkId
    wx.navigateTo({
      url: '../../list/detail/index?activityId=' + activityId + '&holderId=' + holderId + '&checkId=' + checkId,
    })
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
    if (this.data.total > this.data.ckeckedList.length) {
      this.ckeckedListInit();
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
  // onShareAppMessage: function() {

  // }
})