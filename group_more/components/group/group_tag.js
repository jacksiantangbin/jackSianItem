const util = require('../../utils/util.js');
const api = require('../../config/api.js');
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    group_total:{
      type:Number,
    },
    filterdata: {
      type: null
    }, //筛选条件数据
    datas: {
      type: null
    },
    showfilter: {
      type: Boolean,
      value: false
    }, //是否显示下拉筛选
    showfilterindex: {
      type: Number,
      value: null
    }, //显示哪个筛选类目
    itemindex: {
      type: Number,
      value: 0
    },
    itemid: {
      type: Number,
      value: 0
    },
    subitemindex: {
      type: Number,
      value: 0
    },
    subitemid: {
      type: Number,
      value: 0
    },



    cityindex: {
      type: Number,
      value: 0
    },
    cityid: {
      type: Number,
      value: 0
    },
    subcityindex: {
      type: Number,
      value: 0
    },
    subcityid: {
      type: Number,
      value: 0
    },



    reorderindex: {
      type: Number,
      value: 0
    },
    reorderid: {
      type: Number,
      value: 0
    },
    subreorderindex: {
      type: Number,
      value: 0
    },
    subreorderid: {
      type: Number,
      value: 0
    },

    scrolltop: {
      type: Number,
      value: 0
    }, //滚动位置
    currentData: {
      type: Number,
      value: 0
    }, //优惠券.
    page: {
      type: Number,
      value: 0
    }, //分页
    groupList: {
      type: null
    },
    districtType:{
      type:Number,
    },
    //   districtName: {
    //   type: null
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCollected: true,
    num2: '去开团',
    showLoading: false,
    group_loading: '/img/7.png',
    group_xin: '/img/icon_xin.png',
    districtName: '全部城市',
    districtItem: '全部项目',
    reorderName:'默认排序',
    searchType: 1,
    searchId: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

    onLoad: function() {
      var that = this

      that.setData({
        showLoading: false
      })


    },




    setFilterPanel: function(e) { //展开筛选面板
      const d = this.data;
      const i = e.currentTarget.dataset.findex;
      if (d.showfilterindex == i) {
        this.setData({
          showfilter: false,
          showfilterindex: null
        })
      } else {
        this.setData({
          showfilter: true,
          showfilterindex: i,
        })
      }
    },

    groupdetail: function(e) {
      var groupId = e.currentTarget.dataset.groupId
      wx.navigateTo({
        url: '../../../pages/activity/groupdetail/index?groupId=' + groupId,
      })
    },
    setCityIndex: function(e) { //服务城市一级索引
      const d = this.data;
      const dataset = e.currentTarget.dataset;
      var str = dataset.districtname
      if (str.length > 4) {
        var districtName = str.slice(0, 4) + '...'
      } else {
        var districtName = str
      }
      if (dataset.cityindex == 0) {
        var districtName = dataset.districtname + '城市'
        this.setData({
          showfilterindex: 0,
          showfilter: false,
          districtName: districtName,
        })
      } else {
        this.setData({
          showfilterindex: 1,
        })
      }
      this.setData({
        cityindex: dataset.cityindex,
        districtId: dataset.cityid,
        subName: districtName,
        districtType: dataset.districttype,
        subId: dataset.cityid,
        subType: dataset.districttype,
      })
      if (dataset.cityindex == 0) {
this.groupListInit()
      }
      
    },
    setSubcityIndex: function(e) { //服务城市二级索引
      const dataset = e.currentTarget.dataset;
      var str = dataset.districtname
      if (str.length > 4) {
        var districtName = str.slice(0, 4) + '...'
      } else {
        var districtName = str
      }
      if (dataset.subcityindex == 0) {
        districtName = this.data.subName;
      }
      this.setData({
        subcityindex: dataset.subcityindex,
        districtId: dataset.subcityid,
        subcityid: dataset.subcityid,
        districtName: districtName,
        districtType: dataset.districttype,
        showfilter: false,
        showfilterindex: 0,
      })
      this.groupListInit()
    },



    setItemIndex: function(e) {
      const d = this.data;
      const dataset = e.currentTarget.dataset;
      var str = dataset.districtitem
      console.log(str)
      if (str.length > 4) {
        var districtitem = str.slice(0, 4) + '...'
      } else {
        var districtitem = str
      }

      if (dataset.itemindex == 0) {
        var districtitem = dataset.districtitem + '项目'
        this.setData({
          showfilterindex: 0,
          showfilter: false,
          districtItem: districtitem,
        })
      } else {
        this.setData({
          showfilterindex: 2,
        })
      }
      this.setData({
        itemindex: dataset.itemindex,
        searchId: dataset.itemid,
        typeId: dataset.itemid,
        typeName:districtitem,
        searchType: 1,
      })
      if (dataset.itemindex == 0) {
          this.groupListInit()
      }
    
    },
    setSubitemIndex: function(e) {
      const dataset = e.currentTarget.dataset;
      var str = dataset.districtitem
      if (str.length > 4) {
        var districtitem = str.slice(0, 4) + '...'
      } else {
        var districtitem = str
      }
      var typeName = districtitem
      if (dataset.subitemindex == 0) {
        typeName = this.data.typeName;
      }
      this.setData({
        subitemindex: dataset.subitemindex,
        searchId:dataset.subitemid,
        districtItem: typeName,
        showfilter: false,
        showfilterindex: 0,
        searchType: 2,
      })
      this.groupListInit()
    },




    setReorderIndex: function(e) { //服务城市一级索引
      const d = this.data;
      const dataset = e.currentTarget.dataset;
      this.setData({
        reorderindex: dataset.reorderindex,
        reorderid: dataset.reorderid,
        reorderName: dataset.reordername,
        showfilter: false,
        showfilterindex: 0,
      })
      this.groupListInit()
    },
    setSubreorderIndex: function(e) { //服务城市二级索引
      const dataset = e.currentTarget.dataset;
      this.setData({
        subreorderindex: dataset.subreorderindex,
        reorderid: dataset.subreorderid,
        reorderName: dataset.reordername,
        showfilterindex: 0,
      })
      this.groupListInit()
    },
    hideFilter: function() { //关闭筛选面板
      this.setData({
        showfilter: false,
        showfilterindex: null
      })
    },
    groupPaging: function () {
      
      // var page = this.data.page;
      // page = page
      // this.setData({
      //   page: page,
      //   sayloading: "数据加载中..."
      // })
      //this.couponListInit();
      wx.stopPullDownRefresh()
      var myEventDetail = {
        // data:data
      } // detail对象，提供给事件监听函数
      var myEventOption = {
        // tets:3
      } // 触发事件的选项
      this.triggerEvent('groupSlid', myEventDetail, myEventOption)
    },
    groupListInit: function () {
      var that = this
      var condition = {};
      if (that.data.searchType == 2) {
        //点二级
        if (that.data.searchId > 0) {
          condition.searchType = that.data.searchType
          condition.searchId = that.data.searchId;
        } else {
          condition.searchType = 1
          condition.searchId = that.data.typeId;
        }
      } else if (that.data.searchType == 1) {
        //点击一级
        condition.searchType = 1
        condition.searchId = that.data.searchId;
      }
      if (that.data.reorderid) {
        condition.orderType = that.data.reorderid
      }else{
        condition.orderType = 1
      }
      if (that.data.districtId > 0) {
        condition.districtId = that.data.districtId
      } else {
        condition.districtId = that.data.subId
      }
      if (that.data.districtType) {
        if (that.data.districtId < 1) {
          condition.districtType = that.data.subType
        } else {
          condition.districtType = that.data.districtType
        }
      } else {
        condition.districtType = 1
        condition.districtId = 0
      }
      condition.page = 1
      condition.rows = 8
      util.request(api.groupListUrl, condition).then(function (res) {
        if (res.errno == 0) {
          var datas = res.data.groupList;
          for (var i = 0; i < datas.length; i++) {
            datas[i]["beginDate"] = util.toDate(datas[i]["beginDate"])
            datas[i]["endDate"] = util.toDate(datas[i]["endDate"])
          }
          that.setData({
            groupList:res.data.groupList,
          })
        }
      });
    },
  },
  lifetimes: {
    attached() {
      // 在组件实例进入页面节点树时执行
      // var cityindex = null
      // if (app.globalData.cityindex) {
      //   cityindex = app.globalData.cityindex
      // } else {
      //   cityindex = 0
      // }
      // var subcityindex = app.globalData.subcityindex
      // var subcityid = app.globalData.districtId
      // this.setData({
      //   cityindex: cityindex + 1,
      //   subcityindex: subcityindex,
      //   subcityid: subcityid
      // })
      // console.log(this.data.subcityindex)
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show() {
      this.groupListInit()
    },
    hide() {
      // 页面被隐藏
    }
  }
})