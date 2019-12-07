const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var user = require('../../../../services/user.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialog: '/img/dialog_powder.png',
    sc_cover: '/img/logo.png',
    total: 1,
    showModal_logo: false,
    firstShow: 0,
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

    var fromUserId = null
    var tenantId = null
    var staffId = null
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
      app.globalData.superStaff = staffId
    }
  },
  tenantMore: function () {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.tenantMore, data).then(function (res) {
      if (res.errno == 0) {

      }
    });
  },
  superStaffList: function() {
    var that = this
    var data = {}
    data.staffId = app.globalData.superStaff
    data.tenantId = app.globalData.tenantId
    data.type = 1
    data.page = 1
    data.rows = 100
    util.request(api.superStaffList, data).then(function(res) {
      if (res.errno == 0) {
        if (res.data.isStaff == false) {
          var datas = res.data.rows;
          for (var i = 0; i < datas.length; i++) {
            datas[i]["beginDate"] = util.toDate(datas[i]["beginDate"])
            datas[i]["endDate"] = util.toDate(datas[i]["endDate"])
          }
          that.setData({
            activityList: res.data.rows,
            total: res.data.total,
          })
        } else {
          wx.redirectTo({
            url: '../../../../pages/staff/activity/list/index',
          })
        }
      }
    });
  },
  freeCollect: function(e) {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
      var activityId = e.currentTarget.dataset.activityId
      var pageUrl = encodeURIComponent('pages/staff/activity/showList/index')
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.isRegister == 1) {
        var that = this
        var data = {}
        data.activityId = activityId
        data.staffId = app.globalData.superStaff
        data.tenantId = app.globalData.tenantId
        util.request(api.superStaffGet, data).then(function(res) {
          if (res.errno == 0) {
            if (res.data.state == true) {
              that.setData({
                getData: res.data
              })
              wx.showToast({
                title: '领取成功已放入【我的-活动列表】',
                icon: 'none',
                duration: 2000,
              })
              that.superStaffList()
            } else {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000,
              })
            }
          }
        });
      } else {
        wx.navigateTo({
          url: '../../../../pages/my/edit/login/index?pageUrl=' + pageUrl
        })
      }
    }
  },
  activityDetail: function(e) {
    var holderId = e.currentTarget.dataset.holderId
    var activityId = e.currentTarget.dataset.activityId
    var isGet = e.currentTarget.dataset.isGet
    if (isGet > 0) {
      wx.navigateTo({
        url: '../../../../pages/action/list/detail/index?activityId=' + activityId + '&holderId=' + holderId,
      })
    } else {
      wx.navigateTo({
        url: '../../../../pages/staff/activity/getDetail/index?activityId=' + activityId,
      })
    }

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
    if (that.data.firstShow < 1) {
      setTimeout(function() {
        wx.hideLoading()
        that.tenantMore()
        that.superStaffList()
        that.setData({
          firstShow: 1
        })
      }, 2000)
    } else {
      that.superStaffList()
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
  // onShareAppMessage: function() {

  // }
})