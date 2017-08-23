
//----加载list.json----
$(document).ready(function(){
	$.get("json/list.json",function(msg){
		addList(msg);
		addCart();
	});
	
	function addList(json){
		//console.log(json["0001"]);
		var arrImgUrl = json["0001"].imgUrl.split("|");
		var arrSub = json["0001"].sub.split("|");
		var arrCont = json["0001"].cont.split("|");
		var arrPrice = json["0001"].price.split("|");
		var $ul = $("#container");
		for(var i=0;i<arrImgUrl.length;i++){
			$li = $('<li><a href = "javascript:;"><img src="'+ arrImgUrl[i] +'"/></a><div class="cont"><h2><a href = "javascript:;">'+ arrSub[i] +'</a><span>'+ arrPrice[i] +'<em>元</em></span></h2><p>'+ arrCont[i] +'</p><strong>加入购物车</strong></div></li>');
			$li.appendTo($ul);
		}
	}
	//-------------点击加入购物车的功能--------------------
	//---------弹出遮噪层、显示加入购物车成功，并对应商品信息---------
	function addCart(){
		var $addCart = $("#container>li>.cont>strong");		//获取“加入购物车”的所有按钮
		var $listMask = $("#listMask");						//获取“遮噪层”
		var $success = $("#success");						//获取点击加入购物车后弹出的对话框
		//console.log($addCart.length);
		var num = 0;
		var messageArr = localStorage.message ? JSON.parse(localStorage.message) : [];
		$addCart.click(function(){
			num++;
			$listMask.fadeIn(300);							//遮躁层显示
			$success.fadeIn(500);							//成功加入购物车界面显示
			var $cont = $(this).prev().prev().html();		//<h2><a href = "javascript:;">净水器(厨下式)</a><span>1999<em>元</em></span></h2>
			var $imgUrl = $(this).parent().prev().find("img").attr("src");	//获取图片路径
			var $good = $(this).prev().prev().find("a").html();				//获取商品名称
			var $price = parseFloat($(this).prev().prev().find("span").html());//获取商品价格
			//console.log($good,$price,$imgUrl);
			//setCookie(num,"{'good':'"+ $good +"','price':'"+ $price +"','imgUrl':'"+ $imgUrl +"'}");
			var json = {
				good:$good,
				price:$price,
				imgUrl:$imgUrl
			}
			messageArr.push(json);
			console.log(messageArr);
			localStorage.message = JSON.stringify(messageArr);
			//console.log(document.cookie);
			//console.log(getCookie(num));
			$success.find(".info>h2").html($cont);
			$success.find(".info>img").attr("src",$imgUrl);
			$success.find(".btn>.close2").click(function(){	//点击继续购物关闭弹出框
				$success.fadeOut(500);
				$listMask.fadeOut(300);
			});
		});
	}
	

	
//---------------------------------------------------------
	$.get("json/list.json",function(msg){
		addMoreList(msg);
	});
	
	function addMoreList(json){
		//console.log(json["0002"]);
		var arrImgUrl = json["0002"].imgUrl.split("|");
		var arrSub = json["0002"].sub.split("|");
		var arrCont = json["0002"].cont.split("|");
		var arrPrice = json["0002"].price.split("|");
		//alert(arrImgUrl.length)
		var $ul = $("#more-list");
		for(var i=0;i<arrImgUrl.length;i++){
			$li = $('<li><a href="javascript:;"><img src="'+ arrImgUrl[i] +'" /></a><p>'+ arrSub[i] +'</p><span>'+ arrCont[i] +'</span><strong>'+ arrPrice[i] +'</strong></li>')
			$li.appendTo($ul);
		}
	}
});

//--------------查看全部--------------
$(document).ready(function(){
	var $btn = $("#channel-nav .btn");
	var $list = $("#channel-nav>.more-list");
	var onOff = true;
	$btn.click(function(){
		if(onOff){
			$list.show(500);onOff=false;
		}else{
			$list.hide(500);onOff=true;
		}
	});
});


