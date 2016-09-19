(function(angular) {

	angular
		.module('app', [
			'storage',
			'ngRoute',
			'ngAnimate',
			'main.controller',
			'word.controller'
		])
		.config(config);
		
	function config($routeProvider, $locationProvider){
		$routeProvider
			.when('/word/:origin', {
				templateUrl: 'word.html',
				controller: 'WordController as word'
			});
	}
})(window.angular);