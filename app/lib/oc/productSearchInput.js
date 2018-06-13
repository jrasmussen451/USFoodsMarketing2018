angular.module('OrderCloud-ProductSearchInput', []);

angular.module('OrderCloud-ProductSearchInput')
    .directive('productsearchinput', productsearchinput)
    .directive('productsearchinputnav', productsearchinputnav)
    .controller('ProductSearchInputCtrl', ProductSearchInputCtrl)
;

function productsearchinput() {
    var directive = {
        restrict: 'E',
        template: searchTemplate,
        controller: 'ProductSearchInputCtrl'
    };
    return directive;

    function searchTemplate() {
        return [
            '<form name="productSearchInput" ng-submit="executeSearch()">',
            '<div class="view-form-icon">',
            '<div class="input-group">',
            '<span class="input-group-btn">',
            '<button type="submit" class="btn btn-inverse" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'"><i class="fa fa-search"></i></button>',
            '</span>',
            '<input type="text" class="form-control" placeholder="{{\'Search\' | r}}" ng-model="productSearchTerm"/>',
            /*'<i class="fa fa-search"></i>',
            '<span class="input-group-btn">',
            '<button type="submit" class="btn btn-default" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'">{{\'Search\' | r}}</button>',
            '</span>',*/
            '</div>',
            '</div>',
            '</form>'
        ].join('');
    }
}

function productsearchinputnav() {
    var directive = {
        restrict: 'E',
        template: searchNavTemplate,
        controller: 'ProductSearchInputCtrl'
    };
    return directive;

    function searchNavTemplate() {
        return [
            '<a href ng-click="displayProductSearch = true;">',
            '<i class="fa fa-search"></i>',
            '</a>',
            '<div class="product-search-display" ng-class="{\'active\':displayProductSearch}">',
            //'<div class="col-xs-10 col-sm-4 col-sm-offset-6">',
            '<div class="col-xs-12 col-lg-8 col-lg-offset-2">',
            '<div>',
            '<form name="productSearchInput" ng-submit="executeSearch()">',
            '<div class="view-form-icon">',
            '<div class="input-group">',
            '<input type="text" class="form-control" placeholder="{{\'Search\' | r}}" ng-model="productSearchTerm"/>',
            //'<i class="fa fa-search"></i>',
            '<span class="input-group-btn">',
            //'<button type="submit" class="btn btn-default" ng-disabled="productSearchTerm == null || productSearchTerm == \'\'"><i class="fa fa-search"></i></button>',
            '<button type="submit" class="btn btn-default"><i class="fa fa-search"></i></button>',
            '</span>',
            '</div>',
            '</div>',
            '</form>',
            '</div>',
            '</div>',
            '<div class="col-xs-2 col-sm-1 text-left">',
            '<i class="fa fa-times" ng-click="displayProductSearch = false"></i>',
            '</div>',
            '</div>',
            //'<ul class="nav navbar-nav pull-right">',
            //'<li class="search-toggle">',
            //'<a href ng-click="displayProductSearch = true;">',
            //'<i class="fa fa-search"></i>',
            //'</a>',
            //'</li>',
            //'</ul>'
        ].join('');
    }
}

ProductSearchInputCtrl.$inject = ['$scope','$location'];
function ProductSearchInputCtrl($scope, $location) {
    $scope.displayProductSearch = false;
    $scope.executeSearch = function() {
        var searchTerm = $scope.productSearchTerm;
        $scope.productSearchTerm = null;
        $scope.displayProductSearch = false;
        $location.path('search/' + searchTerm);
    };
}