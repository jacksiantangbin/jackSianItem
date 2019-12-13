const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backPage: 1,
    worksList: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var fromUserId = options.fromUserId
    var _userInfo = wx.getStorageSync('userInfo');
    if (fromUserId) {
      _userInfo.fromUserId = fromUserId;
      app.globalData.fromUserId = fromUserId
    }
    wx.setStorageSync('userInfo', _userInfo);

    var that = this
    that.setData({
      orgId: options.orgId
    })
    this.storePicList()
  },
  storePicList: function () {
    var that = this
    var data = {};
    data.orgId = that.data.orgId
    data.tenantId = app.globalData.tenantId
    util.request(api.storePicUrl, data).then(function (res) {
      if (res.errno == 0) {
        var storeImageList = res.data.imageList
        that.setData({
          storeImageList: storeImageList,
        });
      }
    });
  },
  previewImage2: function (e) {
    var url = e.currentTarget.dataset.url.imageUrl;
    var big_imagelist = e.currentTarget.dataset.imagelist;
    var imgArr = [];
    for (var i = 0; i < big_imagelist.length; i++) {
      imgArr.push(big_imagelist[i]["imageUrl"]);
    }
    wx.previewImage({
      urls: imgArr, //预览的图片url数组
      current: url, //当前的url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.storePicList();
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function (ops) {
  //   var userId = app.globalData.userId
  //   var orgId = this.data.orgId
  //   if (ops.from === 'button') {

  //   }
  //   return {
  //     title: '美丽圈小程序',
  //     path: 'pages/store/pic/index?fromUserId=' + userId + '&orgId=' + orgId,
  //     success: function (res) {

  //     },
  //   }
  // }
})