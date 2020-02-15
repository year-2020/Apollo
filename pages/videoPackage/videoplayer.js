// pages/videoPackage/videoplayer.js

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    videoUrl:'',
    datas:
     ["https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png",
      "https://gitee.com/index/ent_poster/banner_5_1_a.png"],
      arrowDirection: 'up',
      tabArr: ["课程表", "留言"],
      tab: 0,
      videoList:[],
      requestTitle:'硬件',
      videoDetail:{},
      videoId:'',
      commentList: [],
    commentType: 2,//2为视频评论
    tonewvideo:1,
    categoryId:'',
    provideojp:1,
    releaseFocus: false,
    releaseName: '',
    inputcontent: '',
    nodata: !0,
    nodatamsg: ''

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


  showCollpose: function () {
    let that = this;
    console.info('点击了cell');
    if (that.data.arrowDirection == 'up') {
      that.setData({
        arrowDirection: 'down'
      })
    } else {
      that.setData({
        arrowDirection: 'up'
      })
    }

  },

  nav: function (a) {
 
    if (a.currentTarget.dataset.tab == 0) {//课程表

    }if(a.currentTarget.dataset.tab == 1){//留言
      this.getCommonList(this.data.videoList[0].videoId);

    }
    var t = this;
    t.setData({
      tab: a ? a.currentTarget.dataset.tab : t.data.tab,

    })

  },

  /**评论框的内容 */
  inputchange: function (event) {
    console.info(event.detail.value);
    this.setData({
      inputcontent: event.detail.value
    })
    if (this.data.inputcontent == '') {
      console.info('不回复某个人了');
      this.setData({
        releaseName: ''
      })
    }
  },

  /**评论action */
  plAction: function (e) {
    const that = this;
    if (that.data.releaseName != null && that.data.releaseName != '') {
      console.info('回复某个人' + that.data.ownedId);
    } else {
      console.info('回复文章');

    }
    if (that.data.inputcontent == null || that.data.inputcontent == '') {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return;
    }
    app.api._fetch({
      url: '/community/comment/addv2?content=' + that.data.inputcontent + '&type=' + '2' + '&ownedId=' + ((that.data.releaseName != null && that.data.releaseName != '') ? that.data.ownedId : that.data.videoId) + '&parentId=' + ((that.data.releaseName != null && that.data.releaseName != '') ? that.data.commentId : '0'),
      method: 'post'
    }).then(function (res) {
      console.info('评论成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {

        that.setData({
          inputcontent: '',
          releaseName: ''
        })
        that.getCommonList(that.data.videoList[0].videoId);

      } if (res.data.code == 500) {//有敏感词

        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    }).catch(function (error) {
      console.log(error);
    });


  },

  /**评论某个人action */
  sigleAction: function (e) {
    const that = this;
    let item = e.currentTarget.dataset.item;
    console.info(item);
    that.setData({
      releaseName: item.wxNickname,
      ownedId: item.ownedId,
      commentId: item.commentId,
      releaseFocus: true

    })

  },

  /**给某个人点赞 */
  cellDzAction: function (e) {
    const that = this;
    app.api._fetch({
      url: '/community/comment/like?ownedId=' + e.currentTarget.dataset.id,
      method: 'post'
    }).then(function (res) {
      console.info('点赞成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        wx.showToast({
          title: '点赞成功',
        })
        that.getCommonList(that.data.videoId);
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });
  },

  /**点赞action */
  dzAction: function () {

    const that = this;
    console.info('点赞开始' + JSON.stringify(that.data.videoDetail.authorId));

    app.api._fetch({
      url: '/community/article/like?',
      method: 'post',
      data: { 'ownedId': that.data.videoDetail.authorId},
    }).then(function (res) {
      console.info('点赞成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        var tempcount = that.data.likeCount;
        if (that.data.likeCount > that.data.infodic.likeCount) {
          tempcount--;
        } else {
          tempcount++;
        }
        that.setData({
          likeCount: tempcount
        })
      }else{
        wx.showToast({
          title: '已经点过赞了！！！',
          icon:'none'
        })
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });
  },
  /**底部评论的action */
  bplAction: function () {
    const that = this;
    wx.navigateTo({
      url: '/pages/articlevc/addcomm' + '?parentId=' + '0' +
        '&ownedId=' + that.data.videoDetail.authorId + '&type=' + '2',
    })
  },

  /**添加关注 */
  addfocus: function () {
    const that = this;
    app.api._fetch({
      url: '/user/follow?id=' + that.data.videoDetail.authorId,
      method: 'post'
    }).then(function (res) {
      console.info('关注成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        that.getVideoDetail(that.data.videoId);
      } else {

      }

    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.info('视频分类 id==='+options.categoryId);
    that.setData({
      categoryId: options.categoryId
    })
    that.getClassList(options.categoryId);

  },
  getClassList: function (categoryId) {
    const that = this;
    app.api._fetch({
      url: '/community/video/xcxlist',
      data: { 'categoryId': that.data.categoryId},
    }).then(function (res) {
      that.setData({
        videoList: res.data.rows,
        videoId: res.data.rows[0].videoId
      });
      console.info('分类列表的返回' + JSON.stringify(that.data.videoList))

    that.getVideoDetail(that.data.videoList[0].videoId);
    }).catch(function (error) {
      console.log(error);
    });
  },
  /**视频详情 */
  getVideoDetail: function (videoId) {
    const that = this;
    app.api._fetch({
      url: '/community/video/view/'+videoId,
    }).then(function (res) {
      that.setData({
        videoDetail: res.data,
      });
      console.info('视频详情的返回' + JSON.stringify(that.data.videoDetail))

    }).catch(function (error) {
      console.log(error);
    });
  },
  /**获得评论列表 */
  getCommonList: function (videoId) {
    const that = this;
    app.api._fetch({
      url: '/community/comment/treev2',
      data: {
        'id': videoId,
        'type': that.data.commentType
      },
    }).then(function (res) {
      console.info('评论列表返回' + JSON.stringify(res))
      that.setData({
        commentList: res.data.rows
      });
    }).catch(function (error) {
      console.log(error);
    });
  },
/*当前页刷新 */
  jumpToPro:function(e){
    const that = this;

    that.getVideoDetail(e.currentTarget.dataset.id);
    wx.pageScrollTo({
      scrollTop: 0
    })
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