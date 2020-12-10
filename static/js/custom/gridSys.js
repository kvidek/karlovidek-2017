/**
 * jQuery gridSys plugin
 *
 * Copyright (c) 2016 Igor Bumba (igorbumba.com)
 * Free under terms of the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 */
(function ($) {

	$.fn.gridSys = function (options) {

		var $body = $('body');

		// options
		var settings = $.extend({
			cols: 24,
			color: '#00ffff',
			button: false,
			autostart: false,
			keyboard: true
		}, options);

		// styles
		var grid_wrapper_style = 'position: fixed; z-index: 200000; top: 0; left: 0; right: 0; height: 0; pointer-events: none;';
		var grid_style = 'display: block; position: absolute; top: 0; height: 100vh; width: 1px; background-color:' + settings.color + ';';
		var button_style = 'cursor: pointer; position: fixed; z-index: 200000; bottom: 10px; right: 10px; pointer-events: all; background-color: white;';

		// autostart grid
		if(settings.autostart) {
			$body.append('<i class="guide-guide" style="display: block; ' + grid_wrapper_style + '"></i>');
		}
		else {
			$body.append('<i class="guide-guide" style="display: none; ' + grid_wrapper_style + '"></i>');
		}

		// generate guides
		for (i = 1; i < settings.cols + 1; i++) {
			var offsetLeft = (100 / settings.cols) * i + '%';
			$('<i style="' + grid_style + '"></i>').css('left', offsetLeft).appendTo('.guide-guide');
		}

		var $guideguide = $('.guide-guide');

		// set button on/off
		if (settings.button) {

			$body.append('<button class="guideguide-btn" style="' + button_style + '">Grid I/O</button>');

			$('.guideguide-btn').click(function (ev) {
				ev.preventDefault();
				if ($guideguide.css('display') === 'block') {
					$guideguide.css('display', 'none');
				}
				else {
					$guideguide.css('display', 'block');
				}
			});

		}

		// set G button on/off
		if (settings.keyboard) {

			$(document).keyup(function (ev) {
				if (ev.keyCode == 71) {
					if ($guideguide.css('display') === 'block') {
						$guideguide.css('display', 'none');
					}
					else {
						$guideguide.css('display', 'block');
					}
				}
			});

		}

	};

})(jQuery);