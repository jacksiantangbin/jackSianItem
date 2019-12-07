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
  onConfirm: function() {
    this.hideModal();
  },
  preventTouchMove: function() {},
  hideModal: function() {
    this.setData({
      showModal_code: false,
       showModal:false,
    })
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
        // console.log(array)
        this.setData({
          tenantId:array[0],
          activityId: array[1],
          holderId: array[2],
          isShare: array[3],
          fromUserId: array[4],
        })
        tenantId = array[0]
        fromUserId = array[4];
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
    // var activityId = null,
    //   holderId = null,
    //   checkId = null,
    //   share = null;
    if (options.activityId) {
      this.setData({
        activityId:options.activityId
      })
    }
    if (options.holderId) {
      this.setData({
        holderId:options.holderId
      })
    }
    if (options.checkId) {
      this.setData({
        checkId: options.checkId
      })
    }
    if (options.share) {
      this.setData({
        share: options.share
      })
    }

    var that = this
    // that.setData({
    //   activityId: activityId,
    //   holderId: holderId,
    //   checkId: checkId,
    //   share: share
    // })
    that.actionDetail()
    that.tenantMore()
  },
  tenantMore: function () {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.tenantMore, data).then(function (res) {
      if (res.errno == 0) {

      }
    });
  },
  actionDetail: function() {
    var that = this
    var data = {}
    if (that.data.activityId) {
      data.activityId = that.data.activityId
    }
    if (that.data.holderId) {
      data.shareholderActivityId = that.data.holderId
    }
    if (that.data.checkId) {
      data.checkId = that.data.checkId
    }
    data.isShare = 1
    data.type = 1
    data.tenantId = app.globalData.tenantId
    util.request(api.actionDetailUrl, data).then(function(res) {
      if (res.errno == 0) {
        var datas = res.data.saleActivity;
        datas.createTime = util.toDate6(datas.createTime);
        datas.beginDate = util.toDate6(datas.beginDate);
        datas.endDate = util.toDate6(datas.endDate);
        datas.checkTime = util.toDate7(datas.checkTime);
        var gettime = res.data.records;
        if (gettime){
          for (var i = 0; i < gettime.length; i++) {
            gettime[i]["getTime"] = util.toDate6(gettime[i]["getTime"])
          }
        }
        that.setData({
          saleActivity: res.data.saleActivity,
          isUseData: Number(res.data.saleActivity.isUse),
          records: res.data.records
        });

        if (that.data.share == 1) {
          console.log(123)
          that.onShareAppMessage()
        } else {
          // var userInfo = wx.getStorageSync('userInfo');
          var isShareholder = app.globalData.isShareholder
          if (isShareholder == 1) {
            if (that.data.isUse == 1 || that.data.isUseData == 1) {
              console.log(234)
              that.onShareAppMessage()
            } else {
              console.log(345)
              wx.hideShareMenu()
            }
          } else {
            that.onShareAppMessage()
            console.log(456)
          }
        }
      }else{
        
      }
    });
  },
  // 免费领取
  goget: function() {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
      var activityId = this.data.activityId
      var holderId = this.data.holderId
      var pageUrl = encodeURIComponent('pages/action/list/detail/index?activityId=' + activityId + '&holderId=' + holderId)
      var userInfo = wx.getStorageSync('userInfo');
      if (userInfo.isRegister == 1) {
        var that = this
        var data = {}
        data.type = 1
        if (that.data.holderId) {
          data.shareholderActivityId = that.data.holderId
        }
        data.tenantId = app.globalData.tenantId
        util.request(api.actionGetlUrl, data).then(function(res) {
          if (res.errno == 0) {
            if (res.data.state == true) {
              that.actionDetail()
              that.setData({
                isUse: 1
              })
              wx.showToast({
                title: '领取成功已放入【我的-活动列表】',
                icon: 'none',
                duration: 2000,
              })
            } else {
              that.setData({
                isUse: 0
              })
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                duration: 2000,
              })
            }
          } else {
            wx.showToast({
              title:'系统异常',
              icon: 'none',
              duration: 2000,
            })
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
  gopay: function() {
    var that = this
    var data = {}
    if (that.data.holderId) {
      data.shareholderActivityId = that.data.holderId
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.actionCodelUrl, data).then(function(res) {
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
  goShare: function() {
    this.setData({
      showModal: true,
    })
  },
  // sharePage: function (e) {
  //   this.setData({
  //     showModal: false,
  //   })
  //   var groupTitle = e.currentTarget.dataset.actionTitle
  //   var groupImg = e.currentTarget.dataset.actionImg
  //   var groupPrice = e.currentTarget.dataset.actionPrice
  //   var groupDetailUrl_last = encodeURIComponent(this.data.groupDetailUrl_last);
  //   var that = this
  //   wx.navigateTo({
  //     url: '../../../../pages/share/shareIndex/index?groupTitle=' + groupTitle + '&groupImg=' + groupImg + '&groupPrice=' + groupPrice + '&groupDetailUrl=' + groupDetailUrl_last
  //   })
  // },
  sharePage: function (e) {
    this.setData({
      showModal: false,
    })
    var scene = this.data.parameter1
    var pageIndex = this.data.pageIndex
    var groupTitle = e.currentTarget.dataset.actionTitle
    var groupImg = e.currentTarget.dataset.actionImg
    var groupPrice = e.currentTarget.dataset.actionPrice
    var groupDetailUrl_last = encodeURIComponent(this.data.groupDetailUrl_last);
    var that = this
    wx.navigateTo({
      url: '../../../../pages/share/shareCode2/index?groupTitle=' + groupTitle + '&groupImg=' + groupImg + '&groupPrice=' + groupPrice + '&groupDetailUrl=' + groupDetailUrl_last + '&scene=' + scene + '&pageIndex=' + pageIndex
    })
  },
  /**,
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
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
  onShareAppMessage: function(ops) {
    var activityId = this.data.activityId
    var holderId = this.data.holderId
    var userId = app.globalData.userId
    var checkId = this.data.checkId
    var tenantId = app.globalData.tenantId
    // if (ops.from === 'button') {

    // }
    return {
      title: '',
      path: 'pages/action/list/detail/index?fromUserId=' + userId + '&activityId=' + activityId + '&holderId=' + holderId + '&tenantId=' + tenantId,
      success: function(res) {

      },
    }
  }
})