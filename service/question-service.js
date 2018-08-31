//判断单选还是多选，对题目答案做预处理

var handle,_fn;
var answerService = require('answer-service.js');
	

handle = {
  //传过一个题的答案来，通过答案判断是多选还是单选。比如answer传过来是4，是answerMap的每4个项，是4，是单选.
	getQuestionType:function(answer){
		var answerMap = answerService.getAnswerMap();
		var answerArr = answerMap[answer];
		return answerArr[0].length===1?1:2;//1单选题，2多选题
	},
  
  //生成一个标记了每个答案条目是对是错的对像。即针对一个题生成每个选项对不对的一个对象数组.
	getQuestionAnswer:function(question){
		var correctAnswer = question.answer;
		var answerMap = answerService.getAnswerMap();
		var answerArr = answerMap[correctAnswer];
		var answerStr = answerArr[0];
		var answerObj = {};
		for(var i=1 ; i<=4 ; i++){
			for(var j=0 ; j<answerStr.length; j++){
				if(i===answerStr.charAt(j)/1){//根据答案得到item1：correct或item2：correct等这样的标记了正确条目的对像数组。
					answerObj["item"+i]="correct";
				}
			}
      if (answerObj["item" + i] !== "correct") {//题中其余的条目标记为item3：in-correct等
				answerObj["item"+i] = "in-correct";
			}

		}
		return{
			answerStr:answerStr,
			answerObj:answerObj
		};
	}

};



module.exports = handle;