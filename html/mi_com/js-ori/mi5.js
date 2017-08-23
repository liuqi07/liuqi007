//---------------吸顶----------------
$(document).ready(function(){
	var onOff = true;
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop();
		var $ceiling = $(".ceiling");
		if(scrollTop>=140&&scrollTop<$(window).height()*9&&onOff){
			$ceiling.css({position:"fixed",left:0,top:0,display:"none"});
			$ceiling.stop(true).slideDown(400);
			onOff = false;
		}else if(scrollTop<140){
			$ceiling.css({position:""});
			onOff = true;
		}else if(scrollTop>$(window).height()*9){
			$ceiling.slideUp(400);
			onOff = true;
		}
	});
});

/*---------------stair楼梯--------------------*/
$(document).ready(function(){
	//设置每个id中含有main的div的高度等于可视区域的高度
	$("div[id^=main]").css("height",$(window).height());
	//实现滑动到190px后让楼梯显示，以及其他相关操作
	var $stair = $("#stair");
	var $li = $("#stair li");
	var $span = $("#stair li span");
	var $a = $("#stair li a");
	var onOff = true;
	$(window).scroll(function(){
		var scrollTop = $(document).scrollTop();
		$a.css({background:"#333333",border:"5px solid rgba(255,255,255,0.6)"});
			$a.eq(Math.floor((scrollTop+($(window).height())/2-190)/($(window).height()))).css({background:"#E0E0E0",border:"5px solid #6ec9fd"});
		if(scrollTop>190 && scrollTop<=$(window).height()*9 && onOff){
			$stair.show(300);
			onOff = false;
		}else if(scrollTop<190 || scrollTop>$(window).height()*9){
			//alert(123)
			$stair.hide(300);
			onOff = true;
		}
	});
	
	$a.hover(function(e){
		$(this).siblings().fadeIn(100);
	},function(){
		$(this).siblings().fadeOut(100);
	});
	
	$li.click(function(){
		var T = $("div[id^=main]").eq($(this).index()).offset().top;
		$("body").stop().animate({scrollTop:T},500)
	});
});

/*----------------mousewheel测试---------------------*/
/*$(function(){
	$(window).mousewheel(function(event, delta){
		console.log(event,delta);
		console.log(typeof delta);
	});
})*/

/*----------------main4 相机介绍 动图---------------------*/
$(document).ready(function(){
	var $li = $("#main4>.picGlass>li");
	var $cont = $("#main4>.picGlass>li div");
	$cont.hide();
	$li.hover(fn1,fn2);
	
	function fn1(){
		$(this).stop().animate({backgroundSize:"500px"},500);
		//$cont.eq($(this).index()).fadeIn(300);
		console.log($(this).css("backgroundSize"));
	}
	function fn2(){
		$(this).stop().animate({backgroundSize:"488px"},500);
		console.log($(this).css("backgroundSize"));
		//$cont.eq($(this).index()).fadeOut(300);
	}
});

/*----------------main9 版本选择按钮切换---------------------*/
$(document).ready(function(){
	/*var arrImg = ["img/mi5/h-21.png","img/mi5/h-22.png","img/mi5/h-23.png","img/mi5/h-24.jpg"];
	var $li = $("#main9>.version-list>li>ul>li");
	var $img = $("#main9>.version-list>li>.img");
	$li.click(function(){
		$(this).css("border","1px solid #ccc").siblings().css("border","1px solid #fff");
		$(this).parent().prev().css({background:"url("+ arrImg[$(this).index()] +")",backgroundSize:"cover"});
	});*/
	//以上是点击修改背景图的方法------以下是插入图片的方法，可以实现淡入淡出
	var arrImg = ["img/mi5/h-21.png","img/mi5/h-22.png","img/mi5/h-23.png","img/mi5/h-24.jpg"];
	var $li = $("#main9>.version-list>li>ul>li");
	var $imgDiv = $("#main9>.version-list>li>.img");
	var index = 4;
	for(var i=0;i<arrImg.length;i++){
		var $img = $("<img style = 'z-index:"+ index +"' src = '"+arrImg[i]+"' />");
		$img.appendTo($imgDiv);
		index--;
	}
	$("<img style = 'z-index:5' src = 'img/mi5/h-22.png' />").appendTo($("#main9>.version-list>.show-mid>.img"));
	$("<img style = 'z-index:5' src = 'img/mi5/h-23.png' />").appendTo($("#main9>.version-list>.show-right>.img"));
	
	$li.click(function(){
		$(this).css("border","1px solid #ccc").siblings().css("border","1px solid #fff");
		$(this).parent().prev().children().stop().fadeOut(300);
		$(this).parent().prev().children().eq($(this).index()).stop().fadeIn(300);
	});
});










