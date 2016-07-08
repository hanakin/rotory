'use strict';

angular.module('rotory')
.service('dataService', function($http){
    this.getLayers = function(cb){
        $http.get('config.json').then(cb);
    };

    this.getPartials = function(cb){
        $http.get('/layers').then(cb);
    };
});
