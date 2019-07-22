// 业务模块

const data = require('./data.json');


exports.showIndex = (req,res)=>{
	res.render('index',{list:data});
}