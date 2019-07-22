// 移动端tap点击事件
var itcast={
	tap:function(dom,callback){
		if(!dom || typeof dom!="object"){
			return;
		}
		var startTime,startX,startY;
		dom.addEventListener("touchstart",function(e){
			if(e.targetTouches.length > 1){
				return;
			}
			startTime=Date.now();
			startX= e.targetTouches[0].clientX;
			startY= e.targetTouches[0].clientY;
		})
		dom.addEventListener("touchend",function(e){
			if(e.changedTouches.length > 1){
				return;
			}
			if (Date.now()-startTime > 150) {
				return;
			}
			var endX=e.changedTouches[0].clientX;
			var endY=e.changedTouches[0].clientY;

			if (Math.abs(endX-startX) < 6 && Math.abs(endY-startY) < 6) {
				callback && callback(e);
			}

		})
	}
};