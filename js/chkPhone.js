/*
 * By Lmz
 * 201806251540
 * 判断是否为手机操作
 */
var gsTxt = ["正在尝试打开APP", "秒后进入下载页面"];
// load animation
var Loading = (function () {
    var showLoading = function (sText) {
        $.mobile.loading('show', {
            text: sText,
            textVisible: true,
            theme: 'a',
            textonly: false,
            html: ""
        })
    };
    var hideLoading = function () {
        $.mobile.loading('hide');
    };
    return {
        showLoading: showLoading,
        hideLoading: hideLoading
    }
})();
//Go to url
function hrefUrl(sUrl) {
    window.location = sUrl;
}
var OpenApp = {
    _TIMER: null,
    _ICOUNT: 3,
    init: function(sId) {
        var sDownloadUrl,
            sUa = navigator.userAgent,
            _this = this;
        if (this.isMbl()) {
    //        if (sUa.match(/Android/i)) {
    //            sDownloadUrl = 'market://search?q=com.singtel.travelbuddy.android';
    //        }
    //        if (sUa.match(/iphone|ipod|ipad/i)) {
    //            sDownloadUrl = "https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8&ign-mpt=uo%3D4";
    //        }
            sDownloadUrl = "download.html";
            this.bindeHideEvent();
            $('#' + sId).click(function(){
                _this.start(sDownloadUrl);
            });
        } else {
            alert("Is not mobile");
        }
    },
    start: function(sFail) {
        var _this = this;
        Loading.showLoading(gsTxt[0]);
//        hrefUrl("camscanner://");
        hrefUrl("weixin://");
//        hrefUrl("twitter://");
        $(".ui-loader h1").text(_this._ICOUNT + gsTxt[1]);
        var dClickedAt = +new Date;
        _this.countDown(dClickedAt, sFail);
    },
    countDown: function (dClickedAt, sFail) {
        var _this = this;
        if (_this._ICOUNT === 0 && +new Date - dClickedAt > 3000) {
            $(".ui-loader h1").text(_this._ICOUNT + gsTxt[1]);
            hrefUrl(sFail);
            Loading.hideLoading();
        } else {
            _this._TIMER = setTimeout(function () {
                _this._ICOUNT--;
                $(".ui-loader h1").text(_this._ICOUNT + gsTxt[1]);
                _this.countDown(dClickedAt, sFail);
            }, 1000);
        }
    },
    isMbl: function() {
        if (/phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(navigator.userAgent)) {
            return true;
        } else {
            return false;
        }
    },
    bindeHideEvent: function() {
        var _this = this;
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }
        $(document).bind(visibilityChange, function () {
            if(document[hidden]) {
                _this.success();
            }
        });
        $(window).bind('pagehide', function () {
            _this.success();
        });
    },
    success: function() {
        clearTimeout(this._TIMER);
        Loading.hideLoading();
    }
}

OpenApp.init('idOpenApp');