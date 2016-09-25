(function (angular) {

    angular
            .module('word.controller', [])
            .controller('WordController', WordController);

    function WordController($scope, $http) {

        $scope.save = save;

        function save() {

            $http.post('/word').then(function(res){
                
                debugger;
            }, function(res){
                
                alert(res.data);
            });
        }
    }

})(window.angular);