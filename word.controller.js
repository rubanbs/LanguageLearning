(function(angular) {

	angular
		.module('word.controller', [])
		.controller('WordController', WordController);
		
	function WordController ($scope, $routeParams, storage){
		
		$scope.opened = false;
		$scope.word = storage.getWord($routeParams.origin);
		
		$scope.showTranslation = showTranslation;
		
		function showTranslation() {
			
			$scope.opened = true;
		}
	}

})(window.angular);