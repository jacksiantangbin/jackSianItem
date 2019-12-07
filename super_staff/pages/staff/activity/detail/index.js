const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sc_cover: '/img/logo.png',
    currentNavbar: '0',
    navbar: ['领取记录', '核销记录'],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.activityId){
      this.setData({
        activityId: options.activityId
      })
    }
    this.superStaffActivityDetail()
  },
  superStaffActivityDetail: function () {
    var that = this
    var data = {}
    if (that.data.activityId) {
      data.activityId = that.data.activityId
    }
    data.type = 2
    data.staffId = app.globalData.superStaff
    data.tenantId = app.globalData.tenantId
    util.request(api.superStaffActivityDetail, data).then(function (res) {
      if (res.errno == 0) {
        var datas = res.data.saleActivity;
        datas.beginDate = util.toDate6(datas.beginDate);
        datas.endDate = util.toDate6(datas.endDate);
        var gettime = res.data.records;
        if (gettime) {
          for (var i = 0; i < gettime.length; i++) {
            gettime[i]["getTime"] = util.toDate6(gettime[i]["getTime"])
          }
        }
        var checktime = res.data.checkRecords
        if (checktime) {
          for (var i = 0; i < checktime.length; i++) {
            checktime[i]["getTime"] = util.toDate7(checktime[i]["getTime"])
          }
        }
        that.setData({
          saleActivity: res.data.saleActivity,
          records: res.data.records,
          checkRecords: res.data.checkRecords
        });
      } else {

      }
    });
  },
  /**,
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
  // onShareAppMessage: function (ops) {
  
  // },
  swichNav: function (e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
  },
})