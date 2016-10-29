(function (angular) {

    angular
            .module('start.controller', [])
            .controller('StartController', StartController);

    function StartController($scope, search) {

        $scope.start = start;
        $scope.$parent.inProgress = false;

        function start() {

            search.set({stars: $scope.stars, material: $scope.material, type: $scope.type, translation: $scope.translation});

            $scope.$parent.stars = $scope.stars;
            $scope.$parent.material = $scope.material;
            $scope.$parent.translation = $scope.translation;
            $scope.$parent.type = $scope.type;

            $scope.$parent.nextWord();
        }
    }

})(window.angular);