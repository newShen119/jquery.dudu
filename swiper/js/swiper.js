/* 
 name: swiper.js
 author: gaoxiong
 email: 1056834607@qq.com
 version: 1.0 
*/

(function($){


	//闭包限定命名空间
	function Swiper(element,options) {
		this.element = $(element);
		//使用jQuery.extend 覆盖插件默认参数
		this.options = $.extend({},Swiper.defaults,options);
		//初始化
		this.init();
	};


	//默认参数
	Swiper.defaults = {

		width: 730,
		height: 450,
		time: 3000,
		speed: 500,
		type: "easing",
	};


	Swiper.prototype.init = function() {

		this.index1 = 0;
		this.index2 = 0;
		this.Elements();
		this.setCss();
		this.handle();
		this.autoPlay();
	};


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


	Swiper.prototype.setCss = function() {

		this.oSwiperMain.css({

			width: this.aSwiperPanel.length * parseInt(this.options.width),

		});
	};


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
		})
	};


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


	Swiper.prototype.aNavItemAddClass = function() {

		this.aNavItem.removeClass("active");

		this.aNavItem.eq(this.index1).addClass("active");
	};


	Swiper.prototype.autoPlay = function() {

		var _this = this;

		this.timer = setInterval(function(){

			_this.next.trigger("click")

		},this.options.time);
	};

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
