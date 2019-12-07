const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backPage:0,
    storeTop:'/img/storeTop.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var fromUserId = options.fromUserId
    var _userInfo = wx.getStorageSync('userInfo');
    if (fromUserId) {
      _userInfo.fromUserId = fromUserId;
      app.globalData.fromUserId = fromUserId
    }
    wx.setStorageSync('userInfo', _userInfo);

    this.setData({
      orgIds:options.orgId
    })
    console.log(options.orgId)
    this.storeListData()
  },
  storeListData: function() {
    var that = this
    var data = {};
    data.page = 1
    data.rows = 8
    data.orderType = 3
    data.dataType = 'a'
    if (app.globalData.latitude) {
      data.lat = app.globalData.latitude
      data.lon = app.globalData.longitude
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.storeListUrl, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          storeList: res.data.storeList,
          total: res.data.total,
          backPage: 1,
        });
      }
    });
  },
  storeListInit: function() {
    var that = this
    var data = {};
    data.page = that.data.backPage + 1;
    data.rows = 8
      data.orderType = 3

    data.dataType = 'a'
    if (app.globalData.latitude) {
      data.lat = app.globalData.latitude
      data.lon = app.globalData.longitude
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.storeListUrl, data).then(function(res) {
      if (res.errno == 0) {
        var storeListArr = that.data.storeList;
        for (var i = 0; i < res.data.storeList.length; i++) {
          storeListArr.push(res.data.storeList[i])
        }
        that.setData({
          storeList: storeListArr,
          backPage: that.data.backPage + 1
        })
      }
    });
  },
  getLocation: function (e) {
    var that = this
    var lat = e.currentTarget.dataset.lat
    var lon = e.currentTarget.dataset.lon
    var name = e.currentTarget.dataset.name
    var address = e.currentTarget.dataset.address
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        console.log(res)
        const latitude = parseFloat(lat)
        const longitude = parseFloat(lon)
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          name: name,
          address: address
        })
      },
      fail: function (e) {
        console.log('获取位置失败');
        wx.showModal({
          title: '获取地理位置失败',
          content: '请允许使用您的位置信息',
          cancelText: '取消',
          confirmText: "设置",
          // showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.openSetting({
                success: function () {

                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },

  telPhone: function (e) {
    console.log(234)
    var phone = e.currentTarget.dataset.phone
    console.log(e.currentTarget.dataset)
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone + '',
      })
    }
  },
  storeDetail:function(e){
    app.globalData.orgId = e.currentTarget.dataset.orgId
    // wx.switchTab({
    //   url: '../../../pages/index/index',
    // })
    wx.navigateBack({
      delta: 1
    })
    // wx.navigateTo({
    //   url: '../../../pages/index/index',
    // })
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
    this.storeListData();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.total > this.data.storeList.length) {
      this.storeListInit();
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