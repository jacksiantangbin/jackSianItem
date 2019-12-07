const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
import WxValidate from '../../../utils/WxValidate.js'
var app = getApp()
var interval = null //倒计时函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNum: '',
    iscode: null, //用于存放验证码接口里获取到的code
    time: '获取验证码', //倒计时 
    currentTime: 120,
    login_name: '/img/my.png',
    displayWarn: 'display:none',
  },
  getCode: function () {
    var a = this.data.phoneNum;
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phoneNum == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phoneNum)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      var that = this
      var data = {}
      data.phone = this.data.phoneNum
      data.tenantId = app.globalData.tenantId
      util.request(api.commonCodeUrl, data).then(function (res) {
        if (res.errno == 0) {
          that.setData({
            iscode: res
          })
        }
      });
      that.setData({
        disabled: true
      })
      var that = this;
      var currentTime = that.data.currentTime
      interval = setInterval(function () {
        currentTime--;
        that.setData({
          time: currentTime + '秒'
        })
        if (currentTime <= 0) {
          clearInterval(interval)
          that.setData({
            time: '重新发送',
            currentTime: 121,
            disabled: false
          })
        }
      }, 1000)
    }
  },
  getVerificationCode() {
    this.getCode();
    var that = this
  },
  phoneNumBlur: function (e) {
    this.setData({
      phoneNum: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = wx.getStorageSync('userInfo');
    var avatarUrl = userInfo.avatarUrl
    if (avatarUrl) {
      this.setData({
        login_name: avatarUrl
      })
    } 

    if (options.pageUrl){
      this.setData({
        pageUrl: decodeURIComponent(options.pageUrl),
      })
    }
    // 校验规则
    this.initValidate();
  },
  /**
   * 表单验证->(可自定义验证形式)
   */
  showWarnInfo(error) {
    // 当前page是this对象
    let page = this;
    // 延时时间等待
    let delayTime = 1;
    // 延时等待毫秒,现设置为1000
    let delayMillsecond = 1000;
    // 调用显示警告函数
    showWran(page, error, delayTime, delayMillsecond);
  },

  /**
   * 表单-提交前的(校验)
   */
  submitCheckInfo(e) {
    const params = e.detail.value
    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showWarnInfo(error)
      return false
    }
    // 验证通过以后
    this.submitForm(params);
  },
  onUnload() {
    clearInterval(interval)
  },
  /**
   * 表单-提交(到后端)
   */

  submitForm(params) {
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    var that = this
    var data = {}
    data.phone = that.data.phoneNum
    data.validateCode = that.data.code
    data.registerType = 2 //手机号
    if (app.globalData.fromUserId) {
      data.fromUserId = app.globalData.fromUserId
    }
    data.tenantId = app.globalData.tenantId
    util.request(api.registerUrl, data).then(function (res) {
      if (res.errno == 0) {
        var _userInfo = wx.getStorageSync('userInfo');
        _userInfo.isRegister = 1
        app.globalData.userInfo.isRegister = 1
        wx.setStorageSync('userInfo', _userInfo);
        console.log(that.data.pageUrl)
        if (that.data.pageUrl != undefined) {
          console.log('有页面路径')
          var url = '../../../' + that.data.pageUrl;
          wx.redirectTo({
            url: url,
          })
        }else{
          wx.navigateBack({
            delta: 1
          })
        }
      }
      else {
        wx.showToast({
          title: '验证码错误',
          icon: 'none',
          duration: 1000,
        })
      }
    });
  },

  /**
   * 表单-验证字段
   */
  initValidate() {
    const rules = {

      tel: {
        required: true,
        tel: true,
      },
      regcode: {
        required: true,
        regcode: true,

      },
    }
    // 验证字段的提示信息，若不传则调用默认的信息
    const messages = {
      tel: {
        required: '请输入11位手机号码',
        tel: '请输入正确的手机号码',
      },
      regcode: {
        required: '请输入验证码',
        regcode: '请输入正确的验证码',

      },
    }
    // // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)

  },
})
/**
 * 可加入工具集-减少代码量
 */
function showWran(page, error, delayTime, delayMillsecond) {
  let timesRun = 0;
  let interval = setInterval(function () {
    timesRun += delayTime;
    if (timesRun === delayTime) {
      clearInterval(interval);
    }
    page.setData({
      warnInfo: error.msg,
      displayWarn: 'display:none'
    });
  }, delayMillsecond);
  page.setData({
    warnInfo: error.msg,
    displayWarn: 'display:block'
  });
}