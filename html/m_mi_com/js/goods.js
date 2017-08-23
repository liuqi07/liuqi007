//点击搜索按钮，显示搜索框
function getHref(){
    var address=decodeURI(window.location.search.substr(1));
    var arr1= address.split("&");
    var obj={};
    $(arr1).each(function(i){
        var arr=this.split("=");
        obj[arr[0]]=arr[1];
    })
    return obj;
}
var hrefObj=getHref();
var textVal;
var textVal=decodeURI(hrefObj.id);
	seek();
	function seek(){
		$.get("../json/goods.json",function(meg){
			console.log(typeof meg)
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
			for(var i=0;i<goodsTitle.length;i++){
				var goodsAll=goodsTitle[i].split(textVal);
				if(goodsAll.length!=1){
					var $li=$("<li>"+goodsTitle[i]+"</li>");
					$li.appendTo($("#p-lists ul"));
					$("#p-lists").show();
					$("#b-hot-goods").hide();
					n=goodsTitle.indexOf(goodsTitle[i]);
					arrn.push(n);
				}
			}
			/*添加页面内容*/
				for(var j=0;j<arrn.length;j++){
					$("#b-page-search h2").html('"'+textVal+'"');
					var $goodli=$("<li>"+
								"<a href='javascript:;'>"+
								"<aside><img src='../img/img/20160729_210731_"+imgUrl[arrn[j]]+".jpg' alt='' /></aside>"+
								"<article><h2>"+goodsTitle[arrn[j]]+"</h2><span>"+goodsPrice[arrn[j]]+"</span></article>"+
								"</li>");
					$goodli.appendTo($("#p-goodlists ul"));
					$("#p-lists").hide();
					$("#p-goodlists").show();
				}
			//搜索出来的商品地址栏传参

				$("#p-goodlists ul li").each(function(index){
				touch.on($(this),"tap",function(){
					var newp=arrn[index];
					console.log(newp)
					window.location.href="ninebot.html?id="+newp;
				})
			
			})
			
			
		}
	}