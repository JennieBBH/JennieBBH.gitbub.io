var puzzleGame = function(options){
 
 this.img = options.img || "";
 
 this.e_playArea = $("#play_area");
  this.e_startBtn = $("#play_btn_start");
  this.e_startBtn_2 = $("#play_btn_start_2");
 this.e_playScore = $("#play_score");
 this.e_playCount = $("#play_count");
 this.e_levelBtn = $("#play_btn_level");
 this.e_levelMenu = $("#play_menu_level");
 
 this.areaWidth = parseInt(this.e_playArea.css("width"));
 this.areaHeight = parseInt(this.e_playArea.css("height"));
 this.offX = this.e_playArea.offset().left;
 this.offY = this.e_playArea.offset().top;
 
 this.levelArr = [[3,3],[4,4],[6,6]];
 this.level = 0;
 this.scoreArr = [100,200,400];
 this.score = 0;
 this.playCount = 0;
 
 this.cellRow = this.levelArr[this.level][0];
 this.cellCol = this.levelArr[this.level][1];
 
 this.cellWidth = this.areaWidth/this.cellCol;
 this.cellHeight = this.areaHeight/this.cellRow;
 this.imgArr = [];
 this.ranArr = [];
 
 this.cellArr = [];
 this.easing = 'swing';
 this.time = 400;
 this.thisLeft = 0;
 this.thisTop = 0;
 this.nextIndex;
 this.thisIndex;
 
 this.cb_cellDown = $.Callbacks();
 this.touchID = null;
 this.exchangeFinished = true;
 
 this.isInit = false;
 this.isBind = false;
 this.start();
};
puzzleGame.prototype = {
 start:function(){
  this.init();
  
  this.menu();
 },
 set: function(options){
  this.level = options.level === 0 ? 0 : (options.level || 1);
 },
 menu:function(){
  var self = this;
  
  this.e_startBtn.click(function(){
    //self.e_levelMenu.hide();
    self.touchID = null;
    self.play();
  });
   this.e_startBtn_2.click(function () {
     //self.e_levelMenu.hide();
     self.touchID = null;
     self.play();
   });
  //this.e_levelBtn.click(function(){
   //if(self.playing) return;
   //self.e_levelMenu.toggle();
  //});
  this.e_levelMenu.find("a").click(function(){
   //self.e_levelMenu.hide();
   //self.e_levelBtn.find(".level_text").html($(this).html())
   
   if(parseInt($(this).attr("level")) !== self.level){
     self.init();
    $(this).siblings().css({"backgroundColor":"#09F"});
    $(this).css({"backgroundColor":"#FFAC24"});
    self.set({
     "level": $(this).attr("level")
    });
    self.isInit = true;
    self.isBind = false;
   }
  })
 },
 play:function(){
  if(this.isInit){
   this.isInit = false;
   this.cellRow = this.levelArr[this.level][0];
   this.cellCol = this.levelArr[this.level][1];
   this.cellWidth = this.areaWidth/this.cellCol;
   this.cellHeight = this.areaHeight/this.cellRow;
   this.init();
  }
  this.e_playCount.html(this.playCount = 0);
  this.randomImg();
  if(!this.isBind)this.bindCell();
 },
 init:function(){
  var _cell;
  
  this.cellArr = [];
  this.imgArr = [];
  this.e_playArea.html("");
  
  for(var i = 0; i<this.cellRow; i++){
   for(var j = 0; j<this.cellCol; j++){
    this.imgArr.push(i*this.cellCol + j);
    _cell = document.createElement("div");
    _cell.className = "play_cell";
    $(_cell).css({
     "width": this.cellWidth-2,
     "height": this.cellHeight-2,
     "left": j * this.cellWidth,
     "top": i * this.cellHeight,
     "background": "url(" + this.img + ")",
     "backgroundPosition": (-j) * this.cellWidth + "px " + (-i) * this.cellHeight + "px"
    });
    this.cellArr.push($(_cell));
    this.e_playArea.append(_cell);
   }
  }
 },
 randomImg:function(){
  var ran,arr;
  arr = this.imgArr.slice();
  this.ranArr = [];
  for(var i = 0, ilen = arr.length; i < ilen; i++){
   ran = Math.floor(Math.random() * arr.length);
   this.ranArr.push(arr[ran]);
   
   this.cellArr[i].css({
    "backgroundPosition": (-arr[ran]%this.cellCol) * this.cellWidth + "px " + (-Math.floor(arr[ran]/this.cellCol)) * this.cellHeight + "px"
   })
   arr.splice(ran,1);
  }
  $("#p").html(this.ranArr.join())
 },
 bindCell:function(){
  var self = this;
  this.isBind = true;
  this.cb_cellDown.add(self.cellDown);
  for(var i = 0, len = this.cellArr.length; i<len; i++){
   /*this.cellArr[i].on({
     "mouseover": function () {
       console.log("mouseover touchstart addClass")
     $(this).addClass("hover");
    },
     "mouseout": function () {
       console.log("mouseout touchend removeClass")
     $(this).removeClass("hover");
    },
     "mousedown": function (e) {
       console.log("mousedown touchover self")
     self.cb_cellDown.fire(e, $(this), self);
     return false;
    }
   });*/
    this.cellArr[i].bind("touchstart", function (e) {
      console.log("mousedown touchover self")
      var flag = self.processEvent(e);
      if (!flag) {
        return;
      }
      $(this).addClass("hover");
      self.cb_cellDown.fire(e, $(this), self);
    });
    this.cellArr[i].bind("touchend", function (e) {
      console.log("mouseout touchend removeClass")
      $(this).removeClass("hover")
      /*var flag = self.processEvent(e);
      if (!flag) {
        return;
      }*/
      //self.touchID = null;
    });
    this.cellArr[i].bind("touchcancel", function (e) {
      console.log("touchcancel")
      var flag = self.processEvent(e);
      if (!flag) {
        return;
      }
    });
  }
 },
 cellDown:function(e,_cell,self){
  var //self = this,
  _x = e.originalEvent.targetTouches[0].pageX - _cell.offset().left,
  _y = e.originalEvent.targetTouches[0].pageY - _cell.offset().top;
     
  self.thisLeft = _cell.css("left");
  self.thisTop = _cell.css("top");
  self.thisIndex = Math.floor(parseInt(self.thisTop)/self.cellHeight)*self.cellCol;
  self.thisIndex += Math.floor(parseInt(self.thisLeft)/self.cellWidth);
  _cell.css("zIndex",99);
   $(document).bind("touchmove", function (e) {
     var flag = self.processEvent(e);
     console.log("touchmove~~~~~", flag)
     if (!flag) {
       return;
     }
     _cell.css({
       "left": e.originalEvent.targetTouches[0].pageX - self.offX - _x,
       "top": e.originalEvent.targetTouches[0].pageY - self.offY - _y
     })
   }).bind("touchend", function (e) {
     var flag = self.processEvent(e);
     console.log("touchend~~~~~", flag)
     if (!flag) {
       return;
     }
     self.touchID = null;
     $(document).unbind("touchmove");
     $(document).unbind("touchend");
     self.cb_cellDown.empty();
     if (e.originalEvent.changedTouches[0].pageX - self.offX < 0 || e.originalEvent.changedTouches[0].pageX - self.offX > self.areaWidth || e.originalEvent.changedTouches[0].pageY - self.offY < 0 || e.originalEvent.changedTouches[0].pageY - self.offY > self.areaHeight) {
       self.returnCell();
       return;
     }

     var _tx, _ty, _ti, _tj;
     _tx = e.originalEvent.changedTouches[0].pageX - self.offX;
     _ty = e.originalEvent.changedTouches[0].pageY - self.offY;

     _ti = Math.floor(_ty / self.cellHeight);
     _tj = Math.floor(_tx / self.cellWidth);

     self.nextIndex = _ti * self.cellCol + _tj;
     if (self.nextIndex == self.thisIndex) {
       self.returnCell();
     } else {
       self.changeCell();
     }
   });
   /*$(document).on({
    "mousemove": function(e){
     _cell.css({
      "left": e.pageX - self.offX - _x,
      "top": e.pageY - self.offY - _y
     })
    },
    "mouseup": function(e){
     $(document).off("mouseup");
     $(document).off("mousemove");
     self.cb_cellDown.empty();
     if( e.pageX - self.offX < 0 || e.pageX - self.offX > self.areaWidth || e.pageY - self.offY < 0 || e.pageY - self.offY > self.areaHeight ){
      self.returnCell();
      return;
     }
       
     var _tx, _ty, _ti, _tj;
     _tx = e.pageX - self.offX;
     _ty = e.pageY - self.offY;
       
     _ti = Math.floor( _ty / self.cellHeight );
     _tj = Math.floor( _tx / self.cellWidth );
       
     self.nextIndex = _ti*self.cellCol + _tj;
     if(self.nextIndex == self.thisIndex){
      self.returnCell();
     }else{
      self.changeCell();
     }
    }
   })*/
   
 },
 changeCell:function(){
  var self = this,
  _tc = this.cellArr[this.thisIndex],
  _tl = this.thisLeft,
  _tt = this.thisTop,
  _nc = this.cellArr[this.nextIndex],
  _nl = (this.nextIndex % this.cellCol) * this.cellWidth,
  _nt = Math.floor(this.nextIndex / this.cellCol) * this.cellHeight;

  self.exchangeFinished = false;
   console.log("exchangeFinished status(changecell):", self.exchangeFinished)
  _nc.css("zIndex",98);
  
  this.cellArr[this.nextIndex] = _tc;
  this.cellArr[this.thisIndex] = _nc;
       
  this.ranArr[this.nextIndex] = this.ranArr[this.nextIndex] + this.ranArr[this.thisIndex];
  this.ranArr[this.thisIndex] = this.ranArr[this.nextIndex] - this.ranArr[this.thisIndex];
  this.ranArr[this.nextIndex] = this.ranArr[this.nextIndex] - this.ranArr[this.thisIndex];
       
  _tc.animate({
   "left": _nl,
   "top": _nt
  },self.time,self.easing,function(){
   _tc.removeClass("hover");
   _tc.css("zIndex","");
  })
       
  _nc.animate({
   "left": _tl,
   "top": _tt
  },self.time,self.easing,function(){
    _nc.removeClass("hover");
    _nc.css("zIndex","");
    self.check();
   
    if(!self.cb_cellDown.has(self.cellDown)) self.cb_cellDown.add(self.cellDown);

    self.exchangeFinished = true;
    console.log("exchangeFinished status(changecell):", self.exchangeFinished)
  })
   self.touchID = null;
   console.log("******清空管道self.touchID:", self.touchID)
 },
 returnCell:function(){
   var self = this;
   self.exchangeFinished = false;
   console.log("exchangeFinished status:", self.exchangeFinished)
  this.cellArr[this.thisIndex].animate({
   "left": self.thisLeft,
   "top": self.thisTop
  },self.time,self.easing,function(){
   $(this).removeClass("hover");
   $(this).css("zIndex","");
   if(!self.cb_cellDown.has(self.cellDown)) self.cb_cellDown.add(self.cellDown);
  });
   console.log("******清空管道self.touchID(returncell):", self.touchID)
   self.exchangeFinished = true;
   console.log("exchangeFinished status(returncell):", self.exchangeFinished)
 },
 check:function(){
  this.e_playCount.html( ++ this.playCount);
  if(this.ranArr.join() == this.imgArr.join()){
   this.success();
  }
 },
 success:function(){
  ConfettiStart();
  this.score += this.scoreArr[this.level]
  this.e_playScore.html(this.score);
 },
  processEvent: function(event) {
    var self = this;
    console.log("processEvent********判断触摸点及exchange status:", this.touchID, this.exchangeFinished)
    if (event.originalEvent.changedTouches) {
    // 单点触控
      var currentTouch = null;
      if (event.type == "touchstart") {
        // 假如当前无触摸点，则新建一个
        if (this.touchID == null && this.exchangeFinished == true) {
          console.log("processEvent当前无touchstart触摸点，则新建一个：", this.touchID)
          this.touchID = event.originalEvent.changedTouches[0].identifier;
          currentTouch = event.originalEvent.changedTouches[0];
        } else {
          console.log("processEvent当前有touchstart触摸点：", this.touchID)
          return false;
        }
      } else if (event.type == "touchmove") {
        // 判断触发当前事件的触摸点中是否有touchID对应的触摸点
        for (let i = 0; i < event.originalEvent.changedTouches.length; i++) {
          if (event.originalEvent.changedTouches[i].identifier == this.touchID) {
            currentTouch = event.originalEvent.changedTouches[i];
            break;
          }
        }
        console.log("processEvent是否有touchmove对应的触摸点:", currentTouch)
        if (!currentTouch) {
          return false;
        }
      } else if (event.type == "touchend" || event.type == "touchcancel") {
      // 判断触发当前事件的触摸点中是否有touchID对应的触摸点
        for (let i = 0; i < event.originalEvent.changedTouches.length; i++) {
          if (event.originalEvent.changedTouches[i].identifier == this.touchID) {
            currentTouch = event.originalEvent.changedTouches[i];
            break;
          }
        }
        console.log("touchend~~~~currentTouch：", currentTouch)
        if (currentTouch) {
          self.touchID = null;
          console.log("processEvent有touchend cancel对应的触摸点,进行清除：", self.touchID)
        } else {
          console.log("processEvent没有touchend cancel对应的触摸点")
          return false;
        }
      }
      // do something for current touch point
      return true;
    }
    return false;
  }
}
$(document).ready(function(e) {
    var pg = new puzzleGame({
  img: "img/zzsc.png"
 });
});