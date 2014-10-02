'use strict';

/* Services */

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Paper', ['$resource', function ($resource) {
        return $resource('papers/papers.json');
    }]);
