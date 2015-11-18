export default function timelineDirective($window) {
	return {
		restrict: 'E',
		scope: {
			media: '='
		},
		templateUrl: 'app/components/timeline/timeline.html',
		controller: function($scope, $rootScope) {
			$scope.navigation = $rootScope.navigation;

			$scope.openLink = function(link){
				$window.open(link, '_system');
			} 
		}
	}
}