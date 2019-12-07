const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.actionList()
  },
  actionList: function() {
    var that = this
    var data = {}
    data.type = 1
    data.tenantId = app.globalData.tenantId
    util.request(api.actionMessagelUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.messages;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["beginDate"] = util.toDate(datas[i]["beginDate"])
          datas[i]["endDate"] = util.toDate(datas[i]["endDate"])
        }
        that.setData({
          messageList: res.data.messages
        });
      }
    });
  },
  actionDetail: function(e) {
    var activityId = e.currentTarget.dataset.activityId
    var holderId = e.currentTarget.dataset.holderId

    wx.navigateTo({
      url: '../detail/index?activityId=' + activityId + '&holderId=' + holderId,
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

  // }
})