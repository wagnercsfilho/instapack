export default function infiniteScrollDirective($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            var _distance = attrs.distance || 0;

            var _options = {
                distance: _distance
            };

            $timeout(function() {
                window[attrs['infiniteScroll']] = new phonepack.InfiniteScroll(el[0], _options, function() {
                    scope.$apply(attrs.oninfinite);
                });
            }, 0)

        }
    }
}