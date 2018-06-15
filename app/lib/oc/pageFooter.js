angular.module('OrderCloud-PageFooter', []);

angular.module('OrderCloud-PageFooter')
    .directive('pagefooter', pagefooter)
    .controller('PageFooterCtrl', PageFooterCtrl)
;

function pagefooter() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'PageFooterCtrl'
    };
    return directive;

    function template() {
        return [
            '<div class="page-footer">',
                '<div class="row">',
                    '<div class="col-xs-12 col-lg-6">',
                        '<div class="text-center">',
                            '<h2>Stay Connected!</h2>',
                            '<p>Sign up today and get inspiration straight to your inbox.</p>',
                        '</div>',
                        '<div class="text-center">',
                            '<a target="_blank" href="//www.usfoods.com/sign-up-now.html">Sign up Now</a>',
                        '</div>',
                    '</div>',
                    '<div class="col-xs-12 col-lg-6">',
                        '<div class="text-center">',
                            '<h2>Join the US Foods Community</h2>',
                            '<p>Keep up-to-date with our latest products and recipes.</p>',
                        '</div>',
                        '<div class="social text-center">',
                            '<a target="_blank" href="//www.facebook.com/usfoods"><i class="fa fa-facebook"></i></a>',
                            '<a target="_blank" href="//www.instagram.com/us_foods/"><i class="fa fa-instagram"></i></a>',
                            '<a target="_blank" href="//twitter.com/usfoods"><i class="fa fa-twitter"></i></a>',
                            '<a target="_blank" href="//www.linkedin.com/company/us-foods/"><i class="fa fa-linkedin"></i></a>',
                            '<a target="_blank" href="//www.youtube.com/channel/UCOzFkZMsCmTiUvmAR6PFY1w"><i class="fa fa-youtube"></i></a>',
                        '</div>',
                    '</div>',
                '</div>',
                '<div class="row">',
                    '<div class="col-xs-12">',
                        '<nav class="navbar">',
                        '<h2 class="text-center visible-xs">My Account</h2>',
                        '<ul>',
                        '<li id="451qa_user_link" ng-show="user.Permissions.contains(\'ViewSelfAdmin\')" class="admin">',
                        '<a href="admin">',
                        '{{\'User Information\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li class="order" ng-if="user.Type == \'Customer\'" ng-class="{\'active\': isActive(\'order\'), \'active-xs\': isActive(\'favoriteorders\')}">',
                        '<a id="451qa_order_link" href="order">',
                        '{{\'Orders\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li id="451qa_addy_link" ng-show="user.Type == \'Customer\' && (user.Permissions.contains(\'CreateShipToAddress\') || user.Permissions.contains(\'CreateBillToAddress\'))" class="addresses">',
                        '<a href="addresses">',
                        '{{\'Addresses\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li id="451qa_mesg_link" ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'ViewMessaging\')" class="messages">',
                        '<a href="message">',
                        '{{\'Messages\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li class="favorites" ng-show="user.Type == \'Customer\'">',
                        '<a id="451qa_fave_link" href="favoriteorders">',
                        '{{\'Favorites\' | r | xlat}}',
                        '</a>',
                        '</li>',
                        '<li class="report" ng-if="user.Type == \'Customer\' && user.Permissions.contains(\'AdvancedReporting\')" ng-class="{\'active\': isActive(\'reports\')}">',
                        '<a id="451qa_report_link" href="reports">',
                        '<span class="">{{\'Reports\' | r | xlat}}</span>',
                        '</a>',
                        '</li>',
                        '</ul>',
                        '</nav>',
                    '</div>',
                '</div>',
                '<div class="row">',
                    '<div class="col-xs-12 copyright text-center">',
                        '&copy; {{year}} {{user.Company.Name}}. All Rights Reserved.',
                    '</div>',
                '</div>',
            '</div>'
        ].join('');
    }
}

PageFooterCtrl.$inject = ['$scope', '$location'];
function PageFooterCtrl($scope, $location) {

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