const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    sc_cover: '/img/st_cover.png',
    staffImg: '/img/staff.png',
    isLogin: false,
    showModal_logo: false,
    isMy: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    var fromUserId = null
    var tenantId = null
    var staffId = null

    if (options.isMy) {
      this.setData({
        isMy: options.isMy
      })
    }
    if (this.data.isMy < 1) {
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
    }

    if (options.scene) {
      // var opsq = []
      var url = decodeURIComponent(options.scene);
      console.log(url)
      //找出位置
      // var index = url.lastIndexOf("/");
      // var parametervalue = url.substr(index + 1);
      var array = url.split('_');
      // console.log(array)
      this.setData({
        tenantId: array[0],
        staffId: array[1],
        isShare: array[2],
        fromUserId: array[3],
      })
      tenantId = array[0]
      staffId = array[1]
      fromUserId = array[3];
    }
    if (fromUserId) {
      app.globalData.fromUserId = fromUserId
    }
    if (tenantId) {
      app.globalData.tenantId = tenantId
    }
    if (staffId) {
      this.setData({
        staffId: staffId
      })
    }
    if (options.staffId) {
      this.setData({
        staffId: options.staffId
      })
    }
    // this.setData({
    //   staffId:112300
    // })

    // var userInfo = wx.getStorageSync('userInfo');
    // if (userInfo.nickName == null || userInfo.nickName == '') {
    //   if (userInfo.isRegister < 1){
    //     this.setData({
    //       isLogin: true,
    //     });
    //   }else{
    //     this.setData({
    //       isLogin: true,
    //     });
    //   }
    // }else{
    //   if (userInfo.isRegister < 1) {
    //     this.setData({
    //       isLogin: true,
    //     });
    //   }else{
    //     this.setData({
    //       isLogin: false,
    //     });
    //   }
    // }

  },
  tenantMore: function() {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.tenantMore, data).then(function(res) {
      if (res.errno == 0) {

      }
    });
  },
  superStaffbind: function() {
    if (this.data.staffId) {
      var that = this
      var data = {}
      data.staffId = that.data.staffId
      data.tenantId = app.globalData.tenantId
      util.request(api.superStaffBind, data).then(function(res) {
        if (res.errno == 0) {
          if (res.data.state == false) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    }
  },
  superStaffDetail: function() {
    var that = this
    var data = {}
    data.staffId = that.data.staffId
    data.tenantId = app.globalData.tenantId
    util.request(api.superStaffDetail, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          staff: res.data.staff
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
    setTimeout(function() {
      wx.hideLoading()
      that.tenantMore()
      that.superStaffbind()
      that.superStaffDetail()
    }, 2000)

    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      if (userInfo.isRegister < 1) {
        this.setData({
          isLogin: true,
        });
      } else {
        this.setData({
          isLogin: true,
        });
      }
    } else {
      if (userInfo.isRegister < 1) {
        this.setData({
          isLogin: true,
        });
      } else {
        this.setData({
          isLogin: false,
        });
      }
    }
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
  goLogin: function() {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
      var staffId = this.data.staffId
      var pageUrl = encodeURIComponent('pages/staff/login/index?staffId=' + staffId)
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.isRegister > 0) {
        this.setData({
          isLogin: false
        })
      } else {
        wx.navigateTo({
          url: '../../../pages/my/edit/login/index?pageUrl=' + pageUrl
        })
      }
    }
  },
  over_login: function() {
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定要退出？',
      showCancel: true, //是否显示取消按钮
      // cancelText: "否",//默认是“取消”
      // cancelColor: 'skyblue',//取消文字的颜色
      // confirmText: "是",//默认是“确定”
      // confirmColor:'#000',//确定文字的颜色
      success: function(res) {
        if (res.cancel) { //取消

        } else { //确认
          that.overLogin()
        }
      },
    })
  },
  myActivity: function() {
    var staffId = this.data.staffId
    wx.navigateTo({
      url: '../../../pages/staff/activity/list/index?staffId=' + staffId,
    })
  },
})