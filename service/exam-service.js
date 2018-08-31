//用于查询和保存试题到storage，同时提供一个从storage中获取试题的方法

var constant = require('../common/js/constant.js');
var wxService = require('../common/js/wx.js');

var handle = {
  //此处用于取得和处理试题
  //args是传递过来一个对像，里面有回调函数
	queryExam:function(args){
		var url = constant.CGI.query; 
		var data = {
      subject: args.subject, //试科目类型，1：科目1；4：科目4
      model: args.subject / 1 === 1 ? args.model : null, //驾照类型，可选择参数为：c1,c2,a1,a2,b1,b2；当subject=4时可省略
      testType: args.testType //测试类型，rand：随机测试（随机100个题目），order：顺序测试（所选科目全部题目）
		};
		var complete = function(resp){//请求返回后的试题处理
			if(resp.statusCode===200){
				var data = resp.data;
				if(data.error_code===0 &&data.reason==='ok'){
					if(typeof args.complete === 'function'){
						args.complete(data);
					}
				}else{
					//使用微信提供的组建进行错误提示
				}
			}else{
				//接口不稳定，需要提示用户刷新
			}
		};
		var fail = function(resp){
			//使用微信提供的组建进行错误提示

		};
		wxService.queryJH({
			url:url,
			data:data,
			complete:complete,
			fail:fail
		});
	},
  //用于保存试题，参数也是一个对象，带有complete函数
	saveExam:function(args){
		var subject = args.subject,
			model = args.subject==="1"?args.model:"All",
			key = subject + "-" + model, //保存到storage时的key键名
			data = args.exam, //args对象收到的格式化好的试题
			complete=args.complete;
		//此处应该调用等待界面
    //把试题保存到storage
		wxService.setStorage({
			"key":key,
			"data":data,
			complete:function(data){
				//此处应该关闭等待界面，并且提示保存成功
				if(typeof complete === 'function'){
					complete(data);
				}
			}
		});
	},
  //读取试题，参数也是一个对象，可以带有complete函数
	readExam:function(args,complete){
		var subject = args.subject,
		model = subject==="4"?"All":args.model,
		key =  subject+ "-" +model;
		if(complete && typeof complete === 'function'){
			wxService.getStorage(key,complete);
		}else{
			return wxService.getStorage(key);

		}
	},
  //清除storage中的试题
	cleareExam:function(args){
		var subject = args.subject,
			model = args.model,
			key = model + "-" +subject,
			data = args.exam,
			complete=args.complete;
		//此处应该调用等待界面
		wxService.setStorage({
			"key":key,
			"data":null,
			complete:function(data){
				//此处应该关闭等待界面，并且提示保存成功
				if(typeof complete === 'function'){
					complete(data);
				}
			}
		});
	},
  //获取和保存顺序练习的试题
	queryAndSaveExam:function(subject,model){
		handle.queryExam({
			subject:subject,
			model:model,
			testType:"order",
			complete:function(data){
				handle.saveExam({
					subject:subject,
					model:model,
					exam:data.result
				});
			}
		});
	},
  //把所有车型的所有试题都获取和保存起来
	queryAndSaveAllExam:function(){
		var subjectList = constant.subjects;
		var modelList = constant.models;
		for(var i=0 ;i<subjectList.length ;++i){
			var subject=subjectList[i];
			for(var j=0 ; j<modelList.length ;++j){
				if(subject===4 && j>0){//科目四不区分车型
					break;
				}
				var model=modelList[j];
				this.queryAndSaveExam(subject,model);
			}

		}
	},

  //保存考试的进度等记录
  saveExamRecord: function (args, complete) {
    var model = args.model;
    var subject = args.subject;
    var key = model + "-" + subject + "-" + "record";
    var value = args.value;
    if (complete && typeof complete === 'function') {
      wxService.setStorage({
        key: key,
        data: value
      }, complete);
    } else {
      return wxService.setStorage({
        key: key,
        data: value
      });

    }
  },
  //记取考试的进度等记录
	readExamRecord:function(args,complete){
		var model = args.model;
		var subject = args.subject;
		var key = model + "-" +subject + "-" +"record";
		if(complete && typeof complete === 'function'){
			wxService.getStorage(key,complete);
		}else{
			return wxService.getStorage(key);
		}
	}
};



module.exports = handle;