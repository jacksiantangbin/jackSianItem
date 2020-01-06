const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paidImg: '/img/group.png',

    showModal: false,
    success: '/img/success.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.setNavigationBarTitle({
    //   title: '订单详情',
    // })
    var activityState = null, orderState = null
    if (options.activityState) {
      activityState: options.activityState
    }
    if (options.orderState) {
      orderState = options.orderState
    }
    this.setData({
      orderId: options.orderId,
      groupId: options.groupId,
      orderSource: options.orderSource,
      activityState: activityState,
      orderState: orderState,
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
    // wx.redirectTo({
    //   url: '../../../pages/order/index/index?currentNavbar=2',
    // })
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
  my_bespokedetail: function(e) {
    // var orderId = this.data.orderId;
    // var orderSource = this.data.orderSource;
    // wx.redirectTo({
    //   url: '../../../../pages/my/bespoke/item/index?orderId=' + orderId + '&orderType=' + orderSource
    // })
    // this.setData({
    //   showModal: true
    // })
    var orderId = e.currentTarget.dataset.orderId
    var state = e.currentTarget.dataset.groupState
    // if (state == 1) {
      this.setData({
        showModal: true,
        orderId: orderId,
      })
    // } else {
    //   wx.showToast({
    //     title: '待成团的订单暂不能核销',
    //     icon: 'none',
    //   })
    // }

  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 隐藏模态对话框
   */
  hideModal: function() {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function() {
    console.log(888)
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    this.hideModal();
    data.tenantId = app.globalData.tenantId
    util.request(api.consumeOrder, data).then(function(res) {
      if(res.errno == 0){
        if (res.data.state == true) {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            success: function (res) {
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
            }
          })
        }
        if (res.data.state == false) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }else{
        wx.showToast({
          title: res.errmsg,
          icon: 'none'
        })
      }
    });
  },

  orderDetailData: function() {
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.orderSource = that.data.orderSource
    data.isSale = 1
    data.tenantId = app.globalData.tenantId
    util.request(api.orderDetail, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.apiOrderBean;
        datas.orderTime = util.toDate2(datas.orderTime);
        datas.bespeakDate = util.toDate2(datas.bespeakDate);

        var groupTime = datas.groupRemainTime * 1000
        that.setData({
          apiOrderBean: res.data.apiOrderBean,
          groupTime: groupTime,
          group_clock: dateformat(groupTime - 1000),
        });
        setInterval(function() {
          // 渲染倒计时时钟
          that.setData({
            groupTime: that.data.groupTime - 1000,
            group_clock: dateformat(that.data.groupTime - 1000),
          });
        }, 1000);
      }
    });
  },
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
  groupDetail: function (e) {
    var orderId = this.data.orderId
    var groupId = e.currentTarget.dataset.groupId
    wx.navigateTo({
      url: '../../../../pages/activity/groupdetail/index?orderId=' + orderId + '&groupId=' + groupId,
    })
  },
})
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(total_micro_second) {
  // 总秒数
  var second = fill_zero_prefix(Math.floor(total_micro_second / 1000));
  // 天数
  var day = fill_zero_prefix(Math.floor(second / 3600 / 24));
  // 小时
  var hr = fill_zero_prefix(Math.floor(second / 3600 % 24));
  // 分钟
  var min = fill_zero_prefix(Math.floor(second / 60 % 60));
  // 秒
  var sec = fill_zero_prefix(Math.floor(second % 60));
  return day + " 天 " + hr + " 时 " + min + " 分 ";
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}