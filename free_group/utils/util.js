var api = require('../config/api.js');
var app = getApp();

//日期：年月日 时分秒
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//日期算星期
function getDates(days, todate) { //todate默认参数是当前日期，可以传入对应时间 todate格式为2018-10-05
  var dateArry = [];
  for (var i = 0; i < days; i++) {
    var dateObj = dateLater(todate, i);
    dateArry.push(dateObj)
  }
  return dateArry;
}

function dateLater(dates, later) {
  let dateObj = {};
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate() + later);
  let day = date.getDay();
  let yearDate = date.getFullYear();
  let month = ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : date.getMonth() + 1);
  let dayFormate = (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
  dateObj.time = yearDate + '-' + month + '-' + dayFormate;
  dateObj.week = show_day[day];
  return dateObj;
}
/** 
 * 封封微信的的request
 */

function request(url, data = {}, method = "GET") {
  return new Promise(function(resolve, reject) {

    // if (app.globalData.tenantId){
      // data.tenantId =191;
    // }
    
    data.businessType = api.businessType;

    var userId = wx.getStorageSync('userId');
    if (userId) {
      data.userId = userId;
    }
    var token = wx.getStorageSync('token');
    console.log(token);
    if (token) {
      data.token = token;
    }
    var sessionKey = wx.getStorageSync('sessionKey');
    console.log(sessionKey);
    if (sessionKey) {
      data.sessionKey = sessionKey;
    }
    wx.request({
      url: url + '?time=' + new Date().getMilliseconds(),
      data: data,
      method: method,
      header: {
        'Content-Type': 'application/json',
        'X-Wemeke-Token': wx.getStorageSync('token')
      },
      success: function(res) {
        console.log("success");

        if (res.statusCode == 200) {

          if (res.data.errno == 401) {
            //需要登录后才可以操作

            let code = null;
            return login().then((res) => {
              code = res.code;
              console.log(11);
              console.log(code);
              console.log(12);
              request(api.AuthLoginByWeixin, {
                code: code
              }, 'POST').then(res => {
                if (res.errno === 0) {
                  console.log(res.data)
                  //存储用户信息
                  wx.setStorageSync('userInfo', res.data.userInfo);
                  wx.setStorageSync('sessionKey', res.data.userInfo.sessionKey);
                  wx.setStorageSync('token', res.data.token);
                  wx.setStorageSync('userId', res.data.userId);
                  resolve(res);
                } else {
                  reject(res);
                }
              }).catch((err) => {
                reject(err);
              });
            }).catch((err) => {
              reject(err);
            })
          } else {
            resolve(res.data);
          }
        } else {
          reject(res.errMsg);
        }

      },
      fail: function(err) {
        console.log("failed")
        reject(err)
      }
    })
  });
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

// 位数不足补零
function fill_zero_prefix(num) {
  return num < 10 ? "0" + num : num
}

function toDate(number) {
  //var n = number * 1000;
  var date = new Date(number);
  var Y = date.getFullYear() + '.';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}

function toDate1(number) {
  //var n = number * 1000;
  var date = new Date(number);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return (Y + M + D)
}

function toDate2(number) {
  //var n = number * 1000;
  var date = new Date(number);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  return Y + '-' + M + '-' + D + ' ' + h + ':' + minute;
}

function toDate5(number) {
  //var n = number * 1000;
  var date = new Date(number);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  return Y + '.' + M + '.' + D + '   ' + h + ':' + minute;
}

function toDate3(number) {
  //var n = number * 1000;
  var date = new Date(number);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  return h + ':' + minute;
}

function toDate4(number) {
  //var n = number * 1000;
  var date = new Date(number);
  var Y = date.getFullYear();
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
  var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return Y + '-' + M + '-' + D + ' ' + h + ':' + minute + ':' + s;
}

function str2Stamp(time) {
  var date = time.substr(0, 10)
  var hour = time.substr(11, 2) == '00' ? 0 : time.substr(11, 2).replace(/\b(0+)/gi, "");
  var minute = time.substr(14, 2) == '00' ? 0 : time.substr(14, 2).replace(/\b(0+)/gi, "");
  var second = time.substr(17, 2) == '00' ? 0 : time.substr(17, 2).replace(/\b(0+)/gi, "");
  var timestamp = parseInt(new Date(date).getTime() / 1000) + parseInt(hour) * 3600 + parseInt(minute) * 60 + parseInt(second) - 28800
  return new Date(timestamp * 1000);
}

/**
 * 检查微信会话是否过期
 */
function checkSession() {
  return new Promise(function(resolve, reject) {
    wx.checkSession({
      success: function() {
        resolve(true);
      },
      fail: function() {
        //登录系统.调用系统借口.
        reject(false);
      }
    })
  });
}

// 计算天数
function getNumberOfDays(date1, date2) {//获得天数
  //date1：开始日期，date2结束日期
  var a1 = Date.parse(new Date(date1));
  var a2 = Date.parse(new Date(date2));
  var day = parseInt((a2 - a1) / (1000 * 60 * 60 * 24));//核心：时间戳相减，然后除以天数
  return day
};
/**
 * 调用微信登录
 */
function login() {
  return new Promise(function(resolve, reject) {
    wx.login({
      success: function(res) {
        if (res.code) {
          //登录远程服务器
          console.log(res)
          resolve(res);
        } else {
          reject(res);
        }
      },
      fail: function(err) {
        reject(err);
      }
    });
  });
}

function getUserInfo() {
  return new Promise(function(resolve, reject) {
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        resolve(res);
      },
      fail: function(err) {
        reject(err);
      }
    })
  });
}

function redirect(url) {

  //判断页面是否需要登录
  if (false) {
    wx.redirectTo({
      url: '/pages/auth/login/login'
    });
    return false;
  } else {
    wx.redirectTo({
      url: url
    });
  }
}

function showErrorToast(msg) {
  wx.showToast({
    title: msg,
    image: '/static/images/icon_error.png'
  })
}

module.exports = {
  toDate1,
  formatTime,
  getDates,
  toDate: toDate,
  toDate2,
  toDate3,
  toDate4,
  toDate5,
  request,
  redirect,
  showErrorToast,
  checkSession,
  login,
  getUserInfo,
  imageUtil,
  date_format,
  str2Stamp,
  getNumberOfDays,
}




function imageUtil(e) {
  var imageSize = {};
  var originalWidth = e.detail.width; //图片原始宽
  var originalHeight = e.detail.height; //图片原始高
  var originalScale = originalHeight / originalWidth; //图片高宽比
  console.log('originalWidth: ' + originalWidth)
  console.log('originalHeight: ' + originalHeight)
  //获取屏幕宽高
  wx.getSystemInfo({
    success: function(res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      var windowscale = windowHeight / windowWidth; //屏幕高宽比
      console.log('windowWidth: ' + windowWidth)
      console.log('windowHeight: ' + windowHeight)
      if (originalScale < windowscale) { //图片高宽比小于屏幕高宽比
        //图片缩放后的宽为屏幕宽
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else { //图片高宽比大于屏幕高宽比
        //图片缩放后的高为屏幕高
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }

    }
  })
  console.log('缩放后的宽: ' + imageSize.imageWidth)
  console.log('缩放后的高: ' + imageSize.imageHeight)
  return imageSize;
}