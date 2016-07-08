'use strict';

angular.module('rotory')
.directive('sideNav', function(){
    return {
        templateUrl: 'guide/templates/sidenav.html',
        replace: true,
        controller: 'navCtrl'
    };
});
