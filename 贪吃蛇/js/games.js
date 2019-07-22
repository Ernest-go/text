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

})()




