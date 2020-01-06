/**
 * 用户相关服务
 */

const util = require('../utils/util.js');
const api = require('../config/api.js');


/**
 * 调用微信登录
 */
function loginByWeixin() {

  let code = null;
  return new Promise(function (resolve, reject) {
    return util.login().then((res) => {
      code = res.code;
      console.log(code);
      util.request(api.AuthLoginByWeixin, { code: code }, 'POST').then(res => {
        if (res.errno === 0) {
          //存储用户信息
          console.log('存储用户信息')
          console.log(res.data)
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('userId', res.data.userId);
          wx.setStorageSync('sessionKey', res.data.userInfo.sessionKey);
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
  });
}

/**
 * 判断用户是否登录
 */
function checkLogin() {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {

      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });

    } else {
      reject(false);
    }
  });
}


module.exports = {
  loginByWeixin,
  checkLogin,
};











