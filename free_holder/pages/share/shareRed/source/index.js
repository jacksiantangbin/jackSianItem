const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialog: '/img/dialog_powder.png',
    navbar: ['全部', '一级客源', '二级客源'],
    vip: '/img/shareholder.png',
    currentNavbar:0,
    orderList: [],
    orderList1: [],
    orderList2: [],
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
  },
  sourecDetail: function() {
    var that = this
    var data = {};
    data.page = 1
    data.rows = 8
    if (that.data.currentNavbar > 0) {
      data.dataType = that.data.currentNavbar + 1
    } else if (that.data.currentNavbar == 0) {
      data.dataType = that.data.currentNavbar + 1
    }
    wx.showLoading({
      title: '加载中',
      mask: 'true',
    })
    data.tenantId = app.globalData.tenantId
    util.request(api.mySourceList, data).then(function(res) {
      if (res.errno == 0) {
        if (that.data.currentNavbar == 1) {
          that.setData({
            orderList1: res.data.rows,
          })
        } else if (that.data.currentNavbar == 2) {
          that.setData({
            orderList2: res.data.rows,
          })
        } else {
          that.setData({
            orderList: res.data.rows,
          })
        }
        that.setData({
          total: res.data.total,
          backPage: 1,
          isNav: 0
        });
        setTimeout(function() {
          wx.hideLoading()
        }, 500)
      }

    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  sourecDetailInit: function() {
    var that = this
    var data = {};
    data.page = that.data.backPage + 1
    data.rows = 8
    if (that.data.currentNavbar > 0) {
      data.dataType = that.data.currentNavbar + 1
    } else if (that.data.currentNavbar == 0) {
      data.dataType = that.data.currentNavbar + 1
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.mySourceList, data).then(function(res) {
      if (res.errno == 0) {
        if (that.data.currentNavbar == 1) {
          var orderListArr1 = that.data.orderList1;
          for (var i = 0; i < res.data.rows.length; i++) {
            orderListArr1.push(res.data.rows[i])
          }
          that.setData({
            orderList1: orderListArr1,
          })
        } else if (that.data.currentNavbar == 2) {
          var orderListArr2 = that.data.orderList2;
          for (var i = 0; i < res.data.rows.length; i++) {
            orderListArr2.push(res.data.rows[i])
          }
          that.setData({
            orderList2: orderListArr2,
          })
        } else {
          var orderListArr = that.data.orderList;
          for (var i = 0; i < res.data.rows.length; i++) {
            orderListArr.push(res.data.rows[i])
          }
          that.setData({
            orderList: orderListArr
          })
        }
        that.setData({
          total: res.data.total,
          backPage: that.data.backPage + 1,
          isNav: 0
        })
      }
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var userId = app.globalData.userId
    this.setData({
      userId: userId
    })
    this.sourecDetail()
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
  pullUpLoadLatest: function() {
    if (this.data.total > this.data.orderList.length && this.data.isNav < 1) {
      this.sourecDetailInit()
    } else if (this.data.total > this.data.orderList1.length && this.data.isNav < 1) {
      this.sourecDetailInit()
    } else if (this.data.total > this.data.orderList2.length && this.data.isNav < 1) {
      this.sourecDetailInit()
    } else if (this.data.total > this.data.orderList.length && this.data.isNav > 0) {
      this.swichNavInit()
    } else if (this.data.total > this.data.orderList1.length && this.data.isNav > 0) {
      this.swichNavInit()
    } else if (this.data.total > this.data.orderList2.length && this.data.isNav > 0) {
      this.swichNavInit()
    }
  },
  swichNav: function(e) {
    this.setData({
      currentNavbar: e.currentTarget.dataset.idx
    })
    var that = this
    var data = {};
    data.page = 1
    data.rows = 8
    if (that.data.currentNavbar > 0) {
      data.dataType = that.data.currentNavbar + 1
    } else if (that.data.currentNavbar == 0) {
      data.dataType = that.data.currentNavbar + 1
    }
    wx.showLoading({
      title: '加载中',
      mask: 'true',
    })
    data.tenantId = app.globalData.tenantId
    util.request(api.mySourceList, data).then(function(res) {
      if (res.errno == 0) {
        if (that.data.currentNavbar == 1) {
          that.setData({
            orderList1: res.data.rows,
          })
        } else if (that.data.currentNavbar == 2) {
          that.setData({
            orderList2: res.data.rows,
          })
        } else {
          that.setData({
            orderList: res.data.rows,
          })
        }
        that.setData({
          total: res.data.total,
          isNav: 1,
          backPage1: 1
        });
        setTimeout(function () {
          wx.hideLoading()
        }, 500)
      }
    });
  },

  swichNavInit: function() {
    var that = this
    var data = {};
    data.page = that.data.backPage1 + 1
    data.rows = 8
    if (that.data.currentNavbar > 0) {
      data.dataType = that.data.currentNavbar + 1
    } else if (that.data.currentNavbar == 0) {
      data.dataType = that.data.currentNavbar + 1
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.mySourceList, data).then(function(res) {
      if (res.errno == 0) {
        if (that.data.currentNavbar == 1) {
          var orderListArr1 = that.data.orderList1;
          for (var i = 0; i < res.data.rows.length; i++) {
            orderListArr1.push(res.data.rows[i])
          }
          that.setData({
            orderList1: orderListArr1,
          })
        } else if (that.data.currentNavbar == 2) {
          var orderListArr2 = that.data.orderList2;
          for (var i = 0; i < res.data.rows.length; i++) {
            orderListArr2.push(res.data.rows[i])
          }
          that.setData({
            orderList2: orderListArr2,
          })
        } else {
          var orderListArr = that.data.orderList;
          for (var i = 0; i < res.data.rows.length; i++) {
            orderListArr.push(res.data.rows[i])
          }
          that.setData({
            orderList: orderListArr
          })
        }
        that.setData({
          total: res.data.total,
          isNav: 1,
          backPage1: that.data.backPage1 + 1
        })
      }
    });
  },
  seeSource: function(e) {
    var wxUserId = e.currentTarget.dataset.wxId
    wx.navigateTo({
      url: '../sourcedDtail/common/index?wxUserId='+ wxUserId
    })
  },
  holderSource: function(e) {
    var wxUserId = e.currentTarget.dataset.wxId
    wx.navigateTo({
      url: '../sourcedDtail/holder/index?wxUserId=' + wxUserId,
    })
  },
})