/* @name：jquery_slider.js
 * @author : gaoxiong 
 * @version: 1.0
*/

//define Slider class
function Slider(element, options){
	this.element = $(element);
	this.options = $.extend({}, Slider.defaults, options);
	this.init();
};

//set default paramas
Slider.defaults = {
	width: 730,
	height: 435,
	speed: 500,
	time: 3000,
	autoplay: true,
	type: 'easing',
	data: null
};

//initialization
Slider.prototype.init = function(){

	var _this = this,
		time = this.options.time;

	this.timer = null;
	this.index = 0;
	this.index1 = 0;

	this.createSliderMain();
	this.setSliderMainCss();

	this.createSliderPagination();
	this.createBtn();
	this.btnBindEvent();

	clearInterval(_this.timer);
	this.timer = setInterval(function(){
		_this.btnNext.trigger("click");
	},time);

	this.element.hover(function(){
		clearInterval(_this.timer);
		_this.sliderBtn.css({
			"display": "block",
		});
	},function(){
		_this.timer = setInterval(function(){
			_this.btnNext.trigger("click");
		},time)
		_this.sliderBtn.css({
			"display": "none",
		});
	});
};

// create slider-main and slider-item nodes
Slider.prototype.createSliderMain = function(){
	console.log(this.options.data.length);
	var data = this.options.data,
		string = '';

	for(var i = 0; i < data.length; i++){
		console.log(data[i].imgSrc);
		 string += "<div class='slider-item'><a href='"+data[i].aHref+"'><img src='"+data[i].imgSrc+"'></a></div>";
	};

	var sliderMain = "<div class='slider-main'>"+string+"</div>";
	this.element.append(sliderMain);

	this.sliderMain = $('.slider-main',this.element).eq(0);
};

//set style for slider-main and slider-item nodes
Slider.prototype.setSliderMainCss = function(){

	this.element.css({
		"width": this.options.width,
		"height": this.options.height,
	});

	this.sliderMain.css({
		"width": this.options.width * this.options.data.length,
		"height": this.options.height,
	});

	this.sliderItem = $(".slider-item");
	this.sliderItem.css({
		"width": this.options.width,
		"height": this.options.height,
	});
};

//create slider-pagination 
Slider.prototype.createSliderPagination = function(){

	var _this = this,
		string = "",
		data = this.options.data;

	for(var i = 0; i < data.length; i++){
		string += "<li class='pagination-item'>"+parseInt(i+1)+"</li>";
	};

	var sliderPagination = "<ul class='slider-pagination'>"+string+"</ul>";
	this.element.append(sliderPagination);

	this.sliderPagination = $('.slider-pagination', this.element).eq(0);

	this.sliderPaginationItem = $(".pagination-item", this.element);
	this.sliderPaginationItem.eq(this.index).addClass("active");

	this.sliderPaginationItem.bind("click", function(){
		_this.index = $(this).index();
		_this.index1 =  $(this).index();
		_this.move();
	});
};

//create slider-btn
Slider.prototype.createBtn = function(){

	var _this = this;
	var sliderBtn = "<div class='slider-btn'><a class='prev' href='javascript:;void(0)'><</a><a class='next' href='javascript:;void(0)'>></a></div>";
	this.element.append($(sliderBtn));
	this.sliderBtn = $(".slider-btn", this.element);

	this.sliderBtn.css({
		display: "none",
	});

	this.btnPrev = $(".prev", _this.element).eq(0);
	this.btnNext = $(".next", _this.element).eq(0);
};

// binding event for btn
Slider.prototype.btnBindEvent = function(){
	var _this = this;
	_this.btnNext.bind("click",function(){
		if(_this.sliderMain.is(":animated")){
			return ;
		}
		if( _this.index == _this.options.data.length - 1){
			_this.index = 0;
			_this.sliderItem.eq(0).css({
				"position": "relative",
				"left": _this.options.data.length * _this.options.width,
			});
		}else{
			_this.index ++;
		};
		_this.index1 ++;
		_this.move();
 	});

	this.btnPrev.bind("click",function(){
		if(_this.sliderMain.is(":animated")){
			return ;
		};
		if(_this.index == 0){
			_this.index = _this.options.data.length - 1;
			_this.sliderItem.eq(_this.options.data.length - 1).css({
				"position": "relative",
				"left": - _this.options.data.length * _this.options.width,
			});
		}else {
			_this.index --;
		}
		_this.index1 --;
		_this.move();
	});
};

// define slider-main move function
Slider.prototype.move = function(){
	var _this = this;
	var p = parseInt(_this.options.width) * _this.index1;
	_this.sliderPaginationItem.removeClass("active");
	_this.sliderPaginationItem.eq(_this.index).addClass("active");
	_this.sliderMain.animate({
		"left": - p ,
	},this.options.speed,function(){
		if(_this.index == 0){
			_this.index1 = 0;
			_this.sliderItem.eq(0).css({
				"position": "static",
			});
			_this.sliderMain.css({
				"left":0,
			});
		}else if(_this.index == _this.options.data.length - 1){
			_this.index1 = _this.options.data.length - 1;
			_this.sliderItem.eq(_this.index).css({
				"position": "static",
			});
			_this.sliderMain.css({
				"left": - _this.index * _this.options.width,
			});
		};
	});
};

// put Slider on jQuery 
$.fn.extend({
	slider:function(options){
		return this.each(function(){
			new Slider(this, options);
		});
	},	
});
