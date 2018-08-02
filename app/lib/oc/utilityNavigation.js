angular.module('OrderCloud-UtilityNavigation', []);

angular.module('OrderCloud-UtilityNavigation')
    .directive('utilitynavigation', utilitynavigation)
;

function utilitynavigation() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'UtilityNavCtrl'
    };
    return directive;

    function template() {
        return [
            '<div class="col-xs-12 col-sm-9 col-sm-offset-3">',
            '<div class="navbar-fixed">',
            '<div class="col-xs-12 col-sm-6 pull-left">',
            '<productsearchinput />',
            //'<minicart />',
            //'<productsearchinput />',
            '</div>',
            '<div class="col-xs-12 col-sm-6 pull-right">',
            //'<minicart />',
            '<nav class="navbar navbar-utility">',
                '<ul>',
                    //temp for zindex troubleshooting
                   //'<a href="cart">Cart</a>',
                    '<li><minicart /></li>',
                    '<li class="user" id="anonlogin" ng-show="user.Type == \'TempCustomer\'">',
                    '<a href="admin">',
                    '<i class="fa fa-user"></i>',
                    '{{\'Login\' | r | xlat}}',
                    '</a>',
                    '</li>',
                    '<li class="user" ng-show="user.Type != \'TempCustomer\'" ng-class="{\'active\': isActive([\'admin\', \'addresses\', \'address\', \'messages\', \'message\', \'favoriteorders\'])}">',
                        '<a id="451qa_acct_link2" class="dropdown-toggle" data-toggle="dropdown" href="#">',
                        '<i class="fa fa-user-plus"></i>',
                        '<span class="">{{user.FirstName}} {{user.LastName}}</span>',
                        '</a>',
                        '<ul class="dropdown-menu">',
                            '<li id="451qa_user_link" ng-show="user.Permissions.contains(\'ViewSelfAdmin\')" class="admin">',
                            '<a href="admin">',
                            '{{\'User Information\' | r | xlat}}',
                            '</a>',
                            '</li>',
                            '<li class="order" ng-if="user.Type == \'Customer\'" ng-class="{\'active\': isActive(\'order\'), \'active-xs\': isActive(\'favoriteorders\')}">',
                                '<a id="451qa_order_link" href="order">',
                                '<i class="fa fa-clipboard"></i>',
                                '<span class="hidden-xs">{{\'Orders\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                            '<li id="451qa_addy_link" ng-show="user.Type == \'Customer\' && (user.Permissions.contains(\'CreateShipToAddress\') || user.Permissions.contains(\'CreateBillToAddress\'))" class="addresses">',
                            '<a href="addresses">',
                            '<i class="fa fa-book"></i>',
                            '{{\'Addresses\' | r | xlat}}',
                            '</a>',
                            '</li>',
                            '<li id="451qa_mesg_link" ng-show="user.Type == \'Customer\' && user.Permissions.contains(\'ViewMessaging\')" class="messages">',
                            '<a href="message">',
                            '<i class="fa fa-envelope"></i>',
                            '{{\'Messages\' | r | xlat}}',
                            '</a>',
                            '</li>',
                            '<li class="favorites" ng-show="user.Type == \'Customer\'">',
                            '<a id="451qa_fave_link" href="favoriteorders">',
                            '<i class="fa fa-heart"></i>',
                            '{{\'Favorites\' | r | xlat}}',
                            '</a>',
                            '</li>',
                            '<li class="report mainNavigation-navbar-linkItem" ng-if="user.Type == \'Customer\' && user.Permissions.contains(\'AdvancedReporting\')" ng-class="{\'active\': isActive(\'reports\')}">',
                            '<a id="451qa_report_link" href="reports">',
                            '<i class="fa fa-bar-chart-o"></i>',
                            '<span class="">{{\'Reports\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                            '<li>',
                            '<a href="contactus">',
                            '<i class="fa fa-envelope-o"></i>',
                            '<span class="">{{\'Contact Us\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                            /*temp until minicart fixes
                            '<li class="cart" ng-show="user.Type == \'Customer\'">',
                            '<a href="cart">',
                            '<i class="fa fa-shopping-cart"></i>',
                            '{{\'Cart\' | r | xlat}}',
                            '</a>',
                            '</li>',*/
                            '<li ng-show="user.Type!=\'TempCustomer\'" class="logout">',
                            '<a href="#"  class="451_btn_logout" ng-click="Logout()">',
                            '<i class="fa fa-chevron-circle-right"></i>',
                            '<span>{{\'Log Out\' | r | xlat}}</span>',
                            '</a>',
                            '</li>',
                        '</ul>',
                    '</li>',
                '</ul>',
            '</nav>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

UtilityNavCtrl.$inject = ['$location', '$route', '$scope', '$451', 'User'];
function UtilityNavCtrl($location, $route, $scope, $451, User) {
    /*below functions from NavCtrl.js*/
    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login(function(user) {
                $scope.user = user;
            });
        }
    };

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
