angular.module('OrderCloud-FixedFooter', []);

angular.module('OrderCloud-FixedFooter')
    .directive('fixedfooter', fixedfooter)
    .controller('FixedFooterCtrl', FixedFooterCtrl)
;

function fixedfooter() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'FixedFooterCtrl'
    };
    return directive;

    function template() {
        return [
            //'<nav class="navbar navbar-default">',
            '<div class="border"></div>',
            '<nav class="navbar">',
            '<div class="fixed-footer-bottom">',
            '<div class="col-xs-12 col-lg-8 col-lg-offset-2">',
            '<div class="col-xs-12 col-lg-6 pull-left">',
            '<a target="_blank" href=""><i class="fa fa-facebook"></i></a>',
            '<a target="_blank" href=""><i class="fa fa-twitter"></i></a>',
            '<a target="_blank" href=""><i class="fa fa-linkedin"></i></a>',
            '<a target="_blank" href=""><i class="fa fa-pinterest"></i></a>',
            '</div>',
            '<div class="col-xs-12 col-lg-6 pull-right copyright">',
            '&copy; {{year}} {{user.Company.Name}}. All Rights Reserved.',
            '</div>',
            '</div>',
            '</div>',
            '</nav>'
        ].join('');
    }
}

FixedFooterCtrl.$inject = ['$scope', '$location'];
function FixedFooterCtrl($scope, $location) {

    var d = new Date();
    $scope.year = d.getFullYear();

    /*below functions from NavCtrl.js in case navigation is used in the footer*/
    $scope.isActive = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if (path instanceof Array) {
            angular.forEach(path, function(p) {
                if (p == cur_path && !result)
                    result = true;
            });
        }
        else {
            if (cur_path == path)
                result = true;
        }
        return result;
    };

    //extension of above isActive in path
    $scope.isInPath = function(path) {
        var cur_path = $location.path().replace('/', '');
        var result = false;

        if(cur_path.indexOf(path) > -1) {
            result = true;
        }
        else {
            result = false;
        }
        return result;
    };
}