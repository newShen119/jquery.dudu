/* 
 @ name: dialog.js
 @ version : 1.0
 @ email : 1056834607@qq.com
 @ description: 未能解决多级点击时出现的bug
*/

function Dialog(element, options){
	this.options = $.extend({}, Dialog.defaults, options);
	this.element = $(element);
	this.init();
};


Dialog.defaults = {
	width: 200,
	height: 200,
	left: ($(window).width()-200)/2,
	top: ($(window).height()-200)/2,
	mask: true,
	title: "登录",
};


Dialog.prototype.json = {};

Dialog.prototype.init = function(){
	var _this = this;
	this.element.on("click", function(){
		if(_this.json[_this.options.id] == undefined){
			console.log(1);
			_this.json[_this.options.id] = true;
		};
		if(_this.json[_this.options.id] === true){
			_this.create();
			if(_this.options.mask){
				_this.createMask();
			};
		};
	});
};


Dialog.prototype.create = function(){
	var _this = this;
	_this.json[_this.options.id] = false;
	this.dialog = $("<div></div>");
	this.dialog.prop("class","dialog");
	this.dialog.html('<div class="dialog-title"><span>'+this.options.title+'</span><a class="dialog-close" href="javascript:;void(0)">x</a></div><div class="dialog-content"></div>');
	$("body").append(this.dialog);
	this.getDom();
};

Dialog.prototype.getDom = function(){
	var _this = this;
	this.dialogClose = $(".dialog-close",this.dialog);
	this.setCss();
	this.fnBind();
};

Dialog.prototype.fnBind = function(){
	var _this = this;
	this.dialogClose.on("click",function(){
		_this.dialog.remove();
		if(_this.options.mask){
			_this.mask.remove();
		};
		_this.json[_this.options.id] = true;
	})
};

Dialog.prototype.setCss = function(){
	this.dialog.css({
		"width": this.options.width,
		"height": this.options.height,
		"top": this.options.top,
		"left": this.options.left,
	});
};

Dialog.prototype.createMask = function(){
	this.mask = $("<div></div>");
	this.mask.prop("class", "mask");
	$("body").append(this.mask);
	this.mask.css({
		width: $(window).width(),
		height: $(window).height(),
	});
};


$.fn.extend({
	dialog: function(options){
		return this.each(function(){
			new Dialog(this, options);
		})
	}
});
