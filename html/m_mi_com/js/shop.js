//----加载goods.json,商品详情页----
getGoods()
function getGoods(){
	$.get("../json/goods.json",function(msg){
		//console.log(typeof msg);
		if((typeof msg)=="string"){
			var msg = JSON.parse(msg);
		}
		addShop(msg);
		shopl();
	})
	
	function addShop(json){
		var num=0;
		for(var key in json["shops"]){
			var catalog=json["shops"][key].catalog;
			var imgUrl=json["shops"][key].sub.imgUrl.split("|");
			var detail=json["shops"][key].sub.detail.split("|");
			var shop=$(".shop");
			var h2=$("<h2>"+catalog+"</h2>");
			var $ul=$("<ul></ul>");
			var illeng=imgUrl.length;
			for(var i=0;i<imgUrl.length;i++){
				var $li=$('<li class="goods"><a href="javascript:;"><img src="'+imgUrl[i]+'"/><span>'+detail[i]+'</span></a></li>')
				$li.appendTo($ul);
				
			}		
			h2.appendTo(shop.eq(num))
			$ul.appendTo(shop.eq(num))
			num++;
		}
	}
	function shopl(){
			var $gli=$(".shop ul li")
			$gli.each(function(i){
				touch.on($(this),"tap",function(){
					var lispan=$gli.eq(i).find("span").html();
					window.location.href="goods.html?id="+encodeURI(lispan);
					
				});	
			});
		};
}

$(function(){
	var myscroll;
	function loaded(){
		setTimeout(function(){
			myscroll=new iScroll("wrapper",{
				hideScrollbar:true,
				bounce:false,
				checkDOMChanges:true,
				onBeforeScrollStart: function (e) { 
					var target = e.target; 
					while (target.nodeType != 1) target = target.parentNode; 
					if (target.tagName != "A" && target.tagName != "IMG" && target.tagName != "SPAN") {
					e.preventDefault();} 
				}
			});
			
		},100)
	}
	window.addEventListener("load",loaded,false);
})
/*购物车数量*/
var cartNum=localStorage.cartNum?localStorage.cartNum:0;
$("#car-num").html("("+cartNum+")");
/*$(function(){
	var $text=$("#b-page-search input");
	touch.on(".top i","tap",function(){
		window.location.href="http://127.0.0.1:8020/xiaomi/html/search.html"
	})
})*/
