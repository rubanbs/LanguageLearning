(function (angular) {

    angular
            .module('word.controller', [])
            .controller('WordController', WordController);

    function WordController($scope, $http, $routeParams, currentWord, search) {

        $scope.opened = false;
        $scope.$parent.inProgress = true;
        $scope.translation = $scope.$parent.translation;
        var word = currentWord.get();

        if (word && word.origin === $routeParams.origin) {
            
            $scope.word = word;
        } else {

            var data = {
                params:  angular.extend({}, search.get(), {
                    origin: $routeParams.origin
                })
            };
            
            $http.get('/word', data).then(function (res) {

                var word = res.data[0];

                currentWord.set(word);
                $scope.word = word;
            });
        }

        $scope.showTranslation = showTranslation;

        function showTranslation() {

            $scope.opened = true;
        }
    }

})(window.angular);