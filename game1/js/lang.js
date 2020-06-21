
function getUrlParam(name) {//封装方法
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg); //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}
var strings_ch = {
  title:'趣味拼图',
  easy: '简单',
  normal: '中等',
  hard: '困难',
  rules: '游戏规则：<br/>点击“Start“ 开始游戏，自行选择难易度，拖拉方框把每个碎片放在正确的位置。<br />拼图完成成功将得到惊喜积分哦。重复游戏点击“Play Again” 即可',
  check: '查看完整拼图',
  finish: '游戏结束',
  popupText1: '恭喜您获得',
  popupText2: '积分！',
  popupText3: '点击🔛炫彩奢华购物之旅',
  popupTextConfirm: '确认',
  popupHint: '请点击左上角“ < “ 键返回小程序',
}
var strings_en = {
  title: 'The puzzle game',
  easy: 'easy',
  normal: 'mid',
  hard: 'hard',
  rules: 'Instructions: <br/>Click “Start” to play, drag the pieces to the correct location to win shopping points! <br />Click “Play again” to Replay',
  check: 'View original picture',
  finish: 'Game Over',
  popupText1: 'You earned',
  popupText2: 'points!',
  popupText3: 'Enjoy your luxury shopping experience!',
  popupTextConfirm: 'Confirm',
  popupHint: 'Click upper left “ < “ back button',
}
$(document).ready(function (e) {
  var lang = getUrlParam('lang');
  var stringList = {};
  console.log("语言是：", lang) 
  if (lang === 'en_US'){
    stringList = strings_en
  }else{
    stringList = strings_ch
  }

  $('#title').html(stringList.title)
  $('#choice-text-easy').html(stringList.easy)
  $('#choice-text-normal').html(stringList.normal)
  $('#choice-text-hard').html(stringList.hard)
  $('#rules').html(stringList.rules)
  $('#check').html(stringList.check)
  $('#game-finish').html(stringList.finish)
  $('#popup-text-1').html(stringList.popupText1)
  $('#popup-text-2').html(stringList.popupText2)
  $('#popup-text-3').html(stringList.popupText3)
  $('#popup-text-confirm').html(stringList.popupTextConfirm)
  $('#popup-hint').html(stringList.popupHint)
})