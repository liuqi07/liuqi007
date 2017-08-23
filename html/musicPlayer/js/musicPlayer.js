
function a(cont){alert(cont);}
function c(cont){console.log(cont);}

var audio = $("audio")[0];
var num = 0;
var musicArr = [
	{"imgUrl":"img/5.jpg","musicUrl":"music/4.mp3","music":"五环之歌","author":"小岳岳"},
	{"imgUrl":"img/6.jpg","musicUrl":"music/5.mp3","music":"江南style","author":"Psy"},
	{"imgUrl":"img/7.jpg","musicUrl":"music/6.mp3","music":"稻香","author":"Jay"},
	{"imgUrl":"img/1.jpg","musicUrl":"music/0.mp3","music":"偏偏喜欢你","author":"陈百强"},
	{"imgUrl":"img/2.jpg","musicUrl":"music/1.mp3","music":"我也可以是流浪诗人","author":"好妹妹乐队"},
	{"imgUrl":"img/3.jpg","musicUrl":"music/2.mp3","music":"那些花儿","author":"朴树"},
	{"imgUrl":"img/4.jpg","musicUrl":"music/3.mp3","music":"生如夏花","author":"毕夏"}
];
for(var i=0;i<musicArr.length;i++){
	$("<li>"+ musicArr[i].music +"</li>").appendTo($(".list"));
}

$(".listBtn").click(function(){
	$(".list").stop().slideToggle(300);
});
//歌曲列表内li点击换歌操作
$(".list").delegate("li","click",function(){
    var pau=audio.paused;
    $(this).parent().toggle();
    num=$(this).index();
    init();
    if(!pau){
        audio.play();
    }
})
//统一有的操作封装一个独立函数
function init(){
	$("audio").prop("src",musicArr[num].musicUrl);
	$("article>img").prop("src",musicArr[num].imgUrl);
	$(".list li").removeClass("active");
	$(".list li").eq(num).addClass("active");
	$(".top>p").html(musicArr[num].music);
	$(".top>span").html(musicArr[num].author);
}
init();
function isPlay(){
	if(audio.paused){
		audio.play();
		$(".play").removeClass("glyphicon-play").addClass("glyphicon-pause");
	}else{
		audio.pause();
		$(".play").removeClass("glyphicon-pause").addClass("glyphicon-play");
	}
}
//播放模式切换
var typeArr = [0,1,2];	//顺序、随机、单曲
var typeClass = ["icon-shunxubofang","icon-suijibofang","icon-danquxunhuan"];
var typeNum = 0;
$(".type").click(function(){
	//a(2)
	c(typeNum)
	$(".type").removeClass(typeClass[typeNum]);
	typeNum++;
	typeNum= typeNum>2 ? 0 : typeNum;
	c(typeNum)
	$(".type").addClass(typeClass[typeNum]);
});
//播放、上一曲、下一曲
function prev(){
	if(typeNum==0){
		num--;
		num= num<0 ? musicArr.length-1 : num;
	}if(typeNum==1){
		num= Math.floor(Math.random()*musicArr.length);
		if(num==num){
			num= Math.floor(Math.random()*musicArr.length);
		}
	}if(typeNum==2){
		num=num;
	}
}
function next(){
	if(typeNum==0){
		num++;
		num= num>musicArr.length-1 ? 0 : num;
	}if(typeNum==1){
		if(num==num){
			num= Math.floor(Math.random()*musicArr.length);
		}
	}if(typeNum==2){
		num=num;
	}
}
$(".play").click(function(){
	isPlay();
});
$(".prev").click(function(){
	prev();
	if(!audio.paused){
		init();
		isPlay();
	}else{
		init();
	}
});
$(".next").click(function(){
	next();
	if(!audio.paused){
		init();
		isPlay();
	}else{
		init();
	}
});
//监控播放结束，执行下一曲操作
audio.onended = function(){
	$(".next").click();
	this.play();
}
//播放时间
audio.ontimeupdate = function(){
	//c(this.currentTime);	当前音乐播放位置
	//c(this.duration); 当前音乐总时长
	var m1 = Math.floor(this.currentTime/60);
	var s1 = parseInt(this.currentTime%60);
	m1= m1<10 ? "0"+m1 : m1;
	s1= s1<10 ? "0"+s1 : s1;
	$("footer p span:first-child").html(m1+":"+s1);
	var m2 = Math.floor(this.duration/60);
	var s2 = parseInt(this.duration%60);
	m2= m2<10 ? "0"+m2 : m2;
	s2= s2<10 ? "0"+s2 : s2;
	$("footer p span:last-child").html(m2+":"+s2);
	var ratio = this.currentTime / this.duration;	//比例
	var L = ratio * $(".scroll").width();
	$(".scrp").css("width",L);		//播放条和当前音乐同步
	$(".scrd").css("left",L);
}
//拖拽播放条
$(".scrd").mousedown(function(e){
	var L = e.clientX - $(".scrp").offset().left;
	$(document).mousemove(function(e){
		var X = e.clientX - $(".scrp").offset().left;
		//c(X);
		X= X<0 ? 0 : X;
		X= X>$(".scroll").width()-$(".scrd").width() ? $(".scroll").width()-$(".scrd").width() : X;
		$(".scrp").css("width",X);
		$(".scrd").css("left",X);
		var ratio = X / $(".scroll").width();
		audio.currentTime = audio.duration * ratio;
	});
	$(document).mouseup(function(){
		$(document).off();
	});
});
//拖拽音量条
audio.volume = 0.5;
$(".vold").mousedown(function(e){
	var L = e.clientX - $(".volp").offset().left;
	$(document).mousemove(function(e){
		var X = e.clientX - $(".volp").offset().left;
		//c(X);
		X= X<0 ? 0 :X;
		X= X>($(".volume").width()-$(".vold").width()) ? ($(".volume").width()-$(".vold").width()) : X;
		$(".volp").css("width",X);
		$(".vold").css("left",X);
		var ratio = X / $(".volume").width();
		audio.volume = ratio;
	});
	$(document).mouseup(function(){
		$(document).off();
	});
});










