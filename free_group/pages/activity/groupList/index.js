const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    countDownList: [],
    actEndTimeList: [],
    yct: '/img/yct.png',
    backPage: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    var groupId = null
    var orderId = null
    var personCount = null
    var end_time = null
    if (options.groupId) {
      groupId = options.groupId
    }
    if (options.orderId) {
      orderId = options.orderId
    }
    if (options.personCount) {
      personCount = options.personCount
    }
    if (options.end_time) {
      end_time = options.end_time
    }
    this.setData({
      groupId: groupId,
      orderId: orderId,
      personCount: personCount,
      end_time: end_time
    })
  },
  groupDetailData2: function() {
    var that = this
    var condition = {};
    if (that.data.groupId) {
      condition.groupId = that.data.groupId
    }
    if (app.globalData.latitude) {
      condition.lat = app.globalData.latitude
    }
    if (app.globalData.longitude) {
      condition.lon = app.globalData.longitude
    }
    if (that.data.orderId) {
      condition.orderId = that.data.orderId
    }
    condition.page = 1
    condition.rows = 20
    condition.tenantId = app.globalData.tenantId
    util.request(api.groupListMy, condition).then(function(res) {
      if (res.errno == 0) {
        // 列表
        var groupDatas = res.data.groupList;
        for (var i = 0; i < groupDatas.length; i++) {
          var data_time = groupDatas[i]["endTime"]
          var isSelf = groupDatas[i]["isSelf"]
          groupDatas[i]["actEndTime"] = groupDatas[i]["endTime"]
          let endTimeList = [];
          // 将活动的结束时间参数提成一个单独的数组，方便操作
          if (data_time != '') {
            groupDatas.forEach(o => {
              endTimeList.push(o.actEndTime)
            })
          }
          that.setData({
            actEndTimeList: endTimeList
          });
          
          if (isSelf > 0){
            that.setData({
              isMy:true
            })
          } else if (isSelf < 1){
            that.setData({
              noMy: true
            })
          }
        }
        that.setData({
          groupActivityList: res.data.groupList,
          backPage: 1,
          toal: res.data.total
        });
      }
    });
  },
  groupActivityListInit: function() {
    var that = this
    var condition = {};
    if (that.data.groupId) {
      condition.groupId = that.data.groupId
    }
    if (app.globalData.latitude) {
      condition.lat = app.globalData.latitude
    }
    if (app.globalData.longitude) {
      condition.lon = app.globalData.longitude
    }
    if (that.data.orderId) {
      condition.orderId = that.data.orderId
    }
    condition.page = that.data.backPage + 1
    condition.rows = 20
    condition.tenantId = app.globalData.tenantId
    util.request(api.groupListMy, condition).then(function(res) {
      if (res.errno == 0) {
        // 列表
        var groupDatas = res.data.groupList;
        for (var i = 0; i < groupDatas.length; i++) {
          var data_time = groupDatas[i]["endTime"]
          groupDatas[i]["actEndTime"] = groupDatas[i]["endTime"]
          let endTimeList = [];
          // 将活动的结束时间参数提成一个单独的数组，方便操作
          if (data_time != '') {
            groupDatas.forEach(o => {
              endTimeList.push(o.actEndTime)
            })
          }
          that.setData({
            actEndTimeList: endTimeList
          });
        }

        var groupActivityListArr = that.data.groupActivityList;
        for (var i = 0; i < res.data.groupList.length; i++) {
          groupActivityListArr.push(res.data.groupList[i])
        }

        that.setData({
          groupActivityList: groupActivityListArr,
          backPage: that.data.backPage + 1,
          toal: res.data.total
        });
      }
    });
  },
  timeFormat(param) { //小于10的格式化函数
    return param < 10 ? '0' + param : param;
  },
  countDown() { //倒计时函数
    // 获取当前时间，同时得到活动结束时间数组
    let newTime = new Date().getTime();
    let endTimeList = this.data.actEndTimeList;
    let countDownArr = [];

    // 对结束时间进行处理渲染到页面
    endTimeList.forEach(o => {
      let endTime = new Date(o).getTime();
      let obj = null;
      // 如果活动未结束，对时间进行处理
      if (endTime - newTime > 0) {
        let time = (endTime - newTime) / 1000;
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        obj = {
          day: this.timeFormat(day),
          hou: this.timeFormat(hou),
          min: this.timeFormat(min),
          sec: this.timeFormat(sec)
        }
      } else { //活动已结束，全部设置为'00'
        obj = {
          day: '00',
          hou: '00',
          min: '00',
          sec: '00'
        }
      }
      countDownArr.push(obj);
    })
    // 渲染，然后每隔一秒执行一次倒计时函数
    this.setData({
      countDownList: countDownArr
    })
    setTimeout(this.countDown, 1000);
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
    this.groupDetailData2()
    this.countDown();
    this.setData({
      name: app.globalData.userInfo.nickName,
      nickName: app.globalData.userInfo.nickName
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },
  payOrder_mylump: function(e) {
    wx.showToast({
      title: '您已经开团成功，不能参加此团',
      icon: 'none',
      duration: 2000,
    })
  },
  payOrder_my: function() {
    wx.showToast({
      title: '此团人数已满，不能参团',
      icon: 'none',
      duration: 2000,
    })
  },
  payOrder_offered: function(e) {
    app.globalData.activityNum = e.currentTarget.dataset.activitynum
    var groupId = this.data.groupId
    var groupActivityId = e.currentTarget.dataset.groupactivityId
    var userInfo = wx.getStorageSync('userInfo');
    var isRegister = userInfo.isRegister
    var pageUrl = encodeURIComponent('pages/activity/groupList/index?groupId=' + groupId);
    var activityState = e.currentTarget.dataset.activityState
    var endDate = e.currentTarget.dataset.endDate //参团倒计时
    // var groupTime = this.data.groupTime
    if (endDate < 1000) {
      wx.showToast({
        title: '此活动已下线',
        icon: 'none',
      })
    } else {
      if (isRegister == 0) {
        wx.navigateTo({
          url: '../../../pages/my/edit/login/index?pageUrl=' + pageUrl,
        })
      } else {
        var condition = {};
        condition.groupId = groupId
        condition.groupActivityId = groupActivityId
        condition.tenantId = app.globalData.tenantId
        util.request(api.offeredUrl, condition).then(function(res) {
          if (res.errno == 0) {
            wx.navigateTo({
              url: '../../../pages/pay/item4/itemPay?groupId=' + groupId + '&groupActivityId=' + groupActivityId + '&activityState=' + activityState,
            })
          } else {
            wx.showToast({
              title: '您已经开／参团成功，不能参加此团',
              icon: 'none'
            })
          }
        });
      }
    }
  },
  goactivityDetail: function(e) {
    var groupId = this.data.groupId
    var groupActivityId = e.currentTarget.dataset.groupactivityId
    wx.navigateTo({
      url: '../../../pages/activity/groupdetail/lumpDetail/lumpDetailIndex?groupId=' + groupId + '&groupActivityId=' + groupActivityId,
    })
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
    if (this.data.total > this.data.groupActivityList.length) {
      this.groupActivityListInit();
      wx.showLoading({
        title: '玩命加载中',
      })
    } else {
      wx.showLoading({
        title: '已加载全部',
      })
    }
    setTimeout(function() {
      wx.hideLoading()
    }, 1000);
  },

  /**
   * 用户点击右上角分享
   */

  // onShareAppMessage: function () {

  // }
})