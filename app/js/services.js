'use strict';

var appServices = angular.module('appServices', ['ngResource']);

appServices.factory('Paper', ['$resource', function ($resource) {
        return $resource('papers/vizsec.json');
    }]);
