// pages/my/membership/consumption/index.js
var app = getApp()
const api = require('../../../../config/api.js');
const util = require('../../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['美容黄金卡', '美容会员卡', '美容白金卡'],
    currentNavbar: '0',
    consumptionTime:'2018-06-20',
    itemTime:'2018-12-01',
    itemName:'深林补水',
    price1:'9999',
    cardList:[],
    consumeRecords:[],
    memberId:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '消费明细',
    })
    this.getConsumeData(options.memberId, options.cardAccountId);
  },
  getConsumeData: function (memberId, cardAccountId) {
    //获得会员数据.
    var that = this
    var condition = {};
    condition.memberId=memberId;
    condition.cardAccountId = cardAccountId;
    condition.page= 1;
    condition.isWaitEvaluation = 0;
    condition.rows =8; 
    util.request(api.consumeMessage, condition).then(function (res) {
      if (res.errno === 0) {
        var headers  = res.data.consumeHeads;
        var consumeRecords = new Array();
        var currentSelect = 0;
        for (var i = 0; i < res.data.cardList.length; i++){
          if (res.data.cardList[i].cardAccountId == cardAccountId){
            currentSelect = i;
          }
        }
        for (var i = 0; i < headers.length;i++){
           var head = headers[i];
           var obj = {};
          obj.billDate = util.toDate(head.billDate); 
          obj.totalAmount = head.amount;
          obj.consumeDetail = head.itemOrProductName;
          consumeRecords[i]=obj;
        }
        that.setData({
          memberId: memberId,
          cardList: res.data.cardList,
          consumeRecords: consumeRecords,
          currentNavbar: currentSelect,
        });
      }else {
        that.setData({
          memberId: memberId
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // },
  swichNav(e) {
    var cardAccountId = e.currentTarget.dataset.cardAccountId;
    var that = this
    var condition = {};
    condition.cardAccountId = cardAccountId;
    condition.page = 1;
    condition.rows = 8;

    condition.isWaitEvaluation = 0;
    util.request(api.consumeMessage, condition).then(function (res) {
      if (res.errno === 0) {
        var headers = res.data.consumeHeads;
        var consumeRecords = new Array();
        for (var i = 0; i < headers.length; i++) {
          var head = headers[i];
          var obj = {};
          obj.billDate = util.toDate(head.billDate); 
          obj.totalAmount = head.amount;
          obj.consumeDetail = head.itemOrProductName;
          consumeRecords[i] = obj;
        }
        that.setData({
          currentNavbar: e.currentTarget.dataset.idx,
          consumeRecords: consumeRecords,
        });
      }else {
        that.setData({
          currentNavbar: e.currentTarget.dataset.idx
        });
      }
    });
  },
})