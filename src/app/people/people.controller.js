class PeopleController {

    constructor(Instagram, $cordovaGeolocation) {
        var vm = this;
        vm.$cordovaGeolocation = $cordovaGeolocation;
        vm.Instagram = Instagram;
        vm.results = [];
        vm.posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };

        vm.$cordovaGeolocation
            .getCurrentPosition(vm.posOptions)
            .then(function(position) {
                Instagram.getByLocation(position.coords.latitude, position.coords.longitude).then(function(data) {
                    angular.forEach(data, function(data) {
                        vm.results.push(data.user);
                    });

                });
            });
    }

}

export default PeopleController;