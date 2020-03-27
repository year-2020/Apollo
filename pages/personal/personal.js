// var t = getApp();
const app = getApp()

Page({
    data: {
      vip:1,
      fromMe:1,
      painting: {},
      shareImage: '',
      flag: true,
      imagePath: "/static/images/share.jpg",
      wxavatar:'',
      personalData:{},
      swiperCurrent: 0,
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 800,
      mycredits:'',
      todayCredits:''

  },
  showMask: function () {

    app.api._fetch({
      url: '/community/creditTask/checkin',
      method: 'post'
    }).then(function (res) {
        wx.showToast({
          title: `${res.data.msg}`,
          icon:'none'
        })
      if(res.data.code ==500){
      }else{
        this.setData({ flag: false })
      }
      console.log('/community/creditTask/checkin')
      console.info(res)
    }).catch(function (error) {
      console.log(error);
    });

  },
  closeMask: function () {
    this.setData({ flag: true })
  },
  /**跳去个人主页 */
  itemClick: function (e) {
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.type)
    if (e.currentTarget.dataset.type == 0) {
      //从我的关注跳去的不需要加号
      wx.navigateTo({
        url: '/pages/personalPackage/personhomec' + '?userId=' + e.currentTarget.dataset.id + '&tag=1',
      })
    } else {

      wx.navigateTo({
        url: '/pages/personalPackage/personhome' + '?userId=' + e.currentTarget.dataset.id + '&tag=1',
      })
    }
  },
  
  /** 去个人资料页面 */
  jumpInfovc:function(){
    // 把要传递的json对象转换成字符串
    var userInfo = JSON.stringify(this.data.personalData);
   
    // wx.navigateTo({
    //   url: '/pages/personal/businesscard',
    // })
    wx.navigateTo({
      url: '/pages/personalPackage/mybusinesscard?userData='+userInfo,
    })
    // wx.navigateTo({
    //   url: '/pages/personalPackage/complateInfo',
    // })
    
  },
  jump_myfollowers:function(){
    wx.navigateTo({
      url: '/pages/personalPackage/myfollowers',
    })
  },
  jumptomycredit:function(){
    wx.switchTab({
      url: '/pages/creditvc/creditvc',
    })
  },
  /**跳去商城 */
  jumptostore:function(){
    wx.navigateTo({
      url: '/pages/index/creditstore',
    })
  },
  jumpCooper: function () {
    wx.navigateTo({
      url: '/pages/personal/cooper',
    })
  },
  mypublishAction:function(){
    wx.navigateTo({
      url: '/pages/personalPackage/mypublish',
    })
  },
  /**点击关注喜欢的view */
  likeAction:function(){

  },
  /**
* 生命周期函数--监听页面初次渲染完成
*/
  onReady: function () {
  
 
  },
  //轮播图的切换事件
  swiperChange: function (e) {
    if (e.detail.source == 'touch') {
      this.setData({
        swiperCurrent: e.detail.current
      })
    }
    
  },

  onLoad:function(){
    
  },

  onShow:function(){
    const that = this;

    var preLogin = wx.getStorageSync("loginres")
    that.setData({
      wxavatar: preLogin.wxAvatar,
      mycredits: getApp().globalData.credits
    })
    console.info('我的页面的个人信息' + JSON.stringify(preLogin))

    /**个人user数据 */
    app.api._fetch({
      url: '/user/me',

    }).then(function (res) {
      console.info('user/me 返回' + JSON.stringify(res))
      that.setData({
        personalData: res.data,
        todayCredits: res.data.todayCredits,
        mycredits: res.data.credits

      });
      getApp().globalData.userMe = res.data;
    }).catch(function (error) {
      console.log(error);
    });
  },
  /**去个人主页 */
  jumpToPer: function (e) {
    wx.navigateTo({
      url: '/pages/personalPackage/personhome' + '?userId=' + e.currentTarget.dataset.id,
    })
  },

  /**我的收藏 */
  jump_mycollection:function(){

    wx.navigateTo({
      url: '/pages/personalPackage/mycollectionvc',
    })
  },
  jump_myfocus: function () {

    wx.navigateTo({
      url: '/pages/personalPackage/myfocus',
    })
  },
  jump_myliked: function () {

    wx.navigateTo({
      url: '/pages/personalPackage/myliked',
    })
  },

  /**完善名片 */
  completecard:function(){

    // wx.navigateTo({
    //   url: '/pages/personal/businesscard',
    // })
    // wx.navigateTo({
    //   url: '/pages/personal/mybusinesscard',
    // })
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },
  /**
   * 打卡签到分享到朋友圈
   */
  dkAction:function(){
    // wx.showToast({
    //   title: '打卡',
    //   icon:'none'
    // })
      

  },
  
})