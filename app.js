(function(angular) {

	angular
		.module('app', [
			'storage',
			'ngRoute',
			'ngAnimate',
			'main.controller',
			'start.controller',
			'word.controller'
		])
		.config(config);
		
	function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/start', {
				templateUrl: 'start.html',
				controller: 'StartController'
			})
			.when('/word/:origin', {
				templateUrl: 'word.html',
				controller: 'WordController'
			})
			.otherwise('/start');
	}
})(window.angular);