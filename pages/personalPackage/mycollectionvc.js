// pages/personal/mycollectionvc.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    rows:[],
    fromCollectvc:1,
    nodata: !0,
    nodatamsg: '',
    tag:0
  },

  questionAction:function(){
console.info('queeeee');
this.data.tag = 1;
    this.conllectionList(1);
  },
  articleAction:function(){
    console.info('aaaa');
    this.data.tag = 0;
    this.conllectionList(0);

  },
  holderAction:function(){
    const that = this;

    console.info('holderAction');

    that.setData({
      rows: [],
      nodata: 0,
      nodatamsg: '暂无数据'
    });  
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

const that = this;
    /**收藏列表的数据 */
    app.api._fetch({
      url: '/user/mycollect',
    }).then(function (res) {
      console.info('user/mycollect 返回' + JSON.stringify(res))
      that.setData({
        rows: res.data.rows
      });
      if (res.data.rows.length == 0) {//文章不存在
        that.setData({
          nodata: 0,
          nodatamsg: '暂无数据'
        })

      }

    }).catch(function (error) {
      console.log(error);
    });

  },

conllectionList:function(type){
    const that = this;
    /**收藏列表的数据 */
    app.api._fetch({
      url: '/user/mycollect',
      data:{
          type:type
      }
    }).then(function (res) {
      console.info('user/mycollect 返回' + JSON.stringify(res))
      that.setData({
        rows: res.data.rows
      });
      if (res.data.rows.length == 0) {//文章不存在
        that.setData({
          nodata: 0,
          nodatamsg: '暂无数据'
        })

      }

    }).catch(function (error) {
      console.log(error);
    });

  },
  /**收藏的列表item被怼了 */
  itemClick: function (e) {
    const that = this;
    console.log('收藏过来的'+e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=' + e.currentTarget.dataset.type,
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