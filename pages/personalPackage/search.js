// pages/personalPackage/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchPageNum: 1,   // 设置加载的第几次，默认是第一次  
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false,  //“没有数据”的变量，默认false，隐藏  
    value: '',
    inputValue:null,
    tags:[],
    showTags:true,
    articleList:[],
    searchTag:0,
    fromfindvc:'',
    edata :{},
    index:0
  },
  /**首页列表item被怼了 */
  itemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=' + e.currentTarget.dataset.type,
    })
  },
  bindKeyInput: function (e) {
    const that = this;

    this.setData({
      value: e.detail.value
    })
    console.info('输入的' + that.data.value);
  if(that.data.value ==''){
    that.setData({
      searchPageNum: 1, //当前页的一些初始数据，视业务需求而定
      articleList: []
    });
  }
  },

  onChange(e) {
    this.setData({
      value: e.detail,
      searchPageNum: 1, //当前页的一些初始数据，视业务需求而定
      articleList: []
    });
  },

  onSearch(event) {
    const that = this;

    console.info('输入的' + that.data.value);
    if (that.data.value) {
      // wx.showToast({
      //   title: '搜索：' + that.data.value,
      //   icon: 'none'
      // });
      var requrl = (that.data.fromfindvc !=1) ? '/community/article/xcxlist' :'/community/question/xcxlist';
      /**列表数据 */
      app.api._fetch({
        url: requrl,
        data: {
          'tag': '',
          'keyword': that.data.value,
          pageSize: '10',
          pageNum: that.data.searchPageNum
        },
      }).then(function (res) {
        console.info('列表返回' + JSON.stringify(res))

        if (res.data.rows.length == 0) {
          if (that.data.fromfindvc ==1){
            console.info('从发现问答广场页面来')

              that.setData({
                articleList: res.data.rows,
                searchLoading: false   //把"上拉加载"的变量设为false，显示  
              })
          }else{
            that.setData({
              articleList: res.data.rows,
              searchLoading: false   //把"上拉加载"的变量设为false，显示  

            });
          }
          
        } else {
          that.setData({
            articleList: that.data.articleList.concat(res.data.rows),
            searchLoading: true   //把"上拉加载"的变量设为false，显示  

          });
        }
      }).catch(function (error) {
        console.log(error);
      });
    }
  },
  
  /**点击tag 
   *  1.要跳转
   *  2.要带值去搜索结果页面
  */
  selectTags:function(e){
console.info(e);

    const that = this;
    var requrl = (that.data.fromfindvc != 1) ? '/community/article/xcxlist' : '/community/question/xcxlist';

    that.setData({
      searchTag:e.currentTarget.dataset.id,
      value:'',
      inputValue:'',
      edata:e
    })
    /**列表数据 */
    app.api._fetch({
      url: requrl,
      data: {
        'tag': e.currentTarget.dataset.id,
              'title':'',
        pageSize: '10',
        pageNum: that.data.searchPageNum
      },
    }).then(function (res) {
      console.info('列表返回' + JSON.stringify(res))
      
      if (res.data.rows.length == 0) {
        if (that.data.fromfindvc == 1) {
          console.info('从发现问答广场页面来')

          that.setData({
            articleList: res.data.rows,
            searchLoading: false   //把"上拉加载"的变量设为false，显示  
          })
        } else {
          that.setData({
            articleList: res.data.rows,
            searchLoading: false   //把"上拉加载"的变量设为false，显示  

          });
        }

      } else {
        that.setData({
          articleList: that.data.articleList.concat(res.data.rows),
          searchLoading: true   //把"上拉加载"的变量设为false，显示  

        });
      }
    }).catch(function (error) {
      console.log(error);
    });



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.fromfindvc)
    const that = this;
    that.setData({
      tags: getApp().globalData.tags,
      fromfindvc:options.fromfindvc,
      index:options.index

    })
    if(options.fromfindvc==1){
        that.setData({
        })
    }
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
  //滚动到底部触发事件  
  searchScrollLower: function () {
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      that.selectTags(that.data.edata);
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // var that = this;
    // that.setData({
    //   searchPageNum: 1, //当前页的一些初始数据，视业务需求而定
    //   articleList: []
    // })
    // this.onSearch(); //重新加载onLoad()
    // that.selectTags(that.data.edata);

    // wx.stopPullDownRefresh();

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info('onreach--');
    let that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        searchPageNum: that.data.searchPageNum + 1,  //每次触发上拉事件，把searchPageNum+1  
        // isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      if(that.data.value !=""){
        that.onSearch();

      }else{
        that.selectTags(that.data.edata);

      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})