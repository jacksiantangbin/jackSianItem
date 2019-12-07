const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    name: '',
    phoneNum: '',
    headImg: '/img/group.png',
    information: [{
      wx_name: '张三',
      sex: '性别',
      phone: '手机号',
      address: '地址',
    }],
  },
  blurName: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  radioChange: function(e) {

  },
  blurPhone: function(e) {
    this.setData({
      phoneNum: e.detail.value
    })
    var a = this.data.phoneNum;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phoneNum == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phoneNum)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
  },
  change_num: function() {
    var myPhone = this.data.myPhone;
    var pageUrl = encodeURIComponent('pages/my/information/index/index?myPhone=' + myPhone);
    this.changePhoneNum()
    wx.navigateTo({
      url: '../../../../pages/my/edit/phonenum/index?pageUrl=' + pageUrl
    })
  },

  changePhoneNum: function() {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '个人中心',
    })
    this.setData({
      myPhone: options.myPhone
    })
    this.informationData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  informationData: function() {
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
          gender: res.data.user.gender,
          userPhone: str2
        })


        if (that.data.gender == 1) {
          that.setData({
            items: [{
              name: '男',
              checked: true
            }]
          })
        }
        if (that.data.gender != 1) {
          that.setData({
            items: [{
              name: '女',
              checked: true
            }]
          })
        }
      } else {

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
  // onShareAppMessage: function () {

  // },
  my_center: function(e) {
    var that = this
    var data = {}
    data.name = that.data.name
    data.tenantId = app.globalData.tenantId
    util.request(api.correctInformation, data).then(function(res) {
      if (res.errno == 0) {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        if (res.data.state == true) {
          wx.switchTab({
            url: '/pages/my/index/index',
          })
        }
        var _userInfo = wx.getStorageSync('userInfo');
        _userInfo.name = that.data.name;
        app.globalData.userInfo.name = that.data.name
        wx.setStorageSync('userInfo', _userInfo);
      }
    });
  },
})