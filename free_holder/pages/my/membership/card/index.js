var app = getApp()
const api = require('../../../../config/api.js');
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    indicatorDots: true,
    beforeColor: "#eee", //指示点颜色
    afterColor: "#ea8770", //当前选中的指示点颜色
    cardImg: '/img/card.png',
    navbar: ['美容黄金卡', '美容会员卡', '美容白金卡'],
    currentNavbar: '0',
    members: [],
    member: {},
    cardList: [],
    carddetail: {},
    tabVaule: [],
    courseLeftTimes: [],
    showModal: false,
    vip: '/img/shareholder.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var userInfo = wx.getStorageSync('userInfo');
    var avatarUrl = userInfo.avatarUrl
    if (avatarUrl) {
      this.setData({
        headImg:avatarUrl
      })
    }
    if (app.globalData.isShareholder) {
      this.setData({
        holder: app.globalData.isShareholder
      })
    }
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    this.getMemberData();
  },
  getMemberData: function() {
    //获得会员数据.
    var that = this
    var data = {}
    data.tenantId = app.globalData.tenantId
    util.request(api.memberIndex,data).then(function(res) {
      if (res.errno === 0) {
        var memberList = res.data.members;
        if (memberList){
          var tabVauleArray = new Array();
          for (var i = 0; i < memberList.length; i++) {
            var obj = {};
            obj.memberId = memberList[i].memberId;
            obj.name = memberList[i].name;
            if (i == 0) {
              obj.member = res.data.member;
              obj.member.name = memberList[i].name
              obj.cardList = res.data.cardList;
              obj.carddetail = res.data.carddetail;
            }
            obj.currentNavbar = 0;
            tabVauleArray[i] = obj;
          }
        }

        that.setData({
          members: res.data.members,
          tabVaule: tabVauleArray,
          member: res.data.member,
          cardList: res.data.cardList,
          carddetail: res.data.carddetail,
        });
      }
    });
  },
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /** 
   * 点击tab切换 
   */
  swich_Nav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var index = e.target.dataset.current;
      //判断数据是否存在。如果已经加载过，则不需要加载
      if (that.data.tabVaule[index].member) {
        that.setData({
          currentTab: e.target.dataset.current
        })
      } else {
        //如果首次，调接口获得数据.
        var condition = {}
        condition.memberId = that.data.tabVaule[index].memberId
        condition.tenantId = app.globalData.tenantId
        util.request(api.memberIndex, condition).then(function(res) {
          if (res.errno === 0) {
            var tabVauleArray = that.data.tabVaule;
            var obj = tabVauleArray[index];
            //var memberName = obj.member.name;
            obj.member = res.data.member;
            obj.member.name = obj.name;
            //obj.member.name = memberName;
            obj.cardList = res.data.cardList;
            obj.carddetail = res.data.carddetail;
            obj.currentNavbar = 0
            that.setData({
              tabVaule: tabVauleArray,
              currentTab: e.target.dataset.current
            })
          }
        });
      }

    }
  },
  showDialogBtn: function(e) {
    //获得当前的数值
    var that = this
    var index = e.currentTarget.dataset.index;
    var tabVauleArray = that.data.tabVaule;
    var obj = tabVauleArray[index];
    //获得剩余的数据
    this.setData({
      courseLeftTimes: obj.carddetail.courseLeftTimesResBeans,
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
      showModal: false
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
  showModal: function() {
    wx.showModal({
      title: '提示',
      content: '确定要解绑本卡',
      showCancel: true,//是否显示取消按钮
      // cancelText: "否",//默认是“取消”
      // cancelColor: 'skyblue',//取消文字的颜色
      // confirmText: "是",//默认是“确定”
      // confirmColor:'#000',//确定文字的颜色
      success: function (res) {
        if (res.cancel) { //取消

        } else { //确认
          // that.formSubmit2()
        }
      },
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
    // wx.reLaunch({
    //   url: '../../../../pages/my/index/index'
    // })
  },
  vipCard: function() {
    wx.navigateTo({
      url: '../../../../pages/my/vipCard/index',
    })
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
  // onShareAppMessage: function () {

  // },
  swichNav: function(e) {
    //判断是在那个会员的界面下操作的。
    var that = this
    var index = e.currentTarget.dataset.index;
    var cardAccountId = e.currentTarget.dataset.cardAccountId;
    var tabVauleArray = that.data.tabVaule;
    var obj = tabVauleArray[index];
    obj.currentNavbar = e.currentTarget.dataset.idx;
    //获得数据..
    var condition = {}
    condition.cardAccountId = cardAccountId
    condition.tenantId = app.globalData.tenantId
    util.request(api.cardAccountMessage, condition).then(function(res) {
      if (res.errno === 0) {
        obj.carddetail = res.data.memberAccountRes
        //对这个变量的数值判断.
        that.setData({
          tabVaule: tabVauleArray,
        })
      }
    });

  },
  consumption: function(e) {
    var that = this
    var memberId = e.currentTarget.dataset.memberId;
    var cardAccountId = e.currentTarget.dataset.cardAccountId;
    wx.navigateTo({
      url: '../../../../pages/my/membership/consumption/index?memberId=' + memberId + '&cardAccountId=' + cardAccountId
    })
  },
  new_card: function(e) {
    wx.navigateTo({
      url: '../../../../pages/my/myVip/index'
    })
  },
})