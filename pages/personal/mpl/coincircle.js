// pages/personal/mpl/coincircle.js
const ctx = wx.createCanvasContext("bgCanvas"); //创建一个全局的canvas绘图上下文
const ctxl = wx.createCanvasContext("bgCanvas-left"); //创建一个全局的canvas绘图上下文

const ctx2 = wx.createCanvasContext("runCanvas");
var w = "";
var h = "";
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // w: {
    //   type: Number,
    //   value: ''
    // },
    // h: {
    //   type: Number,
    //   value: ''
    // },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

   startprint(){
     var query = wx.createSelectorQuery().in(this);
       query.select('#canvas-one').boundingClientRect(function (rect) {//监听canvas的宽高

         w = parseInt(rect.width / 2); //获取canvas宽的的一半
         h = parseInt(rect.height / 2); //获取canvas高的一半，
         //获取宽高的一半是为了便于找到中心点

         ctx.arc(w, h, w - 8, 0.1 * Math.PI, 1.65 * Math.PI, true); //绘制圆形弧线
         ctx.setStrokeStyle("#bbbbbb"); //设置填充线条颜色
         ctx.setLineWidth("4");     //设置线条宽度
         ctx.setLineCap("round");        //设置线条端点样式
         ctx.stroke();     //对路径进行描边，也就是绘制线条。
         ctx.draw();       //开始绘制


       }).exec()
       query.select('#canvas-two').boundingClientRect(function (rect) {//监听canvas的宽高
         console.log(rect);
         w = parseInt(rect.width / 2); //获取canvas宽的的一半
         h = parseInt(rect.height / 2); //获取canvas高的一半，
         //获取宽高的一半是为了便于找到中心点
         ctxl.arc(w, h, w - 8, 0.9 * Math.PI, 1.35 * Math.PI, false); //绘制圆形弧线
         ctxl.setStrokeStyle("#bbbbbb"); //设置填充线条颜色
         ctxl.setLineWidth("4");     //设置线条宽度
         ctxl.setLineCap("round");        //设置线条端点样式
         ctxl.stroke();     //对路径进行描边，也就是绘制线条。
         ctxl.draw();       //开始绘制

        }).exec()


 }
  }
})
