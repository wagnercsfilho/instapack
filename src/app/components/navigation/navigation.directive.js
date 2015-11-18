export default function navigationDirective($rootScope, $timeout, $compile) {
    return {
        restrict: 'AE',
        link: function(scope, el, attrs) {
            var options = {
                page: attrs.page || null
            };

            $timeout(function() {
                var navigation = new phonepack.Navigation(el[0], options);

                var applyScopeTemplate = function(template, next) {
                    $rootScope.$apply(function() {
                        var compiled = $compile(template)($rootScope);
                        next();
                    });
                };

                navigation.on('beforePush', function(template, next) {
                    applyScopeTemplate(template, next);
                });

                navigation.on('beforeChange', function(template, next) {
                    applyScopeTemplate(template, next);
                });

                $rootScope[attrs['navigation']] = window[attrs['navigation']] = navigation;

            }, 0);


        }
    }
}