
var NewApiRootUrl = 'https://wxprograme.wemeke.com/';
// var NewApiRootUrl = 'https://miniprograme.wemeke.com/';
// const app = getApp()
// var tenantId = app.globalData.tenantId

module.exports = {
  AuthLoginByWeixin: NewApiRootUrl + 'api/auth/login.json', //首页数据接口  
  bindWxMessage: NewApiRootUrl + '/api/my/bindWxMessage.json', //绑定微信   
  IndexUrl: NewApiRootUrl + 'api/home/index.json', //首页数据接口   
  bindUrl: NewApiRootUrl + '/api/member/bindCard', //绑定ka
  bespeakUrl: NewApiRootUrl + 'bespeak/default.json',
  registerUrl: NewApiRootUrl + ' api/auth//register.json', //注册
  positionUrl: NewApiRootUrl + 'api/common/city.json', //区域数据
  itemUrl: NewApiRootUrl + 'api/item/condition.json', //项目数据  
  productUrl: NewApiRootUrl + 'api/product/condition.json', //产品数据
  nearStoreUrl: NewApiRootUrl + 'api/home/nearbyStore.json', //首页附近门店
  storeListUrl: NewApiRootUrl + 'api/store/list.json', //附近门店列表
  commonCodeUrl: NewApiRootUrl + 'api/common/validateCode.json', //活动验证码
  productListUrl: NewApiRootUrl + 'api/product/list.json', //产品列表
  itemListUrl: NewApiRootUrl + 'api/item/list.json', //项目列表 
  productDetailUrl: NewApiRootUrl + 'api/product/detail.json', //产品详情  
  storeDetailUrl: NewApiRootUrl + 'api/store/detail.json', //门店详情 
  storeDetaiItemlUrl: NewApiRootUrl + 'api/store/getOrgItemList.json', //门店项目
  storeDetaiStaffUrl: NewApiRootUrl + 'api/store/getOrgStaffList.json', //门店员工
  itemDetailUrl: NewApiRootUrl + 'api/item/detail.json', //项目详情  
  itemDetailStore: NewApiRootUrl + 'api/item/forStroe.json', //项目适用的门店  
  itemDetailItem: NewApiRootUrl + 'api/item/forActivitys.json', //项目适用的活动
  staffDetailUrl: NewApiRootUrl + 'api/staff/detail.json', //员工详情 
  couponListUrl: NewApiRootUrl + 'api/coupon/list.json', //优惠券列表
  saleIndexUrl: NewApiRootUrl + 'api/sale/index.json', //营销活动列表  
  couponDetailUrl: NewApiRootUrl + 'api/coupon/detail.json', //优惠券详情 
  envelopesDetailUrl: NewApiRootUrl + 'api/red/detail.json', //红包详情
  envelopesListUrl: NewApiRootUrl + 'api/red/list.json', //红包列表 
  envelopesGoUrl: NewApiRootUrl + 'api/red/receive.json', //红包领取
  groupListUrl: NewApiRootUrl + 'api/group/list.json', //拼团列表
  activityListUrl: NewApiRootUrl + 'api/activity/list.json', //促销活动列表
  groupDetailUrl: NewApiRootUrl + 'api/group/detail.json', //拼团详情 
  groupDetailUrlShare: NewApiRootUrl + 'apiUrl/1/group/detail.json', //fenxiang
  groupActivityDetailUrl: NewApiRootUrl + 'api/group/groupActiviyDetail.json', //参团详情
  activityDetailUrl: NewApiRootUrl + 'api/activity/detail.json', //促销详情
  lumpDetailUrl: NewApiRootUrl + 'api/group/activiyList.json', //参团详情
  productCollectUrl: NewApiRootUrl + 'api/product/collect.json', //产品收藏 
  staffCollectUrl: NewApiRootUrl + 'api/staff/collect.json', //产品收藏  
  storeCollectUrl: NewApiRootUrl + 'api/store/collect.json', //门店收藏 
  itemCollectUrl: NewApiRootUrl + 'api/item/collect.json', //项目收藏  
  couponGetUrl: NewApiRootUrl + 'api/coupon/receive.json', //优惠券领取 
  groupCollectUrl: NewApiRootUrl + 'api/group/collect.json', //拼团活动收藏   
  activityCollectUrl: NewApiRootUrl + 'api/activity/collect.json', //促销活动收藏 
  staffListUrl: NewApiRootUrl + 'api/staff/list.json', //员工列表 
  itemDetailOrderUrl: NewApiRootUrl + 'api/order/item.json', //普通项目订单详情
  groupDetailOrderUrl: NewApiRootUrl + 'api/order/group.json', //拼团订单详情
  activityDetailOrderUrl: NewApiRootUrl + 'api/order/activitys.json', //促销订单详情 
  itemOrderUrl: NewApiRootUrl + 'api/item/confirm.json', //普通项目订单 
  activityOrderUrl: NewApiRootUrl + 'api/activity/confirm.json', //促销活动订单
  groupOrderUrl: NewApiRootUrl + 'api/group/confirm.json', //拼团活动订单  
  OrderBackUrl: NewApiRootUrl + 'api/order/createGroupOrder.json', //订单回调  
  goBespokeUrl: NewApiRootUrl + 'api/bespeak/goBesPeak.json', //去预约  
  myCollectStoreUrl: NewApiRootUrl + 'api/store/getMyCollectOrgPageList.json', //我收藏的门店  
  myCollectStaffUrl: NewApiRootUrl + 'api/staff/myStaff.json', //我收藏的手艺人 
  myCollectProductUrl: NewApiRootUrl + 'api/product/myProduct.json', //我收藏的产品  
  myCollectItemUrl: NewApiRootUrl + 'api/my/item.json', //我收藏的项目  
  myEnvelopesUrl: NewApiRootUrl + 'api/red/getRedAccount.json', //我的红包  
  myEnvelopesDetailUrl: NewApiRootUrl + 'api/red/getRedAccountRecordPageList.json', //我的红包详情 
  myCouponUrl: NewApiRootUrl + 'api/coupon/myCoupon.json', //我的优惠券
  activityOrder: NewApiRootUrl + 'api/order/activitys.json', //促销订单
  groupOrder: NewApiRootUrl + 'api/order/group.json', //拼团订单
  itemOrder: NewApiRootUrl + 'api/order/item.json', //普通订单   
  storeItemStaff: NewApiRootUrl + 'api/bespeak/getStaffListByItemIdOrgId.json',//门店下可做项目的员工  
  staffDate: NewApiRootUrl + 'api/bespeak/getStaffUseTime.json', //员工可用的时间   
  myOrderList: NewApiRootUrl + 'api/order/list.json', //我的订单  
  myInformation: NewApiRootUrl + 'api/my/info.json', //我的基本信息   
  correctInformation: NewApiRootUrl + 'api/my/modifyInfo.json', //修改基本信息     
  myAdvice: NewApiRootUrl + 'api/my/advice/add.json', //意见反馈
  getPayParams: NewApiRootUrl + 'api/order/getPayParams.json', //统一下单   
  newBespoke: NewApiRootUrl + 'api/bespeak/lastBespeak.json', //最近预约   
  noneBespoke: NewApiRootUrl + 'api/bespeak/bespeakCancelWxMini.json', //取消预约  
  orderDetail: NewApiRootUrl + 'api/order/detail.json', //订单详情  
  getBespoke: NewApiRootUrl + 'api/bespeak/getMyBespeaked.json', //已预约   
  myEvaluate: NewApiRootUrl + 'api/evaluation/myEvaluation.json', //我的评价   
  addEvaluate: NewApiRootUrl + 'api/evaluation/evaluationAdd.json', //追评   
  goEvaluate: NewApiRootUrl + 'api/evaluation/add.json', //去评价   
  bespokeUrl: NewApiRootUrl + 'api/bespeak/addBespeakWxMini.json', //预约
  memberIndex: NewApiRootUrl + ' /api/member/getMemberForMiniProgram.json',
  cardAccountMessage: NewApiRootUrl + ' /api/member/getMemberAccount.json', //会员卡
  consumeMessage: NewApiRootUrl + ' /api/member/getCardAccountConsumeBody.json', //预约  
  mySharegold: NewApiRootUrl + '/api/shareGold/shareGoldAccount.json', //分享金  
  mySharegoldDetail: NewApiRootUrl + '/api/shareGold/shareGoldDetail.json', //分享金明细  
  mySharegoldExplain: NewApiRootUrl + '/api/shareGold/shareGoldPlay.json', //分享金玩法 
  mySharegoldData: NewApiRootUrl + '/api/shareGold/shareGoldRecord.json', //获取分享金记录  
  publityPageDetail: NewApiRootUrl + ' /api/publicPage/detail.json', //宣传页
  usUrl: NewApiRootUrl + 'api/page/getAboutUs.json', //关于我们   
  introduceUrl: NewApiRootUrl + 'api/page/getAdviceSet.json', //建议页面背景   
  evaluateUrl: NewApiRootUrl + 'api/evaluation/evaluationItem.json', //评价列表 
  lovecoinPlayUrl: NewApiRootUrl + 'api/beautyCoin/getIntroduce.json', //美丽币玩法  
  lovecoinDetailUrl: NewApiRootUrl + 'api/beautyCoin/getRecords.json', //美丽币明细  
  lovecoinUrl: NewApiRootUrl + 'api/beautyCoin/getAccount.json', //美丽币 
  limitationsUrl: NewApiRootUrl + 'api/order/goPay.json', //限购   
  offeredUrl: NewApiRootUrl + 'api/order/goAttendGroupNew.json', //去参团
  goEvaluateUrl: NewApiRootUrl + 'api/order/goEvaluation.json', //去pj  
  shareCash: NewApiRootUrl + 'api/shareGold/shareGoldWithdrawal.json', //提现
  searchItem: NewApiRootUrl + '/api/item/getItemSearchCondition.json', //项目搜索
  searchStore: NewApiRootUrl + '/api/store/getSearchCondition.json', //门店搜索 
  activityUse: NewApiRootUrl + 'api/coupon/use.json', //门店搜索
  checkBespeakForOrder: NewApiRootUrl + 'api/order/checkBespeakForOrder.json', //支付成功是否预约  
  articleTop: NewApiRootUrl + 'api/articleTop/indexList.json', //精选推荐 
  articleLabel: NewApiRootUrl + '/api/articleLabel/indexList.json', //悦粉圈标签 
  articleList: NewApiRootUrl + '/api/article/indexList.json', //悦粉社区文章列表  
  commentDetail: NewApiRootUrl + '/api/article/getApiArticleDetail.json', //点评详情 
  powderActivityDetail: NewApiRootUrl + '/api/fansActivity/getApiFansActivityDetail.json', //悦粉圈活动详情  
  commentList: NewApiRootUrl + '/api/article/getApiFansArticleList.json', //点评文章列表 
  powderStoreList: NewApiRootUrl + '/api/store/getApiFansActivityOrgList.json', //悦粉圈适用门店列表
  isApply: NewApiRootUrl + '/api/fansApply/isApplyData.json', //是否报过名表  
  applySubmit: NewApiRootUrl + '/api/fansApply/addFansApply.json', //提交名表 
  myPowder: NewApiRootUrl + '/api/fansActivity/myPower.json', //我的悦粉圈  
  myActivityPowder: NewApiRootUrl + '/api/fansApply/getMyFansApplyList.json', //我的活动申请  
  myAcPowderDetail: NewApiRootUrl + '/api/fansApply/myApplyDetail.json', //我的活动申请详情  
  myCmPowderDetail: NewApiRootUrl + '/api/article/getMyApiArticlePageList.json', //我的点评   
  editDrafts: NewApiRootUrl + '/api/article/getApiFansArticleDraft.json', //编辑/修改 基本数据 
  myDraftsList: NewApiRootUrl + '/api/article/getMyApiArticlePageList.json', //草稿箱 
  addDraftsList: NewApiRootUrl + '/api/article/addFansArticle.json', //编辑/修改 提交数据
  isPraise: NewApiRootUrl + '/api/article/myPraise.json', //点赞
  isShare: NewApiRootUrl + '/api/article/myShare.json', //转发
  isRead: NewApiRootUrl + '/api/article/myRead.json', //阅读 
  powderRule: NewApiRootUrl + '/api/fansSet/getFansSetDetail', //悦粉规则  H 
  tradeUrl: NewApiRootUrl + '/api/trade/getApiTradeListPage', //异业  
  tradeDetailUrl: NewApiRootUrl + '/api/trade/getApiTradeDetail', //异业详情
  clearData: NewApiRootUrl + '/api/fansApply/clearData', //清除失效活动   
  pushUrl: NewApiRootUrl + '/api/member/saveFormId', //  
  storeSumUrl: NewApiRootUrl + '/api/store/detailIndex', //裂变门店详情-首页 
  storePicUrl: NewApiRootUrl + '/api/store/findOrgImages', //裂变门店详情-图片  
  storeGroupItemUrl: NewApiRootUrl + '/api/group/listAll.json', //裂变门店详情-拼团项目 
  loadImg: NewApiRootUrl + '/api/image/downLoad', //下载图片   
  orderOver: NewApiRootUrl + '/api/order/orderCancel', //取消订单 
  delOrder: NewApiRootUrl + '/api/order/delOrder', //删除订单
  consumeOrder: NewApiRootUrl + '/api/order/consumeOrder', //是否核销 
  // groupListMy: NewApiRootUrl + '/api/group/activiyListNew.json', //我的参团列表 
  groupListMy: NewApiRootUrl + '/api/group/groupList.json', //团活动参团列表
  myOrderActivityId: NewApiRootUrl + '/api/group/getGroupActivityId', //我的订单返回团活动ID
  // groupShare: NewApiRootUrl + 'apiUrl/' + tenantId + '/group/create/',
  // groupActivityShare: NewApiRootUrl + 'apiUrl/' + tenantId + '/group/attend/',  
  getAccessToken: NewApiRootUrl + '/api/auth/getAccessToken', //accessToken
  groupStoreOnly: NewApiRootUrl + '/api/group/getOrgDetail', //一家门店  
  getwxacode: NewApiRootUrl + '/api/common/getwxacode', //菊花码
  groupPage: NewApiRootUrl + '/api/home/getHomeImage', //首页封面图  
  testGroupPage: NewApiRootUrl + '/api/test/group/list', //testList  
  testLoginPage: NewApiRootUrl + '/api/test/login', //   testlogin

  testToken:'https://api.weixin.qq.com/wxa/getwxacodeunlimit',//
  

  // tenantId: tenantId, //租户ID
  businessType: '3', //业务类型

};