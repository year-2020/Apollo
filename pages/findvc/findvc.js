// pages/findvc.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次  
    callbackcount: 15,      //返回数据的个数  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏 

    tabArr: ["实时", "精选"],
    fromfindvcMe: 1,
    topicList:[],
    tab: 0,
    pepoleNum:1,
    testcelltype:1,
    cellType:0,//0表示小的item，1表示大的item
    questionType:"latest",
    questionList:[]
  },
  /**喜欢的action */
  likeAction: function (e) {
    const that = this;
    console.info(e);
    app.api._fetch({
      url: '/community/question/like?ownedId=' + e.currentTarget.dataset.id,
      method: 'post'
    }).then(function (res) {
      console.info('点赞返回的结果' + JSON.stringify(res.data))
      if (res.data.code == 0) {
        wx.showToast({
          title: '喜欢成功',
        })
        that.setData({
          searchPageNum: 1, //当前页的一些初始数据，视业务需求而定
          articleList: []
        })
        that.onLoad(); //重新加载onLoad()

      }


    }).catch(function (error) {
      console.log(error);
    });
  },
  
  // 顶部 search 框
  searchcik: function () {
    wx.navigateTo({
      url: '/pages/personalPackage/search' + '?fromfindvc=1',
    })
  },

  nav: function (a) {
    const that = this;
    wx.showToast({
      title: `点击了第${a.currentTarget.dataset.tab}个 tab`,
      icon: "none"
    })
that.setData({
  searchPageNum:1,
  questionList:[],
  searchLoadingComplete: false,
  searchLoading: true
})
if(a.currentTarget.dataset.tab==0){//实时
  this.getQuestionList('latest');
  this.data.questionType = 'latest';

}else{//精选
  this.getQuestionList('quality');
  this.data.questionType='quality';
}
    var t = this;
    // t.data.arrList = [], t.data.list = [],
    t.setData({
      tab: a ? a.currentTarget.dataset.tab : t.data.tab,
      // page: 1,
      // arrList: [],
      // list: [],
      // htmlShow: !1,
      // complete: !1
    })
    // t.load();
  },
  /**话题列表item被怼了 */
  itemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({//跳去问题详情,需要新页面 就是把文章详情的搞搞,传的的url和参数
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=' + e.currentTarget.dataset.type,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效
    const that = this;
    /**头部话题广场的 */
    app.api._fetch({
      url: '/community/topic/xcxlist',
      data: {},
    }).then(function (res) {
      console.info('话题页面的数据返回' + JSON.stringify(res.data))
      that.setData({
        topicList: res.data.rows
      });

    }).catch(function (error) {
      console.log(error);
    });
    that.setData({
      questionList: [],
      searchPageNum: 1
    })
    wx.stopPullDownRefresh();

    /**底下实时/精选的 */
    that.getQuestionList(that.data.questionType);
  },
  //滚动到底部触发事件  
  searchScrollLower: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.getQuestionList(that.data.questionType);
    }
  },

  getQuestionList:function(type){
    const that = this;

    app.api._fetch({
      url: '/community/question/xcxlist',
      data: {
        type: type,
        pageSize: '10',
        pageNum: that.data.searchPageNum
      },
    }).then(function (res) {
      console.info('实时问答的数据返回' + JSON.stringify(res.data))
      that.setData({
        // questionList: res.data.rows,
        questionList: that.data.questionList.concat(res.data.rows),

        searchLoading: true   //把"上拉加载"的变量设为false，显示  

      });
      if(res.data.rows.length ==0){
          that.setData({
            searchLoadingComplete: true,
            searchLoading:false
          })
      }

    }).catch(function (error) {
      console.log(error);
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.getQuestionList(that.data.questionType);
    }

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      searchPageNum: 1, //当前页的一些初始数据，视业务需求而定
      questionList:[]
    })
    this.onLoad(); //重新加载onLoad()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})