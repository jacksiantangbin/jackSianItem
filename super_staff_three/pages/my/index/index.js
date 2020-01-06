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
    dialog: null,
    userInfo: {},
    hasUserInfo: false,
    nickName: '昵称',
    showModal_logo: false,
    storeType: '/img/storeType.png',
    tenantName: '',
    tanentType: '/img/tanentType.png',
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
    var nickName = _userInfo.nickName
    var myPhone = _userInfo.avatarUrl

    if (nickName) {
      that.setData({
        nickName: nickName
      });
    }
    if (myPhone) {
      that.setData({
        myPhone: myPhone
      });
    }

    if (app.globalData.tenantName) {
      this.setData({
        tenantName: app.globalData.tenantName
      })
    }

    if (app.globalData.tenantLength) {
      this.setData({
        tenantLength: app.globalData.tenantLength
      })
    }

    if (app.globalData.tenantId) {
      this.setData({
        tenantId: app.globalData.tenantId
      })
    }

      
    this.setData({
      memberCount: app.globalData.memberCount
    })

    this.setData({
      isShareholder: app.globalData.isShareholder
    })

    this.setData({
      superStaff: app.globalData.superStaff
    })


    if (!app.globalData.tenantId) {
      this.tenantList()
    }

  },
  myInformation: function() {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.myInformation, data).then(function(res) {
      if (res.errno == 0) {

      }
    });
  },
  tenantList: function() {
    var that = this
    var data = {};
    util.request(api.tenantList, data).then(function(res) {
      if (res.errno == 0) {
        app.globalData.tenantLength = res.data.tenantList.length
        app.globalData.tenantId = res.data.tenantList.slice(0, 1)[0]["tenantId"]
        var datas = res.data.tenantList;
        for (var i = 0; i < datas.length; i++) {
          if (app.globalData.tenantId == res.data.tenantList[i]["tenantId"]) {
            app.globalData.tenantName = res.data.tenantList[i]["tenantName"]
          }
        }
      
        if(app.globalData.tenantId){
          var that = this
          var data = {};
          data.tenantId = app.globalData.tenantId
          util.request(api.checkShareHolder, data).then(function (res) {
            if (res.errno == 0) {
              if (res.data.state == true) {
                if (res.data.user.isHolder) {
                  app.globalData.isShareholder = res.data.user.isHolder
                } else {
                  app.globalData.isShareholder = 0
                }
                if (res.data.user.staffId) {
                  app.globalData.superStaff = res.data.user.staffId
                } else {
                  app.globalData.superStaff = 0
                }
                if (res.data.user.memberCount) {
                  app.globalData.memberCount = res.data.user.memberCount
                } else {
                  app.globalData.memberCount = 0
                }

                that.setData({
                  tenantName: app.globalData.tenantName,
                  tenantLength: app.globalData.tenantLength,
                  memberCount: app.globalData.memberCount,
                  superStaff: app.globalData.superStaff,
                  isShareholder: app.globalData.isShareholder,
                })
              }
            }
          });
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
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
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
    }
  },


  myVip: function(e) {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
      var userInfo = wx.getStorageSync('userInfo');
   
      var memberCount = app.globalData.memberCount
      var isRegister = userInfo.isRegister
      var myPhone = this.data.myPhone
      var pageUrl = encodeURIComponent('pages/my/myVip/index?myPhone=' + myPhone)
      if (isRegister > 0) {
        if (memberCount < 1) {
          wx.navigateTo({
            url: '../../../pages/my/myVip/index'
          })
        } else {
          wx.navigateTo({
            url: '../../../pages/my/membership/card/index'
          })
        }
      } else {
        wx.navigateTo({
          url: '../../../pages/my/edit/login/index?pageUrl=' + pageUrl
        })
      }
    }
  },
  superStaff: function() {
    var staffId = app.globalData.superStaff
    wx.navigateTo({
      url: '../../../pages/staff/login/index?isMy=1' + '&staffId=' + staffId,
    })
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
  },
  message: function(e) {
    wx.navigateTo({
      url: '../../../pages/action/message/index/index',
    })
  },
  actionList: function(e) {
    wx.navigateTo({
      url: '../../../pages/action/list/tab/index',
    })
  },
  note: function(e) {
    wx.navigateTo({
      url: '../../../pages/action/note/index/index',
    })
  },
  storeType: function(e) {
    wx.navigateTo({
      url: '../../../pages/store/tenant/index',
    })
  }
})