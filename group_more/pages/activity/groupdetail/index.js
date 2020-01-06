const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const WxParse = require('../../../wxParse/wxParse.js');

var app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    numnum:1,
    showModal: false,
    leftTime: '',
    groupActivityId: '',
    dataTime: '',
    clock: '',
    group: [],
    isCollected: false,
    groupStorage: [],
    groupId: '',
    group: [],
    storeList: [],
    groupActivityList: [],
    groupType: true,
    toView: '',
    daindex1: 1,
    group_index: 0,
    go_index: 0,
    scrollTop: '0',
    backTop: '/img/backTop.png',
    currentSelectTripType: '0',
    htmlContents: [],
    countDownList: [],
    actEndTimeList: [],
    sharePage: '/img/sharePage.png',
    shareWx: '/img/shareWx.png',
    zero_group: '/img/zero.png',
    step_group: '/img/step.png',
    red_fire: '/img/red_fire.png',
    yellow_fire: '/img/yellow_fire.png',
    showModal_logo: false,
    showModal_rule: false,
    scrollY: 0,
    bannerList: [],
    swiperCurrent: 0,
    yct: '/img/yct.png',
    setInter: '',
  },
  /**
   * 轮播自动滑动时，获取当前的轮播id
   */
  swiperChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.detail.current
    })
  },

  /**
   * 图片手动滑动时，获取当前的轮播id
   */
  imageChange(e) {
    const that = this;
    that.setData({
      swiperCurrent: e.currentTarget.index
    })
  },

  scroll: function(e) {
    var that = this;
    that.setData({
      scrollY: e.detail.scrollTop
    })
    if (that.data.scrollY > 50) {
      var animationHide = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      var animationShow = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      animationHide.translate(0, 400).scale(0.6).skew(0).opacity(0).step({
        duration: 3000
      })
      animationShow.opacity(1).step()
    } else {
      var animationHide = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      var animationShow = wx.createAnimation({
        duration: 1000,
        timingFunction: 'ease',
      });
      animationHide.opacity(1).step()
      animationShow.opacity(0).step()
    }
    this.setData({
      animationHide: animationHide.export(),
      animationShow: animationShow.export(),
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var fromUserId = options.fromUserId
    var tenantId = options.tenantId
    console.log(tenantId)
    if (fromUserId) {

    } else {
      if (options.scene) {
        // var opsq = []
        var url = decodeURIComponent(options.scene);
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

        this.setData({
          tenantId: array[0],
          groupId: array[1],
          isShare: array[2],
          fromUserId: array[3],
        })
        console.log(array[0])
        console.log(array[3])
        tenantId = array[0]
        fromUserId = array[3]
      }
    }
    if (fromUserId) {
      app.globalData.fromUserId = fromUserId
    }
    if (tenantId) {
      app.globalData.tenantId = tenantId
    }

    var that = this
    if (options.groupId) {
      that.setData({
        groupId: options.groupId,
      })
    }
    if (options.orderId) {
      that.setData({
        orderId: options.orderId,
      })
    }

    var time = new Date().getTime()
    this.setData({
      groupTime: time,
    })


    if (that.data.scrollY > 50) {
      var animationHide = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
      });
      var animationShow = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
      });
      animationHide.opacity(0).step()
      animationShow.opacity(1).step()
    } else {
      var animationHide = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
      });
      var animationShow = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
      });
      animationHide.opacity(1).step()
      animationShow.opacity(0).step()
    }
    this.setData({
      animationHide: animationHide.export(),
      animationShow: animationShow.export(),
    })
  },
  //请求数据
  groupDetailData: function() {
    var that = this
    var condition = {};
    if (that.data.isShare) {
      condition.isShare = that.data.isShare
    }
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
    condition.rows = 8
    condition.tenantId = app.globalData.tenantId
    wx.showLoading({
      title: '加载中',
      mask: 'true',
    })
    console.log(app.globalData.tenantId + '全局')
    util.request(api.groupDetailUrl, condition).then(function(res) {
      if (res.errno == 0) {
        // 单个
        var datas = res.data.leftTime;
        that.setData({
          group: res.data.group,
          end_time: datas,
          clock: dateformat(datas - 1000),
          storeList: res.data.storeList,
          orderCount: res.data.orderCount,
          groupImages: res.data.groupImages,
          pageTile: res.data.group.groupTitle,
          itemDetail: res.data.group.itemDetail,
          minPrice: res.data.minPrice,
          maxPrice: res.data.maxPrice,
          steps: res.data.steps,
        });
        wx.setNavigationBarTitle({
          title: that.data.pageTile,
        })
        that.data.setInter = setInterval(function() {
          // 渲染倒计时时钟
          that.setData({
            end_time: that.data.end_time - 1000,
            clock: dateformat(that.data.end_time - 1000),
          });
          var str = that.data.clock
          var strs = new Array(); //定义一数组
          strs = str.split(":"); //字符分割
          that.setData({
            day: strs[0],
            hour: strs[1],
            min: strs[2],
            sec: strs[3],
          })
        }, 1000);
        if (res.data.group.itemDetail) {
          WxParse.wxParse('itemDetail', 'html', res.data.group.itemDetail, that, 5);
          that.setData({
            detail_group: res.data.group.itemDetail.replace(/\<img/gi, '<img style="max-width:100%;height:auto" '),
          })
        }
        if (res.data.group.groupRule) {
          WxParse.wxParse('groupRule', 'html', res.data.group.groupRule, that, 5);
        }
        setTimeout(function() {
          wx.hideLoading()
        }, 1000)
      } else {
        setTimeout(function() {
          wx.hideLoading()
          that.groupDetailData
        }, 1000)
      }
    });
    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },
  groupDetailData2: function() {
    var that = this
    var condition = {};
    if (that.data.isShare) {
      condition.isShare = that.data.isShare
    }
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
    condition.rows = 2
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
        that.setData({
          groupActivityList: res.data.groupList,
          groupActivityList_more: res.data.groupList,
          listTotal: res.data.total
        });
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
  onReady: function(ops) {},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    var userId = app.globalData.userId
    this.groupDetailData();
    this.groupDetailData2();
    this.storeDetail();
    this.countDown();
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url 
    var that = this
    var tenantId = app.globalData.tenantId

    var parameter1 = tenantId + '_' + that.data.groupId + '_1' + '_' + userId;
    that.setData({
      showModal: false,
      groupDetailUrl_last: api.groupShare + parameter1,
      parameter1: parameter1,
      pageIndex: url,
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    var that = this;
    clearInterval(that.data.setInter)
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
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    var that = this;
    clearInterval(that.data.setInter)
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
  goactivityDetail: function(e) {
    var groupId = this.data.groupId
    var groupActivityId = e.currentTarget.dataset.groupactivityId
    var isSelf = e.currentTarget.dataset.isSelf
    if (isSelf == 1) {
      wx.navigateTo({
        url: '../../../pages/activity/groupdetail/lumpDetail/lumpDetailIndex?groupId=' + groupId + '&groupActivityId=' + groupActivityId,
      })
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    var userId = app.globalData.userId
    var groupId = this.data.groupId
    var tenantId = app.globalData.tenantId

    if (ops.from === 'button') {

    }
    return {
      title: this.data.pageTile,
      path: 'pages/activity/groupdetail/index?fromUserId=' + userId + '&groupId=' + groupId + '&tenantId=' + tenantId,
      success: function(res) {

      },
    }
  },
// 去开团
  payOrder_lump: function(e) {
    var userInfo = wx.getStorageSync('userInfo');
    if (userInfo.nickName == null || userInfo.nickName == '') {
      this.setData({
        showModal_logo: true,
      });
    } else {
      var userInfo = wx.getStorageSync('userInfo');
      var groupId = e.currentTarget.dataset.groupId
      var isRegister = userInfo.isRegister
      var tenantId = app.globalData.tenantId
      var groupType = e.currentTarget.dataset.groupType
      console.log(userInfo.isRegister)
      var pageUrl = encodeURIComponent('pages/activity/groupdetail/index?groupId=' + groupId + '&tenantId=' + tenantId);
      var endDate = e.currentTarget.dataset.endDate //团活动倒计时
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
          condition.tenantId = app.globalData.tenantId
          util.request(api.offeredUrl, condition).then(function(res) {
            if (res.errno == 0) {
              // if (groupType == 3){
              //   wx.navigateTo({
              //     url: '../../../pages/pay/item4_zero/itemPay?groupId=' + groupId
              //   })
              // } else if (groupType == 4){
              //   wx.navigateTo({
              //     url: '../../../pages/pay/item4_step/itemPay?groupId=' + groupId
              //   })
              // }else{
                wx.navigateTo({
                  url: '../../../pages/pay/item4/itemPay?groupId=' + groupId + '&isOffered=1',
                })
              // }
            } else {
              wx.showToast({
                title: res.errmsg,
                icon: 'none'
              })
            }
          });
        }
      }
    }
  },
  // 去参团——老版

  // payOrder_offered: function(e) {
  //   console.log(e.currentTarget.dataset)
  //   app.globalData.activityNum = e.currentTarget.dataset.activitynum
  //   var groupId = e.currentTarget.dataset.groupId
  //   var groupActivityId = e.currentTarget.dataset.groupactivityId
  //   var userInfo = wx.getStorageSync('userInfo');
  //   var isRegister = userInfo.isRegister
  //   var tenantId = app.globalData.tenantId
  //   var pageUrl = encodeURIComponent('pages/activity/groupdetail/index?groupId=' + groupId + '&tenantId=' + tenantId);
  //   var activityState = e.currentTarget.dataset.activityState
  //   var endDate = e.currentTarget.dataset.endDate //参团倒计时
  //   if (endDate < 1000) {
  //     wx.showToast({
  //       title: '此活动已下线',
  //       icon: 'none',
  //     })
  //   } else {
  //     if (isRegister == 0) {
  //       wx.navigateTo({
  //         url: '../../../pages/my/edit/login/index?pageUrl=' + pageUrl,
  //       })
  //     } else {
  //       var condition = {};
  //       condition.groupId = groupId
  //       condition.groupActivityId = groupActivityId
  //       condition.tenantId = app.globalData.tenantId
  //       util.request(api.offeredUrl, condition).then(function(res) {
  //         if (res.errno == 0) {
  //           wx.navigateTo({
  //             url: '../../../pages/pay/item4/itemPay?groupId=' + groupId + '&groupActivityId=' + groupActivityId + '&activityState=' + activityState,
  //           })
  //         } else {
  //           wx.showToast({
  //             title: '您已经开／参团成功，不能参加此团',
  //             icon: 'none',
  //           })
  //         }
  //       });
  //     }
  //   }
  // },
  shareGroup: function() {
    this.setData({
      showModal: true,
    });
  },
  ruleGroup: function() {
    this.setData({
      showModal_rule: true,
    });
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
  // 狗皮膏药码页面

  // sharePage: function(e) {
  //   var groupTitle = e.currentTarget.dataset.groupTitle
  //   var groupImg = e.currentTarget.dataset.groupImg
  //   var groupPrice = e.currentTarget.dataset.groupPrice
  //   var groupDetailUrl_last = encodeURIComponent(this.data.groupDetailUrl_last);
  //   var scene = this.data.parameter1
  //   var pageIndex = this.data.pageIndex
  //   wx.navigateTo({
  //     url: '../../../pages/share/shareIndex/index?groupTitle=' + groupTitle + '&groupImg=' + groupImg + '&groupPrice=' + groupPrice + '&groupDetailUrl=' + groupDetailUrl_last + '&scene=' + scene + '&pageIndex=' + pageIndex
  //   })
  // },

  // 菊花码页面
  sharePage: function(e) {
    var groupTitle = e.currentTarget.dataset.groupTitle
    var groupImg = e.currentTarget.dataset.groupImg
    var groupPrice = e.currentTarget.dataset.groupPrice
    var groupDetailUrl_last = encodeURIComponent(this.data.groupDetailUrl_last);
    var scene = this.data.parameter1
    var pageIndex = this.data.pageIndex
    wx.navigateTo({
      url: '../../../pages/share/shareCode2/index?groupTitle=' + groupTitle + '&groupImg=' + groupImg + '&groupPrice=' + groupPrice + '&groupDetailUrl=' + groupDetailUrl_last + '&scene=' + scene + '&pageIndex=' + pageIndex
    })
  },
  
  back: function() {
    this.plus();
  },
  //点击弹出
  plus: function() {
    if (!this.data.isPopping) {
      this.takeback();
      this.setData({
        isPopping: true
      })
    } else {
      this.popp();
      this.setData({
        isPopping: false
      });
      // console.log("弹出")
    }
  },
  //弹出动画
  popp: function() {
    //plus顺时针旋转
    let animationShow = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animRule = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animShare = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animMy = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    animationShow.opacity(1).step()
    animPlus.translate(0, 0).rotateZ(90).step();
    animRule.translate(0, -21).rotateZ(0).opacity(1).step();
    animShare.translate(0, -14).rotateZ(0).opacity(1).step();
    animMy.translate(0, -7).rotateZ(0).opacity(1).step();
    this.setData({
      animationShow: animationShow.export(),
      animPlus: animPlus.export(),
      animRule: animRule.export(),
      animShare: animShare.export(),
      animMy: animMy.export(),
    })
  },
  //收回动画
  takeback: function() {
    //plus逆时针旋转
    let animationShow = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animPlus = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animRule = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animShare = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    let animMy = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    animationShow.opacity(1).step()
    animPlus.translate(0, 0).rotateZ(45).step();
    animRule.translate(0, 0).rotateZ(0).opacity(0).step();
    animShare.translate(0, 0).rotateZ(0).opacity(0).step();
    animMy.translate(0, 0).rotateZ(0).opacity(0).step();
    this.setData({
      animationShow: animationShow.export(),
      animPlus: animPlus.export(),
      animRule: animRule.export(),
      animShare: animShare.export(),
      animMy: animMy.export(),
    })
  },
  myOrder: function(e) {
    wx.navigateTo({
      url: '../../../pages/order/index/index',
    })
  },
  groupList: function(e) {
    var groupId = this.data.groupId
    if (this.data.orderId > 0) {
      var orderId = this.data.orderId
    }
    var personCount = e.currentTarget.dataset.personCount
    var groupType = e.currentTarget.dataset.groupType
    wx.navigateTo({
      url: '../../../pages/activity/groupList/index?groupId=' + groupId + '&orderId=' + orderId + '&personCount=' + personCount + '&groupType=' + groupType,
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



// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(number) {
  // 总秒数
  var second = fill_zero_prefix(Math.floor(number / 1000));
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


// 时间格式化输出，如03:25:19 86。每10ms都会调用一次
function date_format(number) {
  // 秒数
  var second = Math.floor(number / 1000);
  // 小时位
  var hr = Math.floor(second / 3600);
  // 分钟位
  var min = fill_zero_prefix(Math.floor((second - hr * 3600) / 60));
  // 秒位
  var sec = fill_zero_prefix((second - hr * 3600 - min * 60)); // equal to => var sec = second % 60;
  // 毫秒位，保留2位
  return hr + " : " + min + " : " + sec;
}