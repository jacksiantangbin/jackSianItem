const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var user = require('../../../../services/user.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    login_name: '/img/my.png',
    isShow: false,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //登陆
    user.checkLogin().then(res => {
      console.log('缓存')
      if (wx.getStorageSync('userInfo') != null) {
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        this.globalData.token = wx.getStorageSync('token');
        this.globalData.userId = wx.getStorageSync('userId');
        this.globalData.sessionKey = wx.getStorageSync('userInfo.sessionKey');
        console.log(this.globalData.sessionKey + '我是1')
      } else {
        user.loginByWeixin().then(res => {
          this.globalData.userInfo = res.data.userInfo;
          this.globalData.token = res.data.token;
          this.globalData.userId = res.data.userId;
          this.globalData.sessionKey = res.data.userInfo.sessionKey;
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userId', res.data.userId);
          wx.setStorageSync('sessionKey', res.data.userInfo.sessionKey);
          console.log(this.globalData.sessionKey + '我是2')
        }).catch((err) => {
          console.log(err)
        });
      }
    }).catch(() => {
      console.log('再次登录')
      //再次登录..
      user.loginByWeixin().then(res => {
        this.globalData.userInfo = res.data.userInfo;
        this.globalData.token = res.data.token;
        this.globalData.userId = res.data.userId;
        this.globalData.sessionKey = res.data.userInfo.sessionKey;
        wx.setStorageSync('userInfo', res.data.userInfo);
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('userId', res.data.userId);
        wx.setStorageSync('sessionKey', res.data.userInfo.sessionKey);
        console.log(this.globalData.sessionKey + '我是2')
      }).catch((err) => {
        console.log(err)
      });
    });

    var userInfo = wx.getStorageSync('userInfo');
    var avatarUrl = userInfo.avatarUrl
    if (avatarUrl) {
      this.setData({
        login_name: avatarUrl
      })
    }


    var that = this
    that.setData({
      pageUrl: decodeURIComponent(options.pageUrl),
    })
    wx.setNavigationBarTitle({
      title: '登录',
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
  // onPullDownRefresh: function() {

  // },

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
  getPhoneNumber: function(e) {
    var that = this;
    var iv = e.detail.iv
    var encryptedData = e.detail.encryptedData
    that.setData({
      iv: iv,
      encryptedData: encryptedData
    })
    if (e.detail.errMsg != 'getPhoneNumber:ok') {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '拒绝授权',
        success: function(res) {}
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '同意授权',
        success: function(res) {
          console.log('点击同意')
          that.register()
        }
      })

    }
  },
  register: function() {
    console.log('点击同意触发事件')
    console.log(app.globalData.userInfo)
    var that = this
    var data = {}
    data.iv = that.data.iv
    data.encryptedData = that.data.encryptedData
    // data.sessionKey = app.globalData.userInfo.sessionKey
    data.registerType = 1 //手机号
    if (app.globalData.fromUserId) {
      data.fromUserId = app.globalData.fromUserId
    }
    console.log(app.globalData.fromUserId + '转发我的')
    data.tenantId = app.globalData.tenantId
    util.request(api.registerUrl, data).then(function(res) {
      if (res.errno == 0) {
        console.log('接口调用成功')
        // console.log(res)
        // that.setData({
        //   phone: res.data.phone
        // })
        app.globalData.userInfo.isRegister = 1
        var _userInfo = wx.getStorageSync('userInfo');
        _userInfo.isRegister = 1
        wx.setStorageSync('userInfo', _userInfo);
        if (that.data.pageUrl) {
          console.log('传入有页面路径')
          wx.navigateTo({
            url: '../../../../' + that.data.pageUrl
          })
        } else {
          wx.navigateTo({
            url: '../../../../pages/my/index/index',
          })
        }
      } else {
        wx.showToast({
          title: '系统异常',
          icon: 'none',
        })
      }
      console.log(app.globalData.userInfo.isRegister + '注册号')
      console.log(app.globalData.userInfo)
    })

  },
  edit_login: function(e) {
    wx.navigateTo({
      url: '../../../../pages/my/edit/login/index?pageUrl=' + pageUrl,
    })
  },
  phone_login: function(e) {
    var pageUrl = encodeURIComponent(this.data.pageUrl)
    wx.navigateTo({
      url: '../../../../pages/my/bindPhone/index?pageUrl=' + pageUrl,
    })
  },
})