// pages/creditvc/exchangevc.js
var imageUtil = require('../../utils/util.js');

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail:{},
    content: '', 
    showDialog: false,
    address:'',
    orderprice:'',
    imgUrl:'',
    addressDic:{},
    commentList:[],
    categoryId:'',
    emailaddress:'',
    imagewidth: 0,//缩放后的宽
    imageheight: 0,//缩放后的高
    chose: false
  },
  /**积分悬赏输入的文字 */
  onChange(event) {
    const that = this;
    // event.detail 为当前输入的值
    console.log(event.detail);
    that.setData({
      emailaddress: event.detail
    })
    
  },


  /**获得评论列表 */
  getCommonList: function (goodsId) {
    const that = this;
    app.api._fetch({
      url: '/community/comment/treev2',
      data: {
        'id': goodsId,
        'type': 3
      },
    }).then(function (res) {
      console.info('评论列表返回' + JSON.stringify(res))
      that.setData({
        commentList: res.data.rows
      });
    }).catch(function (error) {
      console.log(error);
    });
  },

  readmore:function(){
    wx.navigateTo({
      url: '/pages/creditvc/moreinfo' + '?title=' + this.data.goodsDetail.title + '&more='+this.data.goodsDetail.more,

    })
  },
  buyRightNow: function (e) {
    let that = this;
    switch (e.currentTarget.dataset.index) {
      case '0':
        that.setData({
          showDialog: !this.data.showDialog
        });
        break;
      case '1':
        that.setData({
          showCenterDialog: !this.data.showCenterDialog
        });
        break;
    }
  },
  onClickdiaView: function () {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  /**获得用户的收货地址 */
  getUserAddress() {
    const that = this;
    wx.getSetting({
      success(res) {
        console.log("vres.authSetting['scope.address']：", res.authSetting['scope.address'])
        if (res.authSetting['scope.address']) {
          console.log("111")
          wx.chooseAddress({
            success(res) {
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
            that.setData({
              address:res.userName+res.provinceName+res.cityName+res.countyName+res.detailInfo+res.telNumber,
              addressDic:res
              
            })

            }
          })
          // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问

        } else {
          if (res.authSetting['scope.address'] == false) {
            console.log("222")
            wx.openSetting({
              success(res) {
                console.log(res.authSetting)

              }
            })
          } else {
            console.log("eee")
            wx.chooseAddress({
              success(res) {
                console.log(res.userName)
                console.log(res.postalCode)
                console.log(res.provinceName)
                console.log(res.cityName)
                console.log(res.countyName)
                console.log(res.detailInfo)
                console.log(res.nationalCode)
                console.log(res.telNumber)
                that.setData({
                  address: res.userName + res.provinceName + res.cityName + res.countyName + res.detailInfo + res.telNumber,
                  addressDic: res

                })
              }
            })
          }
        }
      }
    })
  },
  toAgree: function () {
    this.setData({
      chose: true
    })
  },
  toPayCredit: function () {
    const that = this;

    if (that.data.categoryId == 1 && (that.data.emailaddress == "" || that.data.emailaddress == null)) {
      wx.showToast({
        title: '请输入邮箱地址',
        icon: 'none'
      })
      return;
    }
    console.info('地址的字典=' + JSON.stringify(that.data.addressDic));
    if (that.data.categoryId != 1 && (that.data.addressDic == null || !that.data.addressDic.userName)) {
      wx.showToast({
        title: '请选择地址',
        icon: 'none'
      })
      return;
    }
    app.api._fetch({
      url: '/community/orders/submit',
      data: { 'acceptName': that.data.addressDic.userName, 'address': that.data.addressDic.detailInfo, 'area': that.data.addressDic.cityName, 'goodId': that.data.goodsDetail.goodId, 'mobile': that.data.addressDic.telNumber, 'postCode': that.data.addressDic.postalCode, 'email': that.data.emailaddress },
      method: 'post'
    }).then(function (res) {
      wx.showToast({
        title: `${res.data.msg}`,
        icon: 'none'
      })
      if (res.data.code == 0) {
        wx.navigateBack({

        })
      }
      console.log('/community/orders/submit')
      console.info(res)
    }).catch(function (error) {
      console.log(error);
    });
  },
  // toPayCredit:function(){
  //   if (!this.data.chose) {
  //     wx.showToast({
  //       title: '请勾选我已阅读Apollo的销售条款',
  //       icon: 'none'
  //     })
  //     return false;
  //   }
  //   const that = this;

  //   if(that.data.categoryId ==1&&(that.data.emailaddress ==""||that.data.emailaddress==null)){
  //     wx.showToast({
  //       title: '请输入邮箱地址',
  //       icon: 'none'
  //     })
  //     return;
  //   }
  //   console.info('地址的字典='+JSON.stringify(that.data.addressDic));
  //   if (that.data.categoryId != 1 &&(that.data.addressDic ==null||!that.data.addressDic.userName)){
  //     wx.showToast({
  //       title: '请选择地址',
  //       icon:'none'
  //     })
  //     return;
  //   }
  //   app.api._fetch({
  //     url: '/community/orders/submit',
  //     data: { 'acceptName': that.data.addressDic.userName, 'address': that.data.addressDic.detailInfo, 'area': that.data.addressDic.cityName, 'goodId': that.data.goodsDetail.goodId, 'mobile': that.data.addressDic.telNumber, 'postCode': that.data.addressDic.postalCode,'email':that.data.emailaddress},
  //     method: 'post'
  //   }).then(function (res) {
  //     wx.showToast({
  //       title: `${res.data.msg}`,
  //       icon: 'none'
  //     })
  //     if (res.data.code == 0) {
  //       wx.navigateBack({
          
  //       })
  //     } 
  //     console.log('/community/orders/submit')
  //     console.info(res)
  //   }).catch(function (error) {
  //     console.log(error);
  //   });
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    /**列表数据 */
    app.api._fetch({
      url: '/community/goods/view/'+options.goodsId,
      data: {},
    }).then(function (res) {
      console.info('商品详情返回' + JSON.stringify(res))
      that.setData({
        goodsDetail: res.data,
        content: res.data.content,
        orderprice: res.data.credit,
        imgUrl:res.data.imgUrl,
        categoryId: res.data.categoryId
      });
    }).catch(function (error) {
      console.log(error);
    });
    console.info('---ipx='+options.goodsId);
    that.getCommonList(options.goodsId);


  },
  imageLoad: function (e) {
    var imageSize = imageUtil.imageUtil(e)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
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