'use strict';

/* App Module */
(function () {
    var app = angular.module('vizsecPapers', [
        'ngRoute',
        'appAnimations',
        'appControllers',
        'appServices'
    ]);

    app.config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider.
                    when('/papers', {
                        templateUrl: 'partials/list.html',
                        controller: 'MainController'
                    }).
                    otherwise({
                        redirectTo: '/papers'
                    });
        }]);

})();