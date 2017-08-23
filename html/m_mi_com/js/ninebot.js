/**
 * Created by Administrator on 2016/8/3.
 */
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 3.6,
    paginationClickable: true,
    spaceBetween: 15
});
var arr=[
    "../img/ninebot/gai/1.jpg","../img/ninebot/gai/2.jpg","../img/ninebot/gai/3.jpg",
    "../img/ninebot/gai/4.jpg","../img/ninebot/gai/5.jpg","../img/ninebot/gai/6.jpg",
    "../img/ninebot/gai/7.jpg","../img/ninebot/gai/8.jpg","../img/ninebot/gai/9.jpg",
    "../img/ninebot/gai/10.jpg","../img/ninebot/gai/11.jpg","../img/ninebot/gai/12.jpg",
    "../img/ninebot/gai/13.jpg","../img/ninebot/gai/14.jpg","../img/ninebot/gai/15.jpg",
    "../img/ninebot/gai/16.jpg"
];
//      console.log(arr);
var str="";
for(var i=0;i<arr.length;i++){
    str="<img src='"+arr[i]+"'>";
//            console.log(str)
    $(str).appendTo($("#gai"))
};
var arr1=[
    "../img/ninebot/can/1.jpg","../img/ninebot/can/2.jpg","../img/ninebot/can/3.jpg",
    "../img/ninebot/can/4.jpg","../img/ninebot/can/5.jpg","../img/ninebot/can/6.jpg"
];
//        console.log(arr1);
var str1="";
for(var j=0;j<arr1.length;j++){
    str1="<img src='"+arr1[j]+"'>";
//            console.log(str1)
    $(str1).appendTo($("#can"))
};
var arr2=[
    "../img/ninebot/tu/1.jpg","../img/ninebot/tu/2.jpg","../img/ninebot/tu/3.jpg",
    "../img/ninebot/tu/4.jpg","../img/ninebot/tu/5.jpg","../img/ninebot/tu/6.jpg",
    "../img/ninebot/tu/7.jpg","../img/ninebot/tu/8.jpg","../img/ninebot/tu/9.jpg"
];
//        console.log(arr2);
var str2="";
for(var g=0;g<arr2.length;g++){
    str2="<img src='"+arr2[g]+"'>";
//            console.log(str2);
//            console.log($(str2));
    $(str2).appendTo($("#tu"))
};
touch.on(".b3 ul li","tap",function(){
    var index=$(this).index();
    $(this).removeClass("bo1 bo").siblings().removeClass("bo1 bo");
    $(this).addClass("bo").siblings().addClass("bo1");
    $(".name p").eq(index).removeClass("di1").siblings().addClass("di1");
    $("#wkf_tu img").eq(index).removeClass("di1").siblings().addClass("di1");
});
touch.on("#list ul li","tap",function(){
    var index1=$(this).index();
    $(this).addClass("color").siblings().removeClass("color");
    $("#xq #list1 div").eq(index1).removeClass("di1").siblings().addClass("di1");
});

//$(window).scroll(function(){
//   // alert(2)
//    console.log($("body").scrollTop())
//})
//
//
////console.log($("body").scrollTop())
var myScroll;
var t;
function loaded() {
    myScroll = new iScroll('wrapper',{
        bounce:false,
        refresh:true,
        checkDOMChanges:true,
        onScrollMove:function(){
            if(this.y<-1000){
	                $("#go").removeClass("di1")
	                touch.on("#go img","tap",function(){
	                    myScroll.scrollTo(0,0)
	                    $("#go").addClass("di1")
	                })
	            }else{
	                $("#go").addClass("di1")
	            }
            
        },
        onTouchEnd:function(){
        	var that=this;
        	var oy=this.y;
        	t=setInterval(function(){
                if(that.y==oy){
                    clearInterval(t)
                }
        		if(that.y<-1000){
	                $("#go").removeClass("di1")
	                touch.on("#go img","tap",function(){
	                    myScroll.scrollTo(0,0)
	                    $("#go").addClass("di1")
	                })
	            }else{
	                $("#go").addClass("di1")
	            }
	            
        	},30)
            
			
        },
        onScrollEnd:function(){
        	clearInterval(t);
        }
    });
}
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', loaded, false);

touch.on("header span:first-child","tap",function(){
    window.location.href="../index.html"
})
touch.on("header span:last-child","tap",function(){
    window.location.href="search.html"
})
touch.on("footer ul li:first-child","tap",function(){
    window.location.href="../index.html"
})
touch.on("footer ul li:last-child","tap",function(){
    window.location.href="cart.html"
})


