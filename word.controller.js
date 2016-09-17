(function(angular) {

	angular
		.module('word.controller', [])
		.controller('WordController', WordController);
		
	function WordController ($scope, $routeParams, storage){
		
		var word = storage.getWord($routeParams.origin);
		
		if (word) {
			$scope.origin = word.origin;
		}		
	}

})(window.angular);