service
answer-service.js {
  initAnswermap(callBack):初始化答案结构，把所有的答案类型对应为数字。完成后
	                         把答案映射传给callBack处理。
  getAnswerMap（callBack）：从storage得到答案结构，把所有的答案类型对应为数字。
	                          完成后把答案映射传给callBack处理。
}

    
exam-service.js {
  queryExam(Args):根据Args中的参数，从服务器取得对应的考试题，并把考试题数据交给Args中的complete方法处理。
  saveExam:(Args):保存Args.exam中的数据（考题）到storage，完成后调用Args中的回调函数，参数是（保存的考题）。
  readExam(Args,callBack)：从storage中读取Args指定的考题（科1或科4），然后调用callBack，参数是取得的数据。
  cleareExam(Args):清除storage中的Args.model类的所有考题数据。并调用Args中的回调函数。
  queryAndSaveExam(arg1,arg2):查询并且保存由arg1指定的科目（1or4），由args指定的车型（C1，B1。。。）这类
	                            的所有考题。也就是查询保存题库到storage。
  queryAndSaveAllExam():把所有车型所有科目的题库请求出来保存到storage。
  saveExamRecord(Args,callBack):保存Args提供的车型科目的考试进度等信息到storage，然后回调callBack，无参数。
  readExamRecord(Args,callBack):从storage读取Args提供的车型科目的考试进度等信息，然后回调callBack，无参数。
  }
 
 question-service.js {
   getQuestionType(args):传过一个题的答案来(args)，通过答案判断是多选还是单选。比如answer传
	                      过来是4，是answerMap的第4个项，是4，说明是单选.有返回值（1or2）1是单选。
   getQuestionAnswer(Args):传过一个题(Args)对象，反回一个对象，对象是记录了正确答案是哪个，以及每一条答案
	                        是正确(correct)还是不正确(incorrect).
  }
 
