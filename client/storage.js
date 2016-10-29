(function (angular) {

    angular
            .module('storage', [])
            .factory('search', search)
            .factory('currentWord', currentWord);

    function search(localStorageService) {

        return {
            get: function () {

                return localStorageService.get('search');
            },
            set: function (params) {
                
                localStorageService.set('search', params);
            }
        };
    }

    var _currentWord;

    function currentWord() {

        return {
            get: function () {

                return _currentWord;
            },
            set: function (word) {

                _currentWord = word;
            }
        };
    }

})(window.angular);