// 自调用函数 --开启一个新的作用域,避免命名冲突
(function(){
	var position = 'absolute';
// 记录上一次创建的食物，为删除做准备
	var elements = [];
function food(options) {
	options = options || {};
	this.x = options || 0;
	this.y = options || 0;

	this.width = options.width || 20;
	this.height = options.height || 20;

	this.color = options.color || 'green'
}

// 渲染
food.prototype.render = function(map) {
	//删除之前创建的食物

	remove();
	// 随机设置x，y的值
	this.x = tools.getRandom(0,map.offsetWidth/this.width - 1) * this.width;
	this.y = tools.getRandom(0,map.offsetHeight/this.height - 1) * this.height;

	// 动态创建DIV 页面上显示的食物
	var div = document.createElement('div');
	map.appendChild(div);

	elements.push(div);
	// 设置div样式
	div.style.position = position;
	div.style.left = this.x + 'px';
	div.style.top = this.y + 'px';
	div.style.width = this.width + 'px';
	div.style.height = this.height +'px';
	div.style.backgroundColor = this.color;
};

function remove() {
	for (var i = elements.length - 1; i >= 0; i--) {
		// 删除DIV
		elements[i].parentNode.removeChild(elements[i]);
		// 删除数组中的元素
		// 第一个参数，从哪个元素开始删除
		// 第二个参数，删除几个元素
		elements.splice(i,1);
	}	
}

window.food = food;
})()
