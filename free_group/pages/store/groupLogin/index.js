const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    iscode: null, //用于存放验证码接口里获取到的code
    time: '获取验证码', //倒计时 
    currentTime: 60,
    login_name: '/img/my.png',
    displayWarn: 'display:none',
  },

  phoneNumBlur: function(e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getCodeValue: function(e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo');
    var avatarUrl = userInfo.avatarUrl
    if (avatarUrl) {
      this.setData({
        login_name: avatarUrl
      })
    }
  },

  /**
   * 表单-提交(到后端)
   */

  submitCheckInfo: function() {
    var that = this
    if (!that.data.phoneNum) {
      wx.showToast({
        title: '请输入账号',
        icon: 'none',
        duration: 2000,
      })
    } else if (!that.data.code) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000,
      })
    } else {
      var data = {};
      data.userName = that.data.phoneNum
      data.password = that.data.code
      data.tenantId = app.globalData.tenantId
      util.request(api.testLoginPage, data).then(function(res) {
        if (res.errno == 0) {
          if (res.data.tenantId) {
            app.globalData.tenantId = res.data.tenantId;
            
            wx.showToast({
              title: '成功',
              icon: 'success',
              success: function() {
                setTimeout(function() {
                  wx.navigateTo({
                    url: '/pages/store/groupIndex/index?tenantId=' + res.data.tenantId,
                  })
                }, 1500)
              }
            })
          } else {
            wx.showModal({
              title: '提示',
              content: '你不是付费会员，你的账户还未开通',
              success: function(res) {
                if (res.cancel) { //取消

                } else { //确认
                  // setTimeout(function () {
                  //   wx.navigateBack({
                  //     delta: 1
                  //   })
                  // }, 1500)
                }
              },
            })
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '你不是付费会员，你的账户还未开通',
            showCancel: true, //是否显示取消按钮
            // cancelText: "否",//默认是“取消”
            cancelColor: 'skyblue', //取消文字的颜色
            // confirmText: "是",//默认是“确定”
            confirmColor: '#000', //确定文字的颜色
            success: function(res) {
              if (res.cancel) { //取消

              } else { //确认
                // setTimeout(function () {
                //   wx.navigateBack({
                //     delta: 1
                //   })
                // }, 1500)
              }
            },
          })
        }
      });
    }
  },
})