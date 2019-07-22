
// ---------------------------------tools---------------------------------
(function(window,undefined) {
	var tools = {
		getRandom:function (min,max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}
		window.tools = tools;

})(window,undefined);
// ---------------------------------tools---------------------------------


// ---------------------------------food---------------------------------

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
})();
// ---------------------------------food---------------------------------

// ---------------------------------snake---------------------------------

(function() {

	var position = 'absolute';
	// 记录之前创建的蛇
	var elements = [];
	function snake(options) {

		options = options || {};
		// 蛇节的大小
		this.width = options.width || 20;
		this.height = options.height || 20;
		// 蛇的移动方向
		this.direction = options.direction || 'right';
		// 蛇的身体蛇节 第一个元素是蛇头
		this.body = [
		{x: 3, y: 2, color: 'red'},
		{x: 2, y: 2, color: 'blue'},
		{x: 1, y: 2, color: 'blue'},
		]
	}

	snake.prototype.render = function(map) {

		// 删除之前创建的蛇
		remove();
		// 把每一个蛇节渲染到地图上
		for (var i = 0, len = this.body.length; i < len; i++) {
			// 蛇节
			var object = this.body[i];

			var div = document.createElement('div');
			map.appendChild(div);

			// 记录当前蛇
			elements.push(div);
			// 设置样式
			div.style.position = position;
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.left = object.x * this.width + 'px';
			div.style.top = object.y * this.height + 'px';
			div.style.backgroundColor = object.color;
		}
	}

	// 私有成员
	function remove() {
		for (var i = elements.length - 1; i >= 0; i--) {
			// 删除div
			elements[i].parentNode.removeChild(elements[i]);
			// 删除数组中的元素
			elements.splice(i,1);
		}
	}
	// 控制蛇移动的方法
	snake.prototype.move = function(food, map) {
		// 控制蛇的身体移动 (当前蛇节 到 上一个蛇节的位置)
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}

	// 控制蛇头的移动
	// 判断蛇头的移动方向
	var head = this.body[0];
	switch(this.direction) {
		case 'right':
			head.x += 1;
			break;
		case 'left':
			head.x -= 1;
			break;
		case 'top':
			head.y -= 1;
			break;
		case 'bottom':
			head.y += 1;
			break;
	}

	// 判断蛇头是否和食物的坐标重叠
	var headX = head.x * this.width;
	var headY = head.y * this.height;
	if (headX === food.x && headY === food.y) {
		// 让蛇增加一节,获取蛇的最后一节
		var last = this.body[this.body.length - 1];
		console.log(last);
		this.body.push({
			x: last.x,
			y: last.y,
			color: last.color
		})
		console.log(last);
		// 随机在地图上重新生成食物
		food.render(map);
	}
}

	// 暴露构造函数给外部
	window.snake = snake;
})();

// ---------------------------------snake---------------------------------

// ---------------------------------games---------------------------------
(function() {
	var that; //记录游戏对象
	function games(map) {
		this.food = new food();
		this.snake = new snake();
		this.map = map;
		that = this;
	}


	games.prototype.start = function() {
		// 把蛇和食物对象,渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);

		// 开始游戏的逻辑
		// 让蛇动起来
		runsnake();
		// 通过键盘控制蛇移动的方向
		binkey();


	}
	// 通过键盘控制蛇移动的方向
	function binkey() {
		document.addEventListener('keydown', function(e){
			console.log(e.keyCode);
			switch (e.keyCode) {
				case 37:
					this.snake.direction = 'left';
					break;
				case 38:
					this.snake.direction = 'top';
					break;
				case 39:
					this.snake.direction = 'right';
					break;
				case 40:
					this.snake.direction = 'bottom';
					break;
			}
		}.bind(that), false)
	}


	// 私有函数 让蛇动起来
	function runsnake() { 
		var timerId = setInterval(function() {
			
			this.snake.move(this.food, this.map);
			this.snake.render(this.map);
			// 获取蛇头的坐标
			var maxX = this.map.offsetWidth / this.snake.width;
			var maxY = this.map.offsetHeight / this.snake.height;
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			// console.log(maxX);
			// console.log(maxY);
			if (headX < 0 || headX >= maxX) {
				alert('游戏结束');
				clearInterval(timerId);
			}
			if (headY < 0 || headY >= maxY) {
				alert('游戏结束');
				clearInterval(timerId);
			}
		}.bind(that), 150);
	}


	window.games = games;

})();
// ---------------------------------games---------------------------------

// ---------------------------------mian---------------------------------

(function() {

	var map = document.getElementById('map');
	var games = new window.games(map);
	games.start();

})()
// ---------------------------------mian---------------------------------