const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paidImg: '/img/group.png',
    orderperson: '8',
    orderOvertime: '22222',
    dialogImg: '/img/dialog_over.png',
    showModal: false,
    showModal_de: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.setNavigationBarTitle({
    //   title: '订单详情',
    // })
    this.setData({
      orderId: options.orderId,
      groupId: options.groupId,
      orderSource: options.orderSource
    })
    var that = this
    this.orderDetailData()
    this.storeDetail()
  },
  storeDetail: function() {
    var that = this
    var condition = {};
    if (that.data.groupId) {
      condition.groupId = that.data.groupId
    }
    if (that.data.orderId) {
      condition.orderId = that.data.orderId
    }
    condition.tenantId = app.globalData.tenantId
    util.request(api.groupStoreOnly, condition).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          storeDetail: res.data.data,
        });
      }
    });
  },
  order_de: function(e) {
    var orderId = e.currentTarget.dataset.orderId
    this.setData({
      showModal_de: true,
      orderId: orderId
    })
  },
  showDialogBtn: function() {
    this.setData({
      showModal: true
    })
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
      showModal: false,
      showModal_de: false
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
    this.hideModal();
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.tenantId = app.globalData.tenantId
    util.request(api.orderOver, data).then(function(res) {
      if (res.errno == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'success',
          success: function(res) {
            setTimeout(function() {
              wx.navigateBack({
                delta: 1
              })
            }, 1500)
          }
        })
      }else{
        wx.showToast({
          title: res.errmsg,
          icon:'none',
        })
      }
    });
  },
  onConfirm_de: function() {
    this.hideModal();
    var that = this
    var data = {};
    data.orderId = that.data.orderId
    data.tenantId = app.globalData.tenantId
    util.request(api.delOrder, data).then(function (res) {
      if (res.errno == 0) {
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
        var remainTime = datas.remainTime * 1000
        var groupTime = datas.groupRemainTime * 1000
        that.setData({
          apiOrderBean: res.data.apiOrderBean,
          remainTime: remainTime,
          groupTime: groupTime,
          clock: date_format(remainTime - 1000),
          group_clock: dateformat(groupTime - 1000),
        });
        setInterval(function() {
          // 渲染倒计时时钟
          that.setData({
            remainTime: that.data.remainTime - 1000,
            groupTime: that.data.groupTime - 1000,
            clock: date_format(that.data.remainTime - 1000),
            group_clock: dateformat(that.data.groupTime - 1000),
          });
        }, 1000);
      }
    });
  },
  payDetail: function(e) {
    var orderSource = this.data.orderSource
    var orderId = this.data.orderId
    var groupId = this.data.groupId
    var isNew = app.globalData.userInfo.isNew;
    if (orderSource == 1 && isNew == 0) {
      wx.navigateTo({
        url: '../../../../pages/pay/item/itemPay?orderId=' + orderId
      })
    } else if (orderSource == 1 && isNew == 1) {
      wx.navigateTo({
        url: '../../../../pages/pay/item2/itemPay?orderId=' + orderId
      })
    } else if (orderSource == 2) {
      wx.navigateTo({
        url: '../../../../pages/pay/item4/itemPay?orderId=' + orderId + '&groupId=' + groupId
      })
    } else if (orderSource == 3) {
      wx.navigateTo({
        url: '../../../../pages/pay/item3/itemPay?orderId=' + orderId
      })
    }
  },
  groupDetail: function(e) {
    var orderId = this.data.orderId
    var groupId = e.currentTarget.dataset.groupId
    wx.navigateTo({
      url: '../../../../pages/activity/groupdetail/index?orderId=' + orderId + '&groupId=' + groupId,
    })
  },
  telPhone: function(e) {
    var phone = e.currentTarget.dataset.phone
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone + '',
      })
    }
  },
  getLocation: function(e) {
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
      fail: function(e) {
        console.log('获取位置失败');
        wx.showModal({
          title: '获取地理位置失败',
          content: '请允许使用您的位置信息',
          cancelText: '取消',
          confirmText: "设置",
          // showCancel: false,
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.openSetting({
                success: function() {

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


// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(number) {
  // 秒数
  var second = fill_zero_prefix(Math.floor(number / 1000));
  // 小时位
  var hr = fill_zero_prefix(Math.floor(second / 3600));
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
  // 毫秒位，保留2位
  return hr + " : " + min + " : " + sec;
}
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
  return day + " 天 " + hr + " 时 " + min + " 分 " + sec + "秒";
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}