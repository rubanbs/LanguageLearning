(function(angular) {

	angular
		.module('word.controller', [])
		.controller('WordController', WordController);
		
	function WordController ($scope, $routeParams, storage){
		
		$scope.word = storage.getWord($routeParams.origin);
	}

})(window.angular);