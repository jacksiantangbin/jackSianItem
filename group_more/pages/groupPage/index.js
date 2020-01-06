const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // gr_small: 'http://image-test.wemeke.com/tenant/small.png',
    // gr_big: 'http://image-test.wemeke.com/tenant/big.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
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
  },
  gr_img: function() {
    var that = this
    var condition = {}
    condition.tenantId = app.globalData.tenantId
    util.request(api.groupPage, condition).then(function(res) {
      if (res.errno == 0) {
        if (res.data.data.logo) {
          that.setData({
            gr_small: res.data.data.logo,
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../../pages/store/groupLogin/index',
            })
          }, 5000)
        } else {
          that.setData({
            gr_small: 'http://image-test.wemeke.com/tenant/small.png',
          })
        }
      } else {
        that.setData({
          gr_small: 'http://image-test.wemeke.com/tenant/small.png',
        })
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
    var that = this
    setTimeout(function () {
      wx.hideLoading()
      that.gr_img()
    }, 2000)
    
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
    this.gr_img();
    setTimeout(function () {
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
  // onShareAppMessage: function() {

  // }
})


// "tabBar": {
//   "backgroundColor": "#ffffff",
//   "borderStyle": "black",
//   "selectedColor": "#4298dc",
//   "color": "#888888",
//   "list": [{
//       "pagePath": "pages/index/index",
//       "iconPath": "static/images/home.png",
//       "selectedIconPath": "static/images/home_selected.png",
//       "text": "首页"
//     },
//     {
//       "pagePath": "pages/my/index/index",
//       "iconPath": "static/images/my.png",
//       "selectedIconPath": "static/images/my_selected.png",
//       "text": "我的"
//     }
//   ]
// },