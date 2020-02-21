// pages/competency/myExamBank.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionList: [],
    nowQuestion: [],
    nowQuestionNumber: 0,
    questionListLength: 0,
    title: "我的题库",
    before: false,
    after: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var myExamBankList = app.globalData.myExamBankList;
    console.log("myExamBankList", myExamBankList);

    if (myExamBankList.length != 0) {
      console.log("myExamBankList", myExamBankList[0]);
      this.setData({
        questionList: myExamBankList,
        nowQuestion: myExamBankList[0],
        questionListLength: myExamBankList.length
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.data.title,
    })
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
  // 移除该题
  remove: function () {
    var questionList = this.data.questionList;
    console.log(questionList)
    var nowQuestionNumber = this.data.nowQuestionNumber;
    // 
    app.api._fetch({
      url: '/community/meExamBank/remove?ids=' + questionList[nowQuestionNumber].examId,
      method: 'post'
    }).then((res) => {
      questionList.splice(nowQuestionNumber, 1);
      if (questionList.length == 0) {
        wx.showToast({
          title: '全部删除完毕',
          icon: 'success',
          duration: 2000
        })
        setTimeout(function () {
          // 关闭所有页面，打开到应用内的某个页面
          wx.reLaunch({
            url: './grid'
          })
        }, 1000);
      } else {
        wx.showToast({
          title: '删除成功',
          icon: 'success',
          image: '../../static/images/icon-tick.png',
          duration: 500
        })
      }

      if (nowQuestionNumber == questionList.length) {
        nowQuestionNumber -= 1;
        this.setData({
          after: true
        })
        if (questionList.length > 1) {
          this.setData({
            before: false
          })
        } else {
          this.setData({
            before: true
          })
        }
      } else {
        this.setData({
          after: false,
          before: false
        })
        if (nowQuestionNumber === 1) {
          this.setData({
            before: true
          })
        }
      }
      // console.error(questionList.length)
      this.setData({
        questionList: questionList,
        nowQuestion: questionList[nowQuestionNumber],
        questionListLength: questionList.length,
        nowQuestionNumber: nowQuestionNumber
      })
    }).catch((error) => {
      console.log(error);
    });
  },

  // 上一题
  toPrev: function () {
    var nowQuestionNumber = this.data.nowQuestionNumber;
    var questionList = this.data.questionList;
    var questionListLength = this.data.questionListLength;
    nowQuestionNumber--;
    this.setData({
      nowQuestion: questionList[nowQuestionNumber],
      nowQuestionNumber: nowQuestionNumber,
      after: false
    })
    if (nowQuestionNumber === 0) {
      this.setData({
        before: true
      })
    }
  },
  //下一题
  toNext: function () {
    var nowQuestionNumber = this.data.nowQuestionNumber;
    var questionList = this.data.questionList;
    var questionListLength = this.data.questionListLength;
    nowQuestionNumber++;
    this.setData({
      nowQuestion: questionList[nowQuestionNumber],
      nowQuestionNumber: nowQuestionNumber,
      before: false
    })
    if (nowQuestionNumber + 1 === questionListLength) {
      console.error("11")
      this.setData({
        after: true
      })
    }
  }
})