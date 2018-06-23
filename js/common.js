$(document).ready(function() {
	// Pressed header
	var takeH = $('.header').innerHeight();
	$(window).scroll(function() {
		if($(window).innerWidth() < 992) {
			var currentScroll = $(window).scrollTop();
			if(currentScroll > takeH) {
				$('.header_logo > img').css('height', '25px');
			} else {
				$('.header_logo > img').css('height', '30px');
			}
		}
	});

	// Search modal
	$('.header_search').click(function() {
		$('.popup_search').fadeIn();
	});
	$('.popup_search_close').click(function() {
		$('.popup_search').fadeOut();
	});

	// Mobile menu
	$('.to_mobile_menu').click(function() {
		$('.popup_mobile_menu').fadeIn().addClass('popup_mobile_menu__active');
		$('body').css('overflow-y', 'hidden');
	});
	$('.close_mobile_menu, .popup_mobile_menu .mask').click(function() {
		$('.popup_mobile_menu').removeClass('popup_mobile_menu__active').fadeOut();
		$('body').css('overflow-y', 'scroll');
	});

	// Masonry
	var $container = $('#masonry_items');
	$container.masonry({
		columnWidth: '.grid_item',
		itemSelector : '.grid_item',
		transitionDuration: '0.3s',
		gutter: 0
	});
});