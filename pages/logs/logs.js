const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文
const ctx2 = wx.createCanvasContext("runCanvas");
let mytime = "";
let n = 0;
var w = "";
var h = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    score: 100, //传入的进度， 0~100，绘制到此参数处停止。
    vip:0,
    imagePath:"/static/images/share.jpg",
    flag: true,
    activityUrl:'',

  },
  showMask: function () {
    this.setData({ flag: false })
  },
  closeMask: function () {
    this.setData({ flag: true })
  },

  
  share: function () {
    var that = this
    //获取系统信息，具体的属性请前往微信小程序官网查看
    wx.getSystemInfo({
      success: res => {
        console.log(res);
        that.setData({
          Width: res.screenWidth,
          Height: res.screenHeight
        })
        console.log(that.data.Width)
      }
    })
    var qrcode = '/static/images/absence05.png'//二维码图片一般为网络图片后台生成
    var imgPath = '/static/images/tx.jpg'//头像的图片
    var bgImgPath = '/static/images/bag.png'//首先你需要准备一张背景图
    var width = that.data.Width
    var height = that.data.Height
    const ctx = wx.createCanvasContext('myCanvas')//创建 canvas 绘图上下文
    ctx.drawImage(bgImgPath, 0, 0, width, height)//将背景图绘制到画布中
    //绘制头像，这里绘制圆形头像算是一个小重点
    ctx.save()
    ctx.beginPath()
    //首先绘制一个圆形的弧线，大小位置根据你的需求而定，也就是说你想让它放在什么位置，就让它放在什么位置
    ctx.arc(width / 8, height / 3 + 0.10 * width + 20, 0.10 * width, 0, 2 * Math.PI)
    //这块我是用获取到的width和height来确定头像的位置
    ctx.setStrokeStyle('#000')
    ctx.stroke()
    //使用clip() 方法从原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
    ctx.clip()
    ctx.drawImage(imgPath, width / 8 - 0.10 * width, height / 3 + 20, 0.20 * width, 0.20 * width)
    ctx.restore()
    //用户的名称，位置你随意
    ctx.setFontSize(20)//字体大小
    ctx.setFillStyle('#6F6F6F')//设置填充色
    ctx.fillText('昵称：重吾💫', width * 0.3, height / 3 + 60)
    //下面你需要描述的文字，因为canvas文字不能够换行，所以这里我们按行一行一行写，当然你也可以自己写一个函数将文字截成一段一段的循环放入画布中
    //第一行文字
    ctx.setFontSize(14)
    ctx.setFillStyle('#111111')
    ctx.fillText('身前哪管身后事，浪得几日是几日', width * 0.03, height * 0.54)
    ctx.fillText('兄长，我想带一人回云深不知处，', width * 0.03, height * 0.58)
    ctx.fillText('带回去……藏起来。', width * 0.03, height * 0.62)
    ctx.fillText('你特别好，我喜欢你', width * 0.03, height * 0.66)
    ctx.drawImage(qrcode, width / 2 + width * 0.2, height / 2 + 15, 0.25 * width, 0.25 * width)
    ctx.setFontSize(12)
    ctx.fillText('扫码查收你的美味', width / 2 + width * 0.2, height / 2 + height * 0.2)
    ctx.setFontSize(16)
    ctx.setFillStyle('#00ffff')
    ctx.fillText('重吾💫邀你暑假共享美味', width * 0.25, height * 0.84)
    ctx.fillText('来腾讯视频看好剧', width * 0.30, height * 0.88)
    ctx.draw()
    //将canvas画布转化为图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: that.data.Width,
      height: that.data.Height,
      destWidth: that.data.Width,
      destHeight: that.data.Height,
      canvasId: 'myCanvas',
      success: function (res) {
        console.log(res.tempFilePath);
        /* 这里 就可以显示之前写的 预览区域了 把生成的图片url给image的src */
        that.setData({
          imagePath: res.tempFilePath,
          hidden: false
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
  save: function () {
    var that = this
    wx.saveImageToPhotosAlbum({
      filePath: that.data.imagePath,
      success: function (res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              that.setData({
                hidden: true
              })
            }
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    console.info('请求的url=' + decodeURIComponent(e.activityUrl));

    let that = this;
    let allSrc = 0.015 * that.data.score; //应该绘制的弧度
    let src = allSrc / 100 //计算出每个间隔应该绘制多少弧度。 
    let reqUrl = '';
    if (e.activityUrl.indexOf("http") != -1) {
      reqUrl = decodeURIComponent(e.activityUrl);
      
    } else {
      reqUrl = 'https://'+e.activityUrl
    }
    console.info('请求的url=' + reqUrl);
    that.setData({
      src: src,
      allSrc: allSrc,
      activityUrl: reqUrl
    })

    console.log('传过来的数据' + e.activityUrl)
    // wx.showLoading({
    //   title: '加载中...'

    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  load_success:function(){
    // wx.showToast({
    //   title: '加载成功!!!',
    //   icon: 'succes',
    //   duration: 1000,
    //   mask: true
    // })

  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
this.setData({
  vip:1
})
// this.data.vip=1;
console.log(this.data.vip);
  },
  
})

