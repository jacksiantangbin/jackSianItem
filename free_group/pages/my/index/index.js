const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myPhone: '/img/my.png',
    install: '/img/install.png',
    collect: '/img/collect.png',
    evaluate: '/img/evaluate.png',
    coupon: '/img/coupon.png',
    good: '/img/good.png',
    order: '/img/order.png',
    isShow: true,
    dialog: null,
    userInfo: {},
    hasUserInfo: false,
    nickName: '昵称',
    showModal_logo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    }

    this.myInformation()

    let that = this;
    var _userInfo = wx.getStorageSync('userInfo');
    if (_userInfo) {
      that.setData({
        nickName: _userInfo.nickName,
        myPhone: _userInfo.avatarUrl,
        memberCount: _userInfo.memberCount,
      });
      wx.setStorageSync('userInfo', _userInfo);
    }
  },
  myInformation: function () {
    var that = this
    var data= {}
    data.tenantId = app.globalData.tenantId
    util.request(api.myInformation,data).then(function (res) {
      if (res.errno == 0) {
        console.log(res.data.user)
        that.setData({
          // myPhone: res.data.user.avatarUrl,
          // nickName: res.data.user.nickName,
          isShareholder: res.data.user.isHolder,
        })
        // if (that.data.nickName == '' || that.data.nickName == null) {
        //   that.setData({
        //     showModal_logo: true,
        //   })
        // }
        if (that.data.isShareholder) {
          var _userInfo = wx.getStorageSync('userInfo');
          if (_userInfo) {
            _userInfo.isShareholder = that.data.isShareholder;
          }
          app.globalData.isShareholder = that.data.isShareholder
          wx.setStorageSync('userInfo', _userInfo);
        }
      }
    });
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
  myEdit: function(e) {
    var myPhone = this.data.myPhone
    var pageUrl = encodeURIComponent('pages/my/edit/index?myPhone=' + myPhone)
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.isRegister == 1) {
      wx.navigateTo({
        url: '../../../pages/my/edit/index',
      })
    } else {
      wx.navigateTo({
        url: '../../../pages/my/edit/login/index?pageUrl=' + pageUrl
      })
    }
  },


  myVip: function(e) {
    var userInfo = wx.getStorageSync('userInfo');
    var memberCount = userInfo.memberCount
    var myPhone = this.data.myPhone
    var pageUrl = encodeURIComponent('pages/my/myVip/index?myPhone=' + myPhone)
    if (memberCount < 1) {
      wx.navigateTo({
        url: '../../../pages/my/edit/login/index?pageUrl=' + pageUrl
      })
    } else {
      wx.navigateTo({
        url: '../../../pages/my/membership/card/index'
      })
    }
  },



  introduce: function(e) {
    wx.navigateTo({
      url: '../../../pages/my/introduce/index/index',
    })
  },
  order: function() {
    wx.navigateTo({
      url: '../../../pages/order/index/index?currentNavbar=0',
    })
  },
  shareRed: function(e) {
    wx.navigateTo({
      url: '../../../pages/share/shareRed/index/index',
    })
  }
})