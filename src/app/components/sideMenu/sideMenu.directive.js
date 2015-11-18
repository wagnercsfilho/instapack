export default function sideMenuDirective($rootScope, $timeout) {
    return {
        restrict: 'AE',
        link: function(scope, el, attrs) {
            var overlay = attrs.overlay || null;
            var options = {
                overlay: overlay === 'true' ? true : false
            };

            var sideMenu = new phonepack.SideMenu(el[0], options);
            $timeout(function() {
                $rootScope[attrs['sideMenu']] = window[attrs['sideMenu']] = sideMenu;
            }, 0);

        }
    }
}