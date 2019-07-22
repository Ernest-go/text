window.onload=function() {
	// 获取左侧栏
	var ct_cLeft = document.querySelector(".ct_cLeft");
	var leftHeight = ct_cLeft.offsetHeight;
	var ulBox = ct_cLeft.querySelector("ul:first-of-type");
	var ulBoxHeigh = ulBox.offsetHeight;
	

	var maxTop=0;
	var minTop=leftHeight-ulBoxHeigh;
	var maxBounceTop=maxTop+100;
	var minBounceTop=minTop-100;

	var lis=ulBox.querySelectorAll("li");
	var startY=0;
	var moveY=0;
	var distanceY=0;
	var currenY=0;
	// 滑动事件
	ulBox.addEventListener("touchstart",function(e){
		startY = e.targetTouches[0].clientY;
	});
	ulBox.addEventListener("touchmove",function(e){
		moveY = e.targetTouches[0].clientY;
		distanceY = moveY - startY;
		if (currenY+distanceY > maxBounceTop || currenY + distanceY < minBounceTop) {
			return;
		}
		ulBox.style.transition = "none";
		ulBox.style.top = (currenY + distanceY) + "px";
	});
	ulBox.addEventListener("touchend",function(e){
		if(currenY+distanceY < minTop) {
			currenY=minTop;
			ulBox.style.transition="top 0.5s";
			ulBox.style.top=minTop+"px";
		}else if(currenY+distanceY > maxTop){ 
			currenY=maxTop;
			ulBox.style.transition="top 0.5s";
			ulBox.style.top=maxTop+"px";
		}else{
			currenY += distanceY;
		}
	
	});
	for(var i=0;i<lis.length;i++){
		lis[i].index=i;
	}
	itcast.tap(ulBox,function(e){
		for(var i=0;i<lis.length;i++){
			lis[i].classList.remove("active");
		}
		var li=e.target.parentNode;
		var liHeight=li.offsetHeight;
		li.classList.add("active");

		var index=li.index;
		ulBox.style.transition="top 0.5s";
		if(-index*liHeight < minTop){
			ulBox.style.top=minTop+"px";
			currenY=minTop;
		}else{
			ulBox.style.top=-index*liHeight+"px";
			currenY=-index*liHeight;
		}
	});	
}