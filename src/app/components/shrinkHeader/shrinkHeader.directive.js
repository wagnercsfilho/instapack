export default function shrinkHeaderDirective($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                phonepack.shrinkHeader(el[0]);
            }, 0);
        }
    }
}