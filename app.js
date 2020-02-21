//app.js
import cookies from './vendor/weapp-cookie/dist/weapp-cookie'
const api = require("./utils/api.js")
App({
  onLaunch: function () {

    var t = this;
    // // 展示本地存储能力
   
    this.globalData.userInfo = wx.getStorageSync("userInfo") ? wx.getStorageSync("userInfo") : null;
    this.globalData.sessionId = wx.getStorageSync('jid');
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log('是否授权过'+JSON.stringify(res))
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.info(JSON.stringify(res)+'授权过的用户信息');
              //从数据库获取用户信息
              t.queryUserInfo();
            
            }
          });
        }else{
          console.log('没授权过！！！')
          // wx.navigateTo({
          //   url: '/pages/personal/login',
          // })
          wx.reLaunch({//销毁其他的页面
            url: '/pages/personal/login',
          })
        }

      }
    })
   
},
  
queryUserInfo:function(){
  var t = this;

  console.info('JSESSIONID====' + this.globalData.sessionId);
  let token = cookies.get('rememberMe','')
  
  var preLogin =  wx.getStorageSync("loginres") 
  console.info('prelogin-'+JSON.stringify(preLogin))
  api._fetch({
    url: '/wxAuth/login',
    data: { userid: preLogin.userId, openid: preLogin.wxOpenid },
    method: 'post'
  }).then(function (res) {
    console.info('/wxAuth/login')
 t.updateUserInfo();
    if (res.data.code == "500" || res.data.code == "1"){//登录超时
    wx.reLaunch({//销毁其他的页面
      url: '/pages/personal/login',
    })
  }else{
      //用户已经授权过
      wx.switchTab({
        url: "/pages/index/index"
      })
  }
  }).catch(function (error) {
    console.info('wxAuth/login--')
    console.log(error);
  });
},
  updateUserInfo:function(){
    var preLogin = wx.getStorageSync("loginres") 

    var params = {
      "wxOpenid": preLogin.wxOpenid,
      "userId": preLogin.userId,
      "wxNickname": preLogin.wxNickname,
      "wxCity": preLogin.wxCity,
      "wxAvatar": preLogin.wxAvatar
    }
    console.log('回传的参数=' + JSON.stringify(params))

    // 既然已经获取到user了，也授权了，那接下来就是调用system/user
    api._fetch({
      url: '/user/edit',
      data: JSON.stringify(params),
      method: 'post'
    }).then(function (res) {
      console.log('/user')
      console.info(res)
    }).catch(function (error) {
      console.log(error);
    });
  },

  globalData: {
    userInfo: null,
    initParams:null,
    wxOpenid:null,
    userid:null,
    urlPath:'http://112.124.56.138:8080/apollo',
    tags:[],
    credits:'',
    sessionId:'',
    userMe:{},
    wxOpenid:'',
    inviteOpenid:'',

    question: [],
    score: 0,
    nowAnswerResultList: [],
    wrongAnswerList: [],
    myExamBankList: [],
    choseQB: '',
    array: [],
    stateList: [],
  },
  api: api
})