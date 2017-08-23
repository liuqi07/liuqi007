//控制每个页面中互相点击切换的操作

/* HOME */
//点击上
$("#home .dir>.top").click(function(){
	//alert(1);
	$("#projects").stop().animate({top:"0"},1000);
});
//点击下
$("#home .dir>.bottom").click(function(){
	//alert(2);
	$("#skill").stop().animate({top:"0"},1000,function(){
		skill()
	});
	
});
//点击左
$("#home .dir>.left").click(function(){
	//alert(2);
	$("#about").stop().animate({left:"0"},1000,function(){
		$("#about .me *").addClass("trans");
	});
});
//点击右
$("#home .dir>.right").click(function(){
	//alert(2);
	$("#contact").stop().animate({left:"0"},1000,function(){
		iAddClass();
	});
});

/*----------------------------------------- PROJECT -----------------------------------*/
$("#projects .dir2>.top").click(function(){
	$("#projects").stop().animate({top:"-100vh"},1000);
});
//点击下
$("#projects .dir2>.bottom").click(function(){
	$("section").css("zIndex",0);
	$("#skill").css("zIndex",1).stop().animate({top:"0"},1000,function(){
		skill();
		$("#projects").stop().animate({top:"-100vh"},1000);
	});
});
//点击左
$("#projects .dir2>.left").click(function(){
	$("section").css("zIndex",0);
	$("#about").css("zIndex",1).stop().animate({left:"0"},1000,function(){
		$("#about .me *").addClass("trans");
		$("#projects").stop().animate({top:"-100vh"},1000);
	});
});
//点击右
$("#projects .dir2>.right").click(function(){
	$("section").css("zIndex",0);
	$("#contact").css("zIndex",1).stop().animate({left:"0"},1000,function(){
		iAddClass();
		$("#projects").stop().animate({top:"-100vh"},1000);
	});
});

/*----------------------------------------- skill -----------------------------------*/
$("#skill .dir2>.top").click(function(){
	$("section").css("zIndex",0);
	$("#projects").css("zIndex",1).stop().animate({top:"0"},1000,function(){
		$("#skill").stop().animate({top:"100vh"},1000);
		
	});
});
//点击下
$("#skill .dir2>.bottom").click(function(){
	$("#skill").stop().animate({top:"100vh"},1000);
	
});
//点击左
$("#skill .dir2>.left").click(function(){
	$("section").css("zIndex",0);
	$("#about").css("zIndex",1).stop().animate({left:"0"},1000,function(){
		$("#about .me *").addClass("trans");
		$("#skill").stop().animate({top:"100vh"},1000);
		
	});
});
//点击右
$("#skill .dir2>.right").click(function(){
	$("section").css("zIndex",0);
	$("#contact").css("zIndex",1).stop().animate({left:"0"},1000,function(){
		iAddClass();
		$("#skill").stop().animate({top:"100vh"},1000);
		
	});
});

/*----------------------------------------- about -----------------------------------*/
$("#about .dir2>.top").click(function(){
	$("section").css("zIndex",0);
	$("#projects").css("zIndex",1).stop().animate({top:"0"},1000,function(){
		$("#about").stop().animate({left:"-100vw"},1000);
		$("#about .me *").removeClass("trans");
	});
});
//点击下
$("#about .dir2>.bottom").click(function(){
	$("section").css("zIndex",0);
	$("#skill").css("zIndex",1).stop().animate({top:"0"},1000,function(){
		skill();
		$("#about").stop().animate({left:"-100vw"},1000);
		$("#about .me *").removeClass("trans");
	});
});
//点击左
$("#about .dir2>.left").click(function(){
//	$("#about .me *").addClass("trans");
	$("#about").stop().animate({left:"-100vw"},1000);
	$("#about .me *").removeClass("trans");
});
//点击右
$("#about .dir2>.right").click(function(){
	$("section").css("zIndex",0);
	$("#contact").css("zIndex",1).stop().animate({left:"0"},1000,function(){
		iAddClass();
		$("#about").stop().animate({left:"100vw"},1000);
		$("#about .me *").removeClass("trans");
	});
});

/*----------------------------------------- contact -----------------------------------*/
$("#contact .dir2>.top").click(function(){
	$("section").css("zIndex",0);
	$("#projects").css("zIndex",1).stop().animate({top:"0"},1000,function(){
		$("#contact").stop().animate({left:"100vw"},1000);
		iRemoveClass();
	});
});
//点击下
$("#contact .dir2>.bottom").click(function(){
	$("section").css("zIndex",0);
	$("#skill").css("zIndex",1).stop().animate({top:"0"},1000,function(){
		skill();
		$("#contact").stop().animate({left:"100vw"},1000);
		iRemoveClass();
	});
});
//点击左
$("#contact .dir2>.left").click(function(){
	$("section").css("zIndex",0);
	$("#about").css("zIndex",1).stop().animate({left:"0"},1000,function(){
		$("#about .me *").addClass("trans");
		$("#contact").stop().animate({left:"100vw"},1000);
		iRemoveClass();
	});
});
//点击右
$("#contact .dir2>.right").click(function(){
	$("#contact").stop().animate({left:"100vw"},1000);
	iRemoveClass();
});