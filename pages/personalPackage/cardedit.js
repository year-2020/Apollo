// pages/personalPackage/complateInfo.js

const app = getApp();
import cookies from '../../vendor/weapp-cookie/dist/weapp-cookie'

Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    images: [],
    imgUrls: [],
    nativeData: ['昵称', '性别', '邮箱', '地区', '所在公司', '名片展示身份', '详细地址', '手机号', '支付密码', '登录密码'],
    myInfoData:{},
    avatar:'',
    sex:'',
    asummary:'',
    atitle:'',
    address:'',
    email:'',
    wxNickname:'',
    phonenumber:'',
    wx:''


  },
 
saveinfo:function(){
  const that = this;

  if (that.data.address == null || that.data.wxNickname == null || that.data.asummary==null){
    wx.showToast({
      title: '请输入必填项',
      icon:''
    })
    return;
  }
  app.api._fetch({
    url: '/user/edit',
    data: { "address": that.data.address, 'email': that.data.email, 'userName': that.data.wxNickname, 'phonenumber': that.data.phonenumber, 'sex': that.data.sex, 'asummary': that.data.asummary, 'atitle': that.data.atitle, 'tel': '11000','wx':that.data.wx},
    method: 'post'
  }).then(function (res) {
    console.log('/user/edit')
    console.info(res)
    if (res.data.code == 0) {
      wx.showToast({
        title: '修改成功!!!',
      })
      wx.navigateBack({

      })
    }if(res.data.code == 500){//有敏感词

        wx.showToast({
          title: res.data.msg,
          icon:'none'
        })
    }
  }).catch(function (error) {
    console.log(error);
  });

},
  /**输入框的点击事件 */
  bindKeyInput: function (e) {
    const that = this;
    console.info(e);
    console.info(e.detail.value);

    if (e.currentTarget.dataset.id == 0) {//姓名
      that.setData({
        wxNickname: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 1) {//公司
      that.setData({
        asummary: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 2) {//职位
      that.setData({
        atitle: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 3) {//地区
      that.setData({
        address: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 4) {//手机
      that.setData({
        phonenumber: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 5) {//微信
      that.setData({
        wx: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 6) {//邮箱
      that.setData({
        email: e.detail.value
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
   
    that.setData({
      myInfoData: getApp().globalData.userMe,
      address: getApp().globalData.userMe.wxCity,
      asummary: getApp().globalData.userMe.asummary,
      atitle: getApp().globalData.userMe.atitle,
      email: getApp().globalData.userMe.email,
      wxNickname: getApp().globalData.userMe.wxNickname,
      phonenumber: getApp().globalData.userMe.phonenumber
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
   
    return {

      desc: '您收到一张名片',
     

    }

  }
})