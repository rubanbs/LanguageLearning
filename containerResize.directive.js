(function(angular, $) {

	angular
		.module('containerResize.directive', [])
		.directive('containerResize', ContainerResizeDirective);
		
	function ContainerResizeDirective (){
		
		return {
			
			link: link
		}
		
		function link() {
			
			resize();
			
			$(window).resize(resize);
		}
		
		function resize() {
			
			$('#words-container').height($(window).height() - $('header').height());
		}
	}

})(window.angular, $);