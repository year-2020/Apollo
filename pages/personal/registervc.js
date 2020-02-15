// pages/personal/registervc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Hs: 1,/**注册页面的创建账号显示不显示 */
    current: 0,
    checked: false,
    disabled: false,
    isAgree: false,
    radio1: '0',
    customType:['注册成为普通用户','注册并升级为会员'],
    actionBt_title:'下一步,选择注册类型'

  },
  customTypeChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },

  onClick(event) {
    const { value } = event.currentTarget.dataset;
    this.setData({
      radio3: value
    });
  },
  checkboxChange(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ [key]: event.detail });
  },

  nextClick() {

    if (this.data.current >=2){
      this.data.current =2;
    }else{
      this.data.current = this.data.current+1;
    }
    // const addCurrent = this.data.current + 1;
    // const current = addCurrent > 2 ? 0 : addCurrent;
    const cust = this.data.current == 1 ? '下一步,选择注册成功' : (this.data.current = 1 ? '马上登录' :'下一步,选择注册类型');
 
/* 只有在创建账号的页面信息填写完成的时候点击下一步才能跳转到注册类型的页面
       所以这里是有判断的
*/
    this.setData({
      'current': this.data.current,
      'actionBt_title':cust,
      Hs:!1
    })
  },
  // 阅读并同意条款的事件
   bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  // 普通用户的 checkbox
  bindcommonChange: function (e) {
    this.setData({
      iscommon: !!e.detail.value.length
    });
  },
  // vip 用户的 checkbox
  bindVipChange: function (e) {
    this.setData({
      isVip: !!e.detail.value.length
    });
  },
  // userNameChange(e){
  // console.log(e);
  // },
  userNameChange:function(e){
  console.log(e.detail.detail.value);
  wx.showToast({
    title: `输入的为${e.detail.detail.value}`,
    icon:'none'
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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