$(document).ready(function() {

	//Check
	console.log('Done!');

	//Цели для Яндекс.Метрики и Google Analytics
	$(".count_element").on("click", (function() {
		ga("send", "event", "goal", "goal");
		yaCounterXXXXXXXX.reachGoal("goal");
		return true;
	}));

	//jquery.matchHeight.js
	//Docs: https://github.com/liabru/jquery-match-height
	$(elements).matchHeight(options);
	
	//Carousel: http://owlgraphic.com/owlcarousel/
	$("#owl-example").owlCarousel();

	//AJAX forms send
	//Docs: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});
	
});