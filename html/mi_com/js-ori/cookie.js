//封装一个设置cookie的函数
function setCookie(key,value,t){
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+t);
	document.cookie=key+"="+encodeURIComponent(value)+";expires="+oDate.toGMTString();
}

//封装一个获取cookie的函数
function getCookie(key){
	var arr=document.cookie.split("; ");
	for(var i=0;i<arr.length;i++){
		var newArr=arr[i].split("=");
		if(newArr[0]==key){
			return decodeURIComponent(newArr[1]);
		}
	}
}

//删除cookie函数 
function removeCookie(key){
	setCookie(key,"",-1);
}
/*
function setCookie(_name, _value, _day){
	var d=new Date();
	d.setDate(d.getDate()+_day);
	document.cookie=_name+"="+encodeURIComponent(_value)+";expires="+d.toGMTString()+";path=/";
}

function getCookie(_name){
	var str=document.cookie;
	var arr=str.split("; ");
	for(var i=0; i<arr.length; i++){
		var col=arr[i].split("=");
		if(col[0]==_name){
			return decodeURIComponent(col[1]);
		}
	}
	return "";
}*/