angular.module('OrderCloud-CategoryNavigation', []);

angular.module('OrderCloud-CategoryNavigation')
    .directive('categorynavigation', categorynavigation)
    .controller('CategoryNavigationCtrl', CategoryNavigationCtrl)
;

function categorynavigation() {
    var directive = {
        restrict: 'E',
        template: template,
        controller: 'CategoryNavigationCtrl'
    };
    return directive;

    function template() {
        return [
            '<section class="category-nav">',
            '<nav class="navbar navbar-default" ng-init="showMobileMenu = false">',
            '<div class="col-xs-12">',
            '<div class="col-xs-10 col-lg-8 col-lg-offset-2">',
            '<ul class="nav navbar-nav navbar-right visible-xs">',
            '<li>',
            '<a ng-click="showMobileMenu = !showMobileMenu">',
            //'<i class="fa fa-caret-down" ng-class="{\'fa-caret-up\':showMobileMenu}"></i>',
            '<img class="img-responsive" src="css/images/us-foods-logo-40x-40.png" alt="US Foods" />',
            '</a>',
            '</li>',
            '</ul>',
            '<ul class="nav navbar-nav" ng-class="{\'hidingDisabled\':showMobileMenu}">',
            '<li class="home" ng-class="{\'active\': isActive(\'catalog\')}">',
            '<a href="catalog" ng-click="showMobileMenu = false">',
            //'<i class="fa fa-home"></i>',
            '<img class="img-responsive" src="css/images/us-foods-logo-40x-40.png" alt="US Foods" />',
            '</a>',
            '</li>',
            '<li ng-class="{\'active\': isActive({{\'catalog/\' + category.InteropID + \'\'}})}">',
            '<categorymodal />',
            '</li>',
            '<li ng-class="{\'active\': isActive([\'catalog/{{category.InteropID}}\'])}" ng-repeat="category in tree">',
            '<a ng-href="{{\'catalog/\' + category.InteropID}}" ng-click="showMobileMenu = false">',
            '{{category.Name}}',
            '</a>',
            '</li>',
            '<productsearchinputnav></productsearchinputnav>',
            '</ul>',
            '</div>',
            '<div class="col-xs-2">',
            '<minicart></minicart>',
            '</div>',
            '</div>',
            '</nav>',
            '</section>'
        ].join('');
    }
}


CategoryNavigationCtrl.$inject = ['$scope', '$location', '$routeParams', 'Category', 'User'];
function CategoryNavigationCtrl($scope, $location, $routeParams, Category, User) {
    if ($routeParams.categoryInteropID) {
        $scope.categoryLoadingIndicator = true;
        Category.get($routeParams.categoryInteropID, function(cat) {
            $scope.currentCategory = cat;
            $scope.categoryLoadingIndicator = false;
        });
    }
    else if($scope.tree){
        $scope.currentCategory ={SubCategories:$scope.tree};
    }


    $scope.$on("treeComplete", function(data){
        if (!$routeParams.categoryInteropID) {
            $scope.currentCategory ={SubCategories:$scope.tree};
        }
    });

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
    // extension of above isActive in path
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