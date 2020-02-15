// pages/findvcPackage/topicstage.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avator:'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eormpgNl6DsSShSVQc0vbvWv5j5yrAu0nrA2PibOQibibusQT7qZ7dcNIXzzvjWkGicXXKUYWbSEiaicyKA/132',
    topicsList:[],
    commCount:'',
    avatars:'',
    imgs:[],
    imgUrl:'',
    isShow:true,
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,
    topicsId:'',
    titletext:''
  },
  /**跳去个人主页 */
  jumptop: function (e) {
    const that = this;
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 0) {
      //从我的关注跳去的不需要加号
      wx.navigateTo({
        url: '/pages/personalPackage/personhomec' + '?userId=' + e.currentTarget.dataset.id,
      })
    } else {

      wx.navigateTo({
        url: '/pages/personalPackage/personhome' + '?userId=' + e.currentTarget.dataset.id,
      })
    }
  },

  /**添加关注 */
  addfocus: function (e) {
    console.info(e.currentTarget.dataset.id);
    const that = this;
    app.api._fetch({
      url: '/user/follow?id=' + e.currentTarget.dataset.id,
      method: 'post'
    }).then(function (res) {
      console.info('关注成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        that.getQData(that.data.topicsId)
      } else {

      }

    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });

  },

  getQData: function (topicsId) {
    const that = this;

    app.api._fetch({
      url: '/community/question/xcxtopic/' + topicsId,
      data: {
      },
    }).then(function (res) {
      console.info('的数据返回' + JSON.stringify(res.data))
      that.setData({
        topicsList: res.data.rows
      });

    }).catch(function (error) {
      console.log(error);
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.hideShareMenu();
    console.info('topicId==' + options.topicId);
    console.info('imgs==' + options.avatars);

    console.info('imgUrl==' + options.imgUrl);


    const that = this;
    that.setData({
      commCount: decodeURIComponent(options.commentCount),
      avatars:decodeURIComponent(options.avatars),
      imgs: decodeURIComponent(options.avatars).split(","),
      imgUrl:decodeURIComponent(options.imgUrl),
      topicsId:options.topicId,
      titletext: decodeURIComponent(options.titletext)
    })
    that.getQData(options.topicId);

  },
  /** 
       * 预览图片
       */
  previewImage: function (e) {
    console.log(e);
    var current = e.target.dataset.photurl;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: e.target.dataset.srcs // 需要预览的图片http链接列表
    })
  },

  onPostClick:function(e){
    const that = this;

  wx.navigateTo({
    url: '/pages/publish/publish' + '?topicId=' + that.data.topicsId + '&name=' + decodeURIComponent(that.data.titletext) +'&fromQ=1'
  })
},
/**跳去问题详情 */
  jumpToDetail:function(e){
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({//跳去问题详情,需要新页面 就是把文章详情的搞搞,传的的url和参数
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=' + e.currentTarget.dataset.type,
    })
  },
  /**给某个人点赞 */
  cellDzAction: function (e) {
    const that = this;
    app.api._fetch({
      url: '/community/question/like?ownedId=' + e.currentTarget.dataset.id,
      method: 'post'
    }).then(function (res) {
      console.info('点赞成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        wx.showToast({
          title: '点赞成功',
        })
        that.getQData(that.data.topicsId);
      }
    }).catch(function (error) {
      console.info('login-error')
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})