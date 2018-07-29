$(document).ready(function() {
	// Common tab
	$('.tab_common__nuv ul > li > a').click(function(e) {
		e.preventDefault();
		//Toggle class
		$(this).parents('.tab_common__nuv').find('ul > li a').removeClass('tab_common__nuv_active');
		$(this).addClass('tab_common__nuv_active');
		// Toggle show
		let takeHref = $(this).attr('href');
		$(this).parents('.tab_common').find('.tab_common__content > div').each(function() {
			$(this).hasClass( takeHref.slice(1) ) ? $(this).fadeIn() : $(this).hide();
		});
	});
	
	// Range slider
	$('.lk-top input[type="range"]').each(function() {
		let takeMax    = Number($(this).attr('max')),
				takeVal    = Number($(this).val()),
				currentVal = ($(this).outerWidth()/(takeMax-1)) * takeVal,
				maxWidth   = $(this).outerWidth() / (takeMax-1);

		let firstEl = '<span class="circle circle_first" style="left: 0px;"></span>';
		$(this).parent().prepend(firstEl);

		for(let i = 1; i < takeMax; i++) { 
			let setClass = maxWidth*i > currentVal - maxWidth ? 'circle_grey' : '';
			let el = '<span class="circle '+setClass+'" style="left:'+maxWidth*i+'px"></span>';
			$(this).parent().append(el);
		}
		let fillResulr = takeVal === 1 ? '0' : currentVal - maxWidth;
		$(this).parent().append('<div class="fill" style="width:'+fillResulr+'px;"></div>');
	});

	// Filter date all-books.html
	$('.all_books__item_filter_date').dateDropper();
	$('.datapicker_wrp').click(function(e) {
		$(this).addClass('datapicker_wrp_active');
	});
	$('.select_common').click(function() {
		$('.datedropper').removeClass('picker-focus');
	});
	$('body').click(function(e) {
		$('.datapicker_wrp').removeClass('datapicker_wrp_active');
	});
	$('.picker').click(function(e) {
		e.stopPropagation();
	});
	// Filter date
	$('.dinamic_active_item_date').dateDropper();

	// Tab books
	$('.all_books__nuv > ul > li > a').click(function(e) {
		e.preventDefault();
		// Toggle class
		$('.all_books__nuv > ul > li > a').removeClass('all_books__nuv_active');
		$(this).addClass('all_books__nuv_active');
		//Toggle show
		let takeHref = $(this).attr('href');
		$('.all_books__inner > div').hide();
		$(takeHref).fadeIn();
	});
});