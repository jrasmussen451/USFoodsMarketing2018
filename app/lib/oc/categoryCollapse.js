angular.module('OrderCloud-CategoryCollapse', []);

angular.module('OrderCloud-CategoryCollapse')
    .directive('categorycollapse', categorycollapse)
    .directive('collapsenode', collapsenode)
    .controller('CategoryCollapseCtrl', CategoryCollapseCtrl)
;

function categorycollapse() {
    var directive = {
        restrict: 'E',
        /*scope: {
            tree: '=',
            current: '='
        },*/
        template: template,
        controller: 'CategoryCollapseCtrl'
    };
    return directive;

    function template() {
        return [
            '<div class="visible-xs visible-sm visible-md">',
            '<div class="col-xs-4">',
            '<a class="main-toggle" ng-click="isCollapsed = !isCollapsed" ng-class="{\'active\': !isCollapsed, \'\': isCollapsed}">',
            '<i ng-show="isCollapsed" class="fa fa-bars fa-2x toggle-btn"></i>',
            '<i ng-hide="isCollapsed" class="fa fa-times fa-2x toggle-btn"></i>',
            '</a>',
            '</div>',
            '<div class="col-xs-4 nav-brand text-center">',
            '<a href="catalog">',
            '<img src="css/images/USFoods/logo.png" />',
            '</a>',
            '</div>',
            '<div class="col-xs-4 pull-right text-right">',
            '<a href="search" style="margin-right:15px">',
            '<i class="fa fa-2x fa-search"></i>',
            '</a>',
            //
            '<a href="admin" ng-show="user.Type == \'TempCustomer\'" class="dropdown-toggle" data-toggle="dropdown" href="#">',
            '<i class="fa fa-2x fa-user"></i>',
            '</a>',
            '<a href="admin" ng-show="user.Type != \'TempCustomer\'" class="dropdown-toggle" data-toggle="dropdown" href="#">',
            '<i class="fa fa-2x fa-user-plus"></i>',
            '</a>',
            '<ul class="dropdown-menu">',
            '<li class="user" id="anonlogin" ng-show="user.Type == \'TempCustomer\'">',
            '<a href="admin">',
            '{{\'Login\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li id="451qa_user_link" ng-show="user.Permissions.contains(\'ViewSelfAdmin\')" class="admin">',
            '<a href="admin">',
            '{{\'User Information\' | r | xlat}}',
            '</a>',
            '</li>',
            '<li class="order" ng-if="user.Type == \'Customer\'" ng-class="{\'active\': isActive(\'order\'), \'active-xs\': isActive(\'favoriteorders\')}">',
            '<a id="451qa_order_link" href="order">',
            '<i class="fa fa-clipboard"></i>',
            '<span>{{\'Orders\' | r | xlat}}</span>',
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
            '<li ng-show="user.Type!=\'TempCustomer\'" class="logout">',
            '<a href="#"  class="451_btn_logout" ng-click="Logout()">',
            '<i class="fa fa-chevron-circle-right"></i>',
            '<span>{{\'Log Out\' | r | xlat}}</span>',
            '</a>',
            '</li>',
            '</ul>',
            //
            '</div>',
            '</div>',
            //the mobile version - only so that the menu can be collapsed by default
            '<div class="hidden-md hidden-lg col-xs-12 col-collapse collapse out" collapse="isCollapsed">',
            '<div class="nav-side-menu">',
            '<div class="nav-brand hidden-xs hidden-sm">',
            '<a href="catalog">',
            '<img src="css/images/USFoods/logo.png" />',
            '</a>',
            '</div>',
            '<div class="menu-list">',
            '<ul id="menu-content" class="menu-content">',
            '<ul class="parent">',
            '<collapsenode class="nav" ng-repeat="node in tree" node="node" current="current"></collapsenode>',
            '</ul>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>',
            //the desktop version
            '<div class="hidden-xs hidden-sm visible-md visible-lg">',
            '<div class="nav-side-menu">',
            '<div class="nav-brand hidden-xs hidden-sm">',
            '<a href="catalog">',
            '<img src="css/images/USFoods/logo.png" />',
            '</a>',
            '</div>',
            '<div class="menu-list">',
            '<ul id="menu-content" class="menu-content">',
            '<ul class="parent">',
            '<li ng-if="node.InteropID = \'FedExQuickPrint\'"><a target="_blank" href="https://printonline.fedex.com/nextgen/supplylogic_usf">FedeX QuickPrint</a></li>',
            '<collapsenode class="nav" ng-repeat="node in tree" node="node" current="current"></collapsenode>',
            '</ul>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

collapsenode.$inject = ['$compile'];
function collapsenode($compile) {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            node: '=',
            current: '='
        },
        template: template,
        controller: 'CategoryCollapseCtrl',
        link: function(scope, element) {
            scope.toggle = function() {
                scope.node.expanded = !scope.node.expanded;
            };
            scope.toggleSub = function(name) {
                /*console.log(name);
                console.log(scope.node.SubCategories);
                console.log("current " + scope.current);

                angular.forEach(scope.node.SubCategories, function(sub) {
                    scope.subID = sub.InteropID;
                    //console.log(scope.subID);
                    if(name == sub.Name) {
                        console.log("does name = subname " + sub.Name);
                        //scope.node.SubCategories.expanded = !scope.node.SubCategories.expanded;
                        scope.node.SubCategories.expanded = !scope.node.SubCategories.expanded;
                    }
                });*/ //jen

                //scope.node.SubCategories.expanded = !scope.node.SubCategories.expanded; //og
            };
            /*if (angular.isArray(scope.node.SubCategories)) {
                element.append($compile("<categorytree collapse='!node.expanded' tree='node.SubCategories' current='current'/>")(scope));
            }*/ //og
        }
    };
    return directive;

    function template() {
        return [
            '<li class="451_cat_item" ng-class="{\'active\': node.expanded}" ng-if="node.InteropID !== \'FedExQuickPrint\'">',
                '<a ng-show="node.SubCategories" ng-click="toggle()">{{node.Name}}&nbsp;',
                '<i ng-show="node.expanded" class="fa fa-minus-circle"></i>',
                '<i ng-show="!node.expanded" class="fa fa-plus-circle"></i>',
                '</a>',
                //'<a ng-hide="node.SubCategories" ng-href="catalog/{{node.InteropID}}" ng-bind-html="node.Name"></a>',
                '<a ng-hide="node.SubCategories" ng-click="retarget(\'catalog/{{node.InteropID}}\')" ng-bind-html="node.Name"></a>',
                '<ul ng-if="node.SubCategories.length > 0" class="collapse subL1" collapse="!node.expanded">',
                    '<li ng-repeat="subL1 in node.SubCategories" node="node" current="current">',
                        '<a ng-show="subL1.SubCategories" ng-click="subL1.SubCategories.expanded = !subL1.SubCategories.expanded" ng-class="{\'active\': subL1.SubCategories.expanded}">{{subL1.Name}}&nbsp;',
                        '<i ng-show="!subL1.SubCategories.expanded" class="fa fa-plus-circle"></i>',
                        '<i ng-show="subL1.SubCategories.expanded" class="fa fa-minus-circle"></i>',
                        '</a>',
                        '<a ng-hide="subL1.SubCategories" ng-click="retarget(\'catalog/{{subL1.InteropID}}\')" ng-bind-html="subL1.Name"></a>',
                        '</a>',
                        '<i ng-hide="subL1.SubCategories" class="fa fa-arrow-circle-o-right"></i>', //this has to be outside of the a for some reason
                            '<ul class="collapse subL2" id="subL2" collapse="!subL1.SubCategories.expanded">',
                            '<li ng-repeat="subL2 in subL1.SubCategories">',
                                '<a ng-hide="subL2.SubCategories" ng-click="retarget(\'catalog/{{subL2.InteropID}}\')" ng-bind-html="subL2.Name"></a>',
                                '<i class="fa fa-arrow-circle-o-right"></i>',
                                '</a>',
                            '</li>',
                        '</ul>',
                    '</li>',
                '</ul>',
            '</li>'
        ].join('');
    }
}


CategoryCollapseCtrl.$inject = ['$location', '$scope', '$rootScope', 'User'];
function CategoryCollapseCtrl($location, $scope, $rootScope, User) {

    $scope.isCollapsed = true;

    $scope.retarget = function(url) {
        $scope.target = url;
        $location.path($scope.target);
        $rootScope.$broadcast('clicked');
    };

    $scope.$on('clicked', function() {
        $scope.isCollapsed = true;
    });

    $scope.Logout = function(){
        User.logout();
        if ($scope.isAnon) {
            $location.path("/catalog");
            User.login(function(user) {
                $scope.user = user;
            });
        }
    };
}