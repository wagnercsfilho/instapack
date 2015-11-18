class LocalController {

    constructor(Instagram, $cordovaGeolocation) {
        var vm = this;
        vm.Instagram = Instagram;
        vm.$cordovaGeolocation = $cordovaGeolocation;

        vm.posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        };

        vm.$cordovaGeolocation
            .getCurrentPosition(vm.posOptions)
            .then(function(position) {
                Instagram.getLocations(position.coords.latitude, position.coords.longitude).then(function(data) {
                   vm.results = data;
                });
            });
    }

}

export default LocalController;