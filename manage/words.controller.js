(function (angular) {

    angular
        .module('words.controller', [])
        .controller('WordsController', WordsController);

    function WordsController($scope, $http) {

        $http.get('/words').then(function(res){
            
            $scope.words = res.data;
        });
    }

})(window.angular);