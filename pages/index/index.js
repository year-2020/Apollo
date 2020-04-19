//index.js
//获取应用实例
const app = getApp()
// const { $Toast } = require('../../dist/base/index');
Page({
  data: {
    searchPageNum: 1, // 设置加载的第几次，默认是第一次  
    callbackcount: 15, //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏  
    tabArr: ["全部", "规划", "预测", "决策", "更多"],
    tab: 0,
    Hs: !1,
    current: '0',
    tabactive: 0,
    searchKey: "",
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,
    imgUrls: [],
    activityUrl: '',
    articleList: [],
    m_tabs: [],
    t_tabs: [],
    links: [
      '../logs/logs',
      '../logs/logs',
      '../logs/logs',
      '../logs/logs'
    ],
    icons: [{
        "ico": "/static/images/ceping.png",
        "title": "能力测评"
      }, {
        "ico": "/static/images/kf.png",
        "title": "进阶开发"
      }, {
        "ico": "/static/images/sp.png",
        "title": "视频教程"
      }, {
        "ico": "/static/images/jf.png",
        "title": "积分商城"
      }

    ],
    pepoleNum: 20
  },
  /**喜欢的action */
  likeAction: function(e) {
    const that = this;
    let count = e.currentTarget.dataset.count;
    let like = e.currentTarget.dataset.like;
    let idx = e.currentTarget.dataset.idx;
    let thisCount = "articleList[" + idx + "].likeCount";
    let thisLike = "articleList[" + idx + "].like";
    console.info(e);
    app.api._fetch({
      url: '/community/article/like?ownedId=' + e.currentTarget.dataset.id,
      method: 'post'
    }).then(function(res) {
      console.info('点赞返回的结果' + JSON.stringify(res.data))
      if (res.data.code == 0) {
        if (like) {
          wx.showToast({
            title: '已取消喜欢',
            icon: 'none'
          })
          that.setData({
            [thisCount]: count - 1,
            [thisLike]: false
          })
        } else {
          wx.showToast({
            title: '已加入我的喜欢',
            icon: 'none'
          })
          that.setData({
            [thisCount]: count + 1,
            [thisLike]: true
          })
        }

        // that.requestListData();
        // that.onLoad(); //重新加载onLoad()

      }


    }).catch(function(error) {
      console.log(error);
    });
  },
  // segement 顶部根据滚动悬停
  onPageScroll: function(a) {
    var t = this;
    a.scrollTop > 576 ? t.setData({
      menuFixed: !0
    }) : t.setData({
      menuFixed: !1
    });
  },
  // 顶部 search 框
  searchcik: function() {
    wx.navigateTo({
      url: '/pages/personalPackage/search?index=1',
    })
  },
  // nav: function(a) {
  //   wx.showToast({
  //     title: `点击了第${a.currentTarget.dataset.tab}个 tab`,
  //     icon: "none"
  //   })
  //   console.log(a);
  //   var t = this;
  //   t.setData({
  //     tab: a ? a.currentTarget.dataset.tab : t.data.tab,
  //   })
  // },
  // handleChange({
  //   detail
  // }) {
  //   console.log(detail);
  //   // wx.showToast({
  //   //   title: `切换到标签 ${detail.key}`,
  //   //   icon: 'none'
  //   // });
  //   this.setData({
  //     current: detail.key
  //   });
  // },

  iconClick: function(e) {
    console.log(e.currentTarget.id);
    if (e.currentTarget.id == 2) { //积分商城
      wx.navigateTo({
        url: '/pages/index/videovc',
      })
    }
    if (e.currentTarget.id == 3) { //积分商城
      wx.navigateTo({
        url: '/pages/index/creditstore',
      })
    }
    if (e.currentTarget.id == 1) { //进阶开发
      wx.navigateTo({
        url: '/pages/index/advanceddev',
      })
    }
    if (e.currentTarget.id == 0) { //能力测评
      wx.navigateTo({
        url: '/pages/competency/grid',
      })
      // wx.showToast({
      //   title: '功能暂未开放，敬请期待',
      //   icon:'none'
      // })
    }

  },

  //轮播图的切换事件
  swiperChange: function(e) {
    if (e.detail.source == 'touch') {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
  },
  //点击指示点切换
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
  //点击图片触发事件
  /**banner列表.已排序.jumpTo:0不跳转 1跳转问答 2跳转文章 3跳转视频(直播) 4跳转网页. jumpId:跳转到哪条记录. activityUrl:跳转到什么网页 */
  swipclick: function(e) {
    console.log(this.data.swiperCurrent);
    if (this.data.imgUrls[this.data.swiperCurrent].jumpTo == 0) {
      console.info('jumpTo==0');
      return;
    }
    if (this.data.imgUrls[this.data.swiperCurrent].jumpTo == 1) {
      wx.switchTab({
        url: '/pages/findvc/findvc',
      })
      return;
    }
    if (this.data.imgUrls[this.data.swiperCurrent].jumpTo == 2) {
      wx.navigateTo({
        url: '/pages/articlevc/articlevc' + '?articleId=' + this.data.imgUrls[this.data.swiperCurrent].jumpId + '&tag=0',
      })
      return;
    }
    if (this.data.imgUrls[this.data.swiperCurrent].jumpTo == 3) {
      wx.switchTab({
        url: '/pages/findvc/findvc',
      })
      return;
    }
    if (this.data.imgUrls[this.data.swiperCurrent].jumpTo == 5) { //跳去进阶文章
      wx.navigateTo({
        url: '/pages/index/advanceddev',
      })
      return;
    }

    wx.navigateTo({
      url: this.data.links[this.data.swiperCurrent] + '?activityUrl=' + this.data.imgUrls[this.data.swiperCurrent].activityUrl
    })
  },
  /**去发布问题页面 */
  jumpTopost: function() {
    wx.navigateTo({
      url: '/pages/publish/publish'
    })
  },
  jumpToTab2: function() {
    wx.switchTab({
      url: '/pages/findvc/findvc',
    })
  },
  /**首页列表item被怼了 */
  itemClick: function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=' + e.currentTarget.dataset.type,
    })
  },
  onLoad: function(options) {
    const that = this;

    /** -----检查更新*/

    //检查是否存在新版本
    wx.getUpdateManager().onCheckForUpdate(function(res) {
      // 请求完新版本信息的回调
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) { //如果有新版本

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateReady(function() { //当新版本下载完成，会进行回调
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启应用',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                wx.getUpdateManager().applyUpdate();
              }
            }
          })

        })

        // 小程序有新版本，会主动触发下载操作（无需开发者触发）
        wx.getUpdateManager().onUpdateFailed(function() { //当新版本下载失败，会进行回调
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请检查网络设置',
            showCancel: false,
          })
        })
      }
    });

    /**-----检查更新 */
    /**广告轮播 */
    app.api._fetch({
      url: '/community/activity/xcxlist',
      data: {
        'location': 1
      },
    }).then(function(res) {
      console.info('广告轮播图的返回' + JSON.stringify(res.data.rows))
      that.setData({
        imgUrls: res.data.rows,
        // authorization: app.globalData.userInfo==null?0:1,
      });
      wx.stopPullDownRefresh();
      if (that.data.imgUrls.length <= 1) {
        that.setData({
          indicatorDots: false
        })
      }
    }).catch(function(error) {
      console.log(error);
    });
    /**中间配置tab */
    app.api._fetch({
      url: '/xcxindex',
      data: {},
    }).then(function(res) {
      // console.info('中间三个tab的返回' + JSON.stringify(res.data))
      that.setData({
        m_tabs: res.data.sections,
        t_tabs: res.data.functions
      });
      getApp().globalData.tags = res.data.tags;
      getApp().globalData.credits = res.data.credits;
      console.info('tags数组是什么' + JSON.stringify(getApp().globalData.tags));
    }).catch(function(error) {
      console.log(error);
    });

    /**列表数据 */
    app.api._fetch({
      url: '/community/article/xcxlist',
      data: {
        pageSize: '10',
        pageNum: '1'
      },
    }).then(function(res) {
      console.info('列表返回')
      console.info(res.data.rows)
      that.setData({
        articleList: res.data.rows,
        searchLoading: true //把"上拉加载"的变量设为false，显示  

      });
    }).catch(function(error) {
      console.log(error);
    });

  },
  onShow: function() {


  },
  requestListData: function() {
    const that = this;

    /**列表数据 */
    app.api._fetch({
      url: '/community/article/xcxlist',
      data: {
        pageSize: '10',
        pageNum: that.data.searchPageNum
      },
    }).then(function(res) {
      console.info('列表返回' + JSON.stringify(res))
      that.setData({
        articleList: that.data.articleList.concat(res.data.rows),
        searchLoading: true //把"上拉加载"的变量设为false，显示  

      });
    }).catch(function(error) {
      console.log(error);
    });
  },
  jumpWeb: function(e) {
    console.info(e);
    wx.navigateTo({
      url: this.data.links[0] + '?activityUrl=' + e.currentTarget.dataset.id
    })
  },
  //滚动到底部触发事件  
  searchScrollLower: function() {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.requestListData();
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // if (this.data.hasMoreData) {
    //   this.getContentInfo('加载更多数据')
    // } else {
    // wx.showToast({
    //   title: '没有更多数据',
    // })
    // }
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1, //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.requestListData();
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    const that = this;
    return {


      desc: 'Apollo开发者社区',

      // path: '/pages/articlevc/articlevc' // 路径，传递参数到指定页面。
      path: '/pages/index/index'
      // imageUrl: 'http://img2.imgtn.bdimg.com/it/u=234634259,4236876085&fm=26&gp=0.jpg'

    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    that.setData({
      searchPageNum: 1, //当前页的一些初始数据，视业务需求而定
      articleList: []
    })
    this.onLoad(); //重新加载onLoad()
  },



})