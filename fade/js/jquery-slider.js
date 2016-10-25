
//焦点轮播图
function Slider(element,options){
	this.element = $(element);
	this.options = $.extend({}, Slider.defaults, options);
	this.init();
};


Slider.defaults ={
	width: 800,     //轮播容器宽度
	height: 500,	 //轮播容器高度
	speed: 500,     //播放持续时间
	time: 3000,     //播放间隔时间
	autoplay: true, //是否设置自动播放
	type: 'easing', //播放类型
	data:[
		{
			"aHref":"javascript:;void(0)",
			"imgSrc":"img/banner01.jpg",
		},{
			"aHref":"javascript:;void(0)",
			"imgSrc":"img/banner02.jpg",
		},{
			"aHref":"javascript:;void(0)",
			"imgSrc":"img/banner03.jpg",
		},{
			"aHref":"javascript:;void(0)",
			"imgSrc":"img/banner04.jpg",
		},{
			"aHref":"javascript:;void(0)",
			"imgSrc":"img/banner05.jpg",
		}
	]
};


Slider.prototype.init = function() {
	this.index = 0;
	this.timer = null;
	this.create();
	this.setCss();
	this.bindHandle();
}


Slider.prototype.create = function() {

	var sliderItem ='',
	 	paginationItem ='';
	$.each(this.options.data, function(index, value){
		sliderItem += '<div class="slider-item"><a href='+value['aHref']+'><img src='+value['imgSrc']+'></a></div>';
		paginationItem += '<li class="pagination-item">'+parseInt(index+1)+'</li>';
	});

	var sliderBtn = '<div class="slider-btn"><a class="slider-btn-prev" href="javascript:;void(0)"><</a><a class="slider-btn-next" href="javascript:;void(0)">></a></div>',
		sliderWrap = '<div class="slider-wraper">'+sliderItem+'</div>',
		sliderPagination = '<ul class="slider-pagination">'+paginationItem+'</ul>',
		slider = '<div class="slider">'+sliderWrap+sliderPagination+sliderBtn+'</div>';

	this.element.append($(slider));
	this.slider = this.element.find(".slider");
	this.sliderWrap = this.slider.find(".slider-wraper");
	this.sliderItem = this.slider.find(".slider-item");
	this.sliderBtn = this.slider.find(".slider-btn");
	this.btnPrev = this.sliderBtn.find(".slider-btn-prev");
	this.btnNext = this.sliderBtn.find(".slider-btn-next");
	this.img = this.slider.find("img");
	this.paginationItem = this.slider.find(".pagination-item");
};


Slider.prototype.setCss = function() {

	var w = this.options.width,
		h =  this.options.height;
	this.slider.css({ width: w , height: h });
	this.sliderItem.hide();
	this.sliderItem.eq(this.index).show();
	this.paginationItem.eq(this.index).css({ backgroundColor: "#b61b1f" });

};


Slider.prototype.bindHandle = function() {

	var _this = this;

	this.slider.hover(function(){
		_this.sliderBtn.show();
	},function(){
		_this.sliderBtn.hide();
	});

	this.btnNext.on('click', function() {
		if( _this.sliderItem.is(":animated") ) return;
		_this.index ++;
		_this.index = _this.index  == _this.options.data.length ? 0 : _this.index;
		_this.move();
	});

	this.btnPrev.on('click', function() {
		if( _this.sliderItem.is(":animated") ) return;
		_this.index --;
		_this.index = _this.index  == -1 ? _this.options.data.length - 1 : _this.index;
		_this.move();
	});

};


Slider.prototype.move = function() {

	var _this = this,
		speed = this.options.speed;
	this.sliderItem.eq(this.index).fadeIn(speed).siblings().fadeOut(speed);

	this.paginationItem.css({ backgroundColor: "#3e3e3e" })
	this.paginationItem.eq(this.index).css({ backgroundColor: "#b61b1f" });
}


$.fn.extend({
	slider:function(options){
		return this.each(function(){
			new Slider(this,options);
		});
	},
})
