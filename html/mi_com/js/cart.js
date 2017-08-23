
//---------获取cookie，如果没有内容，显示空购物车界面------------
//---------如果有内容，显示对应信息-----------------
$(document).ready(function(){
	var $emptyCart = $(".cart-empty-bj");
	var $hasCart = $(".cart-bj");
	var cookie = document.cookie;
	var cartArr = localStorage.cart ? JSON.parse(localStorage.cart) : [];
	if(cartArr.length !=0){
		$emptyCart.css("display","none");
		$hasCart.css("display","block");
		var $cart = $("#cart>.cart");
		//console.log(cartArr);
		for(var i=0;i<cartArr.length;i++){
			var $ul = $('<ul class = "cont">'+
							'<li class = "list-a"><input type = "checkbox" value = "1"/></li>'+
							'<li class = "list-b"><div style="background:url('+ cartArr[i].imgUrl +');background-size:cover;"></div></li>'+
							'<li class = "list-c">'+ cartArr[i].good +'</li>'+
							'<li class = "list-d">'+ cartArr[i].price +'元</li>'+
							'<li class = "list-e">'+
								'<div>-</div>'+
								'<input type = "text" value = "1" />'+
								'<div>+</div>'+
							'</li>'+
							'<li class = "list-f">'+ cartArr[i].price +'元</li>'+
							'<li class = "list-g"><span>×</span></li>'+
						'</ul>');
			$ul.appendTo($cart);
		}
		
		
		/*$emptyCart.css("display","none");
		$hasCart.css("display","block");
		//console.log(cookie)
		var $cart = $("#cart>.cart");
		var arrCookie = cookie.split("; ");
		//console.log(arrCookie);
		var arr = [];
		for(var i=0;i<arrCookie.length;i++){
			var json = eval('(' + decodeURIComponent(arrCookie[i].split("=")[1]) + ')');
			//console.log(json)
			var $ul = $('<ul class = "cont">'+
							'<li class = "list-a"><input type = "checkbox" value = "1"/></li>'+
							'<li class = "list-b"><div style="background:url('+ json.imgUrl +');background-size:cover;"></div></li>'+
							'<li class = "list-c">'+ json.good +'</li>'+
							'<li class = "list-d">'+ json.price +'元</li>'+
							'<li class = "list-e">'+
								'<div>-</div>'+
								'<input type = "text" value = "1" />'+
								'<div>+</div>'+
							'</li>'+
							'<li class = "list-f">'+ json.price +'元</li>'+
							'<li class = "list-g"><span>×</span></li>'+
						'</ul>');
			$ul.appendTo($cart);
		}*/
	}else{
		$emptyCart.css("display","block");
		$hasCart.css("display","none");
	}
});

//-------------空购物车状态时，点击立即登录，跳转主页(使用了open方法)--------------
$(document).ready(function(){
	$("#cart-empty>div>a:first").click(function(){
		window.open("index.html");
	});
});

//----------首先实现的是全选、加减、计价的功能--------------
$(document).ready(function(){
	var $ul = $("#cart>.cart>.cont");				//获取到商品详情列表（除了标题栏的每个ul）
	var $checkAll = $("#cart .checkAll");			//获取到全选按钮
	var $checkBtn = $("#cart .cont input:checkbox");//获取到其他复选框
	var $price = $("#cart .cont>.list-d");			//获取商品单价
	var $subTotal = $("#cart .cont .list-f");		//获取每行的小计
	var $btnSub = $("#cart .cont .list-e>div:first-child");//获取减号按钮
	var $btnAdd = $("#cart .cont .list-e>div:last-child");//获取加号按钮
	var $txt = $("#cart .cont .list-e>input");		//获取文本框
	var $close = $("#cart .cont .list-g>span");		//获取关闭按钮
	var $total = $("#cart .cartBar>.list-e>span")	//获取所有商品总价
	var $num = $("#cart .cartBar>.list-c>span");	//选中了多少件
	var $_num = $("#cart .cartBar>.list-b>span");	//共多少件
	
	//------------滑过变色--------------------------------------
	$ul.each(function(index){
		$(this).hover(function(){
			$(this).css("background","#f3f3f3");
		},function(){
			if($checkBtn.eq(index)[0].checked){
				$(this).css("background","#f3f3f3");
			}else{
				$(this).css("background","");
			}
		});
	});
	//------------选中变色、和全选按钮的相关操作----------------------
	var num = $checkBtn.length;;		//全局变量 用户记录当前复选框中当前选中的个数
	$checkBtn.each(function(index){		//点击复选框--------------
		$(this).prop("checked",true);
		$ul.eq(index).css("background","#f3f3f3");
		$checkAll.prop("checked",true);
		$(this).click(function(){
			if($(this)[0].checked){
				$ul.eq(index).css("background","#f3f3f3");
				num++;
				//console.log(num);
				if(num==$checkBtn.length){
					$checkAll.prop("checked",true);
				}
			}else{
				$ul.eq(index).css("background","");
				num--;
				//console.log(num);
				$checkAll.prop("checked","");
			}
		});
	});
	var checkOnoff ;
	$checkAll.click(function(){		//点击全选框--------------
		if(num==$checkBtn.length){
			checkOnoff = false;
		}else{
			checkOnoff = true;
		}
		if(checkOnoff){
			$checkBtn.prop("checked",true);
			$ul.css("background","#f3f3f3");
			num=$checkBtn.length;
			//console.log(num);
			checkOnoff=false;
		}else{
			//alert(123)
			$checkBtn.prop("checked","");
			$ul.css("background","")
			num=0;
			//console.log(num);
			checkOnoff=true;
		}
	});
	//----------清空、反选------------
	var $empty = $("#cart .cartBar>.list-d>input[value=清空]");
	var $inverse = $("#cart .cartBar>.list-d>input[value=反选]");
	$empty.click(function(){		//--------清空----------
		num=0;
		$checkBtn.prop("checked","");
		$checkAll.prop("checked","");
		$ul.css("background","");
	});
	$inverse.click(function(){		//--------反选----------
		$checkBtn.each(function(index){
			if($checkBtn.eq(index).prop("checked")){	//如果有选中状态的，就变为未选中状态，同时重置全选按钮为空
				$checkBtn.eq(index).prop("checked","");
				$checkAll.prop("checked","");
				num=0;
				$ul.eq(index).css("background","");
			}else{
				$checkBtn.eq(index).prop("checked",true);//如果有未选装状态，就变为选中状态，同时让num++，判断num如果等于
				$ul.eq(index).css("background","#f3f3f3");		//复选框的长度，就把全选框选中
				num++;
				//console.log(num);
				if(num==$checkBtn.length){
					$checkAll.prop("checked",true);
				}
			}
		});
	});
	
	//-------------数量加、减操作-----------------------
	var total = 0;			//声明一个变量，用来存储所有商品总价
	var _num = 0;			//声明一个变量，用来存储所有的商品数量
	$txt.each(function(index){
		total += parseFloat($subTotal.eq(index).html());//页面加载时刷新所有商品总价金额，初始化
		_num += parseInt($txt.eq(index).val());
		//------------删除商品操作--------------------
		$close.eq(index).click(function(){
			$(this).parent().parent().slideUp(300,function(){
				$(this).remove();
				var cartArr = JSON.parse(localStorage.cart);
				cartArr.splice(index,1);
				localStorage.cart = JSON.stringify(cartArr);
				/*removeCookie(index+1);*/
				//console.log(index)
				total = total - parseFloat($price.eq(index).html()) * parseInt($txt.eq(index).val()); 
				_num = _num - parseFloat($txt.eq(index).val());
				$total.html(total);
				$_num.html(_num);
				$num.html(_num);
			});
		});
	});
	$total.html(total);		//初始化商品总金额
	$_num.html(_num);		//初始化购物车中商品总数
	$num.html(_num);
	$btnAdd.each(function(index){
		var num=$txt.eq(index).val();		//获取本文框中的商品数量
		//----------------文本框失去焦点时，重新获取当前商品数量--------------------
		$txt.eq(index).focus(function(){
			var m = parseInt($(this).val());
			$(this).blur(function(){
				if(parseFloat($txt.eq(index).val())<=0){	//如果输入的数小于0，那焦点失去时，修改值为0，同时计算当前小计的价格
					$txt.eq(index).val(0);
				}
				num=parseInt($txt.eq(index).val());
				$subTotal.eq(index).html(parseFloat($price.eq(index).html())*num+"元");	//单价 x 数量
				total = total + parseFloat($price.eq(index).html())*(num-m);
				_num = _num + num-m;
				$total.html(total);
				$_num.html(_num);
				$num.html(_num);
			});
		});
		
		//----------------------点击加--------------------------
		$(this).click(function(){			
			num++;
			$subTotal.eq(index).html(parseFloat($price.eq(index).html())*num+"元");
			$txt.eq(index).val(num);
			//console.log(total);
			total = total + parseFloat($price.eq(index).html());						//每点击一次，总价加一个当前商品的单价
			//console.log(total);
			$total.html(total);
			_num++
			$_num.html(_num);
			$num.html(_num);
		});
		//-----------------------点击减--------------------------
		$btnSub.eq(index).click(function(){	
			num--;
			if(num<0){
				num=0;
				return;
			}
			_num--;
			$_num.html(_num);
			$num.html(_num);
			$subTotal.eq(index).html(parseFloat($price.eq(index).html())*num+"元");
			$txt.eq(index).val(num);
			total = total - parseFloat($price.eq(index).html());
			$total.html(total);
		});
	});
	
});















