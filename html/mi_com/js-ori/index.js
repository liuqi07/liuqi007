
//----------tab页---------------


$(document).ready(function(){
	//使用json请求数据
	$.get("json/tab.json",function(msg){
		addTab(msg);
	});
	
	function addTab(json){
		//console.log(json);
		//遍历json数据，获取相应值
		for(var key in json){
			//通过for in遍历,取到tab页左侧list列表内容,并append到页面中
			var $li = $("<li>"+ json[key].catalog +"<span>&gt;</span></li>");
			$li.appendTo($("#banner>.list"));
			//对应列表页项目的个数，生成对应个数的子.tab页，添加到右侧的#tab中
			var $tab = $("<div class = 'tab'></div>");
			$tab.appendTo($("#tab"));
			//alert($tab.length)
			//通过for循环，读取json数据中键名为sub的数组，循环数组，生成对应ul数量
			for(var i=0;i<json[key].sub.length;i++){
				var $ul = $("<ul></ul>");
				//把sub的数据通过split分割为数组
				var arrImgUrl = json[key].sub[i].imgUrl.split(" ");
				var arrDetail = json[key].sub[i].detail.split(" ");
				//循环分割后的数组，一一添加到新节点li中，并把liappendTo到对应的ul中
				for(var j=0;j<arrImgUrl.length;j++){
					var $_li = $('<li><a href="javascript:;"><img src = "'+ arrImgUrl[j] +'" /><span>'+ arrDetail[j] +'</span><a/></li>');
					$_li.appendTo($ul);
				}
				//给ul绝对定位的left值，如果有多个ul，就依次左偏移他们自身的width，以达到左浮动的效果
				$ul.css({left:i*265+"px"}).appendTo($tab);
			}
		}
	}
});
//实现鼠标滑上tab页的相关操作
$(document).ready(function(){
	$("#banner>.list").hover(fn1,fn2);
	function fn1(e){
		$("#tab").show();
		$("#tab>.tab").hide().eq($(e.target).index()).show();
		var $li = $("#banner>.list>li");
		$li.hover(function(){
			//$(this).css("background","orange");
			$("#tab>.tab").hide().eq($(this).index()).show();
		},function(){
			//$li.css("background","");
		});
	}
	function fn2(){
		var timer = setTimeout(function(){
			$("#tab").hide();
		},100);
		$("#tab").hover(function(){
			clearTimeout(timer);timer=null;
		},function(){
			$("#tab").hide();
		});
		
	}
});

//实现shadow功能
$(document).ready(function(){
	$(".shadow-ul>li").hover(function(){
		$(this).css({boxShadow:"0 10px 50px #ccc"});
	},function(){
		$(this).css({boxShadow:"none"});
	});
})
//-----------banner轮播图--------------------

$(document).ready(function(){
	var $li = $("#banner .banner li");
	var $_li = $("#banner .sel li");
	//给每一张banner图添加z-index：4/3/2/1/0
	var num=4;
	$li.each(function(index){
		$li.eq(index).css({background:"url(img/banner/banner0"+ (index+1) +".jpg)",zIndex:num});
		num--;
	});
	var i=-1;
	var timer = null;
	carousel();
	function carousel(){
		timer = setInterval(function(){
			i==4?i=0:i++;
			toggle(i);
		},2000);
	}
	//实现滑上banner图停止定时器、滑出启动定时器
	$li.hover(function(){
		clearInterval(timer);timer = null;
	},function(){
		carousel();
	});
	//实现点击上一张下一张
	var $btnLeft = $("#banner .btnLeft");
	var $btnRight = $("#banner .btnRight");
	
	$btnLeft.click(function(){
		i==0?i=4:i--;
		clearInterval(timer);timer = null;
		toggle(i);
	});
	$btnRight.click(function(){
		i==4?i=0:i++;
		clearInterval(timer);timer = null;
		toggle(i);
	});
	$_li.mouseover(function(){
		i = $(this).index();
		clearInterval(timer);timer = null;
		toggle(i);
	});
	
	//公共操作，banner图的切换以及下标的变色和切换
	function toggle(i){
		$li.eq(i).fadeIn(600).siblings().fadeOut(600);
		$_li.css({border:"5px solid orange",background:"#fff",color:"orange"});
		$_li.eq(i).css({border:"5px solid #f00",background:"orange",color:"#fff"});
	}
});

/*----------------- main2 小米明星商品轮播图----------------------*/
$(document).ready(function(){
	var $list = $("#main2 ul");
	var $btn = $("#main2 .title .btn div");
	var timer = null;
	var i=0;
	carousel();
	function carousel(){
		timer = setInterval(function(){
			$list.animate({left:-1226},1000,function(){
				setTimeout(function(){
					$list.animate({left:0},1000)
				},1000)
			});
		},4000)
	}
	$list.hover(function(){
		clearInterval(timer);timer = null;
	},function(){
		carousel();
	});
	$btn.eq(1).click(function(){
		clearInterval(timer);timer = null;
		if(parseInt($list.css("left"))==0){
			return;
		}
		$list.stop().animate({left:0},1000,function(){
			carousel();
		});
	});
	$btn.eq(0).click(function(){
		clearInterval(timer);timer = null;
		if(parseInt($list.css("left"))==-1226){
			return;
		}
		$list.stop().animate({left:-1226},1000,function(){
			carousel();
		});
	});
	
});

/*-----------------main4 搭配 下的选项卡-------------------*/
$(document).ready(function(){
	var $a = $("#main4 .title a");
	var $list = $("#main4>ul");
	//alert($a.length+" "+$list.length);
	$a.mouseover(function(){
		$a.css({color:"#424242",borderBottom:0});
		$(this).css({color:"orange",borderBottom:"2px solid orange"});
		$list.css("zIndex",1);
		$list.eq($(this).index()).css("zIndex",2);
	});
	$li = $("#main4>.m4-right>li");
	$div = $("#main4>.m4-right>li>div");
	$li.each(function(index){
		$(this).hover(function(){
			$div.eq(index).stop().animate({bottom:0},500);
		},function(){
			$div.eq(index).stop().animate({bottom:"-65px"},500);
		});
	});
	$li2 = $("#main5>.m5-right>li");
	$div2 = $("#main5>.m5-right>li>div");
	$li2.each(function(index){
		$(this).hover(function(){
			$div2.eq(index).stop().animate({bottom:0},500);
		},function(){
			$div2.eq(index).stop().animate({bottom:"-65px"},500);
		});
	});
	$li3 = $("#main6>.m6-right>li");
	$div3 = $("#main6>.m6-right>li>div");
	$li3.each(function(index){
		$(this).hover(function(){
			$div3.eq(index).stop().animate({bottom:0},500);
		},function(){
			$div3.eq(index).stop().animate({bottom:"-65px"},500);
		});
	});
	
	
});






