export default function tabBarDirective($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                var tabBar = new phonepack.TabBar(el[0]);
            },0);

        }
    }
}