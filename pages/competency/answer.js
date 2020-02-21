var that;
const app = getApp()
var countDown_time = '00:20:01';
Page({
  data: {
    SCNumberList: [],
    JDNumberList: [],
    SCList: [],
    JDList: [],
    nowQuestion: [],
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
    // hh: '',
    // mm: '',
    // ss: '',
    title: '能力评测',
    // before: false,
    // after: false,
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
    this.countDownItem();
  },
  /**
   * 页面回退
   */
  backPage: function (num) {
    var pages = getCurrentPages(); //当前页面
    var beforePage = pages[pages.length - num];
    wx.navigateBack({
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
    this.hideModal();
    this.backPage(2);
  },
  countDownItem: function () {
    // 清除定时器
    clearTimeout(this.data.timeout);
    this.data.timeout = setTimeout(() => {
      this.noChoseItem();
      this.toNext();
    }, 10000)
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
    ////////////////////////////////////选A start////////////////////////////////////////////
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
    ////////////////////////////////////选A end////////////////////////////////////////////
    
    if (choseItem == answer) {
      score = score + 10;
      // 将成绩存到app缓存中
      app.globalData.score = score;
      that.setData({
        score: score,
      });
      wx.showToast({
        title: '成功',
        icon: 'success',
        image: '../../static/images/icon-tick.png',
        mask: true,
        duration: 1000
      });
    } else {
      wx.showToast({
        title: '错误',
        icon: 'success',
        image: '../../static/images/icon-fail.png',
        mask: true,
        duration: 1000
      });
    }
    var nowAnswerResult = new Object;
    nowAnswerResult.question = nowQuestion;
    nowAnswerResult.userResult = userResult;
    
    console.log("nowAnswerResult", nowAnswerResult);
    if (userResult == true) {
      nowAnswerResult.yourChose = choseItem;
      app.globalData.nowAnswerResultList.push(nowAnswerResult)
    }
    else {
      nowAnswerResult.yourChose = 'E';
      app.globalData.nowAnswerResultList.push(nowAnswerResult);
      // 将错题添加到错题集
      //app.globalData.wrongAnswerList.push(nowQuestion)
      app.globalData.wrongAnswerList.push(nowAnswerResult)
    }
    // 选择后自动跳转下一题
    setTimeout(()=>{
      this.toNext();
    }, 1000)
    
    ////////////////////////////////////选B  start////////////////////////////////////////////
    // if (choseItem == 'B') {
    //   that.setData({
    //     choseA: false,
    //     choseC: false,
    //     choseD: false,
    //   })
    //   for (var i = 0; i < 4; i++) {
    //     if ('B' == answer) {
    //       userResult = true;
    //       score = score + 10;
    //       app.globalData.score = score;
    //       that.setData({
    //         score: score,
    //       });
    //       break;
    //     }

    //   }
    //   var nowAnswerResult = new Object;
    //   nowAnswerResult.question = nowQuestion;
    //   nowAnswerResult.userResult = userResult;
    //   nowAnswerResult.yourChose = choseItem;
    //   if (userResult == true) {
    //     app.globalData.nowAnswerResultList.push(nowAnswerResult)
    //   }
    //   else {
    //     app.globalData.nowAnswerResultList.push(nowAnswerResult);
    //     //app.globalData.wrongAnswerList.push(nowQuestion)
    //     app.globalData.wrongAnswerList.push(nowAnswerResult)
    //   }
    //   that.setData({
    //     choseB: true,
    //   });
    
    //   // that.nextQuestion = setTimeout(function () {
    //   //   if (nowQuestionNumber < 9) {
    //   //     that.setData({
    //   //       nowQuestion: SCList[nowQuestionNumber + 1],
    //   //       nowQuestionNumber: nowQuestionNumber + 1,
    //   //       choseB: false,
    //   //     });
    //   //   }
    //   //   else if (nowQuestionNumber == 9) {
    //   //     wx.redirectTo({
    //   //       // url: '../result/result'
    //   //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
    //   //     })
    //   //   }
    //   // }, 9000);
    // }
    ////////////////////////////////////选B end////////////////////////////////////////////

    ////////////////////////////////////选C start////////////////////////////////////////////
    
    // if (choseItem == 'C') {
    //   that.setData({
    //     choseA: false,
    //     choseB: false,
    //     choseD: false,
    //   })
    //   for (var i = 0; i < 4; i++) {
    //     if ('C' == answer) {
    //       userResult = true;
    //       score = score + 10;
    //       app.globalData.score = score;
    //       that.setData({
    //         score: score,
    //       });
    //       break;
    //     }

    //   }
    //   var nowAnswerResult = new Object;
    //   nowAnswerResult.question = nowQuestion;
    //   nowAnswerResult.userResult = userResult;
    //   nowAnswerResult.yourChose = choseItem;
    //   if (userResult == true) {
    //     app.globalData.nowAnswerResultList.push(nowAnswerResult)
    //   }
    //   else {
    //     app.globalData.nowAnswerResultList.push(nowAnswerResult);
    //     //app.globalData.wrongAnswerList.push(nowQuestion)
    //     app.globalData.wrongAnswerList.push(nowAnswerResult)
    //   }
    //   that.setData({
    //     choseC: true,
    //   });

    //   // that.nextQuestion = setTimeout(function () {
    //   //   if (nowQuestionNumber < 9) {
    //   //     that.setData({
    //   //       nowQuestion: SCList[nowQuestionNumber + 1],
    //   //       nowQuestionNumber: nowQuestionNumber + 1,
    //   //       choseC: false,
    //   //     });
    //   //   }
    //   //   else if (nowQuestionNumber == 9) {
    //   //     wx.redirectTo({
    //   //       // url: '../result/result'
    //   //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
    //   //     })
    //   //   }
    //   // }, 9000);
    // }
    ////////////////////////////////////C////////////////////////////////////////////

    ////////////////////////////////////选D start////////////////////////////////////////////
    // if (choseItem == 'D') {
    //   that.setData({
    //     choseA: false,
    //     choseB: false,
    //     choseC: false,
    //   })
    //   for (var i = 0; i < 4; i++) {
    //     if ('D' == answer) {
    //       userResult = true;
    //       score = score + 10;
    //       app.globalData.score = score;
    //       that.setData({
    //         score: score,
    //       });
    //       break;
    //     }

    //   }
    //   var nowAnswerResult = new Object;
    //   nowAnswerResult.question = nowQuestion;
    //   nowAnswerResult.userResult = userResult;
    //   nowAnswerResult.yourChose = choseItem;
    //   // if (this.data.choseA == false && this.data.choseB == false && this.data.choseC == false && this.data.choseD == false) {
    //   //   app.globalData.wrongAnswerList.push(nowAnswerResult)
    //   // };
    //   if (userResult == true) {
    //     app.globalData.nowAnswerResultList.push(nowAnswerResult)
    //   }
    //   else {
    //     app.globalData.nowAnswerResultList.push(nowAnswerResult);
    //     //app.globalData.wrongAnswerList.push(nowQuestion)
    //     app.globalData.wrongAnswerList.push(nowAnswerResult)
    //   }
    //   that.setData({
    //     choseD: true,
    //   });
      
    //   // that.nextQuestion = setTimeout(function () {
    //   //   if (nowQuestionNumber < 9) {
    //   //     that.setData({
    //   //       nowQuestion: SCList[nowQuestionNumber + 1],
    //   //       nowQuestionNumber: nowQuestionNumber + 1,
    //   //       choseD: false,
    //   //     });
    //   //   }
    //   //   else if (nowQuestionNumber == 9) {
    //   //     wx.redirectTo({
    //   //       // url: '../result/result'
    //   //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
    //   //     })
    //   //   }
    //   // }, 9000);
    // }
    ////////////////////////////////////选D end////////////////////////////////////////////

  },
  noChoseItem: function () {
    var nowAnswerResult = new Object;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var nowQuestion_list = that.data.SCList;
    nowAnswerResult.question = nowQuestion_list[nowQuestionNumber];
    nowAnswerResult.userResult = false;
    nowAnswerResult.yourChose = 'E';
    app.globalData.nowAnswerResultList.push(nowAnswerResult);
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
  toNext: function (e) {
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var nowQuestion_list = that.data.SCList;
    // 暂存当前题答案
    let param = app.globalData.nowAnswerResultList[nowQuestionNumber].question.examId + ',' +app.globalData.nowAnswerResultList[nowQuestionNumber].yourChose
    that.data.answerDetail.push(param)
    console.log(that.data.answerDetail)
    var questionListLength = nowQuestion_list.length;
    var questionNum = that.data.questionNum;
    // if(this.data.choseA==false && this.data.choseB==false &&this.data.choseC==false &&this.data.choseD==false){
    //   wx.showModal({
    //     title: '提示',
    //     content: '没有选择答案'
    //   });
    //   var nowAnswerResult = new Object;
    //   nowAnswerResult.question = nowQuestion_list[nowQuestionNumber];
    //   nowAnswerResult.userResult = false;
    //   nowAnswerResult.yourChose = "未选";
    //   app.globalData.wrongAnswerList.push(nowAnswerResult)
    // };
    if (nowQuestionNumber + 1 < questionNum) {
      that.setData({
        choseA: false,
        choseB: false,
        choseC: false,
        choseD: false,
      })
      nowQuestionNumber++;
      that.setData({
        nowQuestion: nowQuestion_list[nowQuestionNumber],
        nowQuestionNumber: nowQuestionNumber,
        before: false
      })
      // 重新计时
      this.countDownItem();
    } else if (nowQuestionNumber + 1 == that.data.questionNum) {
      console.log("答题结束")
      // 清除定时器
      clearInterval(this.data.interval);
      clearTimeout(this.data.timeout);

      this.submit(that.data.answerDetail.join(';'))
      that.setData({
        after:false
      })
    } else {
      // that.setData({
      //   after: true
      // })
    }
  },
  // 点击交卷
  submit: function (param) {
    app.api._fetch({
      url: '/community/examRecord/add?answerDetail=' + param,
      method: 'post'
    }).then((res)=>{
      console.log("提交成功")
      let score = res.data.data.score
      let career = res.data.data.totalScore
      let modalsrc = 'modal.src'
      let src = ''
      if (career >= 10 && career < 30) {
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
        clearTimeout(this.data.timeout)
        this.onConfirm()
      }, 10000)
    }).catch((error)=>{
      console.log(error);
    });
  },
  // 收藏
  toStore: function () {
    let examId = this.data.nowQuestion.examId
    let meSelected = 'E'
    app.api._fetch({
      url: '/community/meExamBank/collect?examId=' + examId + '&meSelected=' + meSelected,
      method: 'post'
    }).then((res) => {
      console.log("收藏成功")
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        image: '../../static/images/icon-tick.png',
        mask: true,
        duration: 300
      });
    }).catch((error) => {
      console.log(error);
    });
  }
})