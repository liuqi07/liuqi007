function $(sel,context,tagName){context=context||document;tagName=tagName||"*";if(sel.charAt(0)=="#"){return document.getElementById(sel.substring(1))}else if(sel.charAt(0)=="."){var aEls=context.getElementsByTagName(tagName);var arrEls=[];for(var i=0;i<aEls.length;i+=1){var arrClassNames=aEls[i].className.split(" ");for(var j=0;j<arrClassNames.length;j+=1){if(arrClassNames[j]==sel.substring(1)){arrEls.push(aEls[i]);break}}}return arrEls}else{return context.getElementsByTagName(sel)}}function getStyle(obj,attr){return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]}function indexOf(arr1,arr2){if(arguments.length==2){var newArr=[];for(var i=0;i<arr2.length;i+=1){for(var j=0;j<arr1.length;j+=1){if(arr2[i]==arr1[j]){newArr.push(arr2[i])}}}return newArr}return "输入的内容有误！"}function indexOf2(arr){var newArr=[];for(var i=0;i<arr.length;i+=1){var onOff=true;for(var j=0;j<arr.length;j+=1){if(j!=i){if(arr[i]==arr[j]){onOff=false}}}if(onOff){newArr.push(arr[i])}}return newArr}function move(obj,attr,speed,target,endFn){clearInterval(obj.timer);speed=parseInt(getStyle(obj,attr))<target?speed: -speed;obj.timer=setInterval(function(){var num=parseInt(getStyle(obj,attr))+speed;if(num>target&&speed>0||num<target&&speed<0){num=target}obj.style[attr]=num+"px";if(num==target){clearInterval(obj.timer);obj.timer=null;endFn&&endFn()}},30)}function startMove(obj,json,fn){clearInterval(obj.timer);obj.timer=setInterval(function(){var onOff=true;for(var attr in json){if(attr=="opacity"){var iCur=parseInt(getStyle(obj,attr)*100)}else{var iCur=parseInt(getStyle(obj,attr))}var speed;if((json[attr]-iCur)>0){speed=Math.ceil((json[attr]-iCur)/8)}else{speed=Math.floor((json[attr]-iCur)/8)}if(iCur!=json[attr]){onOff=false}if(attr=="opacity"){obj.style.opacity=(iCur+speed)/100;obj.style.filter="alpha(opacity="+(iCur+speed)+")"}else{obj.style[attr]=iCur+speed+"px"}}if(onOff){clearInterval(obj.timer);obj.timer=null;fn&&fn()}},30)}