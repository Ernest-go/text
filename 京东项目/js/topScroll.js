//控制顶部搜索栏的显示与隐藏



window.onscroll = function() {
	console.log('页面滚动----');
	var top = document.documentElement.scrollTop;
	console.log(top);


	var nav = document.getElementsByClassName('nav')[0];

	if (top >= 150) {
		nav.style.position = "fixed";
		nav.style.top = "0";
		nav.style.height = "48px";
		nav.style.display = "block";
		nav.style.zIndex = 1000;
	}else {
		nav.style.display = "none";
		nav.style.height = "0";
	}
}