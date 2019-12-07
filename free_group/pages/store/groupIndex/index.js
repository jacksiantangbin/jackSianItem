const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp()
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

    if (options.tenantId){
      this.setData({
        tenantId: options.tenantId
      })
    }
  },
  groupIndexList: function() {
    var data = {};
    var that = this
    //data.tenantId = this.data.tenantId
    data.tenantId = app.globalData.tenantId
    util.request(api.testGroupPage, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          storeItemList: res.data.groupList,
        });
      }
    });
  },
  groupDetail: function(e) {
    var groupId = e.currentTarget.dataset.groupId
    console.log(groupId)
    wx.navigateTo({
      url: '../../../pages/activity/groupdetail/index?groupId=' + groupId,
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
    var that = this
    setTimeout(function () {
      wx.hideLoading()
      that.groupIndexList()
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
    this.groupIndexList();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
})