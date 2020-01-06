const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPay: 1,
    sharegold: 0,
    checked: true,
    item4_index: 0,
    wx_pay: 1,
    envelopes_price: '0',
    sum_price: '0',
    groupActivityId: '',
    item3_index: 0,
    envelopes: '红包',
    wx: '/img/wx.png',
    pay_price: '￥599',
    money: 100,
    group: [],
    storeList: [],
    shareImg: '/img/share.png',
    payOrderItem: [],
    yellow_fire: '/img/yellow_fire.png',
    red_fire: '/img/red_fire.png',
    isOffered:'',
  },
  shardNumber: function(e) {
    e.detail.value = e.detail.value.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符  
    e.detail.value = e.detail.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的  
    e.detail.value = e.detail.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    e.detail.value = e.detail.value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');//只能输入两个小数  
    e.detail.value = e.detail.value.replace(/^\./g, "");
    if (e.detail.value.indexOf(".") < 0 && e.detail.value != "") {//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
      e.detail.value = parseFloat(e.detail.value);
    }
    this.setData({
      sharegold: e.detail.value,
      web_sharegold: e.detail.value
    })
    if (this.data.sharegold >= this.data.group.groupPrice) {
      this.setData({
        sharegold: this.data.group.groupPrice,
        web_sharegold: this.data.group.groupPrice
      })
    } else {
      this.setData({
        sharegold: this.data.sharegold,
        web_sharegold: this.data.sharegold
      })
    }
    if (this.data.sharegold >= this.data.shareGold.accountAmount) {
      this.setData({
        sharegold: this.data.shareGold.accountAmount,
        web_sharegold: this.data.shareGold.accountAmount
      })
    } else {
      this.setData({
        sharegold: this.data.sharegold,
        web_sharegold: this.data.sharegold
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var orderId = null
    var activityState = null
    var activityNum = null
    var groupActivityId = null
    var groupId = null
    var isOffered = null 
    if (options.isOffered) {
      isOffered = options.isOffered
    }
    if (options.orderId) {
      orderId = options.orderId
    }
    if (options.activityState) {
      activityState = options.activityState
    }
    if (app.globalData.activityNum) {
      activityNum = app.globalData.activityNum
    }
    if (options.groupActivityId) {
      groupActivityId = options.groupActivityId
    }
    if (options.groupId) {
      groupId = options.groupId
    }
    var aglin = null
    if (options.aglin) {
      aglin = options.aglin
    }
    that.setData({
      groupId: groupId,
      groupActivityId: groupActivityId,
      orderId: orderId,
      activityState: activityState,
      activityNum: activityNum,
      aglin: aglin,
      isOffered: isOffered,
    })

  },
  groupOrderData: function() {
    var that = this
    var data = {};
    if (app.globalData.latitude) {
      data.lat = app.globalData.latitude
    }
    if (app.globalData.longitude) {
      data.lon = app.globalData.longitude
    }
    if (that.data.orderId) {
      data.orderId = that.data.orderId
    }
    if (that.data.groupId) {
      data.groupId = that.data.groupId
    }
    if (that.data.groupActivityId) {
      data.groupActivityId = that.data.groupActivityId
    }
    data.isNew = app.globalData.userInfo.isNew
    data.tenantId = app.globalData.tenantId
    util.request(api.groupOrderUrl, data).then(function(res) {

      that.setData({
        group: res.group,
        groupId: res.group.groupId,
        groupName: res.group.groupName,
        groupTitle: res.group.groupTitle,
        shareGold: res.shareGold,
        minPrice: res.minPrice,
        maxPrice: res.maxPrice,
        steps: res.steps,
        groupType: res.group.groupType
      });

      if (res.steps) {
        var steps = res.steps
        var step_price = null, step_person = null;
        var step_arry = []
        var step_arry2 = []
        var personCount = res.group.personCount + 1
        // var personCount = 4
        for (var i = 0; i < steps.length; i++) {
          var st_personCount = steps[i]["personCount"]
          if (personCount > st_personCount) {
            step_price = steps[i]["price"]
            step_person = steps[i]["personCount"]
          }else{
            step_price = res.maxPrice
          }
          step_arry.push(step_price)
          step_arry2.push(step_person)
        }
        that.setData({
          step_person: Math.max.apply(Math, step_arry2)
        })
        for (var j = 0; j < step_arry.length; j++) {
          if(step_arry[j] == "" || step_arry[j] == null || typeof (step_arry[j]) == "undefjned") {
            step_arry.splice(j, 1);
            j = j - 1;
            that.setData({
              step_price_pay: Math.min.apply(Math, step_arry)
            })
          }else{
            that.setData({
              step_price_pay: Math.min.apply(Math, step_arry)
            })
          }

        }
        // return step_arry;
      }

      if (that.data.share_accountAmount < 0) {
        that.setData({
          share_accountAmount: 0,
        })
      }
    });
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
          orgId: res.data.data.orgId
        });
      }
    });
  },
  wx_pay: function(e) {
    this.setData({
      wx_pay: e.detail.value
    })
    if (this.data.wx_pay == '') {
      wx.showToast({
        title: '请选择支付方式',
        icon: 'none'
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
    this.groupOrderData()
    this.storeDetail()
    this.setData({
      isPay: 1,
      firstJump: true
    })
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

  navigateToPayResult: function(e) {
    var that = this
    var condition = {};
    condition.groupId = that.data.groupId
    condition.tenantId = app.globalData.tenantId
    util.request(api.offeredUrl, condition).then(function (res) {
      if (res.errno == 0) {
        that.pay()
        that.setData({
          isPay: 0
        })
      } else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none'
        })
      }
    });
  },

  pay: function() {
    var that = this
    var data = {};
    if (that.data.aglin == null) {
      if (that.data.orderId){
        data.orderId = that.data.orderId
      }
    } else {

    }
    if (that.data.groupId) {
      data.groupId = that.data.groupId
    }
    if (that.data.groupActivityId) {
      data.groupActivityId = that.data.groupActivityId
    }
    if (that.data.sharegold == '') {
      data.shareAmount = 0
    } else {
      data.shareAmount = that.data.sharegold
    }
    if (that.data.groupType == 4){
      data.orderPrice = that.data.step_price_pay
    }else{
      data.orderPrice = that.data.group.groupPrice
    }
    if (that.data.groupType == 4){
      data.realAmount = (that.data.step_price_pay * 100 - that.data.sharegold * 100) / 100
    } else if (that.data.groupType == 3 && that.data.isOffered > 0){
      data.realAmount = (0 * 100 - that.data.sharegold * 100) / 100
    }else{
      data.realAmount = (that.data.group.groupPrice * 100 - that.data.sharegold * 100) / 100
    }
    
    if (that.data.wx_pay == '微信支付' || that.data.wx_pay == 1) {
      data.payType = 1
    }
    data.itemId = that.data.group.itemId
    if (app.globalData.articleId) {
      data.articleId = app.globalData.articleId
    }
    data.tenantId = app.globalData.tenantId
    if (that.data.orgId){
      data.orgId = that.data.orgId
    }

    util.request(api.groupOrder, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          orderId: res.data.orderId,
          orderCode: res.data.orderCode
        });
        // var lastPrice = that.data.group.groupPrice*100 - that.data.sharegold*100
        if (that.data.groupType == 4) {
          var lastPrice = that.data.step_price_pay * 100 - that.data.sharegold * 100
        } else if (that.data.groupType == 3 && that.data.isOffered > 0) {
          var lastPrice = 0 * 100 - that.data.sharegold * 100
        } else {
          var lastPrice = that.data.group.groupPrice * 100 - that.data.sharegold * 100
        }
        var orderCode = that.data.orderCode
        var title = that.data.groupTitle
        var groupId = that.data.groupId
        var orderId = that.data.orderId
        var activityState = that.data.activityState
        var activityNum = that.data.activityNum
        var groupType = that.data.groupType
        if (lastPrice == 0) {
          wx.navigateTo({
            url: '../../../pages/pay/result/payResult?orderCode=' + orderCode + '&lastPrice=' + lastPrice + '&title=' + title + '&payid=' + groupId + '&itemType=' + groupType + '&orderId=' + orderId + '&activityState=' + activityState + '&activityNum=' + activityNum,
          })
        } else if (lastPrice > 0) {
          that.zooPay()
        }
      } else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none'
        })
      }
    });
  },
  zooPay: function() {
    var that = this

    if (that.data.groupType == 4) {
      var lastPrice = that.data.step_price_pay * 100 - that.data.sharegold * 100
    } else if (that.data.groupType == 3 && that.data.isOffered > 0) {
      var lastPrice = 0 * 100 - that.data.sharegold * 100
    } else {
      var lastPrice = that.data.group.groupPrice * 100 - that.data.sharegold * 100
    }

    var orderCode = that.data.orderCode
    var title = that.data.groupTitle
    var groupId = that.data.groupId
    var itemId = that.data.group.itemId
    var orderId = that.data.orderId
    var activityState = that.data.activityState
    var activityNum = that.data.activityNum
    var groupType = that.data.groupType

    var data = {}
    var userInfo = wx.getStorageSync('userInfo');
    data.openId = userInfo.openId
    data.orderId = that.data.orderId
   data.tenantId = app.globalData.tenantId
    util.request(api.getPayParams, data).then(function(res) {
      if (res.errno == 0) {
        wx.requestPayment({
          timeStamp: res.data.wxPayMpOrderResult.timeStamp,
          nonceStr: res.data.wxPayMpOrderResult.nonceStr,
          package: res.data.wxPayMpOrderResult.packageValue,
          signType: res.data.wxPayMpOrderResult.signType,
          paySign: res.data.wxPayMpOrderResult.paySign,
          success(res) {
            wx.navigateTo({
              url: '../../../pages/pay/result/payResult?orderCode=' + orderCode + '&lastPrice=' + lastPrice + '&title=' + title + '&payid=' + groupId + '&itemType=' + groupType + '&orderId=' + orderId + '&activityState=' + activityState + '&activityNum=' + activityNum,
            })
          },
          fail(res) {
            wx.navigateTo({
              url: '../../../pages/pay/result2/payResult?orderCode=' + orderCode + '&lastPrice=' + lastPrice + '&title=' + title + '&payid=' + groupId + '&orderId=' + orderId + '&itemType=' + groupType + '&activityNum=' + activityNum,
            })
          }
        })
      } else {
        wx.showToast({
          title: res.errmsg,
          icon: 'none'
        })
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
          confirmText: "设置",
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              wx.openSetting({
                success: function () {
                  console.log(12345);
                  self.getLocation();
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