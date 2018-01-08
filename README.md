# kumic

/*自定义函数库@DragonShen###2017/12/30*/
$(function(){
	
	/***
		功能：判读设备类型
		使用方法：browser.versions.mobile();
	***/
	var browser={ 
		versions:function(){
			var u = navigator.userAgent, app = navigator.appVersion; 
			return { //移动终端浏览器版本信息 
				trident: u.indexOf('Trident') > -1, //IE内核 
				presto: u.indexOf('Presto') > -1, //opera内核 
				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核 
				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核 
				mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端 
				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端 
				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器 
				iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器 
				iPad: u.indexOf('iPad') > -1, //是否iPad 
				webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部 
				weiXin:u.match(/MicroMessenger/i) == "MicroMessenger" //判断微信浏览器的代码
			};
		}(), 
		language:(navigator.browserLanguage || navigator.language).toLowerCase()
	}
	//if(browser.versions.mobile){ return true; }else{ return false; }
	
	
	
	/***
		功能：是否是ie浏览器
	***/
	if(browser.versions.trident){
		$("body").append('<div class="Runbrower">对IE8/IE9/IE10浏览器支持不是很完美。请使用目前更新的浏览器访问我们的网站，体验效果更佳。</div>');
		$(".Runbrower").css({"position":"fixed","top":"0","left":"0","min-height":"18px","padding":"6px 5%","line-height":"18px","width":"90%","background-color":"#FFF","text-align":"center","z-index":"9999999","border-bottom":"#ccc 1px solid"});
	}



	/***
		功能：禁用右键、文本选择功能、复制按键、刷新
		使用方法：$(this).isCopy();
	***/
	$.fn.isCopy=function(){
		$(document).bind("contextmenu",function(){return false;});
		$(document).bind("selectstart",function(){return false;});
		$(document).keydown(function(){
			if(event.keyCode==116){//屏蔽F5刷新键   
				event.keyCode=0;   
				event.returnValue=false;   
			}
			return key(arguments[0])
		});
	};



	/***
		功能：图片错误加载默认图片
		使用方法：$("img").errorImg(1);
	***/
	$.fn.errorImg=function(i){
		$(this).error(function(e) {
			var $blank="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";//空白图片
			var $defimg="url(skin/images/logo.jpg) no-repeat center center #f0f0f0";
			if(i==0){//不带边框
				$(this).attr('src',$blank)
							 .css({'background':$defimg}).fadeIn("slow");
			}else{//带边框
				$(this).attr('src',$blank)
							 .css({'background':$defimg,
										 'border':'#ddd 1px solid',
										 'width':$(this).width()-2,
										 'height':$(this).height()-2}
							 ).fadeIn("slow");
			}
		});		
	};



	/***
		功能：图片宽高自适应
		使用方法：$(".imge").imgAuto();
	***/
	$.fn.imgAuto = function(){
		$(this).each(function() {
			$ele = $(this);
			$_w = $ele.width();
			$_h = $ele.height();
			$_i = $_w/$_h;
			$ele.css({"overflow":"hidden"});
			$img=$ele.find("img");
			$img.css({"display":"block"});
			$w = $img.width();
			$h = $img.height();
			$i = $w/$h;
			if($w<=$_w && $h<=$_h){
				$img.width($w);
				$img.height($h);
				$ver=($_h-$h)*0.5;
				$hor=($_w-$w)*0.5;
				$img.css({"padding":""+$ver+"px "+$hor+"px"});
			}else{
				if($i>$_i){
					$img.width($_w);
					$img.height($_w/$i);
					$ptop=($_h-($_w/$i))*0.5;
					$img.css({"padding":$ptop+"px 0"});
				}else{
					$img.width($_h*$i);
					$img.height($_h);
					$pleft=($_w-($_h*$i))*0.5;
					$img.css({"padding":"0 "+$pleft+"px"});
				}
			}
		});
	}



	/***
		功能：文本框得到焦点则清空提示文本，失去焦点则显示提示文本
		HTML实例 <input class="txt" tips="提示文本" value="提示文本"/>
		使用方法：$(".txt").onfocus();
	***/
	$.fn.onfocus=function(){
		$(this).focus(function(){ 
			if($(this).val()==$(this).attr("tips")){ $(this).val("");}
		}).focusout(function(){
			if($(this).val()==$(this).attr("tips") || $(this).val()==""){ $(this).val($(this).attr("tips"));}
		});
	};



	/*
		鼠标悬停 层/元素透明半透明
		参数说明:
		subdiv  鼠标悬停层class/id/元素
		i       悬浮类型可选值 0/1
		opacity 鼠标未被悬停的元素透明值 eg:0.5
		使用方法：$(".viewport ul").transEle("li",1,0.5);
	*/
	$.fn.transEle=function(subdiv,i,opacity){
		var _self=$(this);
		if(i==0){
			_self.find(subdiv).css("opacity",opacity).hover(
				function(){ $(this).stop().animate({opacity: '1'},300); },
				function(){ $(this).stop().animate({opacity: opacity},200);}
			)
		}else{
			_self.mouseenter(function(){
				$(this).find(subdiv).css("opacity",opacity);
				$(this).find(subdiv).hover(
					function(){ $(this).stop().animate({opacity: '1'},300); },
					function(){ $(this).stop().animate({opacity: opacity},200);}
				)
			}).mouseleave(
				function(){ $(this).find(subdiv).stop().css("opacity","1")
			})
		}	
	};



	/***
		功能：点击导航下拉菜单
		使用方法：$(".navi ul li").DownlMenu();
	***/
	$.fn.DownlMenu=function(){
		var $seft = $(this);
		$seft.each(function() {
			var m = 180;
			if($seft.children(".subnavi").size()){
				
				$(this).click(function(){
						var $sa = $(this).children("a");
						var $sub = $(this).children('.subnavi');
						if($sub.css("display")=="none"){
							$sa.addClass('on');
							$sub.stop(false, true).slideDown(m);
						}else{
							$sa.removeClass('on');
							$sub.stop(false, true).slideUp(m);
						}
					}								
				);
				
				$(document).bind("click",function(e){
					if($(e.target).closest($seft).length == 0){
						$seft.children("a").removeClass('on');
						$seft.children('.subnavi').stop(false, true).slideUp(m);
					}
				})

			}
		}); 
	};



	/***
		功能：悬停导航下拉菜单
		使用方法：$(".navi ul li").pullDownlMenu();
	***/
	$.fn.pullDownlMenu=function(){
		$(this).each(function() {
			var m = 180;
			if($(this).children(".subnavi").size()){
				$(this).hover(
					function(){
						$(this).children("a").addClass('on');
						$(this).children('.subnavi').stop(false, true).slideDown(m);
					},
					function(){
						$(this).children("a").removeClass('on');
						$(this).children('.subnavi').stop(false, true).slideUp(m);
					}
				)
			}
		}); 
	};



	/***
		功能：导航位置固定 如 kumic导航
		使用方法：$(".header").float();
	***/
	$.fn.float=function(){
		if($(this).length>0){
			var _touch=$(this);
			var navH = _touch.offset().top;
			$(window).scroll(function(){
				var scroH = $(this).scrollTop();
				if(scroH>navH){
					_touch.addClass("floatop");
				}else if(scroH<=navH){
					_touch.removeClass("floatop");
				}
			});
		};
	};



	/***
		功能：前进/刷新/后退不刷新/后退刷新
		使用方法：$("#goback").goBack();
	**/
	$.fn.goBack=function($type){
		$(this).each(function(index, element) {
      $(this).click(function(){
				switch($type){
					case -1:	/*后退不刷新*/
						window.history.go(-1);
						break;
					case 0:		/*刷新*/
						//window.history.go(0);
						window.location.reload()
						break;
					case 1:		/*前进*/
						window.history.go(1);
						break;
					default:	
						if(!(typeof($type) == "undefined")){
							window.location.href = $type;
						}else{ /*默认后退刷新*/	
							window.location.href = document.referrer;
						}
				}
			});
    });
	};



	/***
		功能：加入收藏
		使用方法：$("#favorite").addfavorite();
	**/
	$.fn.addfavorite=function(){
		$(this).click(function(){ 
			var sURL=window.location.href;
			var sTitle=document.title;
			try {
				window.external.addFavorite(sURL, sTitle);
			}catch(e){
				try {
					window.sidebar.addPanel(sTitle, sURL, "");
				}catch(e) {
					alert("加入收藏失败，请使用Ctrl+D进行添加");
				}
			}
		});
	};



	/***
		功能：设为首页
		使用方法：$(".sethome").SetHome();
	**/
	$.fn.SetHome=function(){
		$(this).click(function(){
			var url = location.href;
			try {
				this.style.behavior = "url(#default#homepage)";
				this.setHomePage(url);
			} catch (e) {
				if (document.all) {
					document.body.style.behavior = "url(#default#homepage)";
					document.body.setHomePage(url);
				} else if (window.sidebar) {
					if (window.netscape) {
						try {
							netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
						} catch (e) {
							alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
							return false;
						}
					}
					var prefs = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
					prefs.setCharPref('browser.startup.homepage', url);
				} else {
					alert('您的浏览器不支持自动设置首页, 使用浏览器菜单或在浏览器地址栏输入“chrome://settings/browser”手动设置!'); 
					//$("#sethomepage").href();
				}
			}
			return false;
		});
	}



	/*
		功能：打印
		使用方法：$("#print").printpage();
	*/
	$.fn.printpage=function(){
		$(this).click(function(){
			window.print();
		})
	};



	/*
		功能：获取get的值
		使用方法：$.get("name")
	*/
	$.extend({
		get:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}	
	});



	/***
		功能：获取引用文件的本身参数get的值
		使用范围：<script src="XX.js?s=10&d=2015-01-02"></script>
		使用方法：$.gets("name")
	***/
	$.extend({
		gets:function(name){
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
			var src=document.scripts[document.scripts.length - 1].src;
			var r=src.split("?")[1].match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		}	
	});	



	/***
		功能：验证邮件格式
		使用方法： $.isEmailFormat("obj")
	***/
	$.extend({
		isEmailFormat:function(obj){
			reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			if(!reg.test(obj)) {
				return false
			}else{
				return true;
			}
		}
	});



	/***
		功能：鼠标经过函数
		使用方法： $(".div").isSelected();
	***/
	$.fn.isSelected=function(type){
		var _seft=$(this);
		_seft.each(function() {
			switch(type){
				case 1:/*鼠标经过*/
					$(this).hover( function(){ $(this).addClass('select');}, function(){$(this).removeClass('select')} );
					break;
				case 2:/*点击选中，再次点击不选中*/
					$(this).click(
						function(){ if($(this).attr("class").indexOf("select")==-1){ $(this).addClass('select'); }else{ $(this).removeClass('select'); }}
					);
					break;
				case 3:/*点击同时只能选中一个*/
					$(this).click( function(){ $(this).addClass('select').siblings().removeClass("select"); } );
					break;
			}
		});	
	}



	/***
		功能：抖动效果
		使用方法：$(".pic img").shake();
	***/
	$.fn.shake=function(){    
		$(this).each(function() {
			$(this).hover(
				function(){
					var s=20; /*单次颤抖时间 单位微秒*/
					var j=3; /*抖动次数*/
					var r_t={"margin-top":"-1px","margin-left":"1px"}; /*右上*/
					var r_b={"margin-top":"1px","margin-left":"1px"}; /*右下*/
					var l_b={"margin-top":"1px","margin-left":"-1px"}; /*左下*/
					var l_t={"margin-top":"-1px","margin-left":"-1px"}; /*左上*/
					var doz={ sk:function(divclass){ divclass.animate(r_t,s).animate(r_b,s).animate(l_b,s).animate(l_t,s); }};
					$(this).css({"display":"inline-block","*display":"inline","*zoom":"1"});
					for(i=1;i<=j;i++){doz.sk($(this));}
					$(this).animate({"margin":"0 0 0 0"},s);
				},function(){$(this).animate({"margin":"0 0 0 0"},0).stop();}
			);
    });
	};



	/***
		功能：图片居中放大
		使用方法：$(".pic img").enlarge();
	***/
	$.fn.enlarge=function(){
		$(this).each(function() {
			var img=$(this);
			var _width=img.width();
			var _height=img.height();
			var j=1.2; /*放大倍数*/
			var s=0.5; /*放大速度,单位秒*/
			$(this).hover(
				function(){
					var par=$(this).parent().attr("class");
					if(par!="wp"){ $(this).wrap('<div class="wp"></div>');}
					$(this).parent().css({"width":_width,"height":_height,"overflow":"hidden"});
					var _parm={"width":_width*j,"height":_height*j,"margin-top":-(_height*(j-1)*0.5),"margin-left":-_width*(j-1)*0.5};
					$(this).stop().animate(_parm,s*1000);
				},
				function(){
					var _parm2={"width":_width,"height":_height,"margin-top":0,"margin-left":0};
					$(this).stop().animate(_parm2,s*1000)/*.unwrap()*/;
				}
			);
			
    });
	}



	/***
		功能：水滴掉地效果
		使用方法：$(".boxer ul li .pic img").water();
	***/
	$.fn.water=function(){
		$(this).each(function() {
			var i=0.1;
			var s=100;
			var _w=$(this).width();
			var _h=$(this).height();
			var par=$(this).parent().attr("class");
			var _parm={width:_w*(1+i),height:_h*(1-i),"margin-left":-(_w*i*0.5),"margin-top":(_h*i*0.5)};
			var _parm2={width:_w,height:_h,"margin-left":0,"margin-top":0};
			$(this).hover(
				function(){
					$(this).stop().css("opacity","0.95").animate(_parm,s).animate(_parm2,s);
				},
				function(){
					$(this).css("opacity","1").animate(_parm2,0);
				}
			);
    });
	};



	/***
		功能：锚点平滑跳转
		锚点起点部分： <a href="#menu1" class="gowhere">锚点起点部分</a>
		锚点目的地： 	<div id="menu1">锚点目的地</div>
		使用方法：		$(".gowhere").anchorGoWhere({target:1});
	***/
	$.fn.anchorGoWhere = function(options){
		var obj = $(this);
		var defaults = {target:0, timer:500};
		var o = $.extend(defaults,options);
		obj.each(function(i){
			$(obj[i]).click(function(){
				var _rel = $(this).attr("href").substr(1);
				switch(o.target){
					case 1: 
						var _targetTop = $("#"+_rel).offset().top;
						var s =(_targetTop/3500)*o.timer;
						if(timer!=0){ s = timer;}
						$("html,body").animate({scrollTop:_targetTop},s);
						break;
					case 2:
						var _targetLeft = $("#"+_rel).offset().left;
						var s =(_targetTop/3500)*o.timer;
						$("html,body").animate({scrollLeft:_targetLeft},s);
						break;
				}
				return false;
			});                  
		});
	};



	/***
		功能：禁止输入法
		使用方法：$(".rmb").disIme();
	***/
	$.fn.disIme=function(){
		$(this).keydown(function(e) {　　　
			if ($.browser.msie) { // 判断浏览器
				if (((event.keyCode > 47) && (event.keyCode < 58)) || (event.keyCode == 8)) {　 // 判断键值  
					return true;
				} else {
					return false;
				}
			} else {
				if (((e.which > 47) && (e.which < 58)) || (e.which == 8) || (event.keyCode == 17)) {
					return true;
				} else {
					return false;
				}
			}
		}).focus(function() {
			this.style.imeMode = 'disabled'; // 禁用输入法,禁止输入中文字符
		});
	}



	/***
		功能：是否数值
		使用方法：$("input.price").noNumaric();
	***/
	$.fn.noNumaric=function(){
		$(this).live("keyup",function () {
			this.value = this.value.replace(/[^(\d||/.)]/g, '')
		})	
	}



	/***
		功能：自定义背景 添加属性data-src
		html实例 <div class="slide" data-src="aa.jpg"></div>
		使用方法：$(".section .slide").DiyBg();
	***/
	$.fn.DiyBg=function(){
		$(this).each(function() {
			var $src = $(this).attr("data-src");
			var $hex = /^#[0-9a-fA-F]{3,6}$/;
			if($src){
				if($hex.test($src)){
					$(this).css({"background-color":""+$src+""});
				}else{
					$(this).css({"background-image":"url("+$src+")","background-repeat":"no-repeat","background-position":"center","background-size":"cover"});
				}
			}
		});
	}



	/***
		功能：模拟a的href效果 让其他非锚文本有链接效果
		html实例 <span class="demo" data-url="http://www.baidu.com">我要链接</div>
		使用方法：$(".demo").goUrl();
	***/
	$.fn.goUrl=function(){
		$(this).click(function(){
			window.location.href=$(this).attr("data-url");
		});
	};



	/***
		功能：非A标签的悬停效果
		CSS实例 .demo.cur{样式}
		使用方法：$(".demo").onCur("li");
	***/
	$.fn.onCur=function($ele,$cur){
		$(this).each(function(index, element) {
			$cur = $cur || "cur";
			$ele = $(this) || $(this).find($ele);	
			$ele.hover(
				function(){ $(this).addClass($cur)},
				function(){ $(this).removeClass($cur)}
			);
		});
	};



	/***
		功能：搜索，索引
		使用方法：$(".txt").soSo("products.php");
	***/
	$.fn.soSo=function($page){
		$(this).each(function(index, element) {
      var $seft = $(this);
			var $btn = $(this).find("input.btn");
			var $txt = $(this).find("input.txt");
			function soMo(){
				var _txt=$txt.val();
				if(_txt=="Enter the keyword..." || _txt==""){
					alert("Enter the keyword");
					return false;
				}else{
					window.location.href = $page + "?wd="+_txt; 		
				}
			}
			$btn.click(function(){ soMo();});
			$(document).keypress(function(e){
				if(e.which == 13) {soMo();}    
			})
			
    });
	}



	/***
		功能：确保漂浮框与内容右边对齐
		使用方法：$(".demo").changeLeft();
	***/
	$.fn.changeLeft=function(){
		var $seft = $(this);
		var $screen = 1200;/*网页内容宽度*/
		function clmd(){
			if($(window).width()<= $screen){
				$seft.css({"left":$screen,"right":"auto"});
			}else{
				$left = $(window).width() -($(window).width()-$screen) * 0.5;
				$seft.css({"left":$left,"right":"auto"});
			}
		}
		clmd();
		window.onresize=function(){  
			clmd();
		} 
	}



	/***
		功能：内容相对父容器垂直居中
		参数： $i [0:默认浏览器窗口高度，1:表示父窗口高度]
		使用方法：$("#fullscreen .text").BoxVCenter(0);
	***/

	$.fn.BoxVCenter=function($i){
		$(this).each(function() {
			$eleH = $(this).height();
			if($i == 0){
				$winH = $(window).height();
			}else{
				$winH = $(this).parent().height();
			}
			if($winH >= $eleH ){
				$(this).css("margin-top",($winH-$eleH)*0.5);
			}else{
				$(this).css("margin-top",0);
			}
		});
	}	
	/*$("#fullscreen .text").BoxVCenter(0); 
	window.onresize=function(){ 
		$("#fullscreen .text").BoxVCenter(0);
	}*/



	/*
		功能：获取当前系统的时间
		使用方法：$.now("type")
	*/
	/*$.extend({
		now:function(type){
			var d = new Date();str = '';
			year = d.getFullYear();
			mouth=parseInt(d.getMonth())+1;
			mouth  =mouth<10 ? "0" + mouth : mouth;
			day  = d.getDate()<10 ? "0"+d.getDate() : d.getDate();
			hour = d.getHours()<10 ? "0" + d.getHours() : d.getHours();
			minutes  = d.getMinutes()<10 ? "0" + d.getMinutes() : d.getMinutes();
			seconds = d.getSeconds()<10 ? "0" + d.getSeconds() : d.getSeconds(); 
			if(type=='l'){
				str=year+'-'+mouth+'-'+day+'-'+hour+'-'+minutes+'-'+seconds;
			}else{
				str=year+'年'+mouth+'月'+day+'日';
			}
			return str;
		}	
	});*/



	/***
		功能：页面图片等元素滚动动态加载技术
		html实例 <img src="skin/icon/blank.gif" data-url="images/1.jpg" class="imgload"/>
		js实例 $(".imgload").scrollLoading();
	***/



})


