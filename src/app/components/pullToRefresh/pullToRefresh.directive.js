export default function pullToRefreshDirective($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            var options = {
                type: attrs.type || 'snake'
            };

            $timeout(function() {
                window[attrs['pullToRefresh']] = new phonepack.PullToRefresh(el[0], options, function() {
                    scope.$apply(attrs.onrefresh);
                });
            }, 0);

        }
    }
}