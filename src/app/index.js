import runBlock from './index.run';
import calculateDistanceFilter from './components/core/calculateDistance.filter';
import TabBarDirective from './components/tabBar/tabBar.directive'; 
import shrinkHeaderDirective from './components/shrinkHeader/shrinkHeader.directive'; 
import PullToRefreshDirective from './components/pullToRefresh/pullToRefresh.directive'; 
import infiniteScrollDirective from './components/infiniteScroll/infiniteScroll.directive'; 
import NavigationDirective from './components/navigation/navigation.directive'; 
import SideMenuDirective from './components/sideMenu/sideMenu.directive'; 
import DropDownMenuDirective from './components/dropDownMenu/dropDownMenu.directive'; 
import InstagramService from './components/instagram/instagram.service';
import TimelineDirective from './components/timeline/timeline.directive'; 
import MainController from './main/main.controller';
import TimelineController from './timeline/timeline.controller';
import ProfileController from './profile/profile.controller';
import LocalController from './local/local.controller';
import MediaLocalController from './local/mediaLocal.controller';
import PeopleController from './people/people.controller';
import LoginController from './login/login.controller';


window
    .angular.module('app', ['ngTouch', 'ngCordova', 'angularMoment', 'ngMap'])
    .run(runBlock) 
    .filter('calculateDistance', calculateDistanceFilter)
    .directive('infiniteScroll', infiniteScrollDirective)
    .directive('pullToRefresh', PullToRefreshDirective)
    .directive('tabBar', TabBarDirective)
    .directive('navigation', NavigationDirective)
    .directive('sideMenu', SideMenuDirective)
    .directive('dropDownMenu', DropDownMenuDirective)
    .directive('shrinkHeader', shrinkHeaderDirective)
    .directive('timeline', TimelineDirective)
    .service('Instagram', InstagramService)
    .controller('MainController', MainController)
    .controller('TimelineController', TimelineController)
    .controller('LocalController', LocalController)
    .controller('MediaLocalController', MediaLocalController)
    .controller('PeopleController', PeopleController)
    .controller('LoginController', LoginController)
    .controller('ProfileController', ProfileController);