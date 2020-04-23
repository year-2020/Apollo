// pages/personalPackage/complateInfo.js

const app = getApp();
import cookies from '../../vendor/weapp-cookie/dist/weapp-cookie'
const { $Toast } = require('../../dist/base/index');

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
  // console.error(this.data)
  // console.error(that.data.address)
  // console.error(that.data.wxNickname)
  // console.error(that.data.asummary)
  if (!that.data.address || !that.data.wxNickname || !that.data.asummary){
    $Toast({
      content: '请输入必填项',
      icon: 'close',
      duration: 1
    });
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
      });
      /**个人user数据 */
      app.api._fetch({
        url: '/user/me',

      }).then(function (res) {
        console.info('user/me 返回' + JSON.stringify(res))
        getApp().globalData.userMe = res.data;
        wx.navigateBack({

        })
      }).catch(function (error) {
        console.log(error);
      });

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
      myInfoData: app.globalData.userMe,
      address: app.globalData.userMe.address,
      asummary: app.globalData.userMe.asummary,
      atitle: app.globalData.userMe.atitle,
      email: app.globalData.userMe.email,
      wxNickname: app.globalData.userMe.userName,
      phonenumber: app.globalData.userMe.phonenumber,
      wx: app.globalData.userMe.wx
    });
    console.error(app.globalData.userMe)
    // console.error(that.data.myInfoData.wxNickname)
    // console.error(that.data.myInfoData.asummary)
    // console.error(that.data.address)
    // console.error(that.data.wxNickname)
    // console.error(that.data.asummary)
    /**个人user数据 */
    // app.api._fetch({
    //   url: '/user/me',

    // }).then(function (res) {
    //   console.info('user/me 返回')
    //   console.info(res.data)
    //   that.setData({
    //     myInfoData: res.data,
    //     address: res.data.wxCity,
    //     asummary: res.data.asummary,
    //     atitle: res.data.atitle,
    //     email: res.data.email,
    //     wxNickname: res.data.wxNickname,
    //     phonenumber: res.data.phonenumber
    //   });
    //   // getApp().globalData.userMe = res.data;
    // }).catch(function (error) {
    //   console.log(error);
    // });
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