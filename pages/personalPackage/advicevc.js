// pages/publish/publish.js
import cookies from '../../vendor/weapp-cookie/dist/weapp-cookie'

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    noteMaxLen: 60,         //标题的字数限制
    currentTitleLen: 0,     //标题输入的字数
    currentContentLen: 0,    //内容的长度
    detailnoteMaxLen: 500,//详细的描述的字数限制
    titleText: '',
    contentText: '',
    tags: [],
    imgUrls: [],
    selectedTags: [],
    latitude: '',
    longitude: '',
    xscredit: '',

  },


  /**积分悬赏输入的文字 */
  onChange(event) {
    const that = this;
    // event.detail 为当前输入的值
    console.log(event.detail);
    that.setData({
      xscredit: event.detail
    })
  },

  /**标题的输入 */
  inputTitle(event) {
    var value = event.detail.value,
      len = parseInt(value.length);
    let that = this;
    this.setData({
      currentTitleLen: len,
      titleText: value
    });
  },
  /**内容的输入 */
  inputContent(event) {
    var value = event.detail.value,
      len = parseInt(value.length);
    let that = this;
    this.setData({
      currentContentLen: len,
      contentText: value
    });
  },
  /**发布问题,还真是有点意思呢 */
  publish_question: function (e) {
    const that = this;
    if (that.data.titleText == null || that.data.titleText == "") {
      wx.showToast({
        title: '请输入问题标题',
        icon: 'none'
      })
      return;
    } if (that.data.contentText == null || that.data.contentText == "") {
      wx.showToast({
        title: '请输入问题详情',
        icon: 'none'
      })
      return;
    }

    console.info('上传之前的数组' + that.data.imgUrls.join(','));
    var imgsstr = that.data.imgUrls.join(',');
    app.api._fetch({//只需传title,content,imgUrl,latitude,longitude,address,tags）
      url: '/community/feedback/add',
      data: { 'title': that.data.titleText, 'content': that.data.contentText, 'imgUrl': imgsstr, 'tags': that.data.selectedTags.join(','), 'latitude': that.data.latitude, 'longitude': that.data.longitude, 'rewardPoints': that.data.xscredit },
      method: 'post'
    }).then(function (res) {
      console.info('发布问题返回的结果=' + JSON.stringify(res))
      wx.showToast({
        title: '发布成功!!!'
      })
      wx.navigateBack({

      })
    }).catch(function (error) {
      console.info('login-error')
      console.log(error);
    });

  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 9 - that.data.images.length, // 最多可以选择的图片张数，默认9
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
            url: 'http://testbox.xinnet.com/community/upload/questionFile',
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
                imgUrls: that.data.imgUrls.concat(data.msg)
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
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  },
  /** 删除图片 */
  deleteImv: function (e) {
    var imgArr = this.data.images;
    var itemIndex = e.currentTarget.dataset.id;
    imgArr.splice(itemIndex, 1);
    console.log(imgArr);
    this.setData({
      images: imgArr
    })
    //判断是否隐藏选择图片
    //this.chooseViewShow();
  },
  /**上传图片 */
  uploadimg: function () {//这里触发图片上传的方法
    var pics = this.data.images;
    app.uploadimg({
      url: 'http://testbox.xinnet.com/community/upload/questionFile',//这里是你图片上传的接口
      path: pics//这里是选取的图片的地址数组
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const that = this;
    that.setData({
      tags: getApp().globalData.tags
    })
    // that.getFuckLocation();

  },
  /**选择tags */
  selectTags: function (e) {
    const that = this;
    console.info(e.currentTarget.dataset.id);
    for (var i = 0; i < that.data.tags.length; i++) {
      var u = that.data.tags[i];
      var c = "tags[" + i + "].color"
      if (u.tagId == e.currentTarget.dataset.id) {
        if (u.color != 1) {
          that.setData({
            [c]: 1,
            selectedTags: that.data.selectedTags.concat(u.tagId)
          })
        } else {
          that.setData({
            [c]: 0
          })
          that.remove(that.data.selectedTags, u.tagId);
          console.info('seletedTags ===' + that.data.selectedTags.length);

        }

      }
      // else{
      //   that.setData({
      //     [c]: 0
      //   })
      // }
    }
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

  },
  /**获得经纬度 */
  getFuckLocation: function () {
    const that = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },


  // 删除方法
  remove: function (array, val) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] == val) {
        array.splice(i, 1);
      }

    }
    return -1;

  }











})