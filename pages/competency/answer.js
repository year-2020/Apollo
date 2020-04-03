var that;
const app = getApp()
var countDown_time = '00:20:01';
const { $Toast } = require('../../dist/base/index');
Page({
  data: {
    SCNumberList: [],
    JDNumberList: [],
    SCList: [],
    JDList: [],
    nowQuestion: [],
    nowAnswerResult_question: {},
    nowAnswerResult_userResult: false,
    nowAnswerResult_yourChose: 'E',
    nowAnswerResult_store: false,
    choseA: false,
    choseB: false,
    choseC: false,
    choseD: false,
    question:[],
    nowQuestionNumber: 0,
    wrongAnswerList: [],
    questionType: 'SC',
    answerDetail:[],
    questionTypeCH: '(单选题)',
    score: 0,
    career: 0,
    interval:'',
    timeout:'',
    questionNum: 10,
    animateWidth: false,
    // hh: '',
    // mm: '',
    ss: 0,
    title: '能力评测',
    // before: false,
    after: false,
    showSubmit: false,
    canChose: true,
    modal: {
      isShow: false,// 图文弹框是否显示
      title: '提示',// 标题
      desc: '提示内容',// 内容
      src: '../../static/images/star_0.png',// 图片地址，必填，如果没有图片，请直接使用wx.showModal
      ok: '确定',// 确定按钮文本
    }
  },


  onLoad: function (options) {
    that = this;
    var SCNumberList = [];
    var JDNumberList = [];
    var SCNumber;
    var JDNumber;
    var QBAttId;
    var QBSC;
    var QBJD;
    var questionNum;
    /**列表数据 */
    app.api._fetch({
      url: '/community/examBank/getQuestions',
      data: {},
      method: 'post'
    }).then(function (res) {
      console.info('列表返回' + JSON.stringify(res.data))
      that.setData({
        SCList: res.data.data,
        nowQuestion: res.data.data[0]
      });
    }).catch(function (error) {
      console.log(error);
    });
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    });
    if(app.globalData.score!=0){
      app.globalData.score=0
    }
    if (app.globalData.nowAnswerResultList!=[]){
      app.globalData.nowAnswerResultList=[]
    }
    if (app.globalData.wrongAnswerList != []) {
      app.globalData.wrongAnswerList = []
    }
    // 启动定时器
    // this.count_down(countDown_time);
    this.setData({
      animateWidth: true
    })
    this.countDownItem();
  },
  /**
   * 页面回退
   */
  backPage: function (num) {
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - num];
    wx.navigateBack({
      delta: num,
      success: function () {
        beforePage.onLoad(); // 执行前一个页面的onLoad方法
      }
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 显示模态对话框
   */
  showModal: function () {
    let modalshow = 'modal.isShow'
    this.setData({
      [modalshow]: true
    });
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    let modalshow = 'modal.isShow'
    this.setData({
      [modalshow]: false
    });
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    clearTimeout(this.data.timeout);
    this.hideModal();
    this.backPage(2);
  },
  countDownItem: function () {
    this.data.timeInterval = setInterval(() => {
      if (that.data.ss === 10) {
        clearInterval(this.data.timeInterval);
        this.noChoseItem();
      } else {
        that.setData({
          ss: that.data.ss + 1
        })
      }
    }, 1000)
  },
  //倒计时
  // count_down: function (countDown_time) {
  //   var time = countDown_time.split(':')
  //   var hh = parseInt(time[0])
  //   var mm = parseInt(time[1])
  //   var ss = parseInt(time[2])
  //   this.setData({
  //     ss: (ss < 10) ? '0' + ss : ss,
  //     mm: (mm < 10) ? '0' + mm : mm,
  //     hh: (hh < 10) ? '0' + hh : hh
  //   })
  //   this.data.interval = setInterval(function () {
  //     if (ss > 0) {
  //       ss--
  //     } else {
  //       wx.showToast({
  //         title: '考试结束，系统自动交卷',
  //       })
  //       that.submit()
  //       clearInterval(this.data.interval)
  //     }
  //     if (ss == 0) {
  //       if (mm > 0) {
  //         mm--
  //         ss = 59;
  //       }
  //       if (mm == 0 && hh > 0) {
  //         hh--
  //         ss = 59;
  //         mm = 59;
  //       }
  //     }
  //     that.setData({
  //       ss: (ss < 10) ? '0' + ss : ss,
  //       mm: (mm < 10) ? '0' + mm : mm,
  //       hh: (hh < 10) ? '0' + hh : hh
  //     })
  //   }, 1000)
  // },

  choseItem: function (e) {
    if (!that.data.canChose) {
      return false
    }
    // 获取点击该组件定义的data-choseitem
    var choseItem = e.currentTarget.dataset.choseitem;
    var nowQuestion = that.data.nowQuestion;
    var answer = nowQuestion.rightAnswer;
    // var options = nowQuestion.option;
    var SCList = that.data.SCList;
    var JDList = that.data.JDList;
    var userResult = false;
    var SCNumberList = that.data.SCNumberList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var score = that.data.score;
    if (choseItem == 'A') {
      userResult = true;
      that.setData({
        choseB: false,
        choseC: false,
        choseD: false,
      })
      that.setData({
        choseA: true,
      });
    }
    if (choseItem == 'B') {
      userResult = true;
      that.setData({
        choseA: false,
        choseC: false,
        choseD: false,
      })
      that.setData({
        choseB: true,
      });
    }
    if (choseItem == 'C') {
      userResult = true;
      that.setData({
        choseA: false,
        choseB: false,
        choseD: false,
      })
      that.setData({
        choseC: true,
      });
    }
    if (choseItem == 'D') {
      userResult = true;
      that.setData({
        choseA: false,
        choseB: false,
        choseC: false,
      })
      that.setData({
        choseD: true,
      });
    }    
    if (choseItem == answer) {
      // score = score + 10;
      // // 将成绩存到app缓存中
      // app.globalData.score = score;
      // that.setData({
      //   score: score,
      // });
      wx.showToast({
        title: '正确答案：' + answer,
        icon: 'success',
        image: '../../static/images/icon-tick.png',
        mask: true,
        duration: 1000
      });
    } else {
      $Toast({
        content: '错误，正确答案：' + answer,
        icon: 'close',
        duration: 1
      });
    }
    
    // var nowAnswerResult = new Object;
    that.data.nowAnswerResult_question = nowQuestion
    that.data.nowAnswerResult_userResult = userResult
    that.data.nowAnswerResult_yourChose = choseItem
    var nowAnswerResult = {
      nowQuestion: nowQuestion,
      userResult: userResult,
      choseItem: choseItem
    }
    // console.log(nowAnswerResult)
    // that.nowAnswerResult.question = nowQuestion;
    // that.nowAnswerResult.userResult = userResult;
    // that.nowAnswerResult.yourChose = choseItem;
    app.globalData.nowAnswerResultList.push(nowAnswerResult)
    // console.log(nowQuestionNumber + 1)
    // console.log(SCNumberList.length)
    if ((nowQuestionNumber + 1) === SCList.length) {
      that.setData({
        showSubmit: true,
      });
    } else {
      that.setData({
        after: true,
      });
    }
    clearInterval(this.data.timeInterval);
    that.setData({
      canChose: false
    })
    if (this.data.nowAnswerResult_store) {
      this.toStore2()
    }
    // console.log("nowAnswerResult", nowAnswerResult);
    
    // if (userResult == true) {
      
    //   app.globalData.nowAnswerResultList.push(nowAnswerResult)
    // }
    // else {
    //   // nowAnswerResult.yourChose = 'E';
    //   app.globalData.nowAnswerResultList.push(nowAnswerResult);
    //   // 将错题添加到错题集
    //   //app.globalData.wrongAnswerList.push(nowQuestion)
    //   app.globalData.wrongAnswerList.push(nowAnswerResult)
    // }
  },
  noChoseItem: function () {
    clearInterval(this.data.timeInterval);
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var nowQuestion_list = that.data.SCList;
    var questionListLength = nowQuestion_list.length;
    that.data.nowAnswerResult_question = nowQuestion_list[nowQuestionNumber]
    that.data.nowAnswerResult_userResult = false
    that.data.nowAnswerResult_yourChose = 'E'
    if (nowQuestionNumber + 1 === questionListLength) {
      wx.showModal({
        title: '提示',
        content: '时间到，作答结束',
        showCancel: false,
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            that.submit()
          }
        }
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '时间到，请作答下一题',
        showCancel: false,
        success: function (res) {
          if (res.cancel) {
            //点击取消,默认隐藏弹框
          } else {
            that.toNext()
          }
        }
      });
    }
  },
  // 点击上一题
  // toPrev: function () {
  //   var nowQuestionNumber = that.data.nowQuestionNumber;
  //   var nowQuestion_list = that.data.SCList;
  //   if (nowQuestionNumber != 0) {
  //     nowQuestionNumber--;
  //     that.setData({
  //       nowQuestion: nowQuestion_list[nowQuestionNumber],
  //       nowQuestionNumber: nowQuestionNumber,
  //     })
  //   } else {
  //     that.setData({
  //       before: true
  //     })
  //   }
  // },
  // 点击下一题
  toNext: function (type) {
    // this.setData({
    //   animateWidth: false
    // });

    var nowQuestionNumber = that.data.nowQuestionNumber;
    var nowQuestion_list = that.data.SCList;

    // 暂存当前题答案
    let param = that.data.nowAnswerResult_question.examId + ',' + that.data.nowAnswerResult_yourChose
    that.data.answerDetail.push(param)
    console.log(that.data.answerDetail)
    // 开始新题数据
    that.setData({
      choseA: false,
      choseB: false,
      choseC: false,
      choseD: false,
      ss: 0,
      canChose: true,
      after: false,
      nowAnswerResult_yourChose: "E",
      nowAnswerResult_question: false
    })
    nowQuestionNumber++;
    that.setData({
      nowQuestion: nowQuestion_list[nowQuestionNumber],
      nowQuestionNumber: nowQuestionNumber
    })
    // 重新计时
    this.countDownItem();
    // if (nowQuestionNumber + 1 < questionNum) {

    // } else if (nowQuestionNumber + 1 == questionNum) {
    //   console.log("答题结束")
    //   // 清除定时器
    //   // clearInterval(this.data.interval);
    //   clearTimeout(this.data.timeout);

    //   this.submit(that.data.answerDetail.join(';'))
    //   that.setData({
    //     after: false
    //   })
    // } else {
    //   // that.setData({
    //   //   after: true
    //   // })
    // }
  },
  // 点击交卷
  submit: function () {
    app.api._fetch({
      url: '/community/examRecord/add?answerDetail=' + that.data.answerDetail.join(';'),
      method: 'post'
    }).then((res)=>{
      console.log("提交成功")
      let score = res.data.data.score
      let career = res.data.data.totalScore
      let modalsrc = 'modal.src'
      let src = ''
      if (career < 10) {
        src = '../../static/images/star_0.png'
      } else if (career >= 10 && career < 30) {
        src = '../../static/images/star_1.png'
      } else if (career >= 30 && career < 60) {
        src = '../../static/images/star_2.png'
      } else if (career >= 60 && career < 80) {
        src = '../../static/images/star_3.png'
      } else if (career >= 80 && career < 100) {
        src = '../../static/images/star_4.png'
      } else if (career >= 100) {
        src = '../../static/images/star_5.png'
      }
      
      this.setData({
        score: score,
        career: career,
        [modalsrc]: src
      })
      this.showModal();
      // 10s 退回测评主页
      this.data.timeout = setTimeout(() => {
        this.onConfirm()
      }, 10000)
    }).catch((error)=>{
      console.log(error);
    });
  },
  // 收藏
  toStore: function () {
    // console.log(e)
    let examId = this.data.nowQuestion.examId
    let meSelected = that.data.nowAnswerResult_yourChose
    this.setData({
      nowAnswerResult_store: true
    })
    app.api._fetch({
      url: '/community/meExamBank/collect?examId=' + examId + '&meSelected=' + meSelected,
      method: 'post'
    }).then((res) => {
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        image: '../../static/images/icon-tick.png',
        mask: true,
        duration: 300
      })
    }).catch((error) => {
      console.log(error);
    });
  },
  // 收藏
  toStore2: function () {
    // console.log(e)
    let examId = this.data.nowQuestion.examId
    let meSelected = that.data.nowAnswerResult_yourChose
    this.setData({
      nowAnswerResult_store: true
    })
    wx.request({
      url: app.api.baseURL + '/community/meExamBank/collect?examId=' + examId + '&meSelected=' + meSelected,
      // data: {
      //   examId: examId,
      //   meSelected: meSelected
      // },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 清除定时器
    // clearInterval(this.data.interval);
    clearTimeout(this.data.timeout);
    clearInterval(this.data.timeInterval);
  },
})