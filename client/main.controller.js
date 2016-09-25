(function (angular) {

    angular
        .module('main.controller', [])
        .controller('MainController', MainController);

    function MainController($location, $scope, $http, localStorageService, storage, search) {

        $scope.inProgress = false;
        $scope.nextWord = nextWord;
        $scope.downloadAll = downloadAll;

        function nextWord() {

            var word = storage.getRandom(+search.get().stars);

            $location.path('/word/' + word.origin);
        }
        
        function downloadAll(){
			
            $http.get('/words').then(function(res){
                
				localStorageService.set('words', res.data);
            });
        }
    }

})(window.angular);