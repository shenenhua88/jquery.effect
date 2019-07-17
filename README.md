### 常用JQ代码片段
调用十分简单，你需要用 jquery.effect.js
然后根据里面的不同函数库去调用即可

## 例如
``` php
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
```
