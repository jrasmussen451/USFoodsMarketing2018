angular.module('OrderCloud-FeaturedItems', []);

angular.module('OrderCloud-FeaturedItems')
    .directive('featureditems', featureditems)
    .controller('FeaturedItemsCtrl', FeaturedItemsCtrl)
    .filter('featuredItemFilter', featuredItemFilter)
;

function featureditems() {
    var directive =  {
        restrict: 'E',
        template: template,
        controller: FeaturedItemsCtrl
    };
    return directive;

    function template() {
        return [
            '<h2 class="text-center">Featured Items</h2>',
            '<ul class="featured-items text-center" ng-class="{\'active\': isActive(\'catalog\')}">',
            //'<li class="col-xs-12 col-sm-4" ng-repeat="featureditem in featureditems">', //feature 3 items
            '<li class="col-xs-12 col-sm-3" ng-repeat="featureditem in featureditems">', //feature 4 items
            '<div class="caption">',
            '<h3>{{featureditem.text}}</h3>',
            '</div>',
            '<div>',
            '<a href="{{featureditem.link}}"><img ng-src="{{featureditem.image}}" /></a>',
            '</div>',
            '</li>',
            '</ul>'
        ].join('');
    }
}

FeaturedItemsCtrl.$inject = ['$scope', '$filter', '$location'];
function FeaturedItemsCtrl($scope, $filter, $location) {

    $scope.featureditems = [];
    $scope.$watch('user.CustomFields', function(newVal){
        if (!newVal) return;
        if ($scope.featureditems) {
            $scope.featureditems = []; //reset the counter
            $scope.featureditems = $scope.featureditems.concat($filter('featuredItemFilter')($scope.user.CustomFields, 'featureditem'));
        }
    });

    // from NavCtrl.js
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
}

function featuredItemFilter() {
    return function (fields, name) {
        var result = [];
        angular.forEach(fields, function(field) {
            if(field.Name.toUpperCase().indexOf(name.toUpperCase()) > -1){
                var featureditem = {
                    text: field.UploadInstructions,
                    image: field.File.Url,
                    link: field.Label
                };
                if (featureditem.link.toUpperCase().indexOf("NONE") > -1) {
                    featureditem.link = null;
                }
                result.push(featureditem);
            }
        });
        return result;
    }
}
