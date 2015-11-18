class MediaLocalController {

    constructor(Instagram) {
        var vm = this;
        vm.Instagram = Instagram;
        vm.local = navigation.params.local;

        Instagram.getMediaByLocationId(vm.local.id).then(function(data) {
            vm.results = data;
        });

    }

}

export default MediaLocalController;