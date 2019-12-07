const util = require('../../../../utils/util.js');
const api = require('../../../../config/api.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Img:'/img/coupon.png',
    imagewidth:'0',
    imageheight:'0',
    pageType:1,
    content:"",
    link:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.bannerId);
   
    var detailId = options.bannerId;
    this.getPageContent(detailId);
  },
  getPageContent(detailId){
    
    var that = this;
    var data = {}
    data.id = detailId
    data.tenantId = app.globalData.tenantId
    util.request(api.publityPageDetail, data).then(function (res) {
      if(res.errno==0){
        var publicityPage = res.data.publicityPage;
        wx.setNavigationBarTitle({
          title: publicityPage.title,
        })
        //if (publicityPage.pageType==1){
          that.setData({
           //  pageType: publicityPage.pageType,
             content: publicityPage.content,
           });
        //}
        //  else if (publicityPage.pageType == 2){
        //   that.setData({
        //     pageType: publicityPage.pageType,
        //     link: publicityPage.outLink,
        //   });
        // }
      }
    });
  },
  imageLoad: function (e) {
    var imageSize = util.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
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
  // onPullDownRefresh: function () {

  // },

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
   getMessage:function(){

  }
})