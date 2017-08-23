/*地址栏传参*/
	/*点击搜索按钮*/
	var onOff=true;
	var val;
	touch.on($("#b-page-search a span"),"tap",function(){
		val=$("#b-page-search input").val();
		if(onOff){
			if(val==""){
				window.location.reload();
			}else{
				window.location.href="goods.html?id="+val;
			}
		}else{
			alert("商品不存在！");
		}
		
	})
	//向地址栏传入点击的li中的值
	$("#b-hot-goods li").each(function(i){
		touch.on($(this),"tap",function(){
			val=$(this).html();
			window.location.href="goods.html?id="+encodeURI(val);
		})
	})
	
/*输入提示内容*/
//利用定时器去随时获取输入的内容，失去焦点时，关闭定时器
	var $text=$("#b-page-search input");
	var timer=null;
	
	$text.blur().focus(function(){
		timer=setInterval(function(){
			if($text.val()!=""){
			seek();
		}else{
			$("#b-hot-goods").show();
			$("#p-lists").hide();
		}
		},30)
	}).blur(function(){
		clearInterval(timer);
		timer=null;
	});

function seek(){
	$.get("../json/goods.json",function(meg){
			console.log(typeof meg);
			if((typeof meg)=="string"){
				var meg = JSON.parse(meg);
			}
			addlist(meg)
		})
		function addlist(json){
			$("#p-lists ul").html("");
			var goodsTitle=json["list"].goodsTitle;
			var imgUrl=json["list"].imgUrl;
			var goodsPrice=json["list"].goodsPrice;
			//console.log(imgUrl)
			var n;
			var arrn=[];
			var len=goodsTitle.length;
			var mmm=0;
			onOff=true;
			for(var i=0;i<len;i++){
				var goodsAll=goodsTitle[i].match($text.val());//利用match函数去寻找输入的字符，如果找到就生成li
				if(goodsAll!=null){
					var $li=$("<li>"+goodsTitle[i]+"</li>");
					$li.appendTo($("#p-lists ul"));
					$("#p-lists").show();
					$("#b-hot-goods").hide();
					n=goodsTitle.indexOf(goodsTitle[i]);
					arrn.push(n);
				}else{
					mmm++;//没有找到就让mmm的值自增一次
				}
			}
			//当找不到的长度等于list数组的长度就让开关关闭
			if(mmm==json["list"].goodsPrice.length){
				onOff=false;
			}
			//点击弹出的提示，将对应的值传入到地址中
			touch.on($("#p-lists ul li"),"tap",function(){
				val=$(this).html();
				window.location.href="goods.html?id="+val;
			})
		}
}
