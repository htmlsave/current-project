$(document).ready(function() {
	// Initialization selects
	$('.main_filter').selectmenu();
	$('.wrp_main_filter .ui-selectmenu-text').before('<span class="placeholder">Процедура:</span> ');
		// Months
	$('.filter_months').selectmenu();
	$('.wrp_filter_months .ui-selectmenu-text').before('<span class="placeholder">Месяц:</span> ');
		// Table date
	$('.filter_table_date').selectmenu();
		// Scale
	$('.filter_scale').selectmenu();
	$('.wrp_filter_scale .ui-selectmenu-text').before('<span class="placeholder">Шкала:</span> ');

	// Accordion modal add event
	$('.modal_add_events_tab_header').click(function() {
		$(this).toggleClass('modal_add_events_tab_header_active')
		.parent('.tab_item_modal_add_events')
		.children('.tab_item_modal_add_events_content')
		.stop().slideToggle();
	});
	// Accordion modal add event > child
	$('.modal_add_events_content_course_active').parent('li').children('.modal_add_events_content_course_dropdown').show();
	$('.modal_add_events_content_course > li > a').click(function(evt) {
		evt.preventDefault();

		$(this).parent('li')
		.children('.modal_add_events_content_course_dropdown')
		.stop().slideToggle()
		.parent('li').children('a')
		.toggleClass('modal_add_events_content_course_active');
	});
	// Accordion modal add event > child > child
	$('.modal_add_events_content_course_dropdown_active').parent('.wrp_recommendations_dropdown_item').children('.recommendations_dropdown').show();
	$('.modal_add_events_content_course_dropdown_title').click(function(evt) {
		evt.preventDefault();

		$(this).parent('.wrp_recommendations_dropdown_item')
		.children('.recommendations_dropdown')
		.stop().slideToggle()
		.parent('.wrp_recommendations_dropdown_item')
		.children('.modal_add_events_content_course_dropdown_title')
		.toggleClass('modal_add_events_content_course_dropdown_active');
	});

	// Modal add event
	$('.js-btn_add_event').click(function() {
		$('body').css('overflow-y', 'hidden');
		$('#modal_add_events').find('.modal_add_event_dop_wrp').show();
		$('#modal_add_events').fadeIn();
	});
	$('.modal_add_events_close_btn, .modal_add_events_mask').click(function() {
		$('body').css('overflow-y', 'scroll');
		$('#modal_add_events').fadeOut();
	});

	// Accorion HEAD
	$('.tab_statistic_content').children('div')
	.not( $('.tab_statistic_nuv_active').children('a').attr('href') ).hide();
	
	$('.tab_statistic_nuv li').children('a').click(function(evt) {
		evt.preventDefault();
		$('.tab_statistic_nuv > li').removeClass('tab_statistic_nuv_active');
		$(this).parent().addClass('tab_statistic_nuv_active');

		$('.tab_statistic_content').children('div').hide();
		$($(this).attr('href')).fadeIn();
	});

	// Craphic carousel
	$('.graphic_carousel > .graphic_carousel_item_active').attr('style', 'display: flex !important;');
	// NEXT BTN
	$('body').on('mouseup', '.tab_mvo_btn_next', function() {
		$(this).parents('.tab_mvo_wrp_btn')
			.parent('.js-carousel-parent')
			.children('.graphic_carousel').children('div').each(function() {
			if( $(this).attr('style') === 'display: flex !important;') {
				var takeIndex = $(this).index();
				console.log($(this).parent().children('div').length-1);
				if( takeIndex !== $(this).parent().children('div').length-1) {
					$(this).parent().children('div').eq(takeIndex).attr('style', 'display: none !important;');
					$(this).parent().children('div').eq(++takeIndex).attr('style', 'display: flex !important;');
					return false;
				}
			}
		});
	});
	// PREV BTN
	$('body').on('mouseup', '.tab_mvo_btn_prev', function() {
		$(this).parents('.tab_mvo_wrp_btn')
			.parent('.js-carousel-parent')
			.children('.graphic_carousel').children('div').each(function() {
			if( $(this).attr('style') === 'display: flex !important;' ) {
				var takeIndex = $(this).index();
				if( takeIndex !== 0) {
					$(this).parent().children('div').eq(takeIndex).attr('style', 'display: none !important;');
					$(this).parent().children('div').eq(--takeIndex).attr('style', 'display: flex !important;');
					return false;
				}
			}
		});
	});

	// Popup description
	$('.result_charge_table_name > a').click(function(evt) {
		evt.preventDefault();
		var takeText = $(this).text(),
				topPos   = $(this).offset().top,
				leftPos  = $(this).offset().left;
		$('.result_charge_table_name__descriprion > h5').children('span').text(takeText);
		$('.result_charge_table_name__descriprion').css({
			top: topPos - 9,
			left: leftPos - 26
		}).fadeIn();
	});
	$('.close_result_charge_table_name__descriprion > a').click(function(evt) {
		evt.preventDefault();
		$('.result_charge_table_name__descriprion').hide();
	});

	// Modal shape
	$('.btn_shape_plan').click(function() {
		$('body').css('overflow-y', 'hidden');
		$('#modal_add_events').find('.modal_add_event_dop_wrp').hide();
		$('#modal_add_events').fadeIn();
	});
	// Btn add event in modal shape
	$('.add_event_btn').click(function() {
		$('.result_charge').attr('class', 'result_charge');
		$('.btn_shape_plane_wrp').hide();
		$('.plan_schedule').show();
	});
});