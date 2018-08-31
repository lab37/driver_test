//用来初始化答案格式和从storage中获取答案

var handle,_fn;
var constant = require('../common/js/constant.js');
var wxService = require('../common/js/wx.js');

_fn = {
  //请求并获取答案格式
  queryAnswerMap: function (args) {
    var url = constant.CGI.answer;
    //封装串连complete方法，处理resp对象取出data后再complete
    var complete = function (resp) {//处理错误
      var data = resp.data;
      if (data.error_code === 0 && data.reason === '查询成功') {
        if (typeof args.complete === 'function') {
          args.complete(data);
        }
      } else {
        //使用微信提供的组建进行错误提示
      }
    };
    //封装faild方法
    var faild = function (resp) {
      //使用微信提供的组建进行错误提示

    };
    //发送请求，获取答案格式
    wxService.queryJH({
      url: url,
      complete: complete,
      faild: faild
    });
  },
  //将答案中的ABCD转化为1234数字，即data化，返回的答案格式不变
  dataAnswerMap: function (args) {//将文字映射数字化，args是聚合答案的返回resp对像
    var keyWordMap = {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4",
      "正确": "1",
      "错误": "2"
    };
    var or = "或者";
    var choices = args.result;
    var answerMap = {};

    for (var i in choices) {
      var choice = choices[i];//选项文字
      var answerList = [];
      var curAnswer = "";
      for (var j in keyWordMap) {
        var keyWord = j + "";
        if (choice.indexOf(or) === 0) {
          answerList.push(curAnswer);
          curAnswer = "";
          choice = choice.substring(or.length, choice.length);
        }
        if (choice.indexOf(keyWord) === 0) {
          curAnswer = curAnswer + keyWordMap[keyWord];
          choice = choice.substring(j.length, choice.length);
          if (choice.length <= 0) {
            break;
          }
        }

      }
      answerList.push(curAnswer);
      answerMap[i] = answerList;
    }
    
    return answerMap;
  },
  //保存答案映射
  saveAnswerMap: function (answerMap) {
    wxService.setStorage({
      key: constant.storageKey.answerMap,
      data: answerMap,
      complete: function () {

      }
    });

  },
  //获取答案映射
  getAnswerMap: function (callBack) {
    if (callBack && typeof callBack === 'function') {
      wxService.getStorage({
        key: constant.storageKey.answerMap,
        complete: callBack
      });
    } else {
      return wxService.getStorage(constant.storageKey.answerMap);
    }

  }
  
};



var handle = {
	initAnswerMap:function(callBack){
		_fn.queryAnswerMap({
			complete:function(resp){
				var answerMap = _fn.dataAnswerMap(resp);
				_fn.saveAnswerMap(answerMap);
				if(typeof callBack==='function'){
					callBack(answerMap);
				}
			}

		});
	},
	getAnswerMap:function(callBack){
		return _fn.getAnswerMap(callBack);
	}
};


module.exports = handle;