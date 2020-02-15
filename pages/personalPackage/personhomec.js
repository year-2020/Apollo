// pages/personalPackage/personhome.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
      personData:{},
      rows:[],
      tags:[],
      userId:'',
  },
/**添加关注 */
  addfocus:function(){

    const that = this;
    app.api._fetch({
      url: '/user/follow?id=' + that.data.userId,
      method: 'post'
    }).then(function (res) {
      that.personalata(that.data.userId);

      console.info('关注成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
    
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info('userId =====' + options.userId);
    const that = this;
    that.setData({
      userId:options.userId
    })
    
    that.personalata(that.data.userId);
  },

  personalata:function(userId){
    const that = this;

    /**persondata的数据 */
    app.api._fetch({
      url: '/user/' + userId,
      data: {
      },
    }).then(function (res) {
      var dateList = res.data.data.tags.split(",");
      var tags_arr = []
      for (var i in dateList) {
        tags_arr = tags_arr.concat(dateList[i]);
      }
      console.log('分割后的数组' + tags_arr)

      that.setData({
        personData: res.data.data,
        tags: tags_arr
      });
      console.info('/user/userid' + JSON.stringify(that.data.personData))

    }).catch(function (error) {
      console.log(error);
    });

    app.api._fetch({
      url: '/user/' + userId + '/publish',
      data: {
      },
    }).then(function (res) {
      console.info('/user/userid/publish' + JSON.stringify(res))
      that.setData({
        rows: res.data.rows
      });
    }).catch(function (error) {
      console.log(error);
    });

  },
  itemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
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