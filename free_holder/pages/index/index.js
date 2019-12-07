var pageConfig = require('../../config/pageConfig.js');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');
//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    tanentType: '/img/tanentType.png',
    storeShow: 1,
    orgIdArr: '',
    num: 0,
    more_group: '/img/more_group.png',
    zero_group: '/img/zero_group.png',
    yellow_fire: '/img/yellow_fire.png',
    red_fire: '/img/red_fire.png',
    redCover: '/img/activity.png',
    close: '/img/close.png',
    isType: 0,
    isShowFirst: 1,
    isGroup: false,
    isCollected: true,
    icon_xin: '/img/icon_xin.png',
    isShow: false,
    input: '/img/input.png',
    showModal: false,
    iconType: ['clear'],
    dialog: null,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    lable_name: pageConfig.lable_name,
    productList: [],
    storeList: [],
    itemList: [],
    bannerList: [],
    scrollViewHeight: '0rpx',
    districtName: '',
    districtId: '',
    fromUserId: '',
    latitude: '',
    longitude: '',
    backPage: 1,
    showModal_logo: false,
    showModal_holder: false,
    proList: [{
      groupimg: '/img/2.png',
    }],
    articleImageList: [],
    imgUrls: [],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    index: 0,
    swiperIndex: 0,
    storeType: '/img/storeType.png',
    tenantName: '',
    dialog: '/img/dialog_powder.png',
    tentanStore: '',
    tenantList:'',
    storeList:'',
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
    console.log(options.scene +'海报参数')
    var fromUserId = options.fromUserId
    var tenantId = options.tenantId

    if (fromUserId) {

    } else {
      if (options.scene) {
        // var opsq = []
        var url = decodeURIComponent(options.scene);
        console.log(url + '海报参数2')
        //找出位置
        // var index = url.lastIndexOf("/");
        // var parametervalue = url.substr(index + 1);
        var array = url.split('_');
        // console.log(array)
        this.setData({
          tenantId: array[0],
          isShare: array[1],
          fromUserId: array[2],
        })
        tenantId = array[0]
        fromUserId = array[2];
      }
    }
    if (fromUserId) {
      app.globalData.fromUserId = fromUserId
    }
    if (tenantId) {
      app.globalData.tenantId = tenantId
    }
    console.log(app.globalData.tenantId)


    wx.showLoading({
      title: '加载中...',
    })

    user.checkLogin().then(res => {
      console.log('缓存')
      if (wx.getStorageSync('userInfo') != null) {
        this.globalData.userInfo = wx.getStorageSync('userInfo');
        this.globalData.token = wx.getStorageSync('token');
        this.globalData.userId = wx.getStorageSync('userId');
        this.globalData.sessionKey = wx.getStorageSync('userInfo.sessionKey');
        console.log(this.globalData.sessionKey + '我是1')
      } else {
        user.loginByWeixin().then(res => {
          this.globalData.userInfo = res.data.userInfo;
          this.globalData.token = res.data.token;
          this.globalData.userId = res.data.userId;
          this.globalData.sessionKey = res.data.userInfo.sessionKey;
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userId', res.data.userId);
          wx.setStorageSync('sessionKey', res.data.userInfo.sessionKey);
          console.log(this.globalData.sessionKey + '我是2')
        }).catch((err) => {
          console.log(err)
        });
      }
    }).catch(() => {
      console.log('再次登录')
      //再次登录..
      user.loginByWeixin().then(res => {
        this.globalData.userInfo = res.data.userInfo;
        this.globalData.token = res.data.token;
        this.globalData.userId = res.data.userId;
        this.globalData.sessionKey = res.data.userInfo.sessionKey;
        wx.setStorageSync('userInfo', res.data.userInfo);
        wx.setStorageSync('token', res.data.token);
        wx.setStorageSync('userId', res.data.userId);
        wx.setStorageSync('sessionKey', res.data.userInfo.sessionKey);
        console.log(this.globalData.sessionKey + '我是2')
      }).catch((err) => {
        console.log(err)
      });
    });

    var orgId = null
    if (options.orgId) {
      orgId = options.orgId
    }
    this.setData({
      isType: 1,
      orgId: orgId,
    })
    var that = this
    //是否登录
    //登录后直接获得首页数据。
    //没有登录的先调用登录接口，然后再登录返回信息中，调用首页数据.
    setTimeout(function() {
      that.chooseData(3, true);
    }, 1000)

  },
  getUserInfoMessage: function() {
    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      app.globalData.userInfo.sessionKey = userInfo.sessionKey
    }
    console.log(userInfo)
    if (userInfo.name == null || userInfo.name == '') {
      that.setData({
        isShow: false,
      });
      that.dialog = that.selectComponent("#dialog");
      if (that.dialog) {
        that.dialog.showDialog();
      }
    } else {
      console.log(123)
      wx.getSetting({
        success(res) {
          if (!res.authSetting["scope.userLocation"]) {
            wx.getLocation({
              type: 'wgs84',
              fail: function(res1) {},
              success: function(res1) {
                app.globalData.latitude = res1.latitude
                app.globalData.longitude = res1.longitude
                that.setData({
                  latitude: res1.latitude,
                  longitude: res1.longitude,
                });
                that.chooseData(1, false);
                console.log(app.globalData.latitude)
              }
            })
          }
        }
      })
    }
  },

  chooseData: function(dataSource, nextOperate) {
    let that = this;
    var latitude = 0
    var longitude = 0
    var globalDistrictId = app.globalData.districtId
    var globalDistrictType = app.globalData.districtType
    var data = {}
    if (dataSource == '1') {
      //经纬触发
      data.lat = that.data.latitude;
      data.lon = that.data.longitude;
      that.getIndexData(data);
    } else if (dataSource == '2') {
      //区域触发.
      data.districtId = globalDistrictId;
      data.districtType = globalDistrictType;
      if (that.data.latitude) {
        data.lat = that.data.latitude;
        data.lon = that.data.longitude;
      }
      console.log(that.data.latitude)
      that.getIndexData(data);
    } else if (dataSource == '3') {
      //默认首页
      //查询是否已经授权.
      wx.getSetting({
        success(res) {
          if (res.authSetting["scope.userLocation"]) {
            //  if (res.authSetting.scope.userLocation) {
            wx.getLocation({
              type: 'wgs84',
              success: function(res1) {
              
                data.lat = res1.latitude;
                data.lon = res1.longitude;
                that.getIndexData(data, nextOperate);
              }
            })
          } else {
            that.getIndexData(data, nextOperate);
          }
        }
      })
    }
  },
  getIndexData: function(data, nextOperate) {
    //获得数据
    var that = this;
    // wx.showLoading({
    //   title: '加载中',
    //   mask: 'true',
    // })

    //特定条件下，获得基本信息.
    
    if (nextOperate) {
      //绑定调用
      that.getUserInfoMessage();
    }

    if (!app.globalData.tenantId) {
      console.log('其他路径')
      var that = this
      var data = {};
      util.request(api.tenantList, data).then(function(res) {
        if (res.errno == 0) {
          var tenantTotal = res.data.tenantList.length
          if (tenantTotal > 0) {
            app.globalData.tenantLength = res.data.tenantList.length
            app.globalData.tenantId = res.data.tenantList.slice(0, 1)[0]["tenantId"]
            app.globalData.tenantName = res.data.tenantList.slice(0, 1)[0]["tenantName"]
            that.setData({
              tenantName: app.globalData.tenantName,
              tenantLength: app.globalData.tenantLength,
              storeShow: 0,
            })
            if (app.globalData.tenantId) {
              var data = {};
              data.tenantId = app.globalData.tenantId
              util.request(api.actionStoreList, data).then(function(res) {
                if (res.errno == 0) {
                  var storeTotal = res.data.storeList.length
                  if (storeTotal > 0) {
                    that.setData({
                      storeList: res.data.storeList,
                      storeShow: 0,
                    })
                    app.globalData.tenantOrgId = res.data.storeList[0]["orgId"]
                    setTimeout(function() {
                      wx.hideLoading()
                    }, 1000)
                    if (that.data.storeList) {
                      var data = {};
                      data.orgId = app.globalData.tenantOrgId
                      if (app.globalData.latitude) {
                        data.lat = app.globalData.latitude
                        data.lon = app.globalData.longitude
                      }
                      data.tenantId = app.globalData.tenantId
                      util.request(api.actionStoreDetail, data).then(function(res) {
                        if (res.errno == 0) {

                          that.setData({
                            tentanStore: res.data.store,
                            storeSetImageList: res.data.storeSetImageList.slice(0, 3),
                          })
                          setTimeout(function() {
                            wx.hideLoading()
                          }, 1000)
                        }
                      });
                    }
                  } else {
                    that.setData({
                      storeShow: 2
                    })
                  }
                }
              });
              that.isAction()
              that.tenantMore()
              that.tenantDetail()
            }
          } else {
            that.gr_img()
            wx.hideShareMenu(),
              that.setData({
                storeShow: 1
              })
          }
        }
      });
    } else {
      that.getIndexData2()
    }
  },
  getIndexData2: function() {
    var that = this
    var data = {};
    util.request(api.tenantList, data).then(function(res) {
      if (res.errno == 0) {
        app.globalData.tenantLength = res.data.tenantList.length
        if (!app.globalData.tenantId){
          app.globalData.tenantId = res.data.tenantList.slice(0, 1)[0]["tenantId"]
        }
        var datas = res.data.tenantList;
        for (var i = 0; i < datas.length; i++) {
          if (app.globalData.tenantId == res.data.tenantList[i]["tenantId"]) {
            app.globalData.tenantName = res.data.tenantList[i]["tenantName"]
          }
        }
        that.setData({
          tenantName: app.globalData.tenantName,
          tenantLength: app.globalData.tenantLength,
          storeShow: 0,
        });

        if (app.globalData.tenantId) {
          var data = {};
          data.tenantId = app.globalData.tenantId
          util.request(api.actionStoreList, data).then(function(res) {
            if (res.errno == 0) {
              var storeTotal = res.data.storeList.length
              if (storeTotal > 0) {
                that.setData({
                  storeList: res.data.storeList,
                  storeShow: 0,
                  swiperIndex:0
                })
                app.globalData.tenantOrgId = res.data.storeList[0]["orgId"]
                setTimeout(function() {
                  wx.hideLoading()
                }, 1000)
                if (that.data.storeList) {
                  var data = {};
                  data.orgId = app.globalData.tenantOrgId
                  if (app.globalData.latitude) {
                    data.lat = app.globalData.latitude
                    data.lon = app.globalData.longitude
                  }
                  data.tenantId = app.globalData.tenantId
                  util.request(api.actionStoreDetail, data).then(function(res) {
                    if (res.errno == 0) {

                      that.setData({
                        tentanStore: res.data.store,
                        storeSetImageList: res.data.storeSetImageList.slice(0, 3),
                      })
                      setTimeout(function() {
                        wx.hideLoading()
                      }, 1000)
                    }
                  });

                }
              } else {
                that.setData({
                  storeShow: 2,
                  swiperIndex: 0
                })
              }
            }
          });
          that.isAction()
          that.tenantMore()
          that.tenantDetail()
        } else {
          that.gr_img()
          wx.hideShareMenu(),
            that.setData({
              storeShow: 1,
              swiperIndex: 0
            })
        }
      }
    });
  },

  // getUserInfo: function(e) {
  //   console.log(e.detail.userInfo)
  //   var sessionKey = app.globalData.userInfo.sessionKey
  //   app.globalData.userInfo = e.detail.userInfo
  //   app.globalData.userInfo.sessionKey = sessionKey
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.dialog = this.selectComponent("#dialog");
    if (this.dialog) {
      this.dialog.showDialog();
    }
  },
  showDialog: function() {
    this.dialog.showDialog();
  },
  // 授权
  confirmEvent: function() {
    this.dialog.hideDialog();
  },
  onConfirm: function() {
    this.hideModal();
  },
  preventTouchMove: function() {},
  hideModal: function() {
    this.setData({
      showModal: false,
      showModal_holder: false,
    });
    // this.isAction()
  },
  // 取消
  onCancel: function() {
    this.hideModal();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    var that = this
    if (that.data.isType == 1 && that.data.isShowFirst == 0) {
      that.getIndexData2()
      console.log(123)
    }
    that.setData({
      isShowFirst: 0,
      swiperIndex:0,
    });

    setTimeout(function() {
      wx.hideLoading()
    }, 2000)

    if (app.globalData.tenantName) {
      this.setData({
        tenantName: app.globalData.tenantName
      })
    }
    if (app.globalData.tenantLength) {
      this.setData({
        tenantLength: app.globalData.tenantLength
      })
    }


  },
  // 股东福利
  isAction: function() {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.holderActivity, data).then(function(res) {
      if (res.errno == 0) {
        if (res.data.isExits == true) {
          that.setData({
            showModal_holder: true,
            activityName: res.data.activityName,
            activityId: res.data.activityId,
            holderId: res.data.id,
            count: res.data.count
          });
        }
      }
    });
  },
  tenantMore:function(){
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.tenantMore, data).then(function (res) {
      if (res.errno == 0) {
        
      }
    });
  },
  tenantDetail: function (e) {
    var that = this
    var data = {};
    data.tenantId = app.globalData.tenantId
    util.request(api.checkShareHolder, data).then(function (res) {
      if (res.errno == 0) {
        if (res.data.state == true) {
          var _userInfo = wx.getStorageSync('userInfo');
          if (_userInfo) {
            _userInfo.memberCount = res.data.user.memberCount;
            wx.setStorageSync('userInfo', _userInfo);
          }
          if (res.data.user.isHolder) {
            app.globalData.isShareholder = res.data.user.isHolder
          }
        }
      }
    });
  },
  holderDetail: function(e) {
    var activityId = e.currentTarget.dataset.activityId
    var holderId = e.currentTarget.dataset.holderId
    if (this.data.count > 1) {
      wx.navigateTo({
        url: '../action/list/index/index',
      })
    } else {
      wx.navigateTo({
        url: '../action/list/detail/index?activityId=' + activityId + '&holderId=' + holderId,
      })
    }
    this.setData({
      showModal_holder: false,
    })
  },
  activity_hide:function(e){
    var that = this
    var activityId = e.currentTarget.dataset.activityId
    var holderId = e.currentTarget.dataset.holderId
    var data = {}
    data.activityId = activityId
    data.shareholderActivityId = holderId
    data.isShare = 1
    data.type = 1
    data.tenantId = app.globalData.tenantId
    util.request(api.actionDetailUrl, data).then(function (res) {
      if (res.errno == 0) {
        that.setData({
          showModal_holder: false,
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
    this.getIndexData();
    setTimeout(function() {
      wx.stopPullDownRefresh();
    }, 1500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // if (this.data.storeItemList.length > 0) {
    //   if (this.data.itemTotal > this.data.storeItemList.length) {
    //     this.storeItemListInit();
    //     wx.showLoading({
    //       title: '玩命加载中',
    //     })
    //   } else {
    //     wx.showLoading({
    //       title: '已加载全部',
    //     })
    //   }
    //   setTimeout(function() {
    //     wx.hideLoading()
    //   }, 1000);
    // }

  },
  /**
   * 用户点击右上角分享
   */

  onShareAppMessage: function(ops) {
    var userId = app.globalData.userId
    var tenantId = app.globalData.tenantId
    if (ops.from === 'button') {}
    return {
      title: '小程序',
      desc: '美丽人生',
      path: '/pages/index/index?fromUserId=' + userId + '&tenantId=' + tenantId
    }
  },
  // storeList: function(e) {
  //   var orgId = e.currentTarget.dataset.orgId
  //   console.log(orgId)
  //   wx.navigateTo({
  //     url: '../../pages/store/list/index?orgId=' + orgId
  //   })
  // },
  picList: function(e) {
    var orgId = e.currentTarget.dataset.orgId
    wx.navigateTo({
      url: '../../pages/store/pic/index?orgId=' + orgId,
    })
  },
  // groupDetail: function(e) {
  //   var groupId = e.currentTarget.dataset.groupId
  //   console.log(groupId)
  //   wx.navigateTo({
  //     url: '../../pages/activity/groupdetail/index?groupId=' + groupId,
  //   })
  // },
  swiperChange(e) {
    var that = this
    app.globalData.tenantOrgId = e.detail.currentItemId
    that.setData({
      swiperIndex: e.detail.current,
    })
    var data = {};
    data.orgId = app.globalData.tenantOrgId
    if (app.globalData.latitude) {
      data.lat = app.globalData.latitude
      data.lon = app.globalData.longitude
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.actionStoreDetail, data).then(function(res) {
      if (res.errno == 0) {
        that.setData({
          tentanStore: res.data.store,
          storeSetImageList: res.data.storeSetImageList.slice(0, 3),
        })
      }
    });
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
        console.log(123654)
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
  telPhone: function(e) {
    console.log(147)
    var phone = e.currentTarget.dataset.phone
    if (phone) {
      wx.makePhoneCall({
        phoneNumber: phone + '',
      })
    }
  },
  previewImage2: function(e) {
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
  gr_img: function() {
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.actionPage, data).then(function(res) {
      if (res.errno == 0) {
        if (res.data.data.logo) {
          that.setData({
            gr_small: res.data.data.logo,
          })
        } else {
          that.setData({
            gr_small: 'http://image-test.wemeke.com/tenant/stock.png',
          })
        }
      } else {
        that.setData({
          gr_small: 'http://image-test.wemeke.com/tenant/stock.png',
        })
      }
    });
  },
  storeType: function(e) {
    wx.navigateTo({
      url: '../../pages/store/tenant/index',
    })
  }
})