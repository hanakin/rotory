'use strict';

angular.module('rotory')
.controller('navCtrl', function($scope, dataService){

    dataService.getLayers(function(response){
        var config = response.data;
        $scope.layers =  config.layers;
    });

    dataService.getPartials(function(response){
        var partials = response.data;
        // // console.log(partials);
        $scope.partials = partials;
    });

    $scope.addPartial = function(layer, name){
        $scope.partials[layer].partials.unshift(name);
        // create files via ajax request to file which creates them
    };

    $scope.removePartial = function(layer, name){
        $scope.partials[layer].partials.pop(name);
        // remove files via ajax request to file which removes them
    };

});
