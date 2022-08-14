import React, { useState, useEffect } from "react";

const size = 4;
const verifycode = {
  width: "32%",
  height: "32px",
  marginLeft: "5%",
  display: "inline-block",
  position: "absolute",
  top: "0",
  right: "0",
}

export default ({ cRef }) => {
  const [code, setCode] = useState(false);
  const [options, setOptions] = useState({
    id: "verifycode", //容器Id
    canvasId: "verifyCanvas", //canvas的ID
    width: 150, //默认canvas宽度
    height: 47, //默认canvas高度
    type: "blend", //图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    code: "",
    numArr: "0,1,2,3,4,5,6,7,8,9".split(","),
    letterArr: getAllLetter(),
  });

  React.useImperativeHandle(cRef, () => ({
    validate: (vcode) => {
      var vcode = vcode.toLowerCase();
      var v_code = options.code.toLowerCase();
      if (vcode === v_code) {
        setCode(!code);
      } else {
        refresh();
        setCode(!code);
      }
      return code;
    }
  }));

  useEffect(() => {
    _init();
    refresh();
  })

  function _init() {
    let con = document.getElementById(options.id);
    let canvas = document.createElement("canvas");
    options.width = con.offsetWidth > 0 ? con.offsetWidth : 150;
    options.height = con.offsetHeight > 0 ? con.offsetHeight : 47;
    canvas.id = options.canvasId;
    canvas.width = options.width;
    canvas.height = options.height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "您的浏览器版本不支持canvas";
    con.appendChild(canvas);
    canvas.onclick = function () {
      refresh();
    }
  }

  function refresh() {
    options.code = "";
    let canvas = document.getElementById(options.canvasId);
    let ctx = null;
    if (canvas.getContext) {
      ctx = canvas.getContext('2d');
    } else {
      return;
    }
    ctx.clearRect(0, 0, options.width, options.height);
    ctx.textBaseline = "middle";

    ctx.fillStyle = randomColor(180, 240);
    ctx.fillStyle = "rgba(0,0,0,0)";//背景色
    ctx.fillRect(0, 0, options.width, options.height);

    if (options.type === "blend") { //判断验证码类型
      var txtArr = options.numArr.concat(options.letterArr);
    } else if (options.type === "number") {
      txtArr = options.numArr;
    } else {
      txtArr = options.letterArr;
    }

    for (let i = 1; i <= size; i++) {
      var txt = txtArr[randomNum(0, txtArr.length)];
      options.code += txt;
      ctx.font = randomNum(options.height / 2, options.height) + 'px SimHei'; //随机生成字体大小
      ctx.fillStyle = randomColor(50, 160); //随机生成字体颜色  
      ctx.shadowOffsetX = randomNum(-3, 3);
      ctx.shadowOffsetY = randomNum(-3, 3);
      ctx.shadowBlur = randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      var x = options.width / (size + 1) * i;
      var y = options.height / 2;
      var deg = randomNum(-30, 30);
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    /**绘制干扰线**/
    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = randomColor(40, 180);
      ctx.beginPath();
      ctx.moveTo(randomNum(0, options.width), randomNum(0, options.height));
      ctx.lineTo(randomNum(0, options.width), randomNum(0, options.height));
      ctx.stroke();
    }
  }

  /**生成字母数组**/
  function getAllLetter() {
    var letterStr = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z";
    return letterStr.split(",");
  }
  /**生成一个随机数**/
  function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  /**生成一个随机色**/
  function randomColor(min, max) {
    var r = randomNum(min, max);
    var g = randomNum(min, max);
    var b = randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  return (
    <div id="verifycode" style={verifycode}></div>
  )
}
