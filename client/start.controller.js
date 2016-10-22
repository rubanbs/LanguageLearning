(function(angular) {

	angular
		.module('start.controller', [])
		.controller('StartController', StartController);
		
	function StartController ($scope, search){
		
		$scope.start = start;
		$scope.$parent.inProgress = false;
		
		function start() {
			
			search.set({ stars: $scope.stars });
			
			$scope.$parent.translation = $scope.translation;
			$scope.$parent.inProgress = true;
			$scope.$parent.nextWord();
		}
	}

})(window.angular);