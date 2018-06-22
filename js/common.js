$(document).ready(function() {
	// Search modal
	$('.header_search').click(function() {
		$('.popup_search').fadeIn();
	});
	$('.popup_search_close').click(function() {
		$('.popup_search').fadeOut();
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