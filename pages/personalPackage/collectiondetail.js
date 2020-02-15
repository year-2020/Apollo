// pages/articlevc/articlevc.js
const app = getApp()
var WxParse = require('../../wxparse/wxparse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    articleId: '',
    infodic: {},
    title: '',
    wxNickname: '',
    createTime: '',
    content: '',
    saveTag: 0,
    gz_status: 0,
    likeCount: 0,
    showComm: false,
    commentList: [],
    icon: '/static/images/apollo_ico.png',
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
    commenttag: 0, //0：文章评论 1：问答评论 2:视频评论
    reqTag: 0,
    headertags: [],
    releaseFocus: false,
    releaseName: '',
    inputcontent: '',
    commentId: '',
    ownedId: '',
    nodata: !0,
    nodatamsg: '',
    articletype: 0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info('tag =====' + options.tag);

    this.setData({
      commenttag: options.tag,
      articletype: options.articletype
    })
    this.getArticle(options.articleId, options.tag);
  },
  /** 
   * 预览图片
   */
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.infodic.imgs // 需要预览的图片http链接列表
    })
  },


  /**添加关注 */
  addfocus: function () {
    const that = this;
    app.api._fetch({
      url: '/user/follow?id=' + (this.data.infodic.authorId != null ? this.data.infodic.authorId : this.data.infodic.questionerId),
      method: 'post'
    }).then(function (res) {
      console.info('关注成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        that.getArticle(that.data.articleId, that.data.reqTag)
      } else {

      }

    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });

  },
  /**收藏action */
  sc_action: function () {

    const that = this;
    var collectionUrl = '';
    console.info('收藏action的tag = ' + that.data.commenttag);
    if (that.data.commenttag == 1) {
      collectionUrl = '/community/question/collect?ownedId=' + that.data.articleId;
    } else {
      collectionUrl = '/community/article/collect?ownedId=' + this.data.articleId;

    }
    console.info('=发起请求之前的=saveTag===' + this.data.saveTag)
    app.api._fetch({
      url: collectionUrl,
      method: 'post'
    }).then(function (res) {
      console.info('收藏成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        if (that.data.saveTag == '0') {
          that.setData({
            saveTag: 1
          })
        } else {
          that.setData({
            saveTag: 0

          })
        }
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });

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
        // var tempcount = that.data.likeCount;
        // if (that.data.likeCount > that.data.infodic.likeCount) {
        //   tempcount--;
        // } else {
        //   tempcount++;
        // }
        // that.setData({
        //   likeCount: tempcount
        // })
        that.getCommonList();
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });
  },
  /**点赞action */
  dzAction: function () {
    const that = this;
    app.api._fetch({
      url: '/community/article/like?ownedId=' + this.data.articleId,
      method: 'post'
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
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });
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
    app.api._fetch({
      url: '/community/comment/addv2?content=' + that.data.inputcontent + '&type=' + that.data.commenttag + '&ownedId=' + ((that.data.releaseName != null && that.data.releaseName != '') ? that.data.ownedId : that.data.articleId) + '&parentId=' + ((that.data.releaseName != null && that.data.releaseName != '') ? that.data.commentId : '0'),
      method: 'post'
    }).then(function (res) {
      console.info('评论成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {

        that.setData({
          inputcontent: '',
          releaseName: ''
        })
        that.getCommonList();

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

  /**文章的详情 */
  getArticle: function (articleId, tag) {
    const that = this;
    that.data.articleId = articleId;
    that.data.reqTag = tag;
    let reqUrl;
    if (that.data.commenttag==2) {//进阶开发的详情
      reqUrl = '/community/advArticle/view/' + articleId;
    } if (that.data.commenttag==0) {//文章详情
      reqUrl = '/community/article/view/' + articleId;
    } if (that.data.commenttag==1) {//问答详情
      reqUrl = '/community/question/xcxdetail/' + articleId;
    }
    console.info(reqUrl + 'reqsurl');
    // 文章详情
    app.api._fetch({

      url: reqUrl,

    }).then(function (res) {

      if (res.data.code == 1) {//文章不存在
        that.setData({
          nodata: 0,
          nodatamsg: res.data.msg
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        return;
      }
      console.info('article的返回' + JSON.stringify(res.data))
      // var temp = WxParse.wxParse('content', 'html', res.data.content, that, 5);
      that.setData({
        infodic: res.data,
        title: res.data.title,
        wxNickname: res.data.wxNickname,
        content: res.data.content,
        createTime: res.data.publishTime,
        content: res.data.content,
        likeCount: res.data.likeCount,
        headertags: (res.data.tags != null) ? res.data.tags.split(',') : []

      });
      console.info('header-tags=' + that.data.headertags);
      if (res.data.collect == false) {
        that.setData({
          saveTag: 0
        })
      } else {
        that.setData({
          saveTag: 1
        })
      }
      that.getCommonList();
    }).catch(function (error) {
      console.log(error);
    });
  },
  /**获得评论列表 */
  getCommonList: function () {
    const that = this;

    app.api._fetch({
      url: '/community/comment/treev2',
      data: {
        'id': that.data.articleId,
        'type': that.data.commenttag
      },
    }).then(function (res) {
      console.info('评论列表返回' + JSON.stringify(res))
      that.setData({
        commentList: res.data.rows,
      });
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
  onShow: function (options) {

    const that = this;
    that.getCommonList();

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