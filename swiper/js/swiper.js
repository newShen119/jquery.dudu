/* 
 name: swiper.js
 author: gaoxiong
 email: 1056834607@qq.com
 version: 1.0
 time : 2016-10-25
*/

(function($){


	// define class Swiper
	function Swiper(element,options) {
		this.element = $(element);

		this.options = $.extend({},Swiper.defaults,options);

		this.init();
	};


	// set defaults paramers
	Swiper.defaults = {

		width: 730,
		height: 450,
		time: 1000,
		speed: 500,
		type: "easing",
	};


	// Swiper initiazition
	Swiper.prototype.init = function() {

		this.index1 = 0;
		this.index2 = 0;
		this.Elements();
		this.setCss();
		this.handle();
		this.autoPlay();
	};


	// get the Elements after create them if the creating  exists
	Swiper.prototype.Elements = function() {

		this.oSwiper = this.element.find(".swiper"),
		this.oSwiperMain = this.oSwiper.find(".swiper-main"),
		this.aSwiperPanel = this.oSwiperMain.find(".swiper-panel"),
		this.oSwiperNav = this.oSwiper.find(".swiper-nav"),
		this.aNavItem = this.oSwiperNav.find(".nav-item"),
		this.oSwiperBtn = this.oSwiper.find(".swiper-btn"),
		this.prev = this.oSwiperBtn.find(".prev"),
		this.next = this.oSwiperBtn.find(".next");
	};


	// set CSS after create them if the creating  exists
	Swiper.prototype.setCss = function() {

		this.oSwiperMain.css({

			width: this.aSwiperPanel.length * parseInt(this.options.width),

		});
	};


	// add the handle  after create them if the creating  exists 
	Swiper.prototype.handle = function() {

		var _this = this;

		this.next.on("click",function(){

			if( _this.oSwiperMain.is(":animated") ) return;

			if( _this.index1 == 4 ) {

				_this.index1 = 0;

				_this.aSwiperPanel.eq(0).css({

					position: "relative",

					left: _this.aSwiperPanel.length * parseInt(_this.options.width),

				});

			} else {

				_this.index1 ++ ;

			}

			_this.index2 ++ ;

			_this.move();
		});

		this.prev.on("click",function(){

			if( _this.oSwiperMain.is(":animated") ) return;

			if( _this.index1 == 0 ) {

				_this.index1 = _this.aSwiperPanel.length - 1;

				_this.aSwiperPanel.eq( _this.aSwiperPanel.length - 1 ).css({

					position: "relative",

					left: - _this.aSwiperPanel.length * parseInt(_this.options.width),

				});

			} else {

				_this.index1 --;
			}

			_this.index2 --;

			_this.move();

		});

		this.aNavItem.on("click",function(){

			_this.index1 = _this.index2 = $(this).index();

			_this.move();

		});
	};

	
	// define the move regular 
	Swiper.prototype.move = function() {

		var _this = this;

		this.aNavItemAddClass();

		_this.oSwiperMain.animate({

			left: - _this.index2 * parseInt(this.options.width),

		}, this.options.speed, function(){

			if( _this.index1 == 0 ) {

				_this.index2 = 0;

				_this.aSwiperPanel.eq(0).css({ position: "static" });

				_this.oSwiperMain.css({ left: 0 });

			} else if( _this.index1 == _this.aSwiperPanel.length - 1 ){

				_this.index2 = _this.aSwiperPanel.length - 1;

				_this.aSwiperPanel.eq( _this.index1 ).css({ position: "static" });

				_this.oSwiperMain.css({ left: -_this.index1 * _this.options.width });
			};
		});
	};


	// set style for the nav-item bottom of Swiper
	Swiper.prototype.aNavItemAddClass = function() {

		this.aNavItem.removeClass("active");

		this.aNavItem.eq(this.index1).addClass("active");
	};


	// define autoplay function if autoPlay is required 
	Swiper.prototype.autoPlay = function() {

		var _this = this;

		this.timer = setInterval(function(){

			_this.next.trigger("click")

		},this.options.time);

		this.oSwiper.hover(function(){

			clearInterval(_this.timer);

		},function(){

			_this.timer = setInterval(function(){

				_this.next.trigger("click")

			},_this.options.time);

		});

	};

	// add swiper to the jQuery prototype
	$.fn.extend({
		swiper: function(options){
			return this.each(function(){
				new Swiper(this,options);
			});
		},
	});

})(window.jQuery);


$(function(){
	$("#banner").swiper();
})
