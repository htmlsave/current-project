$.widget( 'app.selectmenu', $.ui.selectmenu, {
  _drawButton: function() {
    this._super();
    var selected = this.element
    .find( '[selected]' )
    .length,
        placeholder = this.options.placeholder;

    if (!selected && placeholder) {
      this.buttonItem.text(placeholder);
    }
  }
 });
$(document).ready(function() {
	// Filters
	$('.prolific_filter').selectmenu();
	  // Placeholders
	 $('.prolific_filter1 .ui-selectmenu-text').before('<span class="placeholder">Процедура:</span> ');
	 $('.prolific_filter2 .ui-selectmenu-text').before('<span class="placeholder">Должность:</span> ');
	 $('.prolific_filter3 .ui-selectmenu-text').before('<span class="placeholder">Областной центр:</span> ');
	 $('.prolific_filter4 .ui-selectmenu-text').before('<span class="placeholder">Руководитель:</span> ');
	 $('.prolific_filter5 .ui-selectmenu-text').before('<span class="placeholder">Областной центр:</span> ');
	 $('.prolific_filter6 .ui-selectmenu-text').before('<span class="placeholder">Руководитель:</span> ');

	// Side-bar scroll
	$('.js-controle_zone').slimScroll({
		height: 310,
		railVisible: true,
		alwaysVisible: true
	});
	if($('.controle_zone').children('.controle_zone_item').length <= 5) {
		$('.slimScrollRail').hide();
	}

	// Filter in .prolific_employee_rating
	$('.flters_employee_rating').selectmenu({
		placeholder: 'Не выбран'
	});
	$('.dinamic_flter_employee_rating .ui-selectmenu-text').before('<span class="placeholder">Динамика</span> ');
	$('.tactic_flter_employee_rating .ui-selectmenu-text').before('<span class="placeholder">План развития</span> ');
		// Replace color select
		$('body').on('mouseup', '#ui-id-7-menu, #ui-id-8-menu', function() {
			var takeId = '#'+$(this).attr('aria-labelledby');
			setTimeout(function() {
				$('.js-flter_employee').find(takeId).find('.ui-selectmenu-text').css('color', '#000');
			},0.1);
		});
		// Replace color input
		$('.filter_input_wrapper input').click(function(evt) {
			evt.stopPropagation();
			$('.filter_input_wrapper').find('svg').removeClass('active_icon_filter');
			$(this).parent('.filter_input_wrapper').find('svg').addClass('active_icon_filter');
		}).focus(function(evt) {
			evt.stopPropagation();
			$('.filter_input_wrapper').find('svg').removeClass('active_icon_filter');
			$(this).parent('.filter_input_wrapper').find('svg').addClass('active_icon_filter');
		});
		$('body').click(function() {
			$('.filter_input_wrapper').find('svg').removeClass('active_icon_filter');
		});


	// Tabs head footer
	$('.prolific_tab_nuv li a').click(function(evt) {
		evt.preventDefault();
		$('.prolific_tab_nuv li').removeClass('prolific_tab_nuv__active');
		$(this).parent().addClass('prolific_tab_nuv__active');
		// Hide and Show
		var takeHref = $(this).attr('href');
		$('.prolific_tab_content').children('div').hide();
		$('.prolific_tab_content').find(takeHref).show();
	});
	// Active tab show
	$( $('.prolific_tab_nuv__active > a').attr('href') ).show();
	// Tab 1 || Btn toggle show
	$('.js-btn_prolific_employee_rating').click(function() {
		$('.dest_exel').css('display', 'flex');
		$('.prolific_employee_rating_inner').show();
	}); 
	// Tab 2 || Btn toggle show
	$('.js-btn_prolific_employee_rating_head').click(function() {
		$(this).parents('.prolific_employee_rating__header').hide();
		$('.prolific_employee_rating_head_inner').show();
	}); 
	$('.js-btn_complit_workers').click(function() {
		$('.prolific_employee_rating_head_inner').hide();
		$('.prolific_employee_rating_head__more').show();
	});
	$('.js-return_head__table').click(function() {
		$('.prolific_employee_rating_head__more').hide();
		$('.prolific_employee_rating_head_inner').show();
	});
	// Tab 3 || Btn toggle show
	$('.js-prolific_analytical_categores_btn').click(function() {
		$('.prolific_analytical_categores_inner').show();
	});
	// Tab 4 || Btn toggle show
	$('.js-btn_prolific_analytical_categores_result').click(function() {
		$('.prolific_analytical_result_inner').show();
	});


	// Tabs head filter
	$('.prolific_analytical_categores_filter').selectmenu();
		// Placeholders
		$('.prolific_analytical_categores_filter_wrp .ui-selectmenu-text').before('<span class="placeholder">Должность:</span> ');

	// Profilic analytical graphic
	$('.profilic_analytical_graphic_items li').each(function() {
		$(this).children('div').each(function() {
			var takeWidth = $(this).innerWidth();
			if( takeWidth < 3 ) {
				$(this).css('cursor', 'pointer');
				$(this).children('.profilic_analytical_graphic_fill__hover').addClass('profilic_analytical_graphic_fill__hover_hide');
			}
		});
	});

	// index.html title filter
	$('.prolific_title_filter').selectmenu();
	$('.main_title_prolific_filter_wrp .ui-selectmenu-text').before('<span class="placeholder">Процедура:</span> ');

	// Worker TAB
	$('.prolific_tab_worker_nuv li a').click(function(evt) {
		evt.preventDefault();
		$('.prolific_tab_worker_nuv li').removeClass('prolific_tab_worker_nuv__active');
		$(this).parent('li').addClass('prolific_tab_worker_nuv__active');

		var takeHref = $(this).attr('href');
		$('.prolific_tab_worker_content > div').hide();
		$(takeHref).fadeIn();
	});
		// Inner show desription
		$('.js-show_description_prlific_tab_worker').click(function() {
			$(this).toggleClass('show_description_prlific_tab_worker_active');
			$(this).parent().find('.prolific_tab_worker__effectivenessy_description').stop().slideToggle();
		});
});