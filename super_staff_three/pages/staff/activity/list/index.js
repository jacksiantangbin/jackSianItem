const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dialog: '/img/dialog_powder.png',
    sc_cover: '/img/logo.png',
    clear: '/img/clear.png',
    isClear: true,
    delBtnWidth: 140,
    total:1,
    activityList: [],
    right:0,
    isScroll: true,
    windowHeight: 0,
    itemRight:0,
  },
  clear: function() {
    this.setData({
      isClear: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    if (options.staffId){
      that.setData({
        staffId:options.staffId
      })
    }
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight
        });
      }
    });
  },
  drawStart: function(e) {
    var touch = e.touches[0]
    for (var index in this.data.activityList) {
      var item = this.data.activityList[index]
      item.right = 0
    }
    this.setData({
      activityList: this.data.activityList,
      startX: touch.clientX,
    })

  },
  drawMove: function(e) {
    var offsetLeft = e.currentTarget.offsetLeft
    var touch = e.touches[0]
    var item = this.data.activityList[e.currentTarget.dataset.index]
    var disX = this.data.startX - touch.clientX
    var itemRight = e.currentTarget.dataset.itemRight
    var idx = e.currentTarget.dataset.index
    this.setData({
      itemRight: itemRight,
      idx: idx
    })

    if (disX >= 20) {
      if (disX > this.data.delBtnWidth) {
        disX = this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        activityList: this.data.activityList,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        activityList: this.data.activityList,
      })
    }

    // if (offsetLeft < 0){
    //   this.setData({
    //     offsetLeft:1
    //   })
    // }else{
    //   this.setData({
    //     offsetLeft:0
    //   })
    // }
  },
  drawEnd: function(e) {
    var item = this.data.activityList[e.currentTarget.dataset.index]
    if (item.right >= this.data.delBtnWidth / 2) {
      item.right = this.data.delBtnWidth
      this.setData({
        isScroll: true,
        activityList: this.data.activityList,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        activityList: this.data.activityList,
      })
    }
  },

  delItem: function(e) {
    var activityId = e.currentTarget.dataset.activityId
    var that = this
    var data = {}
    data.staffId = that.data.staffId
    data.tenantId = app.globalData.tenantId
    data.activityId = activityId
    data.state = 0
    util.request(api.superStaffState, data).then(function (res) {
      if (res.errno == 0) {
        if (res.data.state == true) {
          that.setData({
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
  },
  delItem2: function (e) {
    var activityId = e.currentTarget.dataset.activityId
    var that = this
    var data = {}
    data.staffId = that.data.staffId
    data.tenantId = app.globalData.tenantId
    data.activityId = activityId
    data.state = 1
    util.request(api.superStaffState, data).then(function (res) {
      if (res.errno == 0) {
        if (res.data.state == true) {
          that.setData({
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
    this.superStaffList()
    this.setData({
      itemRight:0
    })
  },
  superStaffList: function() {
    this.setData({
      itemRight: 0
    })
    var that = this
    var data = {}
    data.staffId = that.data.staffId
    data.tenantId = app.globalData.tenantId
    data.type = 2
    data.page = 1
    data.rows = 100
    util.request(api.superStaffList, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.rows;
        for (var i = 0; i < datas.length; i++) {
          datas[i]["beginDate"] = util.toDate(datas[i]["beginDate"])
          datas[i]["endDate"] = util.toDate(datas[i]["endDate"])
        }

        that.setData({
          activityList: res.data.rows,
          total: res.data.total,
        })
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
  //   var staffId = this.data.staffId
  //   var tenantId = app.globalData.tenantId
  //   var userId = app.globalData.userId
  //   return {
  //     title: '活动列表',
  //     path: 'pages/staff/activity/showList/index?fromUserId=' + userId + '&staffId=' + staffId + '&tenantId=' + tenantId,
  //     success: function (res) {

  //     },
  //   }
  // },
  activityDetail: function(e) {
    var activityId = e.currentTarget.dataset.activityId
    var staffId = this.data.staffId
    wx.navigateTo({
      url: '../../../../pages/staff/activity/detail/index?activityId=' + activityId + '&staffId=' + staffId,
    })
  },
})