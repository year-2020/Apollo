// pages/articlevc/addcomm.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentContentLen: 0,    //内容的长度
    detailnoteMaxLen: 500,//详细的描述的字数限制
    content:'',
    ownedId:0,
    parentId:0,
    type:0
  },
  /**内容的输入 */
  inputContent(event) {
    var value = event.detail.value,
      len = parseInt(value.length);
    let that = this;
    this.setData({
      currentContentLen: len,
      content:value
    });
  },

/**发布评论 */
  postAction:function(){

const that = this;
    app.api._fetch({
      url: '/community/comment/addv2?content=' + that.data.content +'&type='+that.data.type + '&ownedId=' + that.data.ownedId + '&parentId=' + that.data.parentId,
      method: 'post'
    }).then(function (res) {
      console.info('评论成功返回的结果' + JSON.stringify(res));
      if (res.data.code == '0') {
        // var tempcount = that.data.likeCount;
        // if (that.data.likeCount > that.data.infodic.likeCount) {
        //   tempcount--;
        // } else {
        //   tempcount++;
        // }
        // that.setData({
        //   likeCount: tempcount
        // })
        wx.navigateBack({
          
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
    let that = this

    // let recieveitem = JSON.parse(options.item)
    // console.info('传过来的item'+ JSON.stringify(recieveitem))
that.setData({
  ownedId: options.ownedId,
  parentId: options.parentId,
  type: options.type

})
    console.info('传过来的ownedId=' + options.ownedId + 'parentId=' + options.parentId + 'type=' + options.type);
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