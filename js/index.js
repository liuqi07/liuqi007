/* change.js */
$("#home .dir>.top").click(function(){$("#projects").stop().animate({top:"0"},1000)});$("#home .dir>.bottom").click(function(){$("#skill").stop().animate({top:"0"},1000,function(){skill()})});$("#home .dir>.left").click(function(){$("#about").stop().animate({left:"0"},1000,function(){$("#about .me *").addClass("trans")})});$("#home .dir>.right").click(function(){$("#contact").stop().animate({left:"0"},1000,function(){iAddClass()})});$("#projects .dir2>.top").click(function(){$("#projects").stop().animate({top:"-100vh"},1000)});$("#projects .dir2>.bottom").click(function(){$("section").css("zIndex",0);$("#skill").css("zIndex",1).stop().animate({top:"0"},1000,function(){skill();$("#projects").stop().animate({top:"-100vh"},1000)})});$("#projects .dir2>.left").click(function(){$("section").css("zIndex",0);$("#about").css("zIndex",1).stop().animate({left:"0"},1000,function(){$("#about .me *").addClass("trans");$("#projects").stop().animate({top:"-100vh"},1000)})});$("#projects .dir2>.right").click(function(){$("section").css("zIndex",0);$("#contact").css("zIndex",1).stop().animate({left:"0"},1000,function(){iAddClass();$("#projects").stop().animate({top:"-100vh"},1000)})});$("#skill .dir2>.top").click(function(){$("section").css("zIndex",0);$("#projects").css("zIndex",1).stop().animate({top:"0"},1000,function(){$("#skill").stop().animate({top:"100vh"},1000)})});$("#skill .dir2>.bottom").click(function(){$("#skill").stop().animate({top:"100vh"},1000)});$("#skill .dir2>.left").click(function(){$("section").css("zIndex",0);$("#about").css("zIndex",1).stop().animate({left:"0"},1000,function(){$("#about .me *").addClass("trans");$("#skill").stop().animate({top:"100vh"},1000)})});$("#skill .dir2>.right").click(function(){$("section").css("zIndex",0);$("#contact").css("zIndex",1).stop().animate({left:"0"},1000,function(){iAddClass();$("#skill").stop().animate({top:"100vh"},1000)})});$("#about .dir2>.top").click(function(){$("section").css("zIndex",0);$("#projects").css("zIndex",1).stop().animate({top:"0"},1000,function(){$("#about").stop().animate({left:"-100vw"},1000);$("#about .me *").removeClass("trans")})});$("#about .dir2>.bottom").click(function(){$("section").css("zIndex",0);$("#skill").css("zIndex",1).stop().animate({top:"0"},1000,function(){skill();$("#about").stop().animate({left:"-100vw"},1000);$("#about .me *").removeClass("trans")})});$("#about .dir2>.left").click(function(){$("#about").stop().animate({left:"-100vw"},1000);$("#about .me *").removeClass("trans")});$("#about .dir2>.right").click(function(){$("section").css("zIndex",0);$("#contact").css("zIndex",1).stop().animate({left:"0"},1000,function(){iAddClass();$("#about").stop().animate({left:"100vw"},1000);$("#about .me *").removeClass("trans")})});$("#contact .dir2>.top").click(function(){$("section").css("zIndex",0);$("#projects").css("zIndex",1).stop().animate({top:"0"},1000,function(){$("#contact").stop().animate({left:"100vw"},1000);iRemoveClass()})});$("#contact .dir2>.bottom").click(function(){$("section").css("zIndex",0);$("#skill").css("zIndex",1).stop().animate({top:"0"},1000,function(){skill();$("#contact").stop().animate({left:"100vw"},1000);iRemoveClass()})});$("#contact .dir2>.left").click(function(){$("section").css("zIndex",0);$("#about").css("zIndex",1).stop().animate({left:"0"},1000,function(){$("#about .me *").addClass("trans");$("#contact").stop().animate({left:"100vw"},1000);iRemoveClass()})});$("#contact .dir2>.right").click(function(){$("#contact").stop().animate({left:"100vw"},1000);iRemoveClass()});

/* index.js */
$.get("json/works.json",function(msg){addListL(msg);addListR(msg);$(".left>div").hover(function(){$(this).find(".a").addClass("aa");$(this).find(".b").addClass("bb");$(this).find(".c").addClass("cc");$(this).find("img").addClass("d")},function(){var that=this;$(this).find("img").removeClass("d");$(that).find(".c").removeClass("cc");setTimeout(function(){$(that).find(".b").removeClass("bb")},200);setTimeout(function(){$(that).find(".a").removeClass("aa")},400)});$(".right>div").hover(function(){$(this).find(".a").addClass("aa");$(this).find(".b").addClass("bb");$(this).find(".c").addClass("cc");$(this).find("img").addClass("d")},function(){var that=this;$(this).find("img").removeClass("d");$(this).find(".c").removeClass("cc");setTimeout(function(){$(that).find(".b").removeClass("bb")},200);setTimeout(function(){$(that).find(".a").removeClass("aa")},400)})});function addListL(json){for(var i=0;i<json["left"].title.length;i+=1){$('<div><div class="point"><span></span></div><h4>'+json["left"].title[i]+'<span> | </span><em>'+json["left"].title2[i]+'</em></h4><div class="img"><a href="'+json["left"].url[i]+'" target = "_blank"><img src="'+json["left"].imgUrl[i]+'" alt="" /></a></div><p>作品介绍</p><span>'+json["left"].cont[i]+'</span><div class="a"></div><div class="b"></div><div class="c"></div></div>').appendTo($(".main>.left"))}}function addListR(json){for(var i=0;i<json["right"].title.length;i+=1){$('<div><div class="point"><span></span></div><h4>'+json["right"].title[i]+'<span> | </span><em>'+json["right"].title2[i]+'</em></h4><div class="img"><a href="'+json["right"].url[i]+'" target = "_blank"><img src="'+json["right"].imgUrl[i]+'" alt="" /></a></div><p>作品介绍</p><span>'+json["right"].cont[i]+'</span><div class="a"></div><div class="b"></div><div class="c"></div></div>').appendTo($(".main>.right"))}}$.get("json/works.json",function(msg){addListC(msg)});function addListC(json){var L=json["left"].title.length;var R=json["right"].title.length;for(var j=0;j<L;j+=1){$('<div><div class="point"><span></span></div><h4>'+json["left"].title[j]+'<span> | </span><em>'+json["left"].title2[j]+'</em></h4><div class="img"><a href="'+json["left"].url[j]+'"><img src="'+json["left"].imgUrl[j]+'" alt="" /></a></div><p>作品介绍</p><span>'+json["left"].cont[j]+'</span></div>').appendTo($(".main>.center"))}for(var i=0;i<R;i+=1){$('<div><div class="point"><span></span></div><h4>'+json["right"].title[i]+'<span> | </span><em>'+json["right"].title2[i]+'</em></h4><div class="img"><a href="'+json["right"].url[i]+'"><img src="'+json["right"].imgUrl[i]+'" alt="" /></a></div><p>作品介绍</p><span>'+json["right"].cont[i]+'</span></div>').appendTo($(".main>.center"))}}function skill(){$('#skill .main .level li').each(function(i){var num=parseInt($('#skill .main .level li').eq(i).find("strong").html());$('#skill .main .level li').eq(i).circleProgress({value:parseFloat($(".level .bl").eq(i).html())}).on('circle-animation-progress',function(event,progress){$(this).find('strong').html(parseInt(num*progress)+'<i>%</i>')})})}function skill2(){$('#skill .main .level li').circleProgress({value:0}).on('circle-animation-progress',function(event,progress){$(this).find('strong').html(parseInt(0*progress)+'<i>%</i>')})}function iAddClass(){$("#contact .cont i").addClass("iHover")}function iRemoveClass(){$("#contact .cont i").removeClass("iHover")}