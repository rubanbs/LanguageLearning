(function(angular) {

	angular
		.module('app', [
			'ngRoute',
                        'main.controller',
                        'words.controller',
                        'word.controller'
		])
		.config(config);
		
	function config($routeProvider){
		$routeProvider
			.when('/words', {
				templateUrl: 'words.html',
				controller: 'WordsController'
			})
			.when('/word/:originid?', {
				templateUrl: 'word.html',
				controller: 'WordController'
			})
			.otherwise('/words');
	}
})(window.angular);