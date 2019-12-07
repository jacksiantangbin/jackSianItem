const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '/img/my.png',
    my_name: '',
    checked1: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.myInformation()
  },
  myInformation: function() {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.myInformation,data).then(function(res) {
      if (res.errno == 0) {
        var startPhone = res.data.user.phone
        var str = startPhone;
        var str2 = str.substr(0, 3) + "****" + str.substr(7);
        that.setData({
          user: res.data.user,
          avatarUrl: res.data.user.avatarUrl,
          nickName: res.data.user.nickName,
          my_name: res.data.user.name,
          phone: str2,
          gender: res.data.user.gender,
          sex_value: res.data.user.gender,
          // userPhone: str2
        })
        if (res.data.user.gender == 1) {
          that.setData({
            checked1: false,
            checked2: true
          })
        } else {
          that.setData({
            checked1: true,
            checked2: false
          })
        }
      }
    });
  },
  blurName: function(e) {
    if (e.detail.value) {
      this.setData({
        my_name: e.detail.value
      })
      if (e.detail.value.length > 3){
        wx.showToast({
          title: '字数超过限制',
          icon:'none',
        })
      }
    }

  },
  radioChange: function(e) {
    if (e.detail.value) {
      this.setData({
        sex_value: e.detail.value,
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  my_center: function(e) {
    var that = this
    var data = {}
    data.name = that.data.my_name
    data.gender = that.data.sex_value
    data.tenantId = app.globalData.tenantId
    util.request(api.correctInformation, data).then(function(res) {
      if (res.errno == 0) {
        wx.showToast({
          title: '保存成功',
          icon: 'success',
          success: function(res) {
            setTimeout(function() {
              wx.switchTab({
                url: '/pages/my/index/index',
              })
            }, 1500)
          }
        })

        var _userInfo = wx.getStorageSync('userInfo');
        _userInfo.name = that.data.my_name;
        _userInfo.gender = that.data.sex_value;
        app.globalData.userInfo.name = that.data.my_name
        wx.setStorageSync('userInfo', _userInfo);
      }
    });
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

  // },
  bindPhone: function(e) {
    var pageUrl = encodeURIComponent('pages/my/edit/index');
    wx.navigateTo({
      url: '../bindPhone/index?pageUrl=' + pageUrl
    })
  },
})