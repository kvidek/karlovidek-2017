/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */

(function($) {

    var types = ['DOMMouseScroll', 'mousewheel'];

    if ($.event.fixHooks) {
        for ( var i=types.length; i; ) {
            $.event.fixHooks[ types[--i] ] = $.event.mouseHooks;
        }
    }

    $.event.special.mousewheel = {
        setup: function() {
            if ( this.addEventListener ) {
                for ( var i=types.length; i; ) {
                    this.addEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i=types.length; i; ) {
                    this.removeEventListener( types[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
        },

        unmousewheel: function(fn) {
            return this.unbind("mousewheel", fn);
        }
    });


    function handler(event) {
        var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
        event = $.event.fix(orgEvent);
        event.type = "mousewheel";

        // Old school scrollwheel delta
        if ( orgEvent.wheelDelta ) { delta = orgEvent.wheelDelta/120; }
        if ( orgEvent.detail     ) { delta = -orgEvent.detail/3; }

        // New school multidimensional scroll (touchpads) deltas
        deltaY = delta;

        // Gecko
        if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaY = 0;
            deltaX = -1*delta;
        }

        // Webkit
        if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
        if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

})(jQuery);
//

var webJS = {
	common: {}
};

// EXTEND jQuery
$.js = function (el) {
    return $('[data-js=' + el + ']')
};

//GLOBAL STUFF

var $w = $(window);
var $vW = $w.width();
var $vH = $w.height();

var $document = $(document);
var $html = $('html');
var $body = $('body');

var block = $.js('block');
var stagingElement = $('[data-stage]');

var loaderLine = $.js('loader-line');
var loaderCounter = $.js('loader-counter');

// GET WINDOW WIDTH
function getWidth() {
    if (self.innerWidth) {
        return self.innerWidth;
    }
    if (document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    }
    if (document.body) {
        return document.body.clientWidth;
    }
}

// GET WINDOW HEIGHT
function getHeight() {
    if (self.innerHeight) {
        return self.innerHeight;
    }
    if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    }
    if (document.body) {
        return document.body.clientHeight;
    }
}

webJS.common = (function (window, document) {

    //MAIN
	function grid() {

        var $body = $('body');

        // options
        var settings = {
            cols: 24,
            color: '#00ffff',
            button: true,
            autostart: false,
            keyboard: true
        };

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

	}

	//LOADER
    function loader() {

    }

	//PROGRESS LINE
    function progressLine() {

	    var progressLine = $.js('progress-line-inner');

        //GET TOTAL WIDTH OF ALL SECTIONS
        var totalWidth = 0;

        block.each(function(index) {
            totalWidth += parseInt($(this).width(), 10);
        });

        //
        var width, wW;
        width = totalWidth;
        wW = $w.width();

        return $("html, body").mousewheel( function() {
            
            var scrollPosition, progress;

            scrollPosition = this.scrollLeft;
            progress = (scrollPosition / (width - wW)) * 100;
            
            // console.log(scrollPosition, progress);
            
            return {
                progressLine: progressLine.css('width', progress + '%')
            };
        });
    }

    //BACK BUTTON
    function backButton() {
        //BACK BUTTON
        var back = $.js('back');
        var backDuration = 2;

        var progressLine = $.js('progress-line-inner');

        var verticalLine = $.js('header-line-inner');
        var headerVisual = $.js('header-visual');


        back.on('click', function () {
            TweenMax.to($("html, body"), backDuration, {
                scrollTo:{
                    y:0,
                    x:0
                },
                ease: Power3.easeOut
            });

            TweenMax.to(progressLine, backDuration, {
                width: 0,
                ease: Power3.easeOut
            });

            TweenMax.to(verticalLine, 1.2, {
                height: "100%",
                ease: Power3.easeOut,
                delay: 1,
                onStart: function() {
                    headerVisual.addClass('is-visible');
                }
            });
        });
    }

	//HORIZONTAL SCROLL
	function horizontalScroll() {

        $("html, body").mousewheel(function(event, delta) {
            this.scrollLeft -= (delta * 50);

            // console.log(this.scrollLeft);

            //event.preventDefault();

        });

        // $('[data-parallax]').each(function (index, elem) {
        //     var controller = new ScrollMagic.Controller({
        //         vertical: false,
        //         globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}
        //     });
        //
        //     var tween = new TimelineMax ()
        //         .add([
        //             TweenMax.fromTo($(elem).find('.layer-1'), 1, {
        //                 x: 0
        //             }, {
        //                 x: "30%",
        //                 ease: Power3.easeOut
        //             }),
        //             TweenMax.fromTo($(elem).find('.layer-2'), 1, {
        //                 x: 2
        //             }, {
        //                 x: "12%",
        //                 ease: Power3.easeOut
        //             }),
        //             TweenMax.fromTo($(elem).find('.layer-3'), 1, {
        //                 x: 2
        //             }, {
        //                 x: "6%",
        //                 ease: Power3.easeOut
        //             }),
        //             TweenMax.fromTo($(elem).find('.layer-4'), 1, {
        //                 x: 2
        //             }, {
        //                 x: "-6%",
        //                 ease: Power3.easeOut
        //             }),
        //             TweenMax.fromTo($(elem).find('.layer-5'), 1, {
        //                 x: 2
        //             }, {
        //                 x: "-12%",
        //                 ease: Power3.easeOut
        //             }),
        //             TweenMax.fromTo($(elem).find('.layer-6'), 1, {
        //                 x: 2
        //             }, {
        //                 x: "-30%",
        //                 ease: Power3.easeOut
        //                 //ease: Linear.easeNone
        //             })
        //         ]);
        //
        //     // build scene
        //     var scene = new ScrollMagic.Scene({
        //         triggerElement: elem,
        //         duration: ($(window).width())
        //         })
        //         .setTween(tween)
        //         //.addIndicators() // add indicators (requires plugin)
        //         .addTo(controller);
        // });

        //VERTICAL LINE
        $("html, body").mousewheel( function() {

            var verticalLine = $.js('header-line-inner');
            var headerVisual = $.js('header-visual');

            var scrollPosition = this.scrollLeft;

            if (scrollPosition > 30) {
                TweenMax.to(verticalLine, 0.8, {
                    height: 0,
                    ease: Power3.easeOut
                });

                headerVisual.removeClass('is-visible');
            }
            else {
                TweenMax.to(verticalLine, 1.2, {
                    height: "100%",
                    ease: Power3.easeOut
                });

                headerVisual.addClass('is-visible');
            }
        });

	}

    //TABS
    function tabs(_tab, _tabContent) {
        _tab.on('mouseenter', function (e) {
            e.preventDefault();

            var self = $(this);
            var _tabId = self.data('tab-id');

            _tab.removeClass('is-active');
            $('[data-tab-id]').removeClass('is-active');

            _tabContent.find("[data-tab-content-id]").removeClass('is-active');
            self.addClass('is-active');
            $('[data-tab-id="'+_tabId+'"]').addClass('is-active');

            _tabContent.find("[data-tab-content-id='" + _tabId + "']").addClass('is-active');
        });

        _tab.on('mouseleave', function() {
            $('[data-tab-id]').removeClass('is-active');
            $('[data-tab-content-id]').removeClass('is-active');
        });
    }

	return {
		// grid: grid,
		loader: loader,
		backButton: backButton,
        progressLine: progressLine,
        horizontalScroll: horizontalScroll,
        tabs: tabs
	};

})(window, document);


$(function () {
	// webJS.common.grid();
	webJS.common.loader();
	webJS.common.backButton();
	webJS.common.progressLine();
	webJS.common.tabs($.js('tab'), $.js('tabs-content'));

	if(getWidth() > 1024) {
        webJS.common.horizontalScroll();
    }
});

//LOADER STUFF
var loaderWrapper = $.js('loader-wrapper');
var loaderSegment = $.js('loader-segment');
var loaderSegmentInner = $.js('loader-segment-inner');

var loaderTimeline = new TimelineMax({
    paused: true,
    onComplete: function() {
        loaderWrapper.remove();
        loaderLine.remove();
        loaderCounter.remove();
    }
});

//TIMELINE
loaderTimeline.add("start")
    .staggerTo(loaderSegmentInner, 0.6, {
        width: 0,
        ease: Power3.easeOut
    },0.1, "start")
    .staggerTo(loaderSegment, 0.8, {
        width: 0,
        delay: 0.2,
        ease: Power3.easeOut,
        onComplete: function() {
            $body.addClass('is-loaded');
        }
    },0.12, "start")
    .staggerFromTo(stagingElement, 0.4, {
        autoAlpha: 0,
        x: 20
    }, {
        autoAlpha: 1,
        x: 0,
        delay: 0.65,
        ease: Power3.easeOut,
        onStart: function() {
            stagingElement.addClass('is-visible');
        }
    }, 0.1, "start");

//READY
$document.ready(function() {
    var number = {score: 21};

    function updateHandler() {
        loaderCounter.text(number.score);
    }

    TweenMax.to(number, 1.2, {
        score: "+=79",
        roundProps: "score",
        onUpdate: updateHandler,
        ease: Linear.easeNone,
        onComplete: function() {

            TweenMax.to(loaderCounter, 0.8, {
                autoAlpha: 0,
                x: -25,
                delay: 0.9,
                ease: Power3.easeOut
            });
        }
    });

    TweenMax.to(loaderLine, 1.8, {
        width: 0,
        ease: Power3.easeOut,
        onComplete: function() {

            //SCROLL TO START
            TweenMax.to($("html, body"), 0.1, {
                scrollTo:{
                    y:0,
                    x:0
                },
                ease: Power3.easeOut
            });

            //PLAY TIMELINE
            loaderTimeline.play();
        }
    });

    if($vW > 1024) {
        var rellax = new Rellax('.rellax', {
            // center: true,
            horizontal: true
        });
    }

});

if(is.firefox()) {
    $body.addClass('is-firefox');
}