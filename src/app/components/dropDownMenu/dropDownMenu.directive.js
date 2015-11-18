export default function dropDownMenuDirective($timeout) {
    return {
        restrict: 'A',
        link: function(scope, el, attrs) {
            $timeout(function() {
                phonepack.DropDownMenu(el[0], document.getElementById(attrs['dropDownMenuId']));
            }, 0);

        }
    }
}