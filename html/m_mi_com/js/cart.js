$(function(){
	var myscroll;
	function loaded(){
		setTimeout(function(){
			myscroll = new iScroll("wrapper",{
				vScrollbar:false,
				bounce:false,
				checkDOMChanges:true,
				//useTransform: false,
				onBeforeScrollStart: function (e) {
					var target = e.target;
					while (target.nodeType != 1) target = target.parentNode;
					if (target.tagName != 'I' && target.tagName != 'BUTTON')
						e.preventDefault();
				}
			})
		},100);
	}
	window.addEventListener("load",loaded,false);
});

var cartArr = localStorage.cart ? JSON.parse(localStorage.cart) : [
/*	{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"../img/cart/img22.jpg","num":1},
	{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"../img/cart/img23.jpg","num":2},
	{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"../img/cart/img24.jpg","num":1},
	{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"../img/cart/img25.jpg","num":3},
	{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"../img/cart/img26.jpg","num":1},
	{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"../img/cart/img26.jpg","num":1}*/
];


//如果cartArr数组不为空，循环数组，在购物车中生成对应数据
var cartLen = cartArr.length;
if(cartLen!=0){
	$("#lq-empty-cart").removeClass("show").addClass("hide");
	$("#wrapper").removeClass("hide").addClass("show");
	for(var i=0;i<cartLen;i++){
		var str = $('<li>'+
			'<a href="javascript:;" class="left"><img src="'+ cartArr[i].imgUrl +'" alt="" /></a>'+
			'<div class="right">'+
				'<h3>'+ cartArr[i].goodsID +'</h3>'+
				'<p>售价：<span>'+ cartArr[i].price +'</span>元&nbsp;合计<span>'+ cartArr[i].price +'</span>元</p>'+
				'<div class="num">'+
					'<button class="jian">-</button>'+
					'<input type="text" value="'+ cartArr[i].num +'" />'+
					'<button class="add">+</button>'+
				'</div>'+
				'<button class="del iconfont icon-lajixiang"></button>'+
			'</div>'+
		'</li>');
		//console.log(str);
		str.appendTo($("#lq-list .list"));
	}
	fn();
}else{
	$("#lq-empty-cart").removeClass("hide").addClass("show");
	$("#wrapper").removeClass("show").addClass("hide");
}
function fn(){
	var $price = $("#lq-list .right p span:first-child");	//商品单价
	var $subtotal = $("#lq-list .right p span:last-child");	//商品小计
	var $num = $("#lq-list .num input");					//商品件数
	var $jian = $("#lq-list .num .jian");					//操作商品减的按钮
	var $add = $("#lq-list .num .add");						//操作商品加的按钮
	var $del = $("#lq-list .del");							//移除商品
	var $_num = $("#lq-amount>div>p:first-child span")		//商品总件数
	var $total = $("#lq-amount>div>p:last-child span");		//商品总价格
	
	var subtotal = 0;	//商品小计价格
	var _num = 0;		//商品总件数
	var total = 0;		//商品总价
	
	//页面刷新后，重新计算页面中商品小计价格、商品总件数、商品总价（初始化）
	$price.each(function(i){
		subtotal = 0;
		subtotal += parseFloat($price.eq(i).html()) * parseInt($num.eq(i).val());	//当前商品小计价格 
			$subtotal.eq(i).html(subtotal);
		_num += parseInt($num.eq(i).val());		//当前商品总件数
			$_num.html(_num);
		total += subtotal;						//当前商品总价格
			$total.html(total);
	});
	/*[
		{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"img/cart/img22.jpg","num":1},
		{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"img/cart/img23.jpg","num":2},
		{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"img/cart/img24.jpg","num":1},
		{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"img/cart/img25.jpg","num":3},
		{"goodsID":"小蚁摄像机 夜视版","price":"149","imgUrl":"img/cart/img26.jpg","num":1}
	];*/
	$price.each(function(i){
		//点击减
		var num = $num.eq(i).val();
		var subtotal = $subtotal.eq(i).html();
		touch.on($jian.eq(i),"tap",function(){
			num--;
			if(num<1){
				num=1;return;
			}
			_num--;
			$num.eq(i).val(num);	//点击减之后的数量
			subtotal -= parseFloat($price.eq(i).html());	
			$subtotal.eq(i).html(subtotal);		//点击减之后的小计价格
			$_num.html(_num);					//点击减之后的总件数
			total -= parseFloat($price.eq(i).html());		
			$total.html(total);					//总金额
			cartArr = JSON.parse(localStorage.cart);	//此次获取是为了防止加入推荐商品时、点击加减操作造成的bug
			cartArr[i].num = num;
			localStorage.cart = JSON.stringify(cartArr);
			localStorage.cartNum = parseInt(_num);
		});
		
		//点击加
		touch.on($add.eq(i),"tap",function(){
			num++;
			_num++;
			$num.eq(i).val(num);	//点击加之后的数量
			subtotal = parseFloat($subtotal.eq(i).html()) + parseFloat($price.eq(i).html());
			$subtotal.eq(i).html(subtotal);		//点击加之后的小计价格
			$_num.html(_num);					//点击加之后的总件数
			total = total + parseFloat($price.eq(i).html());
			$total.html(total);					//点击加之后的总金额
			cartArr = JSON.parse(localStorage.cart);
			cartArr[i].num = num;
			localStorage.cart = JSON.stringify(cartArr);
			localStorage.cartNum = parseInt(_num);
		});
		
		//点击删除
		touch.on($del.eq(i),"tap",function(){
			$(this).parent().parent().remove();		//移除父级节点
			console.log(cartArr);
			cartArr.splice(i,1);
			console.log(cartArr);
			//删除数组中对应项
			localStorage.cart = JSON.stringify(cartArr);	//重新写入本地存储
			_num -= parseInt($num.eq(i).val());
			$_num.html(_num);
			total -= parseFloat($price.eq(i).html()) * parseInt($num.eq(i).val());
			$total.html(total);
			localStorage.cartNum = parseInt(_num);
			window.location.reload();
		});
	});
	
	//操作商品推荐栏
	$.get("../json/goods-list.json",function(json){
		//recommend(json);
		console.log(typeof json);
		if((typeof json)=="string"){
			var json = JSON.parse(json);
		}
		var goodsTitleArr = json.goodsTitle;
		var goodsPriceArr = json.goodsPrice;
		var imgUrlArr = json.imgUrl;
		//console.log(goodsTitleArr);
		//console.log(goodsPriceArr);
		var idArr = [];
		var allArr = [];
		for(var i=0;i<cartLen;i++){
			idArr.push(cartArr[i].id);
		}
		for(var i=0;i<goodsTitleArr.length;i++){
			allArr.push(i);
		}
		/*var newArr = idArr.concat(allArr);
		console.log(newArr);*/
		for(i=0;i<allArr.length;i++){
			for(j=0;j<idArr.length;j++){
				if(allArr[i]==idArr[j]){
					allArr.splice(i,1);
				}
			}
		}
		console.log(allArr)
		var newArr = [];
		var newArr = allArr.sort(function(a,b){
			return Math.random()-0.5;
		});
		
		newArr.length=5;
		for(var i=0;i<newArr.length;i++){
			$div = $('<div>'+
						'<i class="iconfont icon-xuanzhong1"></i>'+
						'<p>+ <span>'+ json.goodsPrice[newArr[i]] +'</span>元得<span>'+ json.goodsTitle[newArr[i]] +'</span></p>'+
						'<i class="">></i>'+
					'</div>');
			$div.appendTo($("#lq-list article"));
		}
		//-----------------------------------------------------------------------------
		var $check = $("#lq-list article>div i:first-of-type");
		$check.each(function(i){
			var onOff = true;
			touch.on($check.eq(i),"tap",function(){
				if(onOff){
					$check.eq(i).removeClass("icon-xuanzhong1").addClass("icon-xuanzhong").css("color","#ff6700");
					var total = parseFloat($total.html())+parseFloat($("#lq-list article>div p span:first-of-type").eq(i).html());
					var _num = parseInt($_num.html()) + 1;
					$total.html(total);
					$_num.html(_num);
					localStorage.cartNum = parseInt(_num);
					
					var a={
						"id":i,
						"imgUrl":"../img/img/20160729_210731_"+ imgUrlArr[newArr[i]] +".jpg",
						"price":goodsPriceArr[newArr[i]],
						"goodsID":goodsTitleArr[newArr[i]],
						"num":1
					}
					var cartArr = localStorage.cart ? JSON.parse(localStorage.cart) : [];
					cartArr.push(a);
					localStorage.cart = JSON.stringify(cartArr);
					
					onOff = false;
					window.location.reload();
				}else{
					$check.eq(i).removeClass("icon-xuanzhong").addClass("icon-xuanzhong1").css("color","#ddd");
					var total = parseFloat($total.html())-parseFloat($("#lq-list article>div p span:first-of-type").eq(i).html());
					var _num = parseInt($_num.html()) - 1;
					$total.html(total);
					$_num.html(_num);
					localStorage.cartNum = parseInt(_num);
					onOff = true;
				}
			});
		});
		
	});

}














