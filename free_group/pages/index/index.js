var pageConfig = require('../../config/pageConfig.js');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var user = require('../../services/user.js');
const app = getApp()
Page({
  data: {
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
    proList: [{
      groupimg: '/img/2.png',
    }],
    articleImageList: [{
        icon_xin: '/img/icon_xin.png',
      },
      {
        icon_xin: '/img/icon_xin.png',
      },
      {
        icon_xin: '/img/icon_xin.png',
      },
    ]
  },

  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function(options) {
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
    var fromUserId = options.fromUserId
    if (fromUserId) {
      var _userInfo = wx.getStorageSync('userInfo');
      if (_userInfo) {
        _userInfo.fromUserId = fromUserId;
      }
      app.globalData.fromUserId = fromUserId
      wx.setStorageSync('userInfo', _userInfo);
    }
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
    if (userInfo.sessionKey) {
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
  getPosition: function() {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        });
      }
    })
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
                that.setData({
                  latitude: res1.latitude,
                  longitude: res1.longitude,
                });
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
    wx.showLoading({
      title: '加载中',
      mask: 'true',
    })

    //特定条件下，获得基本信息.
    if (nextOperate) {
      //绑定调用
      that.getUserInfoMessage();
    }
    //门店
    if (app.globalData.orgId) {
      var data = {};
      data.orgId = app.globalData.orgId
      if (app.globalData.latitude) {
        data.lat = app.globalData.latitude
        data.lon = app.globalData.longitude
      }
      data.tenantId = app.globalData.tenantId
      util.request(api.storeSumUrl, data).then(function(res) {
        if (res.errno == 0) {
          that.setData({
            storeList: res.data.store,
            orgId: res.data.store.orgId
          });
          // 拼团进行时
          var data = {};
          data.page = 1
          data.rows = 8
          data.orgId = app.globalData.orgId
          data.tenantId = app.globalData.tenantId
          util.request(api.storeGroupItemUrl, data).then(function(res) {
            if (res.errno == 0) {
              that.setData({
                storeItemList: res.data.groupList,
                itemTotal: res.data.group_total,
                backPage: 1,
              });
              //图片列表
              if (that.data.storeItemList.length < 1) {
                var data = {};
                data.orgId = app.globalData.orgId
                data.tenantId = app.globalData.tenantId
                util.request(api.storePicUrl, data).then(function(res) {
                  if (res.errno == 0) {
                    var storeImageList = res.data.imageList.slice(0, 3)
                    that.setData({
                      storeImageList: storeImageList,
                    });
                    console.log(storeImageList)
                  }
                });
              }
            }
          });
          setTimeout(function() {
            wx.hideLoading()
          }, 1000)
        }
      });
    } else {
      var that = this
      var data = {};
      data.page = 1
      data.rows = 8
      data.orderType = 3
      data.dataType = 'a'
      if (app.globalData.latitude) {
        data.lat = app.globalData.latitude
        data.lon = app.globalData.longitude
      }
      data.tenantId = app.globalData.tenantId
      util.request(api.storeListUrl, data).then(function(res) {
        if (res.errno == 0) {
          if (res.data.storeList) {
            that.setData({
              orgId: res.data.storeList[0].orgId,
              storeSetId: res.data.storeList[0].storeSetId,
              storeListLength: res.data.storeList,
              total: res.data.total,
              backPage: 1,
            });
          }
          var data = {};
          data.orgId = that.data.orgId
          if (app.globalData.latitude) {
            data.lat = app.globalData.latitude
            data.lon = app.globalData.longitude
          }
          data.tenantId = app.globalData.tenantId
          util.request(api.storeSumUrl, data).then(function(res) {
            if (res.errno == 0) {
              that.setData({
                storeList: res.data.store,
                orgId: res.data.store.orgId
              });
            }
            // 拼团进行时
            var data = {};
            data.page = 1
            data.rows = 8
            data.orgId = that.data.orgId
            data.tenantId = app.globalData.tenantId
            util.request(api.storeGroupItemUrl, data).then(function(res) {
              if (res.errno == 0) {
                that.setData({
                  storeItemList: res.data.groupList,
                  itemTotal: res.data.group_total,
                  backPage: 1,
                });
                //图片列表
                if (that.data.storeItemList.length < 1) {
                  var data = {};
                  data.orgId = that.data.orgId
                  data.tenantId = app.globalData.tenantId
                  util.request(api.storePicUrl, data).then(function(res) {
                    if (res.errno == 0) {
                      var storeImageList = res.data.imageList.slice(0, 3)
                      that.setData({
                        storeImageList: storeImageList,
                      });
                      console.log(storeImageList)
                    }
                  });
                }
              }
            });
          });
          setTimeout(function() {
            wx.hideLoading()
          }, 1000)
        } else {
          // that.setData({
          //   showModal_logo: true
          // })
          // that.getIndexData();
        }
      });
    }
  },
  getIndexData2: function() {
    var that = this
    //门店
    if (app.globalData.orgId) {
      var data = {};
      data.orgId = app.globalData.orgId
      if (app.globalData.latitude) {
        data.lat = app.globalData.latitude
        data.lon = app.globalData.longitude
      }
      data.tenantId = app.globalData.tenantId
      util.request(api.storeSumUrl, data).then(function(res) {
        if (res.errno == 0) {
          that.setData({
            storeList: res.data.store,
            orgId: res.data.store.orgId
          });
          // 拼团进行时
          var data = {};
          data.page = 1
          data.rows = 8
          data.orgId = app.globalData.orgId
          data.tenantId = app.globalData.tenantId
          util.request(api.storeGroupItemUrl, data).then(function(res) {
            if (res.errno == 0) {
              that.setData({
                storeItemList: res.data.groupList,
                itemTotal: res.data.group_total,
                backPage: 1,
              });
              //图片列表
              if (that.data.storeItemList.length < 1) {
                var data = {};
                data.orgId = app.globalData.orgId
                data.tenantId = app.globalData.tenantId
                util.request(api.storePicUrl, data).then(function(res) {
                  if (res.errno == 0) {
                    var storeImageList = res.data.imageList.slice(0, 3)
                    that.setData({
                      storeImageList: storeImageList,
                    });
                    console.log(storeImageList)
                  }
                });
              }
            }
          });
          setTimeout(function() {
            wx.hideLoading()
          }, 1000)
        }
      });
    } else {
      var that = this
      var data = {};
      data.page = 1
      data.rows = 8
      data.orderType = 3
      data.dataType = 'a'
      if (app.globalData.latitude) {
        data.lat = app.globalData.latitude
        data.lon = app.globalData.longitude
      }
      data.tenantId = app.globalData.tenantId
      util.request(api.storeListUrl, data).then(function(res) {
        if (res.errno == 0) {
          if (res.data.storeList) {
            that.setData({
              orgId: res.data.storeList[0].orgId,
              storeSetId: res.data.storeList[0].storeSetId,
              storeListLength: res.data.storeList,
              total: res.data.total,
              backPage: 1,
            });
          }
          var data = {};
          data.orgId = that.data.orgId
          if (app.globalData.latitude) {
            data.lat = app.globalData.latitude
            data.lon = app.globalData.longitude
          }
          data.tenantId = app.globalData.tenantId
          util.request(api.storeSumUrl, data).then(function(res) {
            if (res.errno == 0) {
              that.setData({
                storeList: res.data.store,
                orgId: res.data.store.orgId
              });
            }
            // 拼团进行时
            var data = {};
            data.page = 1
            data.rows = 8
            data.orgId = that.data.orgId
            data.tenantId = app.globalData.tenantId
            util.request(api.storeGroupItemUrl, data).then(function(res) {
              if (res.errno == 0) {
                that.setData({
                  storeItemList: res.data.groupList,
                  itemTotal: res.data.group_total,
                  backPage: 1,
                });
                //图片列表
                if (that.data.storeItemList.length < 1) {
                  var data = {};
                  data.orgId = that.data.orgId
                  data.tenantId = app.globalData.tenantId
                  util.request(api.storePicUrl, data).then(function(res) {
                    if (res.errno == 0) {
                      var storeImageList = res.data.imageList.slice(0, 3)
                      that.setData({
                        storeImageList: storeImageList,
                      });
                      console.log(storeImageList)
                    }
                  });
                }
              }
            });
          });
          setTimeout(function() {
            wx.hideLoading()
          }, 1000)
        } else {
          // that.setData({
          //   showModal_logo: true
          // })
          // that.getIndexData();
        }
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e.detail.userInfo)
    var sessionKey = app.globalData.userInfo.sessionKey
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.userInfo.sessionKey = sessionKey
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

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
  // 取消

  onCancel: function() {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  bindGetUserInfo: function() {
    // 用户点击授权后，这里可以做一些登陆操作
    //请求数据到后台.
    var that = this;
    wx.getUserInfo({
      success: function(res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        var data = userInfo;
        util.request(api.bindWxMessage, data).then(function(res) {
          if (res.errno === 0) {
            //设置微信信息.
            app.globalData.userInfo = res.data.userInfo
            wx.setStorageSync('userInfo', res.data.userInfo)
            wx.getSetting({
              success(res) {
                if (!res.authSetting["scope.userLocation"]) {
                  wx.getLocation({
                    type: 'wgs84',
                    success: function(res) {
                      that.setData({
                        latitude: res.latitude,
                        longitude: res.longitude,
                      });
                      that.chooseData(1, false);
                      app.globalData.latitude = res.latitude
                      app.globalData.longitude = res.longitude
                    }
                  })
                }
              }
            })
          }
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(options) {
    if (app.globalData.districtName) {
      if (this.data.districtId != app.globalData.districtId) {
        this.setData({
          districtName: app.globalData.districtName,
        });
      }
    }
    if (this.data.isType == 1 && this.data.isShowFirst == 0) {
      this.getIndexData2()
      console.log(147)
    }
    this.setData({
      isShowFirst: 0,
      scrollTop: 0
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
    if (this.data.storeItemList.length > 0) {
      if (this.data.itemTotal > this.data.storeItemList.length) {
        this.storeItemListInit();
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
    }

  },
  storeItemListInit: function() {
    var that = this
    var data = {};
    data.page = that.data.backPage + 1
    data.rows = 8
    data.orgId = app.globalData.orgId
    data.tenantId = app.globalData.tenantId
    util.request(api.storeGroupItemUrl, data).then(function(res) {
      if (res.errno == 0) {
        var storeItemListArr = that.data.storeItemList;
        for (var i = 0; i < res.data.groupList.length; i++) {
          storeItemListArr.push(res.data.groupList[i])
        }
        that.setData({
          storeItemList: storeItemListArr,
          backPage: that.data.backPage + 1,
        });
      }
    })
  },
  /**
   * 用户点击右上角分享
   */

  // onShareAppMessage: function(ops) {
  //   var userId = app.globalData.userId
  //   if (ops.from === 'button') {}
  //   return {
  //     title: '美丽圈小程序',
  //     desc: '美丽人生',
  //     path: '/pages/index/index?fromUserId=' + userId
  //   }
  // },
  storeList: function(e) {
    var orgId = e.currentTarget.dataset.orgId
    console.log(orgId)
    wx.navigateTo({
      url: '../../pages/store/list/index?orgId=' + orgId
    })
  },
  picList: function(e) {
    var orgId = e.currentTarget.dataset.orgId
    wx.navigateTo({
      url: '../../pages/store/pic/index?orgId=' + orgId,
    })
  },
  groupDetail: function(e) {
    var groupId = e.currentTarget.dataset.groupId
    console.log(groupId)
    wx.navigateTo({
      url: '../../pages/activity/groupdetail/index?groupId=' + groupId,
    })
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
})