// pages/personalPackage/mypublish.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    publishList:[],
    frompublishctvc:1,
    categorylist: ['全部', '社区问答', '技术文章', '案例分析', '视频课程'], //排序列表内容
    desdata:['最新发布在前','最新发布在后'],//排序
    //排序列表内容
    qyshow: true, //用户点击闭关区域的弹窗设置，默认不显示
    pxopen: false, //排序筛选弹窗
    nzopen: false, //价格筛选弹窗
    nzshow: true,
    pxshow: true,
    isfull: false,

    shownavindex: '',

    pxIndex: 0, //第一个排序内容下拉框，默认第一个
    descIndex:0,//第二个排序的tab下拉框,默认第一个
    nodata: !0,
    nodatamsg: ''

  },
  // 价格下拉框是否隐藏
  list: function (e) {
    if (this.data.nzopen) {
      this.setData({
        nzopen: false,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0
      })
    } else {
      this.setData({
        content: this.data.nv,
        nzopen: true,
        pxopen: false,
        qyopen: false,
        nzshow: false,
        pxshow: true,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
  },
  
  // 排序下拉框是否隐藏
  listpx: function (e) {
    if (this.data.pxopen) {
      this.setData({
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0,
      })
    } else {
      this.setData({
        content: this.data.categorylist,
        pxopen: true,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },
// 排序下拉框是否隐藏
  listdesc: function (e) {
    if (this.data.pxopen) {
      this.setData({
        pxopen: false,
        nzshow: true,
        pxshow: true,
        qyshow: true,
        isfull: false,
        shownavindex: 0,
      })
    } else {
      this.setData({
        content: this.data.desdata,
        pxopen: true,
        nzshow: true,
        pxshow: false,
        qyshow: true,
        isfull: true,
        shownavindex: e.currentTarget.dataset.nav
      })
    }
    console.log(e.target)
  },

  // 点击灰色背景隐藏所有的筛选内容
  hidebg: function (e) {
    this.setData({
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
    })
  },

  // 排序内容下拉框筛选
  selectPX: function (e) {
    console.log('排序内容下拉框筛选的内容是' + e.currentTarget.dataset.index);
    this.setData({
      pxIndex: e.currentTarget.dataset.index,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
    });
    console.log('当前' + this.data.pxIndex);
  },
  // 排序内容下拉框筛选
  selectedesc: function (e) {
    console.log('排序内容下拉框筛选的内容是' + e.currentTarget.dataset.index);
    this.setData({
      pxIndex: e.currentTarget.dataset.index,
      pxopen: false,
      nzshow: true,
      pxshow: true,
      qyshow: true,
      isfull: false,
      shownavindex: 0,
    });
    console.log('当前' + this.data.pxIndex);
  },

  /**首页列表item被怼了 */
  itemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/articlevc/articlevc' + '?articleId=' + e.currentTarget.dataset.id + '&tag=' + e.currentTarget.dataset.type + '&articletype=' + e.currentTarget.dataset.type,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    /**广告轮播 */
    app.api._fetch({
      url: '/user/mypublish',
      data: { 'name': '' },
    }).then(function (res) {
      console.info('我的发布返回' + JSON.stringify(res.data.rows))
      that.setData({
        publishList: res.data.rows,
      });
if(res.data.rows.length == 0){
  that.setData({
    nodata: 0,
    nodatamsg: '暂无数据'
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