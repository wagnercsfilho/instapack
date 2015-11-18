export default class TimelineController {

    constructor(Instagram, $cordovaGeolocation, $timeout) {
        var vm = this;
        vm.$cordovaGeolocation = $cordovaGeolocation;
        vm.Instagram = Instagram;
        vm.location = {};
        vm.minTimestamp = null;
        vm.posOptions = {
            timeout: 10000,
            enableHighAccuracy: false
        }; 

        var loading = new phonepack.Loading({ overlay: false });
        loading.show(); 

        vm.$cordovaGeolocation
            .getCurrentPosition(vm.posOptions)
            .then(function(position) {
                vm.location.lat = position.coords.latitude;
                vm.location.long = position.coords.longitude;
                Instagram.getByLocation(vm.location.lat, vm.location.long).then(function(data) {
                    vm.results = data;
                    vm.minTimestamp = data.slice(-1)[0].created_time;    

                    loading.hide();                 
                });
            }, function(err){
                alert('Could not retrieve your location.');
            });

    }

    onRefresh() {

        var vm = this;
        vm.$cordovaGeolocation
            .getCurrentPosition(vm.posOptions)
            .then(function(position) {
                vm.location.lat = position.coords.latitude
                vm.location.long = position.coords.longitude
                vm.Instagram.getByLocation(vm.location.lat, vm.location.long).then(function(data) {
                    vm.results = data;
                    vm.minTimestamp = data.slice(-1)[0].created_time;

                    window.pullToRefresh.hide();
                });
            });
    }

    onInfinite() {
        var vm = this;
        vm.$cordovaGeolocation
            .getCurrentPosition(vm.posOptions)
            .then(function(position) {
                vm.location.lat = position.coords.latitude
                vm.location.long = position.coords.longitude
                vm.Instagram.getByLocation(vm.location.lat, vm.location.long, vm.minTimestamp).then(function(data) {
                    for (let i = 0; i < data.length; i++) {
                        vm.results.push(data[i]);
                    }
                    vm.minTimestamp = data.slice(-1)[0].created_time;
                    window.infiniteScroll.hide();
                });
            });
    }

    changeDistance() {
        alert('Not yet implemented');
    }

}