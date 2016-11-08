$(function(){
  "use strict";

 	var defaults = {
 			effect: '', //动画效果：fade(默认),newspaper,fall,scaled,flip-horizontal,flip-vertical,sign,
 			content: ''  //正文内容，可以为纯字符串，html标签字符串
 		};

 	function Modal(options){
 		this.settings = $.extend({}, defaults, options);
 		this.init();
 	}

 	Modal.prototype = {

 		//初始化弹出框
 		init: function(){
 			var that = this;
 			that.render();
 			that.setStyle();
 			that.trigger();
 		},

 		//创建弹出框
 		create: function(){
 			var that = this,
 				modalHTML = [];

        modalHTML[0] = '<section class="modal-box"><div class="modal-box-container"><div class="modal-box-content"></div></div></section>';
 				modalHTML[1] = '<div class="modal-box-mask"></div>';

 			return modalHTML;
 		},

 		//渲染弹出框
 		render: function(){
 			var that = this,
 				modalHTML = that.create(),
 				$content = that.parseContent();

 			$('body').append(modalHTML[0]);

 			if(typeof($content) === 'object'){
 				$content.appendTo('.modal-box-content');
 			}else{
 				$('.modal-box-content').append($content);
 			}

 			$('body').append(modalHTML[1]);
 		},

 		//解析并处理弹出框内容
 		parseContent: function(){
 			var that = this,
      	  content = that.settings.content;
 			return content;
 		},

 		//显示弹出框
 		show: function(){
 			$('.modal-box').css({display:'block'});

 			setTimeout(function(){
 				$('.modal-box').addClass('show');
 			},50)

 			$('.modal-box-mask').show();
 		},

 		//隐藏弹出框
 		hide: function(){
 			var $modalBox = $('.modal-box'),
 				$modalBoxMask = $('.modal-box-mask');

 			$modalBox.removeClass('show');

 			setTimeout(function(){
 				$modalBox.remove();
 				$modalBoxMask.remove();
 			},10)
 		},

 		//设置弹出框样式
 		setStyle: function(){
 			var that = this,
 				$modal = $('.modal-box'),
 				$mask  = $('.modal-box-mask'),
 				EFFECT = 'effect';

      //弹出框外框样式
      $modal.css({
        'z-index': that.settings.zIndex
      });

      //遮罩层样式
      $mask.css({
        height: $(document).height() + 'px'
      });

 			//弹出框多种动画效果
 			switch(that.settings.effect){
 				case 'newspaper':
 					$modal.addClass(EFFECT + '-newspaper');
 					break;
 				case 'fall':
 					$modal.addClass(EFFECT + '-fall');
 					break;
 				case 'scaled':
 					$modal.addClass(EFFECT + '-scaled');
 					break;
 				case 'flip-horizontal':
 					$modal.addClass(EFFECT + '-flip-horizontal');
 					break;
 				case 'flip-vertical':
 					$modal.addClass(EFFECT + '-flip-vertical');
 					break;
 				case 'sign':
 					$modal.addClass(EFFECT + '-sign');
 					break;
 				default:
 					$modal.addClass(EFFECT + '-fade');
 					break;
 			}
 		},

 		//弹出框触屏器(系列事件)
 		trigger: function(event){
 			var that = this;
 			$('.modal-box-close, .modal-box-close-btn, .modal-box-mask').on('click',function(){
 				that.hide('.modal-box');
 			});

 			$(document).keyup(function(event){
 				if(event.keyCode === 27){
 					that.hide('.modal-box');
 				}
 			});

 		}
 	};

  $.Modal = Modal;

});
