var util = require('./utils/util.js');
var api = require('./config/api.js');
var user = require('./services/user.js');
App({
  onLaunch: function() {
    console.log('开始2')
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    
    // 自己登陆
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
        }).catch((err) => {
          console.log(err)
        });
      }
      console.log(this.globalData.sessionKey + '我是2')
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
      }).catch((err) => {
        console.log(err)
      });
      console.log(this.globalData.sessionKey + '我是3')
    });



    // 微信登录
    wx.login({
      success: res => {}
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    districtId: 0,
    cityId: '',
    districtName: '',
    districtType: '',
    userId: '',
    token: '',
    sessionKey: '',
    phoneNumber: '18310324424',
    isRegister: '',
    fromUserId: '',
    refreshFlag: 'false',
    latitude: '',
    longitude: '',
    couponNum: '',
    cityindex: '',
    subcityindex: '',
    districtParentId: '',
    activityNum: '',
    articleId: '',
    tabIndex: 0,
    orgId: '',
    isShareholder:'',
    tenantId:'',
    tenantName:'',
    tenantOrgId:'',
    tenantLength:'',
    tentanStore:'',
  }
})