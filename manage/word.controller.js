(function (angular) {

    angular
            .module('word.controller', [])
            .controller('WordController', WordController);

    function WordController($scope, $http) {

        $scope.save = save;

        function save() {

            var data = {
                origin: $scope.word.origin,
                origincomments: $scope.word.origincomments,
                translation: $scope.word.translation,
                translationcomments: $scope.word.translationcomments,
                type: $scope.type
            };

            $http.post('/word', data).then(function (res) {

                if (res.data.errno) {
                    alert(res.data.code);
                } else {
                    $scope.word = {};
                }
            }, function (res) {

                alert(res.data);
            });
        }
    }

})(window.angular);