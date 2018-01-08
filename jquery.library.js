/***此文档为函数调用文档 功能基于jquery.effect.js文件内***/
$(function(){
	/*函数调用库*/
	//$(this).isCopy();
	$("img").errorImg(1);
	//$(".imgload").scrollLoading();
	//$(".imge").imgAuto();
	$(".txt").onfocus();
	//$(".demo ul").transEle("li",1,0.5);
	//$(".demo ul li").pullDownlMenu();
	//$(".header").float();
	//$("#goback").goBack();
	$("#favorite").addfavorite();
	$("#sethome").SetHome();
	$("#prints").printpage();
	//$(".demo").isSelected(1);
	//$(".demo img").shake();
	//$(".demo img").enlarge();
	//$(".demo img").water();
	$(".gowhere").anchorGoWhere({target:1});
	//$(".rmb").disIme();
	//$("input.price").noNumaric();
	//$(".section .slide").DiyBg();
	//$(".demo").goUrl();
	//$(".demo").onCur("li");
	//$(".soso").soSo("products.php");
	//$(".qqpiao").changeLeft();
	
})
/*引用其他js*/
jQuery.ajaxSetup({ cache: true }); 
//jQuery.getScript("skin/js/js.func.js");
jQuery.getScript("skin/js/scrolltopcontrol.js");
