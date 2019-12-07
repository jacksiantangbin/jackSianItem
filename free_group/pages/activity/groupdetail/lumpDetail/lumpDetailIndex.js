const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
const WxParse = require('../../../../wxParse/wxParse.js');
var app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupActivityList: [],
    lumpDetailImg: '/img/group.png',
    yellow_fire: '/img/yellow_fire.png',
    title: '激光焕颜美容xxxx',
    new: '拉新团',
    price: '￥99',
    person: '张三',
    big: '/img/person.png',
    small1: '/img/group.png',
    small2: '/img/group.png',
    small3: '/img/group.png',
    small4: '/img/group.png',
    person_over: '/img/person_over.png',
    personNum: '2',
    showModal: false,
    htmlContents: [],
    countDownList: [],
    actEndTimeList: [],
    sharePage: '/img/sharePage.png',
    shareWx: '/img/shareWx.png',
    showModal_logo: false,
    showModal_rule: false,
    hour: '00',
    min: '00',
    sec: '00',
    setInter:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var fromUserId = options.fromUserId
    var tenantId = options.tenantId
    if (fromUserId) {

    } else {
      if (options.scene) {
        // var opsq = []
        var url = decodeURIComponent(options.scene);
        console.log(url)
        //找出位置
        // var index = url.lastIndexOf("/");
        // var parametervalue = url.substr(index + 1);
        var array = url.split('_');

        // var optionsUrl = url.split('?').slice(1, 2);
        // console.log(optionsUrl)
        // var optionsArr = optionsUrl.toString().split('&')
        // for (var m = 0; m < optionsArr.length; m++) {
        //   var optionsIndex = optionsArr[m]
        //   var optionsQ = optionsIndex.split('=').slice(1, 2)
        //   console.log(optionsQ)
        //   opsq.push(optionsQ[0])
        // }
        console.log(array)
        this.setData({
          tenantId: array[0],
          groupId: array[1],
          groupActivityId: array[2],
          isShare: array[3],
          fromUserId: array[4],
        })
        console.log(array[0])
        console.log(array[4])
        tenantId = array[0]
        fromUserId = array[4]
      }
    }
    // var _userInfo = wx.getStorageSync('userInfo');
    if (fromUserId) {
      // _userInfo.fromUserId = fromUserId;
      app.globalData.fromUserId = fromUserId
    }
    // wx.setStorageSync('userInfo', _userInfo);
    if (tenantId) {
      app.globalData.tenantId = tenantId
    }
    // var groupId = null,
    //   orderId = null,
    //   groupActivityId = null,
    //   num = null
    if (options.groupId) {
      this.setData({
        groupId: options.groupId,
      })
    }
    if (options.orderId) {
      this.setData({
        orderId: options.orderId,
      })
    }
    if (options.groupActivityId) {
      this.setData({
        groupActivityId: options.groupActivityId,
      })
    }
    if (options.num) {
      this.setData({
        num: options.num,
      })
    }

    this.setData({
      // userId: app.globalData.userId
    })
  },
  lumpDetailData: function() {
    var that = this
    var condition = {};
    if (that.data.isShare) {
      condition.isShare = that.data.isShare
    }
    if (that.data.groupActivityId) {
      condition.groupActivityId = that.data.groupActivityId
    }
    if (that.data.groupId) {
      condition.groupId = that.data.groupId
    }
    if (that.data.orderId) {
      condition.orderId = that.data.orderId
    }
    condition.tenantId = app.globalData.tenantId
    console.log(condition)
    util.request(api.groupActivityDetailUrl, condition).then(function(res) {
      if (res.errno == 0) {
        console.log(1234)
        var datas = res.data.groupActivity
        var groupTime = datas.leftTime * 1000
        that.setData({
          groupActivity: res.data.groupActivity,
          group: res.data.detail,
          itemDetail: res.data.detail.itemDetail,
          groupTitle: res.data.detail.groupTitle,
          groupTime: groupTime,
          group_clock: dateformat(groupTime - 1000),
          creatUserId: res.data.groupActivity.creatUserId
        });
        
        that.data.setInter = setInterval(function() {
          // 渲染倒计时时钟
          that.setData({
            groupTime: that.data.groupTime - 1000,
            group_clock: dateformat(that.data.groupTime - 1000),
          });
          var str = that.data.group_clock
          var strs = new Array(); //定义一数组
          strs = str.split(":"); //字符分割
          that.setData({
            day: strs[0],
            hour: strs[1],
            min: strs[2],
            sec: strs[3],
          })
          console.log()
        }, 1000);
        wx.setNavigationBarTitle({
          title: that.data.groupTitle,
        })
        if (res.data.detail.itemDetail){
          WxParse.wxParse('article', 'html', res.data.detail.itemDetail, that, 5);
        }
        
      } else {
        console.log(5678)
        // that.setData({
        //   showModal_logo: true,
        // })
      }
    });
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  grouptime: function() {
    wx.showToast({
      title: '此活动已下线',
      icon: 'none'
    })
  },
  payOrder_mylump: function() {
    wx.showToast({
      title: '您已经开团成功，不能参加此团',
      icon: 'none'
    })
  },

  payOrder_my: function() {
    wx.showToast({
      title: '此团人数已满，不能参团',
      icon: 'none'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var userId = app.globalData.userId
    this.lumpDetailData()
    this.storeDetail()
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url 
    var tenantId = app.globalData.tenantId


    var parameter1 = tenantId + '_' + this.data.groupId + '_' + this.data.groupActivityId + '_1' + '_' + userId;
    this.setData({
      wxUserId: app.globalData.userId,
      showModal: false,
      groupDetailUrl_last: api.groupActivityShare + parameter1,
      parameter1: parameter1,
      pageIndex: url,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this;
    //清除计时器  即清除
    clearInterval(that.data.setInter)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;
    //清除计时器  即清除
    clearInterval(that.data.setInter)
  },
  ruleGroup: function() {
    this.setData({
      showModal_rule: true,
    });
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
  groupStoreDetail: function(e) {
    app.globalData.orgId = e.currentTarget.dataset.orgId
    wx.switchTab({
      url: '../../../../pages/index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    var userId = app.globalData.userId
    var groupId = this.data.groupId
    var groupActivityId = this.data.groupActivityId
    var tenantId = app.globalData.tenantId

    if (ops.from === 'button') {
      // 来自页面内转发按钮
      console.log(ops.target)
    }
    return {
      title: this.data.groupTitle,
      path: 'pages/activity/groupdetail/lumpDetail/lumpDetailIndex?fromUserId=' + userId + '&groupId=' + groupId + '&groupActivityId=' + groupActivityId + '&tenantId=' + tenantId,
      success: function(res) {
        // 转发成功
        console.log(res);
      },
    }
  },
  lumpitemdetail: function(e) {
    wx.navigateTo({
      url: '../../../../pages/store/detail/detail'
    })
  },
  groupPay: function(e) {
    var that = this
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      that.setData({
        showModal_logo: true,
      });
    } else {
      var groupId = e.currentTarget.dataset.groupId
      var groupActivityId = e.currentTarget.dataset.groupactivityId
      var userInfo = wx.getStorageSync('userInfo');
      var isRegister = userInfo.isRegister
      var tenantId = app.globalData.tenantId
      var pageUrl = encodeURIComponent('pages/activity/groupdetail/lumpDetail/lumpDetailIndex?groupId=' + groupId + '&groupActivityId=' + groupActivityId + '&tenantId=' + tenantId);
      var activityState = e.currentTarget.dataset.activityState
      var endDate = e.currentTarget.dataset.endDate //参团倒计时
      // var groupTime = that.data.groupTime
      if (endDate < 1000) {
        wx.showToast({
          title: '此活动已下线',
          icon: 'none',
        })
      } else {
        if (isRegister == 0) {
          wx.navigateTo({
            url: '../../../../pages/my/edit/login/index?pageUrl=' + pageUrl,
          })
        } else {
          var condition = {};
          condition.groupId = groupId
          condition.groupActivityId = groupActivityId
          condition.tenantId = app.globalData.tenantId
          util.request(api.offeredUrl, condition).then(function(res) {
            if (res.errno == 0) {
              wx.navigateTo({
                url: '../../../../pages/pay/item4/itemPay?groupId=' + groupId + '&groupActivityId=' + groupActivityId + '&activityState=' + activityState,
              })
            } else {
              var userInfo = wx.getStorageSync('userInfo');
              var userId = userInfo.id
              var creatUserId = that.data.creatUserId
              if (creatUserId == userId) {
                wx.showToast({
                  title: '您已经开／参团成功，不能参加此团',
                  icon: 'none'
                })
              } else {
                wx.showToast({
                  title: res.errmsg,
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    }
  },
  shareGroup: function() {
    this.setData({
      showModal: true,
    });
  },
  myOrder: function() {
    wx.navigateTo({
      url: '../../../../pages/order/index/index',
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
      showModal: false
    });
  },
  // sharePage: function(e) {
  //   var groupTitle = e.currentTarget.dataset.groupTitle
  //   var groupImg = e.currentTarget.dataset.groupImg
  //   var groupPrice = e.currentTarget.dataset.groupPrice
  //   var groupDetailUrl_last = encodeURIComponent(this.data.groupDetailUrl_last);
  //   var scene = this.data.parameter1
  //   var pageIndex = this.data.pageIndex
  //   wx.navigateTo({
  //     url: '../../../../pages/share/shareIndex/index?groupTitle=' + groupTitle + '&groupImg=' + groupImg + '&groupPrice=' + groupPrice + '&groupDetailUrl=' + groupDetailUrl_last + '&scene=' + scene + '&pageIndex=' + pageIndex
  //   })
  // },
  sharePage: function(e) {
    var groupTitle = e.currentTarget.dataset.groupTitle
    var groupImg = e.currentTarget.dataset.groupImg
    var groupPrice = e.currentTarget.dataset.groupPrice
    var groupDetailUrl_last = encodeURIComponent(this.data.groupDetailUrl_last);
    var scene = this.data.parameter1
    var pageIndex = this.data.pageIndex
    wx.navigateTo({
      url: '../../../../pages/share/shareCode2/index?groupTitle=' + groupTitle + '&groupImg=' + groupImg + '&groupPrice=' + groupPrice + '&groupDetailUrl=' + groupDetailUrl_last + '&scene=' + scene + '&pageIndex=' + pageIndex
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
  return day + " :" + hr + " : " + min + " : " + sec;
}
// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}