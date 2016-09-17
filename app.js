
	angular
		.module('app', [
			'storage',
			'ngRoute',
			'main.controller',
			'word.controller'
		])
		.config(config);
		
	function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/word/:origin', {
				templateUrl: 'word.html',
				controller: 'WordController'
			});
	}