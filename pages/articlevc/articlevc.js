// pages/articlevc/articlevc.js
const app = getApp()
var WxParse = require('../../wxparse/wxparse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {

    articleId:'',
    infodic:{},
    title:'',
    summary:'',
    createTime:'',
    content:'',
    saveTag:0,
    gz_status:0,
    likeCount:0,
    showComm:false,
    commentList:[],
    icon: '/static/images/apollo_ico.png',
    photoWidth: wx.getSystemInfoSync().windowWidth / 5,

    popTop: 0, //弹出点赞评论框的位置
    popWidth: 0, //弹出框宽度
    isShow: true, //判断是否显示弹出框
    commenttag: 0, //0：文章评论 1：问答评论 2:视频评论
    reqTag:0,
    headertags:[],
    releaseFocus: false,
    releaseName:'',
    inputcontent:'',
    commentId:'',
    ownedId:'',
    nodata:!0,
    nodatamsg:'',
    articletype:0,
  },
  /**跳去个人主页 */
  jumptop:function(e){
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

  /**
   * 生命周期函数--监听页面加载
   * tag=2为进阶开发
   */
  onLoad: function (options) {
    console.info('tag ====='+options.tag);
    this.setData({
      commenttag:options.tag,
      articletype: options.articletype,
      articleId: options.articleId
    })
    this.getArticle(options.articleId,options.tag);
  },
  /**添加关注 */
  addfocus:function(){
    const that = this;
    app.api._fetch({
      url: '/user/follow?id=' + (this.data.infodic.authorId != null ? this.data.infodic.authorId : this.data.infodic.questionerId),
      method: 'post'
    }).then(function (res) {
      console.info('关注成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        that.getArticle(that.data.articleId,that.data.reqTag)
        } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        }
      
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });

  },
  /**收藏action */
  sc_action:function(){

    const that = this;
    var collectionUrl = '';
    console.info('收藏action的tag = '+that.data.commenttag);
    if (that.data.reqTag==5){
      collectionUrl = '/community/question/collect?ownedId='+that.data.articleId;
    } if (that.data.reqTag == 2 || that.data.reqTag == 4) {
      collectionUrl = '/community/advArticle/collect?ownedId=' + that.data.articleId;
    }
    if (that.data.reqTag == 1){
      collectionUrl = '/community/article/collect?ownedId=' + this.data.articleId;

    }
    console.info('=发起请求之前的=saveTag===' + this.data.saveTag)
    app.api._fetch({
      url: collectionUrl,
      method: 'post'
    }).then(function (res) {
     console.info('收藏成功返回的结果'+JSON.stringify(res));
     if(res.data.code == '0'){
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
  cellDzAction:function(e){
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
        that.getCommonList();
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });
  },
  /**点赞action */
  dzAction:function(){
    const that = this;
    app.api._fetch({
      url: '/community/article/like?ownedId=' + this.data.articleId,
      method: 'post'
    }).then(function (res) {
      console.info('点赞成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        var tempcount =  that.data.likeCount;
        if (that.data.likeCount > that.data.infodic.likeCount){
          tempcount--;
        }else{
          tempcount++;
        }
          that.setData({
            likeCount:tempcount
          })
      }
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });
  },

/**评论框的内容 */
  inputchange: function (event){
      console.info(event.detail.value);
      this.setData({
        inputcontent:event.detail.value
      })
      if(this.data.inputcontent ==''){
        console.info('不回复某个人了');
        this.setData({
          releaseName:''
        })
      }
  },

  /**评论action */
  plAction:function(e){
    const that = this;
    if (that.data.releaseName != null&&that.data.releaseName !=''){
        console.info('回复某个人'+that.data.ownedId);
      }else{
      console.info('回复文章');

      }
    if (that.data.inputcontent == null || that.data.inputcontent==''){
        wx.showToast({
          title: '请输入评论内容',
          icon:'none'
        })
        return;
      }
    app.api._fetch({
      url: '/community/comment/addv2?content=' + that.data.inputcontent + '&type=' + (that.data.commenttag == 2 ? 4 : that.data.commenttag) + '&ownedId=' + ((that.data.releaseName != null && that.data.releaseName != '') ? that.data.ownedId : that.data.articleId) + '&parentId=' + ((that.data.releaseName != null && that.data.releaseName != '') ? that.data.commentId : '0'),
      method: 'post'
    }).then(function (res) {
      console.info('评论成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {

        that.setData({
          inputcontent:'',
          releaseName:''
        })
        that.getCommonList();

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
      ownedId:item.ownedId,
      commentId: item.commentId,
      releaseFocus: true

    })

  },

/**文章的详情 */
  getArticle: function (articleId,tag){
  const that = this;
  that.data.articleId = articleId;
  that.data.reqTag = tag;
    let reqUrl; 
    if(tag ==2||tag ==4){//进阶开发的详情
      reqUrl = '/community/advArticle/view/' + articleId;
    }if(tag ==1){//文章详情
      reqUrl = '/community/article/view/' + articleId;
    } if (tag == 5) {//问答详情
      reqUrl = '/community/question/xcxdetail/' + articleId;
    }
    console.info(reqUrl+'reqsurl');
  // 文章详情
  app.api._fetch({
   
    url: reqUrl,

  }).then(function (res) {

    if(res.data.code==-2||res.data.code==1){//文章不存在
    that.setData({
      nodata:0,
      nodatamsg:res.data.msg
    })
      wx.showToast({
        title: res.data.msg,
        icon:'none'
      })
      return;
    }
    console.info('article的返回' + JSON.stringify(res.data))
    // var temp = WxParse.wxParse('content', 'html', res.data.content, that, 5);
    that.setData({
      infodic: res.data,
      title: res.data.title,
      summary: res.data.wxNickname,
      content: res.data.content,
      createTime: res.data.publishTime,
      content: res.data.content,
      likeCount: res.data.likeCount,
      headertags: (res.data.tags != null) ? res.data.tags.split(','):[]

    });
    console.info('header-tags='+that.data.headertags);
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
  getCommonList:function(){
    const that = this;
  
    app.api._fetch({
      url: '/community/comment/treev2',
      data: {
        'id':that.data.articleId,
        'type': (that.data.commenttag == 2 ? 4 : that.data.commenttag)
      },
    }).then(function (res) {
      console.info('评论列表返回' + JSON.stringify(res))
      that.setData({
          commentList:res.data.rows,
      });
    }).catch(function (error) {
      console.log(error);
    });
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
    const that = this;
    return {


      desc: 'Apollo开发者社区',

      // path: '/pages/articlevc/articlevc' // 路径，传递参数到指定页面。
      path: '/pages/articlevc/articlevc'+'?articleId=' + that.data.articleId + '&tag=' + that.data.commenttag
      // imageUrl: 'http://img2.imgtn.bdimg.com/it/u=234634259,4236876085&fm=26&gp=0.jpg'

    }
  }
})