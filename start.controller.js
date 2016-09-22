(function(angular) {

	angular
		.module('start.controller', [])
		.controller('StartController', StartController);
		
	function StartController ($scope, search){
		
		$scope.start = start;
		
		function start() {
			
			search.set({ stars: $scope.stars });
			
			$scope.$parent.nextWord();
		}
	}

})(window.angular);