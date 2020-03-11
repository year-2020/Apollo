// 获取小程序全局配置（变量、函数等）
const app = getApp()
// 定义网络请求API地址
// testUrl:http://112.124.56.138:8080/apollo
//realUrl:http://www.shengdh123.com:8080/apollo
// const baseURL = 'https://testbox.xinnet.com'
const baseURL = 'https://apollodev.apollo.auto/'
// const realUrl = 'http://www.shengdh123.com:80/apollo'
// 封装网络请求开始
const http = ({ url, data, method, ...other } = {}) => {
  // 添加请求加载等待
  wx.showLoading({
    title: '加载中...'
    
  })
  console.log(baseURL + url)
  console.log(data)

  // Promise封装处理
  return new Promise((resolve, reject) => {
    wx.request({
      // 请求地址拼接
      url: baseURL + url,
      data: data,
      // 获取请求头配置
      header: getHeader(),
      method: method,
      ...other,
      // 成功或失败处理
      complete: (res) => {
        console.info('请求完成')
        console.log(res)
        // 关闭等待
        wx.hideLoading()
        // 进行状态码判断并处理
        if(res.data.code == 1){
          console.info('登录超时卧槽');
          wx.reLaunch({//销毁其他的页面
            url: '/pages/personal/login',
          })
        }
        if (res.statusCode === 204) {
          resolve(res)
        } else if (res.statusCode === 401) {//Unauthorized
          // 检测到状态码401，进行token刷新并重新请求等操作
          refreshToken().then(() => _refetch(url, data, method)).then(resolve)
        } 
        else if (res.data.code >0) {
          // 获取后台返回报错信息
          let title = res.data.msg
          // 调用全局toast方法
          showToast(title)
        
        } 
        else if (res.statusCode === 200) {
          console.log('res.data.statusCode ==200,请求正常')
          resolve(res)
        }
         else {
          reject(res)
        }
      }
    })
  })
}
// 添加请求toast提示
const showToast = title => {
  wx.showToast({
    title: title,
    icon: 'none',
    duration: 1500,
    mask: true
  });
}

// 进行url字符串拼接
const getUrl = url => {
  if (url.indexOf('://') == -1) {
    url = baseURL + url
  }
  return url
}
//获取用户userToken
function getHeader() {
  // 判断登录token是否存在
  if (wx.getStorageSync('userToken')) {
    // 获取token并设置请求头
    var token = wx.getStorageSync('userToken')
    let auth = {
      'Authorization': token.token_type + " " + token.access_token
    }
    return auth
  }
}
// 重构请求方式
const _fetch = (content) => {
  return http({
    url: content.url,
    data: content.data,
    method: content.method
  })
}
// 添加刷新之后的操作处理方法
const refreshToken = () => {
  return new Promise((resolve, reject) => {
    // 获取token
    var token = wx.getStorageSync('userToken')
    // 设置请求data
    let params = {
      refresh_token: token.refresh_token
    }
    // 进行token刷新请求
    wx.request({
      url: getUrl('/app/connect/refresh'),
      data: params,
      // 设置请求header 鉴权
      header: {
        'Authorization': token.token_type + " " + token.access_token
      },
      method: 'post',
      // 请求响应处理
      complete: (res) => {
        if (res.data.code === 200) {
          // 全局存储token
          app.globalData.usertToken = res.data.data
          // Storage存储token
          wx.setStorage({
            key: "userToken",
            data: res.data.data,
            // 存储成功处理
            success: function () {
              resolve()
            }
          })
        }
      }
    })
  });
}
const _refetch = (url, data, method) => {
  return http({
    url: url,
    data: data,
    method: method
  })
}
//除开上面的调用方式之外，你也可以使用下面的这些方法，只需要关注是否传入method
// get、post、put、delete、_refetch方法暂不处理
const _get = (url, params = {}) => {
  return http({
    url,
    params
  })
}
const _post = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'post'
  })
}
const _put = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'put'
  })
}
const _delete = (url, params = {}) => {
  return http({
    url,
    params,
    method: 'delete'
  })
}
module.exports = {
  baseURL,
  refreshToken,
  _fetch,
  _refetch,
  _get,
  _post,
  _put,
  _delete
}
