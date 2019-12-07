const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
var QRCode = require('../../../utils/weapp-qrcode.js')
var qrcode;
var app = getApp();
Page({
  data: {
    windowWidth: 0, //屏幕宽度
    windowHeight: 0, //屏幕高度
    contentHeight: 0, //内容高度
    thinkList: [], //文字超出换行处理
    lineHeight: 30, //固定值
    contentTitle: "iPhone XS Max(256GB) 金色 移动联通电信4G手机 双卡双待", //商品标题
    price: "10999.00", //商品价格
    delPrice: "12999.00", //划线价
    canvasUrl: "", //canvas李彪
    qrCode: "", //小程序码https图片路径
    goodsInfoImg: "/img/1.png", //商品图片
    specText: "6.5英寸视网膜全面屏，面容ID", //规格
    show:false,
  },

  onLoad: function(options) {
    this.setData({
      groupDetailUrl: decodeURIComponent(options.groupDetailUrl),
      contentTitle: options.groupTitle,
      groupImg: options.groupImg,
      price: options.groupPrice,
    })
    console.log(this.data.groupDetailUrl)
    let that = this;
    that.getTempFile();
    //获取设备信息高度。计算出其他的高度等
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
          normalPageX: res.windowWidth - (res.windowWidth + res.windowWidth * 0.72) / 2, //左边文本图片X轴位置
          boxWidth: res.windowWidth * 0.84, //分享图片box宽度
          boxheight: res.windowWidth * (0.222 + 0.72 + 0.162) + 40, //分享图片box高度
          boxPageY: res.windowWidth * 0.081, //boxY轴位置
          imgWidth: res.windowWidth * 0.72, //商品图片宽度
          imgHeight: res.windowWidth * 0.72, //商品图片高度
          imgPageY: res.windowWidth * 0.14, //商品图片Y轴位置
          codeWidth: res.windowWidth * 0.192, //小程序码图片宽度
          codeHeight: res.windowWidth * 0.192, //小程序码图片高度
          codePageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 0, //小程序码Y轴位置
          avatarPageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 15, //头像Y轴位置
          titlePageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 25, //标题Y轴位置
          specPageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 82, //规格Y轴位置
          pricePageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 60, //价格Y轴位置
          timePageY: res.windowWidth * 0.222 + res.windowWidth * 0.72 + 118 //秒杀Y轴位置
        });
      }
    });
    //网络图片转为本地图片，直接显示网络图片的话真机不显示
   // that.loadImg();
  },
  // loadImg: function () {
  //   var that = this
  //   var data = {};
  //   data.imagePath = that.data.goodsInfoImg
  //   util.request(api.loadImg, data).then(function (res) {
  //     // if (res.errno == 0) {

  //     // }
  //   });
  // },

  getTempFile: function(url) {
    var that = this;
    wx.showLoading({
      title: '生成中',
      mask: true
    })
    // api.loadImg + '?imagePath=' +
    qrcode = new QRCode('canvas', {
      text: that.data.groupDetailUrl,
      width: 100,
      height: 100,
      colorDark: "#000",
      colorLight: "#fff",
      correctLevel: QRCode.CorrectLevel.H,
      callback: (res) => {
        // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
        that.setData({
          qrCode: res.path,
        })
        console.log(that.data.qrCode)
        wx.downloadFile({
          url: that.data.groupImg.replace("http", "https"),
          success: function (res) {
            that.setData({
              goodsInfoImg: res.tempFilePath,
              show: true,
            })
            that.getData();
            console.log(that.data.goodsInfoImg)
            wx.hideLoading()
          },
          fail: function (fres) {
          }
        })
      }
    });
    that.setData({
      goodsInfoImg: that.data.goodsInfoImg
    })
    // that.downloadSkuQrCode(that.data.qrCode);
  },

  // getTempFile:function(e){
  //   //获取access_token
  //   // wx.request({
  //   //   url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=小程序id&secret=小程序密钥',
  //   //   complete: function (tokenRes) {
  //       //
  //       wx.request({
  //         // url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + tokenRes.data.access_token,
  //         url: 'https://wxprograme.wemeke.com/wxa/getwxacodeunlimit',
  //         method: 'POST',
  //         data: {
  //           width:430,
  //           scene: "?groupId=127&isShare=1&fromUserId=96",
  //           // 是否为Png，默认jpg
  //           is_hyaline: true,
  //           // 是否自动取色
  //           auto_color: true,
  //           page: 'pages/activity/groupdetail/index',
  //         },
  //         responseType: 'arraybuffer',
  //         complete: function (res) {
  //           // 自动复制到剪切板
  //           wx.setClipboardData({
  //             data: wx.arrayBufferToBase64(res.data),
  //             success(res) { }
  //           })
  //           console.log(wx.arrayBufferToBase64(res.data));
  //         },
  //       })
  //   //   },
  //   // });
  // },

  getData: function() {
    let that = this;

    let i = 0;
    let lineNum = 1;
    let thinkStr = "";
    let thinkList = [];
    for (let item of that.data.contentTitle) {
      if (item === "\n") {
        thinkList.push(thinkStr);
        thinkList.push("a");
        i = 0;
        thinkStr = "";
        lineNum += 1;
      } else if (i === 21) {
        thinkList.push(thinkStr);
        i = 1;
        thinkStr = item;
        lineNum += 1;
      } else {
        thinkStr += item;
        i += 1;
      }
    }
    thinkList.push(thinkStr);
    that.setData({
      thinkList: thinkList
    });
    that.createNewImg(lineNum);
  },

  //画矩形，也是整块画布的大小，宽度是屏幕宽度，高度根据内容多少来动态设置。
  drawSquare: function(ctx, height) {
    let that = this;
    ctx.rect(
      that.data.windowWidth * 0.08,
      that.data.boxPageY ,
      that.data.boxWidth,
      height
    );
    ctx.setFillStyle("#f9f9f9");
    // ctx.createLinearGradient("#5a5a5a", "#353535")
    ctx.fill();
  },

  // 设置文字大小，并填充颜色。
  drawFont: function(ctx, contentTitle, height) {
    let that = this;
    let str = that.data.contentTitle;
    let firstline;
    let secondline;
    //一行显示14个字，超过一行时
    if (str.length > 23) {
      //第一行截取前14个字符
      firstline = str.substring(0, 23);
      //两行都显示不下
      if (str.length > 46) {
        secondline = str.substr(23, 23) + "...";
      } else {
        //第二行取剩下的
        secondline = str.substr(23, str.length - 23);
      }
    } else {
      //一行就能显示时候
      firstline = str;
    }

    ctx.setFontSize(14);
    ctx.setFillStyle("#000");
    ctx.fillText(firstline, that.data.normalPageX, that.data.titlePageY);
    if (secondline) {
      ctx.setFontSize(18);
      ctx.setFillStyle("#333");
      ctx.fillText(
        secondline,
        that.data.normalPageX,
        that.data.titlePageY + 17
      );
    }
  },
  // 根据文字多少动态计算高度，然后依次画出矩形，文字，横线和小程序码。
  createNewImg: function(lineNum) {
    let that = this;
    let ctx = wx.createCanvasContext("myCanvas");
    let contentHeight = that.data.boxheight;
    that.drawSquare(ctx, contentHeight);
    that.setData({
      contentHeight: contentHeight
    });
    let height = 100;
    for (let item of that.data.thinkList) {
      if (item !== "a") {
        that.drawFont(ctx, item, height);
        height += that.data.lineHeight;
      }
    }
    //商品图片
    ctx.drawImage(
      that.data.goodsInfoImg,
      that.data.normalPageX,
      that.data.imgPageY,
      that.data.imgWidth,
      that.data.imgWidth
    );
    // 填充价格符号￥
    ctx.setFillStyle("#ea8770");
    ctx.setFontSize(18);
    ctx.font = "normal normal 15px sans-serif";
    ctx.fillText("价格￥", that.data.normalPageX - 2, that.data.pricePageY);
    // 填充价格文字
    ctx.font = "normal bold 20px sans-serif";
    ctx.fillText(
      that.data.price,
      that.data.normalPageX + 60,
      that.data.pricePageY
    );
    // 计算价格符号￥ + 价格文字宽度
    let priceWidth = ctx.measureText("￥" + that.data.price).width;
    // 填充小程序码
    ctx.drawImage(
      that.data.qrCode,
      that.data.normalPageX + that.data.windowWidth * 0.53,
      that.data.codePageY,
      that.data.codeWidth,
      that.data.codeHeight
    );
    // 填充长按立即购买文本
    ctx.setFillStyle("#353535");
    ctx.font = "normal normal 9px sans-serif";
    ctx.fillText(
      "长按识别小程序二维码",
      that.data.normalPageX +
      that.data.windowWidth * 0.52 +
      (that.data.codeWidth - 84) / 2,
      that.data.codePageY + that.data.codeWidth + 12
    );
    ctx.draw(); //绘制到canvas
  },

  // 保存图片
  savePic: function() {
    let that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.windowWidth * 2,
      height: that.data.contentHeight * 2,
      canvasId: "myCanvas",
      success: function(res) {
        // util.savePicToAlbum(res.tempFilePath);
        wx.hideLoading();
        var tempFilePath = res.tempFilePath;
        that.setData({
          canvasUrl: tempFilePath
        });
        if (tempFilePath !== "") {
          wx.hideLoading();
          wx.previewImage({
            current: that.data.canvasUrl, // 当前显示图片的http链接
            urls: [that.data.canvasUrl], // 需要预览的图片http链接列表
            success: function(_res) {
              console.log("预览成功啦");
            }
          });
        }
      }
    });
  },
  //下载小程序码
  // downloadSkuQrCode: function(url) {
  //   var that = this
  //   that.setData({
  //     qrCode: that.data.qrCode
  //   });
  //   console.log(that.data.qrCode)
  //   that.getData();
  // },

  //点击保存到相册
  saveShareImg: function() {
    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function(res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function(res) {
                  if (res.confirm) {}
                },
                fail: function(res) {}
              })
            },
            fail: function(res) {
              wx.showToast({
                title: '保存失败',
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  //   wx.hideShareMenu({
  //     success: function(res) {},
  //     fail: function(res) {},
  //     complete: function(res) {},
  //   })
  // }
});