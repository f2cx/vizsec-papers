'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', ['ui.bootstrap', 'ui.utils', 'angular.filter', 'appFilters']);

appControllers.controller('MainController', ['$scope', 'Paper', '$modal', '$log', '$filter',
    function ($scope, Paper, $modal, $log, $filter, keyword, array) {

        $scope.papers = Paper.query();

        $scope.orderProp = 'cite';
        $scope.filters = {};

        $scope.tab = 1;

        $scope.setTab = function (newValue) {
            $scope.tab = newValue;
            $scope.updateVis();

        };


        $scope.isSet = function (tabName) {
            return $scope.tab === tabName;
        };

        $scope.updateVis = function () {

            $scope.$apply();
            
            $("#treemap").empty();
            $scope.visTreeMap = d3plus.viz()
                    .container("#treemap")
                    .data($scope.filtered)
                    .id(["year", "title"])
                    .type("tree_map")
                    .id("year")
                    .size(1)
                    .color("gray")
                    .draw()

            var data = $filter('keywordFilter')($scope.filtered);
            data = $filter('countBy')(data, 'keyword')
            data = $filter('stopwordFilter')(data);
            data = $filter('normalizeFilter')(data);


            function wordClicked(item, dimension, event) {

                $scope.query = item[0];
                $scope.updateVis();

            }

            $("#wordcloud").empty();
            var options = {click: wordClicked, minRotation: 0, clearCanvas: true,
                maxRotation: 0, shuffle: false,
                fontFamily: 'Times, serif',
                color: function(word, weight, fontSize, distance, theta) { 
                    var color = d3.scale.linear().domain([10, 150]).range(["gray", "red"]);
                    return color(fontSize);
                },
                minSize: 0,
                rotateRatio: 0.5,
                list: data};

            WordCloud('wordcloud', options);
        }

        $scope.search = function (item) {

            if (typeof $scope.query === "undefined") {
                return true;

            } else if (item.title.toLowerCase().indexOf($scope.query.toLowerCase()) !== -1 || item.abstract.toLowerCase().indexOf($scope.query.toLowerCase()) !== -1 || item.authors.toLowerCase().indexOf($scope.query.toLowerCase()) !== -1) {
                return true;
            }

            return false;
        };

        $scope.open = function (paper) {

            var modalInstance = $modal.open({
                templateUrl: 'partials/modal.html',
                controller: ModalInstanceCtrl,
                size: 'lg',
                resolve: {
                    paper: function () {
                        return paper;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };





    }]);


var ModalInstanceCtrl = function ($scope, $modalInstance, paper) {


    $scope.paper = paper;

    $scope.ok = function () {
        $modalInstance.close();
    };

};
