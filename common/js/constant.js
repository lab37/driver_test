var handle = {
	CGI : {
    query:"http://v.juhe.cn/jztk/query",
    answer:"http://v.juhe.cn/jztk/answers",
	},
  appKey:"0129d16ee2d4266237b33ba1b73b05f4",
	subjects:["1","4"],
	models:['c1','c2','a1','a2','b1','b2'],
	storageKey:{
		defaultSubject:"default-subject",
		defaultModel:"default-model",
		userModel:"user.model",
		answerMap:"answerMap"
	},
	pages:{
		finish:"pages/finish/finish"
	}
};

module.exports = handle;