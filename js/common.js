$(document).ready(function() {
	// Common tab
	$('.tab_common__nuv ul > li > a').click(function(e) {
		e.preventDefault();
		//Toggle class
		$('.tab_common__nuv ul > li a').removeClass('tab_common__nuv_active');
		$(this).addClass('tab_common__nuv_active');
		// Toggle show
		let takeHref = $(this).attr('href');
		$(this).parents('.tab_common').find('.tab_common__content > div').each(function() {
			$(this).hasClass( takeHref.slice(1) ) ? $(this).fadeIn() : $(this).hide();
		});
	});
	
	// Range slider
	$('.showers_ipr input[type="range"]').each(function() {
		let takeMax    = Number($(this).attr('max')),
				takeVal    = Number($(this).val()),
				fill       = ($(this).outerWidth()/(takeMax-1)) * takeVal,
				maxWidth   = $(this).outerWidth() / (takeMax-1);

		for(let i = 1; i < takeMax; i++) { 
			let setClass = maxWidth*i > fill - maxWidth ? 'circle_grey' : null;
			let el = '<span class="circle '+setClass+'" style="left:'+maxWidth*i+'px"></span>';

			if(i === takeMax-1) {
				let last = '<span class="circle circle_first" style="left: 0px;"></span>';
				$(this).parent().append(el);
				$(this).parent().prepend(last);
			} else {
				$(this).parent().append(el);
			}
		}
		let fillResulr = takeVal === 1 ? '0' : fill - maxWidth;
		$(this).parent().append('<div class="fill" style="width:'+fillResulr+'px;"></div>');
	});
});