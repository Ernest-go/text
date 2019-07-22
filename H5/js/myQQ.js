$(function(){
	setTimeout(function() {
		$(".section1").addClass('comein');
	},200);
    $('#fullpage').fullpage({
    	navigation: true,
    	loopBottom: true,
    	onLeave: function(index,nextIndex, direction) {
    		if(nextIndex != 1) {
    			$("#bg").addClass('rotate');
    		}else {
    			$("#bg").removeClass('rotate');
    		}
    		// 第二幕
    		if (nextIndex == 2) {
    			$(".p2").css("transform", "translateX(-50%) translateY(-50%) translateZ(0px) scale(1)");
    		}else {
    			$(".p2").css("transform", "translateX(-50%) translateY(-50%) translateZ(2000px) scale(1)");
    		}
    		if(nextIndex == 3) {
    			$(".p3").css("transform", "translateZ(-50px) rotateX(30deg)");
    			$(".title3").css("transform", "translateZ(0px) rotateX(0deg)");
    		}
    		if(nextIndex == 4) {
    			$(".p3").css("transform", "translateZ(3000px) translateZ(-50px) rotateX(-45deg)");
    			$(".title3").css("transform", "translateZ(1200px) rotateX(-60deg)");
    		}
    	}
    }); 
});