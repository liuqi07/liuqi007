/* home */


/* works */
$.get("json/works.json",function(msg){
	addListL(msg);
	addListR(msg);
		
	$(".left>div").hover(function(){
		//alert($(this).index())
		$(this).find(".a").addClass("aa");
		$(this).find(".b").addClass("bb");
		$(this).find(".c").addClass("cc");
		$(this).find("img").addClass("d");
	},function(){
		var that = this;
		$(this).find("img").removeClass("d");
			$(that).find(".c").removeClass("cc");
		setTimeout(function(){
			$(that).find(".b").removeClass("bb");	
		},200);
		setTimeout(function(){
			$(that).find(".a").removeClass("aa");
		},400);
	})
	
	$(".right>div").hover(function(){
		$(this).find(".a").addClass("aa");
		$(this).find(".b").addClass("bb");
		$(this).find(".c").addClass("cc");
		$(this).find("img").addClass("d");
	},function(){
		var that = this;
		$(this).find("img").removeClass("d");
		$(this).find(".c").removeClass("cc");
		setTimeout(function(){
			$(that).find(".b").removeClass("bb");	
		},200);
		setTimeout(function(){
			$(that).find(".a").removeClass("aa");
		},400);
	});
});
function addListL(json){
	//console.log(json["left"]);
	for(var i=0;i<json["left"].title.length;i++){
		$('<div>'+
			'<div class="point"><span></span></div>'+
			'<h4>'+ json["left"].title[i] +'<span> | </span><em>'+ json["left"].title2[i] +'</em></h4>'+
			'<div class="img"><a href="'+ json["left"].url[i] +'" target = "_blank"><img src="'+ json["left"].imgUrl[i] +'" alt="" /></a></div>'+
			'<p>作品介绍</p>'+
			'<span>'+ json["left"].cont[i] +'</span>'+
			'<div class="a"></div>'+
			'<div class="b"></div>'+
			'<div class="c"></div>'+
		'</div>').appendTo($(".main>.left"));
	}
}
function addListR(json){
	//console.log(json["right"]);
	for(var i=0;i<json["right"].title.length;i++){
		$('<div>'+
			'<div class="point"><span></span></div>'+
			'<h4>'+ json["right"].title[i] +'<span> | </span><em>'+ json["right"].title2[i] +'</em></h4>'+
			'<div class="img"><a href="'+ json["right"].url[i] +'" target = "_blank"><img src="'+ json["right"].imgUrl[i] +'" alt="" /></a></div>'+
			'<p>作品介绍</p>'+
			'<span>'+ json["right"].cont[i] +'</span>'+
			'<div class="a"></div>'+
			'<div class="b"></div>'+
			'<div class="c"></div>'+
		'</div>').appendTo($(".main>.right"));
	}
}

/* 小屏 */
$.get("json/works.json",function(msg){
	addListC(msg);
});
function addListC(json){
	var L = json["left"].title.length;
	var R = json["right"].title.length;
	for(var j=0;j<L;j++){
		$('<div>'+
			'<div class="point"><span></span></div>'+
			'<h4>'+ json["left"].title[j] +'<span> | </span><em>'+ json["left"].title2[j] +'</em></h4>'+
			'<div class="img"><a href="'+ json["left"].url[j] +'"><img src="'+ json["left"].imgUrl[j] +'" alt="" /></a></div>'+
			'<p>作品介绍</p>'+
			'<span>'+ json["left"].cont[j] +'</span>'+
		'</div>').appendTo($(".main>.center"));
	}
	for(var i=0;i<R;i++){
		$('<div>'+
			'<div class="point"><span></span></div>'+
			'<h4>'+ json["right"].title[i] +'<span> | </span><em>'+ json["right"].title2[i] +'</em></h4>'+
			'<div class="img"><a href="'+ json["right"].url[i] +'"><img src="'+ json["right"].imgUrl[i] +'" alt="" /></a></div>'+
			'<p>作品介绍</p>'+
			'<span>'+ json["right"].cont[i] +'</span>'+
		'</div>').appendTo($(".main>.center"));
	}
}

//控制skill页面中的技能百分比效果
//console.log(parseInt($('#skill .main .level li').find("strong").html()));

//console.log(parseFloat($(".level .bl").html()));
function skill(){
	$('#skill .main .level li').each(function(i){
		var num = parseInt($('#skill .main .level li').eq(i).find("strong").html());
		$('#skill .main .level li').eq(i).circleProgress({
		    value: parseFloat($(".level .bl").eq(i).html())
		}).on('circle-animation-progress', function(event, progress) {
		    $(this).find('strong').html(parseInt(num * progress) + '<i>%</i>');
		});	
	});
}
function skill2(){
	$('#skill .main .level li').circleProgress({
	    value: 0
	}).on('circle-animation-progress', function(event, progress) {
	    $(this).find('strong').html(parseInt(0 * progress) + '<i>%</i>');
	});	
}
/*$('#skill .main .level li').each(function(i){
	$(this).hover(function(){
		var num = parseInt($('#skill .main .level li').eq(i).find("strong").html());
		var bl = parseFloat($(".level .bl").eq(i).html());
		//移上时，先让百分比条归零
		$(this).circleProgress({
		    value: 0
		}).on('circle-animation-progress', function(event, progress) {
		    $(this).find('strong').html(parseInt(0 * progress) + '<i>%</i>');
		});	
		//然后再次操作百分比条
		$('#skill .main .level li').eq(i).circleProgress({
		    value: bl
		}).on('circle-animation-progress', function(event, progress) {
		    $(this).find('strong').html(parseInt(num * progress) + '<i>%</i>');
		});	
	},function(){
		
	});
})*/

/*$("#skill .level li").hover(function(){
	$(this).circleProgress({
	    value: 0
	}).on('circle-animation-progress', function(event, progress) {
	    $(this).find('strong').html(parseInt(0 * progress) + '<i>%</i>');
	});	
	$(this).circleProgress({
	    value: 0.9
	}).on('circle-animation-progress', function(event, progress) {
	    $(this).find('strong').html(parseInt(90 * progress) + '<i>%</i>');
	});	
},function(){
	
});*/

//控制contact页面中联系图标的弹出
function iAddClass(){
	$("#contact .cont i").addClass("iHover");
}
function iRemoveClass(){
	$("#contact .cont i").removeClass("iHover");
}
