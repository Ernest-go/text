window.onload=function(){
	searchEffect();
	timeBack();
	bannerEffect();
}

// 头部搜索快
function searchEffect(){
		
	var banner = document.querySelector(".jd_banner");
	var search = document.querySelector(".jd_search");
	var bannerHeight = banner.offsetHeight;
	window.onscroll=function(){
		var offetTop = document.documentElement.scrollTop;
		var opacity = 0;
		console.log(offetTop);
		console.log(bannerHeight);
		opacity = offetTop/bannerHeight;
		if(offetTop < bannerHeight){
			opacity = offetTop/bannerHeight;
			search.style.backgroundColor = "rgba(233, 35, 34,"+ opacity +")";
		}
		
	}
}
function timeBack() {
	var spans = document.querySelector(".jd_sk_time").querySelectorAll("span");
	var totalTime = 3700;
	setInterval(function(){
		totalTime--;
		var hour=Math.floor(totalTime/3600);
		var minute=Math.floor(totalTime%3600/60);
		var second=Math.floor(totalTime%60);
		
		spans[0].innerHTML=Math.floor(hour/10);
		spans[1].innerHTML=Math.floor(hour%10);

		spans[3].innerHTML=Math.floor(minute/10);
		spans[4].innerHTML=Math.floor(minute%10);

		spans[6].innerHTML=Math.floor(second/10);
		spans[7].innerHTML=Math.floor(second%10);
		
	},1000)
}

// 轮播图
function bannerEffect(){
	var banner=document.querySelector(".jd_banner");
	var imgBox=banner.querySelector("ul:first-of-type");
	var first=imgBox.querySelector("li:first-of-type");
	var last=imgBox.querySelector("li:last-of-type");
	imgBox.appendChild(first.cloneNode(true));
	imgBox.insertBefore(last.cloneNode(true),imgBox.firstChild);

	var lis=imgBox.querySelectorAll("li");
	var count=lis.length;
	var bannerWidth=banner.offsetWidth;
	imgBox.style.width=count*bannerWidth+"px";
	for(var i=0;i<lis.length;i++){
		lis[i].style.width=bannerWidth+"px";
	}
	// console.log(hour);
	var index=1;
	imgBox.style.left=-bannerWidth+"px";
		window.onresize=function(){
			bannerWidth=banner.offsetWidth;
			imgBox.style.width=count*bannerWidth+"px";
			for(var i=0;i<lis.length;i++){
			lis[i].style.width=bannerWidth+"px";
		}
		imgBox.style.left=-bannerWidth+"px";
	}

	var setIndicator=function(index){
		var indicators=document.querySelector("ul:last-of-type").querySelectorAll("li");
		for(var i=0;i<indicators.length;i++){
			indicators[i].classList.remove("active");
		}
		indicators[index-1].classList.add("active");
	}

	var timerId;
	var startTime=function(){
		timerId=setInterval(function(){
		index++;
		imgBox.style.transition="left 0.5s ease-in-out";
		imgBox.style.left=(-index*bannerWidth)+"px";
		
		setTimeout(function(){
			if(index==count-1){
			index=1;
			imgBox.style.transition="none";
			imgBox.style.left=(-index*bannerWidth)+"px";
				}
			},500);
		},1000);
	}
	startTime();
	var isEnd =true;
	var startX,moveX,distanceX;
	imgBox.addEventListener("touchstart", function(e){
		clearInterval(timerId);
		startX = e.targetTouches[0].clientX;
	});
	imgBox.addEventListener("touchmove", function(e){
		if(isEnd==true){
			moveX = e.targetTouches[0].clientX;
			distanceX = moveX-startX;
			imgBox.style.transition="none";
			imgBox.style.left=-index * bannerWidth + distanceX +"px";
			// console.log(distanceX);
		}
		
	});
	imgBox.addEventListener("touchend", function(e){
		isEnd = false;
		if (Math.abs(distanceX) > 100) {
			if (distanceX > 0) {
				index--;
			}else {
				index++;
			}
			imgBox.style.transition = "left 0.5s ease-in-out";
			imgBox.style.left = -index * bannerWidth + "px";
		}else if(Math.abs(distanceX) > 0){
			imgBox.style.transition = "left 0.5s ease-in-out";
			imgBox.style.left = -index * bannerWidth + "px";
		}
		startX=0;
		moveX=0;
		distanceX=0;
		startTime();
	});
	imgBox.addEventListener("webkitTransitionEnd", function(){
		if (index==count-1) {
			index=1;
			imgBox.style.transition="none";
		imgBox.style.left=-index*bannerWidth+"px";
		}else if(index==0){
			index=count-2;
			imgBox.style.transition="none";
			imgBox.style.left=-index*bannerWidth+"px";
		}
		setIndicator(index);
		setTimeout(function(){
			isEnd = true;
			clearInterval(timerId);
			startTime();
		},500);
	});
}

