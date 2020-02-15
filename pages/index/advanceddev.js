let proListToTop = [], menuToTop = [], MENU = 0, windowHeight, timeoutId;
const app = getApp();
// MENU ==> 是否为点击左侧进行滚动的，如果是，则不需要再次设置左侧的激活状态
Page({
  data: {
    advList:[],
    currentActiveIndex: 0,
    isShow:false,
    nowindex:0
  },

  likeAction:function(e){
    const that = this;
    console.info(e);
    app.api._fetch({
      url: '/community/advArticle/like?ownedId=' + e.currentTarget.dataset.subdata.articleId,
      method: 'post'
    }).then(function (res) {
      console.info('点赞返回的结果' + JSON.stringify(res.data))
      if (res.data.code == 0) {
        wx.showToast({
          title: '喜欢成功',
        })
        that.setData({
          advList: [],
        })
        that.onLoad(); //重新加载onLoad()

      }


    }).catch(function (error) {
      console.log(error);
    });
  },
  showContent:function(e){
    console.info(e);
    const that = this;
    // 获取当前点击下标    
    var categoryid = e.currentTarget.dataset.categoryid;
    var levelid = e.currentTarget.dataset.levelid;
    var index = e.currentTarget.dataset.id;

    // data中获取列表   
    var missionArr = that.data.advList;
    for (let i in missionArr) {
      //遍历列表数据      
      // if (i == Index) {
      //   //根据下标找到目标,改变状态  
      //   if (missionArr[i].status == 0) {
      //    missionArr[i].status = parseInt(missionArr[i].status) + 1
      //   }
      // }

      var dic = missionArr[i];
      if (dic.category==categoryid){
        // missionArr[i].status = !missionArr[i].status;
        console.info('categoryname =' + dic.categoryName);
        var section = dic.section;
        for(let i in section){

          if(section[i].level == levelid){
            var articles = section[i].articles;
            articles[index].status = !articles[index].status;
          }
        }
      }

    }

    let v = !that.data.isShow
    that.setData({
      isShow:v,
      nowindex:e.currentTarget.dataset.id,
      advList: missionArr
    })
  },
  jumpTodetail:function(e){
    console.log(e.currentTarget.dataset.source);

    if(e.currentTarget.dataset.jump=='Y'){
      wx.navigateTo({
        url: '../logs/logs' + '?activityUrl=' + encodeURIComponent(e.currentTarget.dataset.source)
      })
    }else{
      console.log(e.currentTarget.dataset.id)
      wx.navigateTo({
        url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=2',
      })
    }
    
    // wx.navigateTo({
    //   url: '../logs/logs' + '?activityUrl=' + e.currentTarget.dataset.source
    // })
  },
  onLoad: function (options) {
    const that = this;
    that.getAdvArticleList();
    
    // 确保页面数据已经刷新完毕~
    setTimeout(() => {
      this.getAllRects()
    }, 20)
  },
  changeMenu(e) {
    // 改变左侧tab栏操作
    if (Number(e.target.id) === this.data.currentActiveIndex) return
    MENU = 1
    this.setData({
      currentActiveIndex: Number(e.target.id),
    })
  },
  
  getActiveReacts() {
    wx.createSelectorQuery().selectAll('.menu-active').boundingClientRect(function (rects) {
      return rects[0].top
    }).exec()
  },
  getAllRects() {

    // 获取商品数组的位置信息
    wx.createSelectorQuery().selectAll('.pro-item').boundingClientRect(function (rects) {
      rects.forEach(function (rect) {
        proListToTop.push(rect.top)
      })
    }).exec()

    // 获取menu数组的位置信息
    wx.createSelectorQuery().selectAll('.menu-item').boundingClientRect(function (rects) {
      wx.getSystemInfo({
        success: function (res) {
          windowHeight = res.windowHeight / 2
          rects.forEach(function (rect) {
            menuToTop.push({
              top: rect.top,
              animate: rect.top > windowHeight
            })
          })
        }
      })
    }).exec()
  },
  // 获取系统的高度信息
  getSystemInfo() {
    let self = this
    wx.getSystemInfo({
      success: function (res) {
        windowHeight = res.windowHeight / 2
      }
    })
  },
  
  getAdvArticleList:function(){
    const that = this;
    app.api._fetch({
      url: '/community/advArticle/list',
      data: {},
    }).then(function (res) {
      console.info('进阶开发的列表返回' + JSON.stringify(res.data.rows))
      that.setData({
        advList: res.data.rows,
      });
    }).catch(function (error) {
      console.log(error);
    });
  },
  /**banner图请求的地址和参数有问题 */
  // getbanner: function () {
  //   const that = this;
  //   app.api._fetch({
  //     url: '/community/activity/xcxlist',
  //     data: {},
  //   }).then(function (res) {
  //     console.info('进阶开发的列表返回' + JSON.stringify(res.data.rows))
  //     that.setData({
  //       advList: res.data.rows,
  //     });
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // },

})