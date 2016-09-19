(function(angular) {

	angular
		.module('main.controller', [])
		.controller('MainController', MainController);
		
	function MainController ($location, $scope, storage){
		
		$scope.next = next;
		
		function next(){
			
			var word = storage.getRandom();
			
			$location.path('/word/' + word.origin);
		}
	}

})(window.angular);