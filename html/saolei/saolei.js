
		/*思路：
		 * 1.首先生成初始化界面，通过js生成
		 * 2.生成一个随机的十个数，用来存储地雷位置
		 * 3.遍历所有的div，添加点击事件
		 * 4.点击每个div时，判断，如果点击的这个div的下角标和我的地雷数组中的某一项相等，背景变为地雷，并且结束游戏
		 * 5.否则当前点击的这个背景变为正常点开的样式
		 */
	window.onload = function(){
		//侧边栏滑上滑出
		var oMiji = $("#miji") , oLeft = $("#left");
		oLeft.onmouseover = function(){
			move(oLeft,"left",10,0);
		}
		oLeft.onmouseout = function(){
			move(oLeft,"left",10,-100);
		}
		
		var oBtn = $("#btn") , oBox = $("#box");
		var oTimer = $("#timer") , aB = $("b",oTimer);
		//循环336次，生成扫雷初始界面
		var str = "";
		for(var i=0;i<350;i++){
			str+="<div class = 'style'><span></span></div>"
		}
		oBox.innerHTML = str;
		var aDiv = $("div",oBox);
		var aSpan = $("span",oBox);
		var timer = null;
		//点击开始
		var m=0;
		oBtn.onclick = function(){
			//点击开始，实现计时器功能
			aB[0].innerHTML = '00';
			aB[1].innerHTML = '00';
			timer = setInterval(fn,1000);
			function fn(){
				aB[1].innerHTML ++ ;
				if(aB[1].innerHTML<10){
					aB[1].innerHTML = "0"+aB[1].innerHTML;
				}
				if(aB[1].innerHTML==60){
					aB[0].innerHTML ++ ;
					if(aB[1].innerHTML<10){
						aB[0].innerHTML = "0"+aB[0].innerHTML;
					}
					aB[1].innerHTML=00;
				}
			}
			
			/*思路二：当我点击开始游戏的时候，随机生成雷的同时，循环所有格子（除去有地雷的），并且判断周围雷的数量
			 * 放到盒子里，当点击这个的时候，去显示
			 * 如果点击的这个格子内的数字是0，就让挨着的并且内容数字不是地雷数组中的数字的格子全部显示
			 */
			oBtn.disabled=true;
			for(var i=0;i<350;i++){
				aDiv[i].style.background = "url(img/bj.png)";
				aSpan[i].innerHTML = "";
				aSpan[i].style.display = "none";
			}
			//随机生成50个地雷
			var arr = [];	//用于存地雷的数组
			var arr2 = [];	//用于存0-349的数组
			for(var i=0;i<350;i++){
				arr.push(i);
				arr2.push(i);
			}
			arr.sort(function(a,b){
				return Math.random()-0.5;
			});
			arr.length=50;
			console.log("地雷坐标："+arr);//打印地雷数组
			for(var i=0;i<arr.length;i++){
				arr2.push(arr[i]);
			}
			var newArr = indexOf2(arr2);	//没有地雷的坐标
			//console.log("没有地雷的坐标："+newArr);
			
			for(var i=0;i<newArr.length;i++){
				var newArr2;
				//判断点开四个角的地雷数量
				if(newArr[i]==0){
					var arr2 = [1,25,26];
					newArr2 = indexOf(arr,arr2);
				}else if(newArr[i]==24){
					var arr2 = [23,48,49];
					newArr2 = indexOf(arr,arr2);
				}else if(newArr[i]==325){
					var arr2 = [300,301,326];
					newArr2 = indexOf(arr,arr2);
				}else if(newArr[i]==349){
					var arr2 = [323,324,348];
					newArr2 = indexOf(arr,arr2);
				}else if(newArr[i]>=1 && newArr[i]<=23){
					var arr2 = [newArr[i]-1,newArr[i]+1,newArr[i]+24,newArr[i]+25,newArr[i]+26];
					//alert(arr2);
					newArr2 = indexOf(arr,arr2);
				}else if(newArr[i]>=326 && newArr[i]<=348){
					var arr2 = [newArr[i]-24,newArr[i]-25,newArr[i]-26,newArr[i]-1,newArr[i]+1];
					newArr2 = indexOf(arr,arr2);
				}else if(newArr[i]%25==0 && newArr[i]>=25 && newArr[i]<=300){
					var arr2 = [newArr[i]-24,newArr[i]-25,newArr[i]+1,newArr[i]+25,newArr[i]+26];
					newArr2 = indexOf(arr,arr2);
				}else if((newArr[i]+1)%25==0 && newArr[i]>=49 && newArr[i]<=324){
					var arr2 = [newArr[i]-26,newArr[i]-25,newArr[i]-1,newArr[i]+24,newArr[i]+25];
					newArr2 = indexOf(arr,arr2);
				}else {
					var arr2 = [newArr[i]-24,newArr[i]-25,newArr[i]-26,newArr[i]-1,newArr[i]+1,newArr[i]+24,newArr[i]+25,newArr[i]+26];
					newArr2 = indexOf(arr,arr2);;
				}
				aSpan[newArr[i]].innerHTML = newArr2.length;
			}
			game(arr);
		}
		//此函数为调用函数
		function game(arr){
			var num=0;
			var onOff = true;
			for(var i=0;i<aDiv.length;i++){
				aDiv[i].onOff = true;
				aDiv[i].index = i;
				aDiv[i].oncontextmenu = function(){
				if(this.onOff){
					this.style.background = "url(img/flag.jpg)";
					this.onOff = false;
				}else{
					this.style.background = "url(img/？.jpg)";
					this.onOff = true;
				}
					return false;
				}
				aDiv[i].onclick = function(){
					for(var i=0;i<arr.length;i++){
						if(this.index==arr[i]){
							this.style.background = "url(img/dl.png)";
							for(var j=0;j<arr.length;j++){
								aDiv[arr[j]].style.background = "url(img/dl.png)";
							}
							setTimeout(function(){alert("游戏失败！");},100);
							clearInterval(timer);timer = null;
							for(var j=0;j<aDiv.length;j++){
								aDiv[j].oncontextmenu = function(){		//游戏结束，禁用右键点击
									return false;
								}
								aDiv[j].onclick = function(){			//游戏结束，禁用左键点击
									return false;
								}
							}
							oBtn.disabled=false;
							onOff = false;
							break;
						}
					}
					if(onOff){
//-------------------------------------------------------------------------------------------------		
					//此处实现，当我点击的地方周边都没有雷的时候，即此处显示为0时，弹开周围格子，并显示相应数字
						if(aSpan[this.index].innerHTML==0){
							if(this.index==0){
								var arr2 = [1,25,26];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if(this.index==24){
								var arr2 = [23,48,49];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if(this.index==325){
								var arr2 = [300,301,326];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if(this.index==349){
								var arr2 = [323,324,348];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if(this.index>=1 && this.index<=23){
								var arr2 = [this.index-1,this.index+1,this.index+24,this.index+25,this.index+26];
								//alert(arr2);
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if(this.index>=326 && this.index<=348){
								var arr2 = [this.index-24,this.index-25,this.index-26,this.index-1,this.index+1];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if(this.index%25==0 && this.index>=25 && this.index<=300){
								var arr2 = [this.index-24,this.index-25,this.index+1,this.index+25,this.index+26];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else if((this.index+1)%25==0 && this.index>=49 && this.index<=324){
								var arr2 = [this.index-26,this.index-25,this.index-1,this.index+24,this.index+25];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								}
							}else {
								var arr2 = [this.index-24,this.index-25,this.index-26,this.index-1,this.index+1,this.index+24,this.index+25,this.index+26];
								for(var i=0;i<arr2.length;i++){
									aSpan[arr2[i]].style.display = "block";
									aDiv[arr2[i]].style.background = "url(img/bj2.png)";
								};
							}
						}
//-------------------------------------------------------------------------------------------------	
						aSpan[this.index].style.display = "block";
						this.style.background = "url(img/bj2.png)";
						for(var i=0;i<aDiv.length;i++){
							if(getStyle(aSpan[i],"display")=="block"){
								//此句作用为，循环遍历所有div，如果当前为点开状态，禁用右键小红旗功能
								aDiv[i].oncontextmenu = function(){		
									return false;
								}
								num++;
								//console.log(num);
								if(num==300){
									setTimeout(function(){
										alert("恭喜，游戏胜利！用时"+aB[0].innerHTML+"分"+aB[1].innerHTML+"秒");
									},100);
									for(var j=0;j<aDiv.length;j++){	
										aDiv[j].oncontextmenu = function(){		//游戏结束，禁用右键点击
											return false;
										}
										aDiv[j].onclick = function(){			//游戏结束，禁用左键点击
											return false;
										}
									}
									clearInterval(timer);timer = null;
									oBtn.disabled=false;
								}
							}
						}
						num=0;
					}
				}
			}
		}			
	}
