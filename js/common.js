$(document).ready(function() {
	// Header slider
	$('#header-slider').slick({
		infinite: false,
		autoplay: true,
		autoplaySpeed: 4500,
		prevArrow: $('.header_prev'),
		nextArrow: $('.header_next'),
		responsive: [
		  {
		    breakpoint: 768
		  }
		]
	});
	// Header slider adaptive height
	function adaptiveHeight() {
		let takeHeihgt = [];
		$('.header_slider__item').each(function(item, index) {
			takeHeihgt.push($(this).outerHeight());
		});
		$('.header_slider__item').css('height', Math.max.apply(null, takeHeihgt));
	}
	adaptiveHeight();
	$(window).resize(adaptiveHeight);

	// Menu prevent default
	$('.js-prevent_default').click(function(e) {
		e.preventDefault();
	});

	// Open mobile menu
	$('#js-to_mobile_menu').click(function() {
		$('body').addClass('mobile_menu_active');
	});
	// Close mobile menu
	$('.js-mobile_menu__close').click(function() {
		$('body').removeClass('mobile_menu_active');
	});
	// Mobile menu nuv items
	$('.mobile_menu__nuv li').click(function() {
		$(this).children('.sub-menu').parent().toggleClass('menu-item-opened')
		$(this).children('.sub-menu').stop().slideToggle();
	})

	// Btn to top
	let takeHiehgt = $(window).innerHeight() / 2;
	$(document).scroll(function() {
		$(this).scrollTop() > takeHiehgt ? $('.to_top').show() : $('.to_top').hide();
	});
	$('.to_top').click(function() {
		$('body, html').animate({
			scrollTop: 0
		});
	})

	// Yandex map
	ymaps.ready(init);
	function init(){ 
		// Создание карты.    
		var myMap = new ymaps.Map("map", {
		controls: ['zoomControl'],
		center: [55.76, 37.64],
		zoom: 11
		});
	}

});