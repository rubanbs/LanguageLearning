(function(angular) {

	angular
		.module('main.controller', [])
		.controller('MainController', MainController);
		
	function MainController ($location, $scope, storage, search){
		
		$scope.nextWord = nextWord;
		
		function nextWord() {
			
			var word = storage.getRandom(+search.get().stars);
			
			$location.path('/word/' + word.origin);
		}
	}

})(window.angular);