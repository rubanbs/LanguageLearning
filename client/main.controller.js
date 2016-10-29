(function (angular) {

    angular
            .module('main.controller', [])
            .controller('MainController', MainController);

    function MainController($location, $scope, $http, /*localStorageService, storage,*/ search, currentWord) {

        var savedSearch = search.get();

        if (savedSearch) {

            if (savedSearch.stars)
                $scope.stars = savedSearch.stars;

            if (savedSearch.material)
                $scope.material = savedSearch.material;

            if (savedSearch.translation)
                $scope.translation = savedSearch.translation;
            
            if (savedSearch.type)
                $scope.type = savedSearch.type;
        }

        $scope.stars = $scope.stars || 0;
        $scope.translation = $scope.translation || "ruseng";
        $scope.inProgress = false;
        $scope.nextWord = nextWord;

        function nextWord() {

            var data = {
                params: search.get()
            };

            $http.get('/word', data).then(function (res) {

                var word = res.data[0];

                if (word) {

                    $scope.inProgress = true;

                    currentWord.set(word);

                    $location.path('/word/' + word.origin);

                } else {

                    alert('No Words Found!');
                }
            });

        }
    }

})(window.angular);