/*json加载商品列表*/
var startNum=0,endNum=10;
addList(startNum,endNum);
var nowH=0;
function addList(startNum,endNum){
	$.ajax({
		url:"json/goods-list.json",
		success:function(json){
			if((typeof json)=="string"){
				//alert(3)	//兼容云端
				var json = JSON.parse(json);
			}
			console.log(typeof json)
			var $ul=$("#b-content .goods-list");
			var $length=json.imgUrl.length;
			for(var i=startNum;i<endNum;i++){
				nowH++;
				var $li=$("<li>"+
						"<a href='javascript:;'>"+
							"<aside>"+
								"<img src='img/img/20160729_210731_"+json.imgUrl[i]+".jpg' alt='' />"+
							"</aside>"+
							"<article>"+
								"<h2>"+json.goodsTitle[i]+"</h2>"+
								"<p>"+json.goodsInfo[i]+"</p>"+
								"<span>"+json.goodsPrice[i]+"</span>"+
							"</article>"+
						"</a>"+
						"<!--购物车-->"+
						"<button class='addCar iconfont icon-gouwuche animated'></button>"+
				"</li>");
				$li.appendTo($ul);
			}
			$("#pullUp").hide();
			/*跳转详情页地址栏传参*/
			var $goDetail=$(".goods-list a");
			$goDetail.each(function(i){
				touch.on($(this),"tap",function(){
					window.location.href="html/ninebot.html?id="+i;
				})
			});
			/*添加购物车*/
			var $addCar=$(".addCar");
			var on=true;
			var num=1;
			var cartNum=localStorage.cartNum?localStorage.cartNum:0;
			$("#car-num").html("("+cartNum+")");
			var cartArr=localStorage.cart?JSON.parse(localStorage.cart):[];
			$addCar.each(function(i){
				var clickIndex=-1;
				touch.on($(this),"tap",function(){
					cartNum++;
					$(this).addClass("pulse");
					$(this).on("webkitAnimationEnd",function(){
						$(this).removeClass("pulse");
					});
					
					$("#car-num").parent().addClass("rubberBand");
					$("#car-num").parent().on("webkitAnimationEnd",function(){
						$(this).removeClass("rubberBand");
					})
					$("#car-num").html("("+cartNum+")");
					for(var j=0;j<cartArr.length;j++){
						if(i==cartArr[j].id){
							num=cartArr[j].num;
							num++;
							on=false;
							clickIndex=j;
							break;
						}else{
							num=1;
							on=true;
						}
					}
					if(on){
						var imgUrl=$(this).parent().find("img").prop("src");
						var price=$(this).parent().find("span").html();
						var goodsID=$(this).parent().find("h2").html();
						var a={
							"id":i,
							"imgUrl":imgUrl,
							"price":price,
							"goodsID":goodsID,
							"num":num
						}
						cartArr.push(a);
					}else{
						cartArr[clickIndex].num=num;
					}
					var cart=JSON.stringify(cartArr);
					localStorage.cart=cart;
					localStorage.cartNum=cartNum;
				})
			})
		}
	});
}

/*iscroll*/
	var trans;
	var myscroll;
	var onOff=true;
	
	function loaded(){
			myscroll=new iScroll("wrapper",{
				/*vScrollbar:false,*/
				bounce:false,
				checkDOMChanges:true,
				onScrollEnd:function(){
					var bottomNum=this.wrapperH-this.scrollerH;
					if((this.y<=bottomNum)&&(nowH>=endNum)){
						
						if(onOff){
							$("#pullUp").show();
						}
						trans=endNum;
						startNum=trans;
						endNum=trans+10;
						if(endNum>57){
							endNum=57;
							onOff=false;
						}
						setTimeout(function(){
							addList(startNum,endNum)
						},2000);
					}
				},
				onBeforeScrollStart: function (e) { 
					var target = e.target; 
					while (target.nodeType != 1) target = target.parentNode; 
					if (target.tagName!="BUTTON"&&target.tagName!="ASIDE"&&target.tagName!="ARTICLE"&&target.tagName!="H2"&&target.tagName!="P"&&target.tagName!="SPAN"&&target.tagName!="IMG") {
						e.preventDefault(); 
					}
					
				}

			});
	}
	window.addEventListener("load",loaded,false)
/*点击底部相应的分类换色*/
$("#b-footer li").click(function(){
	$("#b-footer a").css("color","#999");
	$(this).find("a").css("color","#ff5722");
	if($(this).index()==2){
		$("#b-footer #car-num").css("color","#999");
	}
});

