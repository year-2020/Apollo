var e = null;

module.exports.getSystem = function(e) {
    wx.getSystemInfo({
        success: function(t) {
            e && e("success", t);
        },
        fail: function(t) {
            e && e("fail", t);
        }
    });
}, exports.showtoast = function(e, t, o) {
    wx.showToast({
        title: e,
        icon: t,
        duration: o
    });
}, exports.hidetoast = function(e) {
    if (e) try {
        setTimeout(function() {
            wx.hideToast && wx.hideToast();
        }, e);
    } catch (e) {} else try {
        setTimeout(function() {
            wx.hideToast && wx.hideToast();
        }, 600);
    } catch (e) {}
}, exports.showmodal = function(e, t, o) {
    var n = getApp();
    wx.showModal({
        title: "提示",
        content: e.data,
        confirmText: e.text ? e.text : "确定",
        confirmColor: e.color ? e.color : n.source.sceneColor,
        showCancel: void 0 === e.cancel || e.cancel,
        success: function(e) {
            e.confirm ? t && t() : o && o();
        }
    });
}, exports.deletemodal = function(e, t, o) {
    getApp().systemInfo["1.6.3"] ? wx.showModal({
        title: "提示",
        content: e,
        cancelText: "删除",
        cancelColor: "#e21918",
        confirmText: "取消",
        confirmColor: "#000000",
        success: function(e) {
            e.cancel ? t && t() : o && o();
        }
    }) : wx.showModal({
        title: "提示",
        content: e,
        cancelText: "取消",
        cancelColor: "#000000",
        confirmText: "删除",
        confirmColor: "#e21918",
        success: function(e) {
            e.confirm ? t && t() : o && o();
        }
    });
}, exports.shareButton = function(t, o, n) {
    var a = t;
    a.setData({
        shareButtonContent: n
    }), clearTimeout(e), e = setTimeout(function() {
        a.setData({
            shareButtonContent: o
        });
    }, 2e3);
}, exports.addLogTime = function() {
    function e(e) {
        return e < 10 ? "0" + e : e;
    }
    return new Date().getFullYear() + "-" + e(new Date().getMonth() + 1) + "-" + e(new Date().getDate()) + " " + e(new Date().getHours()) + ":" + e(new Date().getMinutes()) + ":" + e(new Date().getSeconds());
}, exports.shareAppMessa = function(e) {
    var t = getApp(), o = this.addLogTime();
    return {
        title: e.title,
        path: e.path + "&openid=" + t.client.openid + "&time=" + o,
        imageUrl: !!e.imageUrl && e.imageUrl
    };
}, exports.saveAddress = function(e) {
    var t = /^[\u4E00-\u9FA5]+$/, o = "", n = "", a = getApp();
    a.compatibleManage.phoneContact ? (e.name.match(t) && e.name.length > 1 ? (n = e.name.substr(0, 1), 
    o = e.name.substring(1)) : (o = e.name, n = ""), wx.addPhoneContact({
        firstName: o,
        lastName: n,
        organization: e.company,
        title: e.job,
        mobilePhoneNumber: e.mophone1 || "",
        email: e.email1 || "",
        hostNumber: e.phone1 || "",
        remark: e.addr1 || ""
    })) : this.showmodal({
        data: "请升级到最新版本的微信，体验该功能",
        text: "我知道了",
        cancel: !1
    }), a.gioCustome({
        t: "publicFun.001"
    });
}, exports.throttle = function(e, t, o) {
    var n = null, a = new Date();
    return function() {
        var s = this, i = arguments, r = new Date();
        clearTimeout(n), r - a >= o ? (e.apply(s, i), a = r) : n = setTimeout(function() {
            e.apply(s, i);
        }, t);
    };
}, exports.regMatch = function(e, t, o) {
    var n = {}, a = [];
    e = function(e) {
        return e = e.replace(/[\\\b\f\n\r\t]/g, ""), e = e.replace(/[\[\]\+]/, "");
    }(e);
    var s = new RegExp(e);
    if (e) for (var i in t) for (var r in t[i]) !n[i] && "id" != r && "userpic" != r && "hengshu" != r && "openid" != r && "exchange" != r && "isread" != r && "invoice" != r && "rid" != r && "shareothers" != r && "addtime_s" != r && "addtimeS" != r && "order" != r && "form_token" != r && "formtoken" != r && "token" != r && "selected" != r && "source" != r && t[i][r] && ("pinyin" == r && "#" == t[i][r] || t[i][r].match(s) && (a.push(t[i]), 
    n[i] = 1));
    o && o(a);
}, exports.lowVersionLogo = function(e, t) {
    var o, n, a = {};
    wx.getImageInfo({
        src: e,
        success: function(e) {
            o = e.height, n = e.width, a = o > n ? {
                lt: [ 0, (o - n) / 2 ],
                rt: [ n, (o - n) / 2 ],
                lb: [ 0, (o - n) / 2 + n ],
                rb: [ n, (o - n) / 2 + n ]
            } : {
                lt: [ (n - o) / 2, 0 ],
                rt: [ (n - o) / 2, 0 ],
                lb: [ (n - o) / 2, o ],
                rb: [ (n - o) / 2 + o, o ]
            }, t && t(a);
        },
        fail: function() {
            wx.showToast({
                title: "logo上传失败"
            });
        }
    });
}, exports.upldProgress = function(e, t) {
    var o = getApp(), n = this;
    switch (o.onProgressUpld = 0, t.data.pageShade || (t.data.pageShade = {}), e.status) {
      case "loading":
        !function() {
            if (t.setData({
                "pageShade.show": !0,
                "pageShade.loading": "0%"
            }), o.systemInfo["1.6.3"]) var a = setInterval(function() {
                t.setData({
                    "pageShade.loading": o.onProgressUpld + "%"
                }), (o.onProgressUpld >= 100 || "loading" != e.status) && (clearInterval(a), setTimeout(function() {
                    t.setData({
                        "pageShade.show": !1
                    });
                }, 200));
            }, 150); else n.showtoast("上传中...", "loading", 8e3);
        }();
        break;

      case "success":
        o.systemInfo["1.6.3"] ? o.onProgressUpld = 120 : n.hidetoast();
        break;

      case "fail":
        o.systemInfo["1.6.3"] || n.hidetoast();
    }
};