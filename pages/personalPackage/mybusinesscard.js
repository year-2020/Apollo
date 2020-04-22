// pages/personal/mybusinesscard.js

const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    mycardData: {},
    focus: false,
    address: '',
    email: '',
    nickName: '',
    tags: [],
    cards: [
      // {
      //   address: "Daxing22",
      //   asummary: "Apollo小哥哥32",
      //   atitle: "运营",
      //   banner: null,
      //   credits: 24,
      //   email: "",
      //   follow: false,
      //   followCount: 0,
      //   followerCount: 99,
      //   phonenumber: "",
      //   quesCount: 1,
      //   sex: "1",
      //   tags: "规划大神,社区之星",
      //   todayCredits: 0,
      //   userBtype: "0",
      //   userName: "邓教授23",
      //   wx: "",
      //   wxAvatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqZjyvm2y2AMFdZDUj9QX73WlDLC2bCQ6RywJictB2UNthUNpLZvfRYZQubvicwib0lxvyXpd5RJ4hA/132",
      //   wxCity: "Daxing",
      //   wxNickname: "邓教授"
      // },
      // {
      //   address: "Daxing22",
      //   asummary: "Apollo小哥哥32",
      //   atitle: "运营",
      //   banner: null,
      //   credits: 24,
      //   email: "",
      //   follow: false,
      //   followCount: 0,
      //   followerCount: 99,
      //   phonenumber: "",
      //   quesCount: 1,
      //   sex: "1",
      //   tags: "规划大神,社区之星",
      //   todayCredits: 0,
      //   userBtype: "0",
      //   userName: "邓教授23",
      //   wx: "",
      //   wxAvatar: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIqZjyvm2y2AMFdZDUj9QX73WlDLC2bCQ6RywJictB2UNthUNpLZvfRYZQubvicwib0lxvyXpd5RJ4hA/132",
      //   wxCity: "Daxing",
      //   wxNickname: "邓教授"
      // }
    ]
  },
/**跳去生成名片 */
  jump_createcard:function(){
wx.navigateTo({
  url: '/pages/personalPackage/cardedit',
})
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 最多可以选择的图片张数，默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '加载中...'

        })
        var tempFilePaths = res.tempFilePaths;

        var uploadImgCount = 0;
        for (var i = 0, h = tempFilePaths.length; i < h; i++) {
          wx.uploadFile({
            url: app.api.baseURL + '/community/card/ocr',
            filePath: tempFilePaths[i],
            name: 'file',
            header: {
              "content-type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
              console.info('rrrrr' + JSON.stringify(res))
              if (JSON.parse(res.data).code != '0'){
                wx.showToast({
                  title: '识别失败!',
                  icon:'none'
                })

                return;
              }else{
                wx.showLoading({
                  title: '加载中...'

                })
                uploadImgCount++;
                var datas = JSON.parse(res.data);
                var data = datas.data;
                console.info('上传返回的结果' + JSON.stringify(data.data));

                app.api._fetch({
                  url: '/community/card/save',
                  data: {
                    "address": data.address, 'email': data.email, 'userName': data.userName, 'phonenumber': data.phonenumber, 'sex': data.sex, 'asummary': data.asummary, 'atitle': data.atitle, 'wx': data.wx
                  },
                  method: 'post'
                }).then(function (res) {
                  wx.showToast({
                    title: '保存成功!',
                    icon: 'none'
                  })
                  console.log('/community/card/save')
                  console.info(res)
                  that.loadCardList();
                  wx.hideToast();


                }).catch(function (error) {
                  console.log(error);
                  wx.hideToast();

                });


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
//-----for---end----
      }

    })
  },

  /**直接请求进行修改,我日 */
  jumpToEdit: function () {
    const that = this;
    app.api._fetch({
      url: '/user/edit',
      data: { "address": that.data.address, 'email': that.data.email, 'name': that.data.nickName, 'phone': that.data.phone },
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
  /**编辑卡片的事件 */
  editCard: function () {
    // this.setData({
    //   focus: true
    // })
    wx.navigateTo({
      url: '/pages/personalPackage/cardedit',
    })
  },

  /**输入框的点击事件 */
  bindKeyInput: function (e) {
    const that = this;
    console.info(e);
    console.info(e.detail.value);

    if (e.currentTarget.dataset.id == 0) {//电话号码
      that.setData({
        phone: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 1) {//地点
      that.setData({
        address: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 2) {//邮箱
      that.setData({
        email: e.detail.value
      })
    } if (e.currentTarget.dataset.id == 3) {//昵称
      that.setData({
        nickName: e.detail.value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    if (options.sharecome == 'Y'){

    that.savefukercard(options);
    }
    console.info('cardinfo =====' + options);

   
    wx.showShareMenu({
      withShareTicket: true
    }),
      app.api._fetch({
        url: '/community/card/list',
        method: 'get'
      }).then(function (res) {
        that.setData({
          cards: res.data.rows
        })
        console.info(res)
      }).catch(function (error) {
        console.log(error);
      });

  },

loadCardList:function(){
  wx.showLoading({
    title: '加载中...'

  })
  const that = this;
  app.api._fetch({
    url: '/community/card/list',
    method: 'get'
  }).then(function (res) {
    that.setData({
      cards: res.data.rows
    })
    console.info(res)
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
    const that = this;

    /**个人user数据 */
    app.api._fetch({
      url: '/user/me',
    }).then(function (res) {
      console.info('user/me 返回' + JSON.stringify(res))

      getApp().globalData.userMe = res.data;

      console.log('传过来的个人数据' + getApp().globalData.userMe);
      var dateList = getApp().globalData.userMe.tags.split(",");
      var tags_arr = []
      for (var i in dateList) {
        tags_arr = tags_arr.concat(dateList[i]);
      }
      console.log('分割后的数组' + tags_arr)

      that.setData({
        mycardData: getApp().globalData.userMe,
        tags: tags_arr
      })

    }).catch(function (error) {
      console.log(error);
    });
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

  /**保存别人的名片 */
  savefukercard: function (options) {

    if (options.address == '' && options.email == '' && options.phonenumber == '' && options.atitle == ''){
      return;

}
    app.api._fetch({
      url: '/community/card/save',
      data: {
        "address": options.address, 'email': options.email, 'userName': options.wxNickname, 'phonenumber': options.phonenumber, 'sex': options.sex, 'asummary': options.asummary, 'atitle': options.atitle, 'wx': options.wx, 'fromId': options.userId
      },
      method: 'post'
    }).then(function (res) {
      console.log('/community/card/save')
      console.info(res)

    }).catch(function (error) {
      console.log(error);
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log("转发开始");

    const that = this;
    // app.api._fetch({
    //   url: '/user/invite',
    //   method: 'get'
    // }).then(function (res) {
      
    //   console.info(res)
    // }).catch(function (error) {
    //   console.log(error);
    // });

    var preLogin = wx.getStorageSync("loginres") 

    return {
      title: that.data.mycardData.wxNickname+'的名片',
      path: '/pages/personalPackage/mybusinesscard' + '?wxNickname=' + that.data.mycardData.wxNickname + '&asummary=' + that.data.mycardData.asummary + '&atitle=' + that.data.mycardData.atitle + '&address=' + that.data.mycardData.wxCity + '&phonenumber=' + that.data.mycardData.phonenumber + '&wx=' + that.data.mycardData.wx + '&email=' + that.data.mycardData.email + '&userId=' + preLogin.userId  +'&sharecome=Y',
          success: function (res) {
        // 转发成功
        // 如果这里有 shareTickets，则说明是分享到群的
            console.log("转发成功:" + JSON.stringify(res));

      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));

      }
    }


  }
})
