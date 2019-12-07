const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paidImg: '/img/group.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({
    //   title: '订单详情',
    // })
    var orderState = null
    if (options.orderState) {
      orderState = options.orderState
    }
    this.setData({
      orderId: options.orderId,
      groupId: options.groupId,
      orderSource: options.orderSource,
      orderState: orderState
    })
    this.orderDetailData()
    this.storeDetail()
  },
  storeDetail: function () {
    var that = this
    var condition = {};
    if (that.data.groupId) {
      condition.groupId = that.data.groupId
    }
    if (that.data.orderId) {
      condition.orderId = that.data.orderId
    }
    condition.tenantId = app.globalData.tenantId
    util.request(api.groupStoreOnly, condition).then(function (res) {
      if (res.errno == 0) {
        that.setData({
          storeDetail: res.data.data,
        });
      }
    });
  },
  orderDetailData: function () {
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.orderSource = that.data.orderSource
    data.isSale = 1 
    data.tenantId = app.globalData.tenantId
    util.request(api.orderDetail, data).then(function (res) {
      if (res.errno == 0) {
        var datas = res.data.apiOrderBean;
        datas.orderTime = util.toDate2(datas.orderTime);
        datas.bespeakDate = util.toDate2(datas.bespeakDate);
        that.setData({
          apiOrderBean: res.data.apiOrderBean,
        });
      }
    });
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  groupDetail: function (e) {
    var orderId = this.data.orderId
    var groupId = e.currentTarget.dataset.groupId
    wx.navigateTo({
      url: '../../../../pages/activity/groupdetail/index?orderId=' + orderId + '&groupId=' + groupId,
    })
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  telPhone: function (e) {
    var phone = e.currentTarget.dataset.phone
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone + '',
      })
    }
  },
  getLocation: function (e) {
    var that = this
    var lat = e.currentTarget.dataset.lat
    var lon = e.currentTarget.dataset.lon
    var name = e.currentTarget.dataset.name
    var address = e.currentTarget.dataset.address

    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = parseFloat(lat)
        const longitude = parseFloat(lon)
        console.log(latitude)
        wx.openLocation({
          latitude,
          longitude,
          scale: 18,
          name: name,
          address: address
        })
      },
      fail: function (e) {
        console.log('获取位置失败');
        wx.showModal({
          title: '获取地理位置失败',
          content: '请允许使用您的位置信息',
          cancelText: '取消',
          confirmText: "设置",
          // showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.openSetting({
                success: function () {

                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    })
  },
})