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
    city:'',
    asummary:'',
    atitle:'',
    address:'',
    email:'',
    wxNickname:'',
    phonenumber:''


  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认1
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        });
        console.log('照片数组!!!' + that.data.images.length)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths;
        //启动上传等待中...  
        wx.showToast({
          title: '正在上传...',
          icon: 'loading',
          mask: true,
          duration: 10000
        })
        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: 'http://www.shengdh123.com/apollo/community/upload/questionFile',
            filePath: tempFilePaths[i],
            name: 'questionFile',
            header: {
              "content-type": "multipart/form-data",
              'Cookie': ('JSESSIONID=' + getApp().globalData.sessionId + ';' + cookies.get('rememberMe', ''))
            },
            success: function (res) {
              uploadImgCount++;
              var data = JSON.parse(res.data);
              console.info('上传返回的结果' + JSON.stringify(data));
              that.setData({
                imgUrls: that.data.imgUrls.concat(data.msg),
                avatar:data.msg
              });
              console.info('上传成功的urls = ' + that.data.imgUrls.length);

              //如果是最后一张,则隐藏等待中  
              if (uploadImgCount == tempFilePaths.length) {
                wx.hideToast();
              }
            },
            fail: function (res) {
              wx.hideToast();
              wx.showModal({
                title: '错误提示',
                content: '上传图片失败',
                showCancel: false,
                success: function (res) { }
              })
            }
          });
        }

      }

    })
  },

saveinfo:function(){
  const that = this;

  app.api._fetch({
    url: '/user/edit',
    data: { "address": that.data.address, 'email': that.data.email, 'wxNickname': that.data.wxNickname, 'phonenumber': that.data.phonenumber, 'sex': that.data.sex, 'city': that.data.city, 'asummary': that.data.asummary, 'atitle': that.data.atitle, 'avatar': that.data.avatar},
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

    if (e.currentTarget.dataset.id == 0) {//昵称
      that.setData({
        wxNickname: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 1) {//邮箱
      that.setData({
        email: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 2) {//地区
      that.setData({
        city: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 3) {//所在公司
      that.setData({
        asummary: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 4) {//名片展示身份
      that.setData({
        atitle: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 5) {//详细地址
      that.setData({
        address: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 6) {//手机号
      that.setData({
        phonenumber: e.detail.value
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    that.setData({
      myInfoData: getApp().globalData.userMe
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