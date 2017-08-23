
$(document).ready(function(){
	$.get("json/nav.json",function(msg){
		addNav(msg);
	});
	function addNav(json){
		for(var key in json){
			var $ul = $("<ul></ul>");
			$ul.appendTo($("#navMenu"));
			//console.log(json[key].sub.imgUrl);
			var arrImgUrl = json[key].sub.imgUrl.split("|");
			var arrDetail = json[key].sub.detail.split("|");
			var arrPrice = json[key].sub.price.split("|");
			for(var i=0;i<arrImgUrl.length;i++){
				var $li = $('<li><a href="mi5.html"  target = _blank><img src="'+ arrImgUrl[i] +'"></a><p>'+ arrDetail[i] +'</p><span>'+ arrPrice[i] +'</span></li>');
				$li.appendTo($ul);
			}	
		}
	}
	//主导航栏的效果
	var $list = $("#nav>.list");
	$list.hover(fn1,fn2);		//滑上导航栏
	function fn1(e){
		//console.log($(e.target).parent().index());
		$("#navMenu").stop(true,true).slideDown(300);
		$("#navMenu>ul").stop(true,true).hide().eq($(e.target).parent().index()).stop(true,true).show();
		var $li = $("#nav>.list>li");
		$li.hover(fn3,fn4);
		function fn3(){
			$("#navMenu>ul").stop(true,true).hide().eq($(this).index()).stop(true,true).show();
		}
		function fn4(){
			
		}
	}
	function fn2(){
		var timer = setTimeout(function(){
			$("#navMenu").stop(true,true).slideUp(300);
		},100);
		$("#navMenu").hover(fn3,fn4);
		function fn3(){
			clearTimeout(timer);timer = null;
		}
		function fn4(){
			var timer2 = setTimeout(function(){
				$("#navMenu").stop(true).slideUp(300);
			},200);
			$list.mouseover(function(){
				clearTimeout(timer2);timer2 = null;
			});
		}
	}
})

//--------------点击登录弹出登录框-----------
$(document).ready(function(){
	var $loginBtn = $("#top>.right>.login");
	var $registerBtn = $("#top>.right>.register");
	
	$loginBtn.click(function(){
		$("#login").slideDown(400);
		$("#mask").fadeIn(200);
	});
	$registerBtn.click(function(){
		$("#register").slideDown(400);
		$("#mask").fadeIn(200);
	});
	$(".close").click(function(){
		$("#login").slideUp(400);
		$("#register").slideUp(400);
		$("#mask").fadeOut(200);
	});
});

//---------------------登录框验证码随机------------------------
$(document).ready(function(){
	var $code = $("#register>.registerBox .code");		//验证码输入框
	var $codeText = $("#register>.registerBox>div>a");	//随机的验证码
	var arrChar = [];
	var arrChar2 = [];
	var arrNum = [];
	//获取大写A-Z的数组
	for(var i=65;i<=90;i++){
		arrChar.push(String.fromCharCode(i));
	}
	//获取小写a-z的数组
	for(var i=97;i<=122;i++){
		arrChar2.push(String.fromCharCode(i));
	}
	//获取数字0-9的数组
	for(var i=48;i<=57;i++){
		arrNum.push(String.fromCharCode(i));
	}
	//将三组数组通过concat();方法合并为一个数组
	var newArr = arrChar.concat(arrChar2,arrNum);
	var sum = "";
	for(var i=0;i<4;i++){
		var num = newArr[Math.ceil(Math.random()*61)];
		sum=sum+num;
	}
	$codeText.html(sum);
	$codeText.click(function(){
		sum = "";
		for(var i=0;i<4;i++){
			var num = newArr[Math.ceil(Math.random()*61)];
			sum=sum+num;
		}
		$codeText.html(sum);
	});
});
//------------------注册框验证-------------------
$(document).ready(function(){
	var onOff = true;
	var num = 0;
	var $input = $("#register input");
	var $span = $("#register>.registerBox>span");
	var $zcBtn = $("#register .zc");
	var username = "username";
	var password = "password";
	var userArr = getCookie("user") ? JSON.parse(getCookie("user")) : [];
	//console.log(userArr);
	$input.eq(0).blur(function(){		//验证邮箱/手机号码
		var $val = $(this).val();
		var accountRe = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
		if(accountRe.test($val)){
			if(userArr.length!=0){
				for(var i=0;i<userArr.length;i++){
					if($val==userArr[i].username){
						$span.eq(0).html("您输入的账号已经被注册，请重新输入！").css({display:"block",color:"red"});
						onOff = false;
					}else{
						$span.eq(0).html("恭喜！这个邮箱/手机号码可以注册！").css({display:"block",color:"green"});
						num++;onOff = true;
					}
				}
			}else{
				$span.eq(0).html("恭喜！这个邮箱/手机号码可以注册！").css({display:"block",color:"green"});
				num++;onOff = true;
			}
		}else{
			$span.eq(0).html("您输入的账号不正确，请重新输入！").css({display:"block",color:"red"});
			onOff = false;
		}
	});
	var str = "";
	$input.eq(1).blur(function(){		//验证密码
		var $val = $(this).val();
		str = $val;
		var passwordRe = /^\w{6,15}/;
		if(passwordRe.test($val)){
			$span.eq(1).html("您输入的密码符合要求").css({display:"block",color:"green"});
			num++;onOff = true;
		}else{
			$span.eq(1).html("请输入6-15位纯数字").css({display:"block",color:"red"});
			onOff = false;
		}
	});
	$input.eq(2).blur(function(){
		var $val = $(this).val();
		if($val==str && str!= ""){
			$span.eq(2).html("恭喜！密码通过！").css({display:"block",color:"green"});
			num++;onOff = true;
		}else{
			$span.eq(2).html("两次密码输入不一致！请重新输入！").css({display:"block",color:"red"});
			onOff = false;
		}
	});
	$input.eq(3).blur(function(){
		var $val = $(this).val();
		var $codeText = $("#register>.registerBox>div>a").html();	//随机的验证码
		if($val==$codeText){
			$span.eq(3).html("输入正确！").css({display:"block",color:"green"});
			num++;onOff = true;
		}else{
			$span.eq(3).html("输入错误，请重新输入！").css({display:"block",color:"red"});
			onOff = false;
		}
	});
	$zcBtn.click(function(){							//点击立即注册
		if(onOff){										//如果开关为真，即上面的判断全部通过
			var json = {
				username:$input.eq(0).val(),
				password:$input.eq(1).val()
			}
			userArr.push(json);
			setCookie("user",JSON.stringify(userArr),31);
			//console.log(typeof JSON.parse(getCookie("user")));
			alert("注册成功！");
			$input.val("");
			$span.css("display","none");
			$("#login").slideUp(400);					//关闭登录框、注册框、遮噪层
			$("#register").slideUp(400);
			$("#mask").fadeOut(200);
		}else{
			alert("输入有误，请检查重新输入！");
		}
	});
});
//---------------------登录框验证-----------------------
$(document).ready(function(){
	var $input = $("#login input");
	var $span = $("#login>.loginBox>span");
	var $loginBtn = $("#login>.loginBox>a");
	var username = "username";
	var password = "password";
	var userArr = getCookie("user") ? JSON.parse(getCookie("user")) : [];
	$loginBtn.click(function(){
		var $username = $input.eq(0).val();
		var $password = $input.eq(1).val();
		for(var i=0;i<userArr.length;i++){
			if($username==userArr[i].username && $password==userArr[i].password){
				alert("登录成功！");
				setCookie("usernameNow",$username);
				setCookie("passwordNow",$password);
				$("#login").slideUp(400);					//关闭登录框、注册框、遮噪层
				$("#register").slideUp(400);
				$("#mask").fadeOut(200);
				$("#top>.right>.login").css("display","none");//让登录、注册按钮隐藏，同时让info标签显示，内容为username
				$("#top>.right>.register").css("display","none");
				$("#top>.right>.info").html(userArr[i].username).css("display","block");
				$("#top>.right>.info").click(function(){	//当登录成功后，点击用户名，直接退出登录，清除cookie，并把结构还原初始状态
					var yes = confirm("确认退出？");
					if(yes){
						alert("退出成功！");
						removeCookie("usernameNow");
						removeCookie("passwordNow");
						$("#top>.right>.login").css("display","block");
						$("#top>.right>.register").css("display","block");
						$("#top>.right>.info").html("").css("display","none");		
					}
				});
				return;
			}else{
				alert("用户或者密码错误！");
				return;
			}
		}
	});
});
//----------页面刷新后，就读取cookie，有用户名和密码就自动登录上----------
$(document).ready(function(){
	if(getCookie("usernameNow")){
		$("#top>.right>.login").css("display","none");//让登录、注册按钮隐藏，同时让info标签显示，内容为username
		$("#top>.right>.register").css("display","none");
		$("#top>.right>.info").html(getCookie("usernameNow")).css("display","block");
		$("#top>.right>.info").click(function(){	//当登录成功后，点击用户名，直接退出登录，清除cookie，并把结构还原初始状态
			var yes = confirm("确认退出？");
			if(yes){
				alert("退出成功！");
				removeCookie("usernameNow");
				removeCookie("passwordNow");
				$("#top>.right>.login").css("display","block");
				$("#top>.right>.register").css("display","block");
				$("#top>.right>.info").html("").css("display","none");		
			}
		});
	}
});


//---------------------登录页 和 注册页 之间的切换------------------------
$(document).ready(function(){
	//声明变量来存储登录框的 居中位置距离可视区域顶部的距离  以及可视区域15%的高度（登录框和注册框的top是可视区域的15%）
	var loginTop = $(window).height()/6.67+$("#login").height()/2;
	var windowTop = $(window).height()/6.67;
	//console.log(loginTop);
	var $loginBtn = $("#login .login-register");
	$loginBtn.click(function(){
		$("#login").animate({height:0,top:loginTop},500,function(){
			$(this).hide().css({top:windowTop});
			$("#register").css({height:0,top:loginTop});
			$("#register").show().animate({height:550,top:windowTop},500,function(){
				$("#login").css({height:550});
			});
		});
	});
});





















