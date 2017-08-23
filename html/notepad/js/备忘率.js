
function a(cont){
	alert(cont);
}
function c(cont){
	console.log(cont)
}
var messageArr = localStorage.message ? JSON.parse(localStorage.message) : [];
/*var messageArr = JSON.parse(localStorage.message) || [];*/		//这个不可以，当手动删除message时，再次点击submit会报错
c(messageArr);
//页面开始加载的时候，读取本地数据中的message，如果有，加工后写入页面中
for(var i=0;i<messageArr.length;i++){
	var $cont = $(".cont").eq(0).clone().removeClass("hidden");
	$cont.find("h2").html(messageArr[i].title);
	$cont.find(".date").html(messageArr[i].date);
	$cont.find(".nr").html(messageArr[i].cont);
	$cont.prependTo($("section"));
}
//点击提交按钮
$("#sub").click(function(){
	//判断有一个为空，提示并return出去
	if($("aside input[type=text]").val()==""||$("aside input[type=date]").val()==""||$("aside textarea").val()==""){
		alert("请输入内容！");
		return;
	}
	var yes = confirm("确认提交？");
	if(yes){
		var title = $("aside input[type=text]").val();
		var date = $("aside input[type=date]").val();
		var cont = $("aside textarea").val();
		//c(title+" "+date+" "+cont)
		var json = {
			"title":title,
			"date":date,
			"cont":cont
		}
		messageArr.push(json);
		//c(messageArr);
		localStorage.message = JSON.stringify(messageArr);
		
		var $cont = $(".cont").eq(0).clone().removeClass("hidden");
		$cont.find("h2").html(title);
		$cont.find(".date").html(date);
		$cont.find(".nr").html(cont);
		//$cont.appendTo($("section"));		//新生成的插入到后面，但是在下面直接删除对应节点无法实现，不知道原因
		$cont.prependTo($("section"));		//新生成的插入到最前面，可以直接在下面实现删除对应节点
		
		$("aside input[type=text]").val("");
		$("aside input[type=date]").val("");
		$("aside textarea").val("");
		
		/*$(".del").click(function(){
			a(1)
			$(this).parent().remove();
		});*/
	}
	return false;
});

$("section").delegate(".del","click",function(){		//利用时间委托，实现对页面动态生成的新节点绑定点击事件
	var yes = confirm("确认删除？")
	if(yes){
		var index = $(this).parent().index();
		//a(index);
		messageArr.splice(index,1);							//把数组中对应的本地数据删掉
		localStorage.message = JSON.stringify(messageArr);	//再把新数组转化为字符串，写入本地数据中
		$(this).parent().remove();
	}
});

$("#btn").click(function(){
	var yes = confirm("确认全部删除？");
	if(yes){
		messageArr = [];
		//localStorage.message = JSON.stringify(messageArr);	//不能用clear()全部清除，是因为也会清除掉本地其他的数据
		localStorage.removeItem("message");
		$("section>div").not($("section>div:last-child")).remove();
		//$("section>div[class$=cont]").remove();	
		//$("section>div[class!='cont hidden']").remove();	
	}
});









