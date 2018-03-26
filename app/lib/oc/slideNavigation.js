angular.module('OrderCloud-SlideNavigation', []);

angular.module('OrderCloud-SlideNavigation')
    .directive('slidenavigation', slidenavigation)
    .directive('bcnode', bcnode)
    .controller('SlideNavigationCtrl', SlideNavigationCtrl)
    .controller('BCNodeCtrl', BCNodeCtrl)
;

function slidenavigation() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'SlideNavigationCtrl'
    };
    return directive;

    function template() {
        return [
            '<div class="slide-nav text-left" ng-class="{\'showSlideNav\':showSlideOutNav}" style="overflow-y: auto">',
            '<a class="slide-nav-closer" ng-click="closeCatalogSlideOut()"><span class="icon icon-close"><i class="fa fa-times"></i></span></a>',
            '<h2 class="slide-nav-heading">{{\'Browse Catalogs\' | r | xlat}}</h2>',
            '<ul class="slide-nav-list">',
            '<li class="slide-nav-allOptions 451_cat_item nav navbar-default" ng-show="!IsCatTop">',
            '<a class="slide-nav-allOptions-link" ng-href="catalog/" ng-click="GotoRoot()">All Catalogs<span class="icon icon-arrow-left pull-right" ></span></a>',
            '</li>',
            '<li class="slide-nav-bcOption 451_cat_item nav nav-bar" ng-repeat="node in BreadCrumbCats" ng-class="{active:LastBreadCrumb==node}">',
            '<a class="slide-nav-bcOption-link" ng-click="ClickBreadCrumbCat(node)" ng-show="node != LastBreadCrumb()">{{node.Name}}',
            '<span class="icon icon-arrow-left pull-right" ></span>',
            '</a>',
            '<a class="slide-nav-bcOption-link" ng-href="#" ng-show="node == LastBreadCrumb()">{{node.Name}}</a>',
            '</li>',
            '<bcnode class="nav" ng-repeat="node in CurrentSlideOutCat" node=\'node\' current="tree" onclose=\'closeCatalogSlideOut\'/>',
            '</ul>',
            '</div>',
            '<div class="slide-nav-overlay" ng-class="{\'slide-nav-overlay-show\':showSlideOutNav}" ></div>'
        ].join('');
    }
}

function bcnode() {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            node: '=',
            current: '=',
            onclose: '='
        },
        template: template,
        controller: 'BCNodeCtrl'
    };
    return directive;

    function template() {
        return [
            '<li class="slide-nav-navItem 451_cat_item">',
            '<a class ="slide-nav-navItem-link" ng-click="onclose()" ng-href="catalog/{{node.InteropID}}" ng-show="!HasSubCategories(node)">{{node.Name}}</a>',
            '<a class ="slide-nav-navItem-link" ng-href="#" ng-click="ClickSub(node)" ng-show="HasSubCategories(node)">{{node.Name}}',
            '<i class="fa fa-chevron-right pull-right" ></i>',
            '</a>',
            '</li>'
        ].join('');
    }
}

SlideNavigationCtrl.$inject = ['$scope', '$rootScope'];
function SlideNavigationCtrl($scope, $rootScope) {
    $scope.closeCatalogSlideOut = function(){
        $scope.showSlideOutNav = false;
    };
    if ($scope.tree) {
        $scope.CurrentSlideOutCat = $scope.tree.slice(0);
        $rootScope.initslideout = true;
    } else {
        $rootScope.initslideout = false;
    }
    $rootScope.IsCatTop = true;
    $rootScope.BreadCrumbCats = [];
    $rootScope.ChangeCurrentSlideOutCat = function(node){
        $rootScope.initslideout = true;
        $scope.CurrentSlideOutCat = node.SubCategories;
        $rootScope.BreadCrumbCats.push(node);
        $rootScope.IsCatTop = false;
    };
    $scope.LastBreadCrumb = function(){
        if ($rootScope.BreadCrumbCats.length < 1) return null;
        return $rootScope.BreadCrumbCats[$rootScope.BreadCrumbCats.length-1];
    };
    $scope.GotoRoot = function(){
        $scope.CurrentSlideOutCat = $scope.tree.slice(0);
        $rootScope.IsCatTop = true;
        $rootScope.BreadCrumbCats = [];
        $rootScope.initslideout = true;
    };
    $scope.ClickBreadCrumbCat = function(node){
        $scope.CurrentSlideOutCat = node.SubCategories;
        $rootScope.IsCatTop = false;
        var newCrumbs = [];
        for(i=0;i < $rootScope.BreadCrumbCats.length;i++){
            if (node == $rootScope.BreadCrumbCats[i]){
                newCrumbs.push($rootScope.BreadCrumbCats[i]);
                $rootScope.BreadCrumbCats = newCrumbs;
                return;
            }
            newCrumbs.push($rootScope.BreadCrumbCats[i]);
        }
    };
    $scope.$on("treeComplete", function(data){
        if (!$rootScope.initslideout) {
            $scope.CurrentSlideOutCat = $scope.tree.slice(0);
            $rootScope.initslideout = true;
        }
    });

}

BCNodeCtrl.$inject = ['$scope', '$rootScope'];
function BCNodeCtrl($scope, $rootScope) {
    $scope.ClickSub = function(node){
        $rootScope.ChangeCurrentSlideOutCat(node);
    };
    $scope.HasSubCategories = function(node){
        if (angular.isArray(node.SubCategories)&&node.SubCategories.length > 0){
            return true;
        }
        return false;
    };
}