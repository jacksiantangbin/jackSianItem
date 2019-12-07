const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal_code: false,
    showModal_logo: false,
    showModal: false,
    isUse: 0,
    sharePage: '/img/sharePage.png',
    shareWx: '/img/shareWx.png',
  },
  onConfirm: function () {
    this.hideModal();
  },
  preventTouchMove: function () { },
  hideModal: function () {
    this.setData({
      showModal_code: false,
      showModal: false,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.activityId) {
      this.setData({
        activityId: options.activityId
      })
    }
    var that = this
    this.superStaffActivityDetail()
  },
  superStaffActivityDetail: function () {
    var that = this
    var data = {}
    if (that.data.activityId) {
      data.activityId = that.data.activityId
    }
    data.type = 1
    data.staffId = app.globalData.superStaff
    data.tenantId = app.globalData.tenantId
    util.request(api.superStaffActivityDetail, data).then(function (res) {
      if (res.errno == 0) {
        var datas = res.data.saleActivity;
        var beginDate = util.toDate6(datas.beginDate);
        var endDate = util.toDate6(datas.endDate);
        var gettime = res.data.records;
        if (gettime) {
          for (var i = 0; i < gettime.length; i++) {
            gettime[i]["getTime"] = util.toDate6(gettime[i]["getTime"])
          }
        }
        var checktime = res.data.checkRecords
        if (checktime) {
          for (var i = 0; i < checktime.length; i++) {
            checktime[i]["getTime"] = util.toDate7(checktime[i]["getTime"])
          }
        }
        that.setData({
          endDate: endDate,
          beginDate: beginDate,
          saleActivity: res.data.saleActivity,
          isGet: res.data.saleActivity.isGet,
          records: res.data.records,
          checkRecords: res.data.checkRecords
        });
      } else {

      }
    });
  },
  // 免费领取
  goget: function () {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
      var activityId = this.data.activityId
      var pageUrl = encodeURIComponent('pages/staff/activity/getDetail/index?activityId=' + activityId)
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.isRegister == 1) {
        var that = this
        var data = {}
        data.activityId = activityId
        data.staffId = app.globalData.superStaff
        data.tenantId = app.globalData.tenantId
        util.request(api.superStaffGet, data).then(function (res) {
          if (res.errno == 0) {
            if (res.data.state == true) {
              var beginDate = util.toDate6(res.data.beginDate);
              var endDate = util.toDate6(res.data.endDate);
              that.setData({
                isGet:1,
                beginDate:beginDate,
                endDate:endDate,
                recordId: res.data.recordId,
                holderId: res.data.shareholderActivityId
              })
              wx.showToast({
                title: '领取成功已放入【我的-活动列表】',
                icon: 'none',
                duration: 2000,
              })
              // that.superStaffActivityDetail()
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
  // 立即使用
  gopay: function () {
    var that = this
    var data = {}
    if (that.data.holderId) {
      data.shareholderActivityId = that.data.holderId
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.actionCodelUrl, data).then(function (res) {
      console.log(data)
      if (res.errno == 0) {
        if (res.data.state == true) {
          that.setData({
            showModal_code: true,
            checkCode: res.data.checkCode
          })
        } else {
          that.setData({
            showModal_code: false
          })
          console.log(res.data)
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000,
          })
        }
      } else {
        wx.showToast({
          title: '系统异常',
          icon: 'none',
          duration: 2000,
        })
      }
    });
  },
  /**,
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.isShareholder) {
      this.setData({
        isShareholder: app.globalData.isShareholder
      })
    }
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url 
    var userId = app.globalData.userId
    var tenantId = app.globalData.tenantId
    var parameter1 = tenantId + '_' + this.data.activityId + '_' + this.data.holderId + '_1' + '_' + userId;
    this.setData({
      parameter1: parameter1,
      pageIndex: url,
      showModal: false,
      groupDetailUrl_last: api.shareAction + parameter1,
    });
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

})