function timestampToTime(timestamp) {
	//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var date = new Date(timestamp);
	Y = date.getFullYear() + '-';
	M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	D = date.getDate() + ' ';
	h = date.getHours() + ':';
	m = date.getMinutes() + ':';
	s = date.getSeconds();
	return Y + M + D + h + m + s;
};
// 分页
var page = {
	"pageId": "",
	"data": null,
	"options": null,
	"maxshowpageitem": 5, //最多显示的页码个数
	"pagelistcount": 10, //每一页显示的内容条数
	"init": function(listCount, currentPage, options) {
		this.data = options.data,
			this.pageId = options.id,
			this.options = options,
			this.maxshowpageitem = options.maxshowpageitem, //最多显示的页码个数
			this.pagelistcount = options.pagelistcount //每一页显示的内容条数
		page.initPage(listCount, currentPage);
	},
	/**
	 * 初始化数据处理
	 * @param listCount 列表总量
	 * @param currentPage 当前页
	 */
	"initPage": function(listCount, currentPage) {
		var maxshowpageitem = page.maxshowpageitem;
		if (maxshowpageitem != null && maxshowpageitem > 0 && maxshowpageitem != "") {
			page.maxshowpageitem = maxshowpageitem;
		}
		var pagelistcount = page.pagelistcount;
		if (pagelistcount != null && pagelistcount > 0 && pagelistcount != "") {
			page.pagelistcount = pagelistcount;
		}
		page.pagelistcount = pagelistcount;
		if (listCount < 0) {
			listCount = 0;
		}
		if (currentPage <= 0) {
			currentPage = 1;
		}

		page.setPageListCount(listCount, currentPage);
	},
	/**
	 * 初始化分页界面
	 * @param listCount 列表总量
	 */
	"initWithUl": function(listCount, currentPage) {
		var pageCount = 1;
		if (listCount >= 0) {
			var pageCount = listCount % page.pagelistcount > 0 ? parseInt(listCount / page.pagelistcount) + 1 : parseInt(
				listCount / page.pagelistcount);
		}
		var appendStr = page.getPageListModel(pageCount, currentPage);
		$("#" + page.pageId).html(appendStr);
	},
	/**
	 * 设置列表总量和当前页码
	 * @param listCount 列表总量
	 * @param currentPage 当前页码
	 */
	"setPageListCount": function(listCount, currentPage) {
		listCount = parseInt(listCount);
		currentPage = parseInt(currentPage);
		page.initWithUl(listCount, currentPage);
		page.initPageEvent(listCount);
		page.viewPage(currentPage, listCount, page.pagelistcount, page.data)
		//      fun(currentPage);
	},
	//页面显示功能
	"viewPage": function(currentPage, listCount, pagelistcount, data) {
		var NUM = listCount % pagelistcount == 0 ? listCount / pagelistcount : parseInt(listCount / pagelistcount) + 1;
		if (currentPage == NUM) {
			var result = data.slice((currentPage - 1) * pagelistcount, data.length);
		} else {
			var result = data.slice((currentPage - 1) * pagelistcount, (currentPage - 1) * pagelistcount + pagelistcount);

		}
		this.options.callBack(result);
	},
	"initPageEvent": function(listCount) {
		$("#" + page.pageId + ">li[class='pageItem']").on("click", function() {
			page.setPageListCount(listCount, $(this).attr("page-data"), page.fun);
		});
	},
	"getPageListModel": function(pageCount, currentPage) {
		var prePage = currentPage - 1;
		var nextPage = currentPage + 1;
		var prePageClass = "pageItem";
		var nextPageClass = "pageItem";
		if (prePage <= 0) {
			prePageClass = "pageItemDisable";
		}
		if (nextPage > pageCount) {
			nextPageClass = "pageItemDisable";
		}
		var appendStr = "";
		// appendStr+="<li class='"+prePageClass+"' page-data='1' page-rel='firstpage'>首页</li>";
		appendStr += "<li class='" + prePageClass + "' page-data='" + prePage + "' page-rel='prepage'>&lt;</li>";
		var miniPageNumber = 1;
		if (currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) <=
			pageCount) {
			miniPageNumber = currentPage - parseInt(page.maxshowpageitem / 2);
		} else if (currentPage - parseInt(page.maxshowpageitem / 2) > 0 && currentPage + parseInt(page.maxshowpageitem / 2) >
			pageCount) {
			miniPageNumber = pageCount - page.maxshowpageitem + 1;
			if (miniPageNumber <= 0) {
				miniPageNumber = 1;
			}
		}
		var showPageNum = parseInt(page.maxshowpageitem);
		if (pageCount < showPageNum) {
			showPageNum = pageCount;
		}
		for (var i = 0; i < showPageNum; i++) {
			var pageNumber = miniPageNumber++;
			var itemPageClass = "pageItem";
			if (pageNumber == currentPage) {
				itemPageClass = "pageItemActive";
			}

			appendStr += "<li class='" + itemPageClass + "' page-data='" + pageNumber + "' page-rel='itempage'>" + pageNumber +
				"</li>";
		}
		appendStr += "<li class='" + nextPageClass + "' page-data='" + nextPage + "' page-rel='nextpage'>&gt;</li>";
		// appendStr+="<li class='"+nextPageClass+"' page-data='"+pageCount+"' page-rel='lastpage'>尾页</li>";
		return appendStr;

	}
};

//接受参数
// Getparam.js
(function($) {
	$.extend({
		//1、取值使用    $.Request("name")
		Request: function(name) {
			var sValue = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]*)(\&?)", "i"));
			//decodeURIComponent解码
			return sValue ? decodeURIComponent(sValue[1]) : decodeURIComponent(sValue);

		},
		//2、给url加参数    $.UrlUpdateParams(url, "add", 11111);
		UrlUpdateParams: function(url, name, value) {
			var r = url;
			if (r != null && r != 'undefined' && r != "") {
				value = encodeURIComponent(value);
				var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
				var tmp = name + "=" + value;
				if (url.match(reg) != null) {
					r = url.replace(eval(reg), tmp);
				} else {
					if (url.match("[\?]")) {
						r = url + "&" + tmp;
					} else {
						r = url + "?" + tmp;
					}
				}
			}
			return r;
		}


	});
})(jQuery);
