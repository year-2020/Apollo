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
    questionTypeCH: '(单选题)',
    score: 0,

    interval:'',
    questionNum: 0,
    hh: '',
    mm: '',
    ss: '',
    title: '能力评测',
    before: false,
    after: false
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
    // var newArray=new Array();
    // newArray[0]="1";
    // newArray[1]="2";
    // getApp().globalData.array.push(newArray);
    // console.log("questionNum:" + getApp().globalData.array.length);
    wx.request({
      url: 'https://www.apollodev.club/api/questions',
      method: 'GET',
      header: {
        'content-type': 'application/json' //默认值
      },
      success: function (res) {
        console.log("-----")
        console.log(res)
        // var listData1 = res.data.all_hits
        // that.setData({
        //   listData: listData1,
        // })
        that.setData({
          SCList: res.data.all_hits,
          nowQuestion: res.data.all_hits[0],
          //考卷题目数
          //questionNum: app.globalData.question.length
          questionNum: 10
        });
      },
      fail: function (res) { },
    });
    
    this.count_down(countDown_time);
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
  },
  //倒计时
  count_down: function (countDown_time) {
    var time = countDown_time.split(':')
    var hh = parseInt(time[0])
    var mm = parseInt(time[1])
    var ss = parseInt(time[2])
    this.setData({
      ss: (ss < 10) ? '0' + ss : ss,
      mm: (mm < 10) ? '0' + mm : mm,
      hh: (hh < 10) ? '0' + hh : hh
    })
    this.data.interval = setInterval(function () {
      if (ss > 0) {
        ss--
      } else {
        wx.showToast({
          title: '考试结束，系统自动交卷',
        })
        that.submit()
        clearInterval(this.data.interval)
      }
      if (ss == 0) {
        if (mm > 0) {
          mm--
          ss = 59;
        }
        if (mm == 0 && hh > 0) {
          hh--
          ss = 59;
          mm = 59;
        }
      }
      that.setData({
        ss: (ss < 10) ? '0' + ss : ss,
        mm: (mm < 10) ? '0' + mm : mm,
        hh: (hh < 10) ? '0' + hh : hh
      })
    }, 1000)
  },

  choseItem: function (e) {
    // 获取点击该组件定义的data-choseitem
    var choseItem = e.currentTarget.dataset.choseitem;
    var nowQuestion = that.data.nowQuestion;
    var answer = nowQuestion.answer;
    var options = nowQuestion.option;
    var SCList = that.data.SCList;
    var JDList = that.data.JDList;
    var userResult = false;
    var SCNumberList = that.data.SCNumberList;
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var score = that.data.score;
    ////////////////////////////////////选A start////////////////////////////////////////////
    if (choseItem == 'A') {
      that.setData({
        choseB: false,
        choseC: false,
        choseD: false,
      })
      for (var i = 0; i < 4; i++) {
        if ('A' == answer) {
          userResult = true;
          score = score + 10;
          // 将成绩存到app缓存中
          getApp().globalData.score = score;
          that.setData({
            score: score,
          });
          break;
        }

      }
      var nowAnswerResult = new Object;
      nowAnswerResult.question = nowQuestion;
      nowAnswerResult.userResult = userResult;
      nowAnswerResult.yourChose = choseItem;
      console.log("nowAnswerResult", nowAnswerResult);
      if (userResult == true) {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult)
      }
      else {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult);
        // 将错题添加到错题集
        //getApp().globalData.wrongAnswerList.push(nowQuestion)
        getApp().globalData.wrongAnswerList.push(nowAnswerResult)
      }
      that.setData({
        choseA: true,
      });
      // setTimeout制作定时器，setTimeout(func, time)可以使得每隔time毫秒就执行一次func函数，常用来做计时器/时钟
      // that.nextQuestion = setTimeout(function () {
      //   if (nowQuestionNumber < 9) {
      //     that.setData({
      //       nowQuestion: SCList[nowQuestionNumber + 1],
      //       nowQuestionNumber: nowQuestionNumber + 1,
      //       choseA: false,
      //     });
      //   }
      //   else if (nowQuestionNumber == 9) {
      //     wx.redirectTo({
      //       // url: '../result/result'
      //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
      //     })
      //   }
      // }, 9000);
    }
    ////////////////////////////////////选A end////////////////////////////////////////////

    ////////////////////////////////////选B  start////////////////////////////////////////////
    if (choseItem == 'B') {
      that.setData({
        choseA: false,
        choseC: false,
        choseD: false,
      })
      for (var i = 0; i < 4; i++) {
        if ('B' == answer) {
          userResult = true;
          score = score + 10;
          getApp().globalData.score = score;
          that.setData({
            score: score,
          });
          break;
        }

      }
      var nowAnswerResult = new Object;
      nowAnswerResult.question = nowQuestion;
      nowAnswerResult.userResult = userResult;
      nowAnswerResult.yourChose = choseItem;
      if (userResult == true) {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult)
      }
      else {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult);
        //getApp().globalData.wrongAnswerList.push(nowQuestion)
        getApp().globalData.wrongAnswerList.push(nowAnswerResult)
      }
      that.setData({
        choseB: true,
      });
    
      // that.nextQuestion = setTimeout(function () {
      //   if (nowQuestionNumber < 9) {
      //     that.setData({
      //       nowQuestion: SCList[nowQuestionNumber + 1],
      //       nowQuestionNumber: nowQuestionNumber + 1,
      //       choseB: false,
      //     });
      //   }
      //   else if (nowQuestionNumber == 9) {
      //     wx.redirectTo({
      //       // url: '../result/result'
      //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
      //     })
      //   }
      // }, 9000);
    }
    ////////////////////////////////////选B end////////////////////////////////////////////

    ////////////////////////////////////选C start////////////////////////////////////////////
    
    if (choseItem == 'C') {
      that.setData({
        choseA: false,
        choseB: false,
        choseD: false,
      })
      for (var i = 0; i < 4; i++) {
        if ('C' == answer) {
          userResult = true;
          score = score + 10;
          getApp().globalData.score = score;
          that.setData({
            score: score,
          });
          break;
        }

      }
      var nowAnswerResult = new Object;
      nowAnswerResult.question = nowQuestion;
      nowAnswerResult.userResult = userResult;
      nowAnswerResult.yourChose = choseItem;
      if (userResult == true) {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult)
      }
      else {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult);
        //getApp().globalData.wrongAnswerList.push(nowQuestion)
        getApp().globalData.wrongAnswerList.push(nowAnswerResult)
      }
      that.setData({
        choseC: true,
      });

      // that.nextQuestion = setTimeout(function () {
      //   if (nowQuestionNumber < 9) {
      //     that.setData({
      //       nowQuestion: SCList[nowQuestionNumber + 1],
      //       nowQuestionNumber: nowQuestionNumber + 1,
      //       choseC: false,
      //     });
      //   }
      //   else if (nowQuestionNumber == 9) {
      //     wx.redirectTo({
      //       // url: '../result/result'
      //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
      //     })
      //   }
      // }, 9000);
    }
    ////////////////////////////////////C////////////////////////////////////////////

    ////////////////////////////////////选D start////////////////////////////////////////////
    if (choseItem == 'D') {
      that.setData({
        choseA: false,
        choseB: false,
        choseC: false,
      })
      for (var i = 0; i < 4; i++) {
        if ('D' == answer) {
          userResult = true;
          score = score + 10;
          getApp().globalData.score = score;
          that.setData({
            score: score,
          });
          break;
        }

      }
      var nowAnswerResult = new Object;
      nowAnswerResult.question = nowQuestion;
      nowAnswerResult.userResult = userResult;
      nowAnswerResult.yourChose = choseItem;
      // if (this.data.choseA == false && this.data.choseB == false && this.data.choseC == false && this.data.choseD == false) {
      //   getApp().globalData.wrongAnswerList.push(nowAnswerResult)
      // };
      if (userResult == true) {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult)
      }
      else {
        getApp().globalData.nowAnswerResultList.push(nowAnswerResult);
        //getApp().globalData.wrongAnswerList.push(nowQuestion)
        getApp().globalData.wrongAnswerList.push(nowAnswerResult)
      }
      that.setData({
        choseD: true,
      });
      
      // that.nextQuestion = setTimeout(function () {
      //   if (nowQuestionNumber < 9) {
      //     that.setData({
      //       nowQuestion: SCList[nowQuestionNumber + 1],
      //       nowQuestionNumber: nowQuestionNumber + 1,
      //       choseD: false,
      //     });
      //   }
      //   else if (nowQuestionNumber == 9) {
      //     wx.redirectTo({
      //       // url: '../result/result'
      //       url: '../wrongQuestion/wrongQuestion?title=' + that.data.title
      //     })
      //   }
      // }, 9000);
    }
    ////////////////////////////////////选D end////////////////////////////////////////////

  },
  // 点击上一题
  before1: function () {

    var nowQuestionNumber = that.data.nowQuestionNumber;
    var nowQuestion_list = that.data.SCList;
    if (nowQuestionNumber != 0) {
      nowQuestionNumber--;
      that.setData({
        nowQuestion: nowQuestion_list[nowQuestionNumber],
        nowQuestionNumber: nowQuestionNumber,
      })
    } else {
      that.setData({
        before: true
      })
    }
  },
  // 点击下一题
  after1: function (e) {
    var nowQuestionNumber = that.data.nowQuestionNumber;
    var nowQuestion_list = that.data.SCList;
    
    var questionListLength = nowQuestion_list.length;
    var questionNum = that.data.questionNum;
    if(this.data.choseA==false && this.data.choseB==false &&this.data.choseC==false &&this.data.choseD==false){
      wx.showModal({
        title: '提示',
        content: '没有选择答案'
      });
      var nowAnswerResult = new Object;
      nowAnswerResult.question = nowQuestion_list[nowQuestionNumber];
      nowAnswerResult.userResult = false;
      nowAnswerResult.yourChose = "未选";
      getApp().globalData.wrongAnswerList.push(nowAnswerResult)
    };
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
    } else if (nowQuestionNumber + 1==10) {
      that.setData({
        after:false
      })
    } else {
      that.setData({
        after: true
      })
    }
  },
  // 点击交卷
  submit: function () {
    wx.redirectTo({
      url: './wrongQuestion?title=' + that.data.title
    })
    clearInterval(this.data.interval);
  }


})