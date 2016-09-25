(function(angular) {

	angular
		.module('app', [
			'storage',
			'ngRoute',
			'ngAnimate',
			'LocalStorageModule',
			'containerResize.directive',
			'main.controller',
			'start.controller',
			'word.controller'
		])
		.config(config);
		
	function config($routeProvider, $locationProvider, localStorageServiceProvider){
		
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
			
		localStorageServiceProvider
			.setPrefix('LL')
			.setStorageType('localStorage')
			.setDefaultToCookie(false);
	}
})(window.angular);