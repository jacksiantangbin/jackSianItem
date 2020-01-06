const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showModal: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShow: false,
    logo: '/img/my.png',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // getUserInfo: function(e) {
    //   console.log(e.detail.userInfo)
    //   var _userInfo = wx.getStorageSync('userInfo');
    //   if (_userInfo){
    //     _userInfo.gender = e.detail.userInfo.gender
    //     _userInfo.nickName = e.detail.userInfo.nickName;
    //     _userInfo.avatarUrl = e.detail.userInfo.avatarUrl;
    //     wx.setStorageSync('userInfo', _userInfo);
    //   }else{
    //     app.globalData.userInfo = e.detail.userInfo
    //     var userInfo = e.detail.userInfo
    //     wx.setStorageSync('userInfo', userInfo)
    //   }
    //   this.setData({
    //     userInfo: e.detail.userInfo,
    //     hasUserInfo: true,
    //     showModal: false,
    //   })
    // },
    getUserInfo: function () {
      var that = this;
      wx.getUserInfo({
        success: function (res) {
          var userInfo = res.userInfo
          var nickName = userInfo.nickName
          var avatarUrl = userInfo.avatarUrl
          var gender = userInfo.gender //性别 0：未知、1：男、2：女
          var province = userInfo.province
          var city = userInfo.city
          var country = userInfo.country
          var data = userInfo;
          data.tenantId = app.globalData.tenantId
          util.request(api.bindWxMessage, data).then(function (res) {
            if (res.errno === 0) {
              //设置微信信息.
              app.globalData.userInfo = res.data.userInfo
              wx.setStorageSync('userInfo', res.data.userInfo)
              that.setData({
                showModal: false,
              })
            }
          });
        }
      })
    },
    hideModal: function () {
      this.setData({
        showModal: false
      })
    },
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行

    },
    detached() {
      // 在组件实例被从页面节点树移除时执行

    },
  },
  pageLifetimes: {
    show() {
      if (app.globalData.userInfo) {
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true,
        })
        var _userInfo = wx.getStorageSync('userInfo');
        if (_userInfo) {
          _userInfo.gender = app.globalData.userInfo.gender
          _userInfo.nickName = app.globalData.userInfo.nickName;
          _userInfo.avatarUrl = app.globalData.userInfo.avatarUrl;
          wx.setStorageSync('userInfo', _userInfo);
        } else {
          var userInfo = app.globalData.userInfo
          wx.setStorageSync('userInfo', userInfo)
        }

      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
          })
          var _userInfo = wx.getStorageSync('userInfo');
          if (_userInfo) {
            _userInfo.gender = res.userInfo.gender
            _userInfo.nickName = res.userInfo.nickName;
            _userInfo.avatarUrl = res.userInfo.avatarUrl;
            wx.setStorageSync('userInfo', _userInfo);
          } else {
            var userInfo = res.userInfo
            wx.setStorageSync('userInfo', userInfo)
          }
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true,
            })
            var _userInfo = wx.getStorageSync('userInfo');
            if (_userInfo) {
              _userInfo.gender = res.userInfo.gender
              _userInfo.nickName = res.userInfo.nickName;
              _userInfo.avatarUrl = res.userInfo.avatarUrl;
              wx.setStorageSync('userInfo', _userInfo);
            } else {
              var userInfo = res.userInfo
              wx.setStorageSync('userInfo', userInfo)
            }
          }
        })
      }
    },
    hide() {
      // 页面被隐藏

    }
  }
})