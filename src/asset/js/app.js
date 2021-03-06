(function($) {
	$(function() {

		// Highlight.js syntax highlighting
		hljs.configure({
			tabReplace: '    ',
		});
		hljs.initHighlighting();

		// Bootstrap tooltips
		$('[data-toggle="tooltip"]').tooltip();

		// Search filter
		$('.i-sidebar-item-filter').keyup(function() {
			var $input = $(this);
			var query = $input.val().trim();
			var selector = query ? '[data-filter-value*="' + query + '" i]' : '[data-filter-value]';

			if (event.keyCode === 27) {
				// Escape key pressed
				resetSearch($input);
			}

			$input.parent('.i-search-input').toggleClass('has-value', !!query);

			$('.i-page__sidebar [data-filter-value]').css('display', 'none');
			$('.i-page__sidebar ' + selector).css('display', 'block');
		});

		// Search filter reset
		function resetSearch($input) {
			$input.siblings('.i-sidebar-item-filter').val('');
			$input.parent('.i-search-input').removeClass('has-value');
			$('.i-page__sidebar [data-filter-value]').css('display', 'block');
		}

		$('.i-search-input-reset').click(function() {
			resetSearch($(this));
		});

		// Lazy-loaded iframes
		lazyframe('[lazyframe]', {
			lazyload: true,
			debounce: 50,
			onAppend: function(iframe) {
				$(iframe)
					.attr('id', 'frame-' + Math.random().toString().substr(2))
					.iFrameResize({
						heightCalculationMethod: 'lowestElement',
						warningTimeout: 10000,
					});
			},
		});

		// Prefixes all section links with the element name
		$('.i-library').each(function() {
			var $library = $(this);
			var librarySlug = $library.attr('id');

			$library.find('[id]').attr('id', function(index, id) {
				return librarySlug + '-' + id;
			});

			$library.find('a[href*="#"]').attr('href', function(index, href) {
				return href.replace(/^#(.*)/, '#' + librarySlug + '-$1');
			});
		});

	});
})(jQuery);
