const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['可使用', '可分享'],
    currentNavbar: '0',
    actionBg: '/img/actionBg.png',
    dialog: '/img/dialog_powder.png',
    actionListright: [],
    actionListleft: [],
    backPage: 0,
    backPage1: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (options.currentNavbar) {
      this.setData({
        currentNavbar: options.currentNavbar
      })
    }
    var that = this
    that.actionList()
  },
  swichNav: function(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    var that = this
    var data = {}
    if (that.data.currentNavbar == 0) {
      data.type = 1
    } else {
      data.type = 2
    }
    data.page = 1
    data.rows = 8
    data.tenantId = app.globalData.tenantId
    util.request(api.actionListUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        if (res.data.rows) {
          for (var i = 0; i < datas.length; i++) {
            datas[i]["beginDate"] = util.toDate6(datas[i]["beginDate"])
            datas[i]["endDate"] = util.toDate6(datas[i]["endDate"])
          }
          if (that.data.currentNavbar == 0) {
            that.setData({
              actionListleft: res.data.rows,
              totalleft: res.data.total,
              backPage1: 1,
              isNav: 0,
            });
          } else {
            that.setData({
              actionListright: res.data.rows,
              totalright: res.data.total,
              backPage1: 1,
              isNav: 0,
            });
          }
        }
      }
    });
  },
  swichNavInit: function() {
    var that = this
    var data = {}
    if (that.data.currentNavbar == 0) {
      data.type = 1
    } else {
      data.type = 2
    }
    data.page = that.data.backPage1 + 1
    data.rows = 8
    data.tenantId = app.globalData.tenantId
    util.request(api.actionListUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        if (res.data.rows) {
          for (var i = 0; i < datas.length; i++) {
            datas[i]["beginDate"] = util.toDate6(datas[i]["beginDate"])
            datas[i]["endDate"] = util.toDate6(datas[i]["endDate"])
          }
          if (that.data.currentNavbar == 0) {
            var actionListleftArr = that.data.actionListleft;
            for (var i = 0; i < res.data.rows.length; i++) {
              actionListleftArr.push(res.data.rows[i])
            }
            that.setData({
              actionListleft: actionListleftArr,
            })
            that.setData({
              totalleft: res.data.total,
              backPage1: that.data.backPage1 + 1,
              isNav: 0,
            });
          } else {
            var actionListrightArr = that.data.actionListright;
            for (var i = 0; i < res.data.rows.length; i++) {
              actionListrightArr.push(res.data.rows[i])
            }
            that.setData({
              actionListright: actionListrightArr,
            })
            that.setData({
              totalright: res.data.total,
              backPage1: that.data.backPage1 + 1,
              isNav: 0,
            });
          }
        }
      }
    });
  },
  actionList: function() {
    var that = this
    var data = {}
    if (that.data.currentNavbar == 0) {
      data.type = 1
    } else {
      data.type = 2
    }
    data.page = 1
    data.rows = 8
    data.tenantId = app.globalData.tenantId
    util.request(api.actionListUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        if (res.data.rows) {
          for (var i = 0; i < datas.length; i++) {
            datas[i]["beginDate"] = util.toDate6(datas[i]["beginDate"])
            datas[i]["endDate"] = util.toDate6(datas[i]["endDate"])
          }
          that.setData({
            actionListleft: res.data.rows,
            totalleft: res.data.total,
            backPage: 1,
            isNav: 1,
          });
        }
      }
    });
  },
  actionListInit: function(e) {
    var that = this
    var data = {}
    if (that.data.currentNavbar == 0) {
      data.type = 1
    } else {
      data.type = 2
    }
    data.page = that.data.backPage + 1
    data.rows = 8
    data.tenantId = app.globalData.tenantId
    util.request(api.actionListUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        if (res.data.rows) {
          for (var i = 0; i < datas.length; i++) {
            datas[i]["beginDate"] = util.toDate6(datas[i]["beginDate"])
            datas[i]["endDate"] = util.toDate6(datas[i]["endDate"])
          }

          var actionListleftArr1 = that.data.actionListleft;
          for (var i = 0; i < res.data.rows.length; i++) {
            actionListleftArr1.push(res.data.rows[i])
          }
          that.setData({
            actionListleft: actionListleftArr1,
          })
          that.setData({
            // actionListleft: res.data.rows,
            totalleft: res.data.total,
            backPage: that.data.backPage + 1,
            isNav: 1,
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  pullUpLoadLatest: function() {
    if (this.data.totalleft > this.data.actionListleft.length && this.data.isNav == 1) {
      this.actionListInit()
      wx.showLoading({
        title: '玩命加载中',
      })
    } else if (this.data.totalright > this.data.actionListright.length && this.data.isNav == 0) {
      this.swichNavInit()
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
  tabInit: function(e) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.actionList()
    
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
  actionDetail: function(e) {
    var share = e.currentTarget.dataset.share
    var activityId = e.currentTarget.dataset.activityId
    var holderId = e.currentTarget.dataset.holderId
    wx.navigateTo({
      url: '../detail/index?share=' + share + '&activityId=' + activityId + '&holderId=' + holderId,
    })
  }
})