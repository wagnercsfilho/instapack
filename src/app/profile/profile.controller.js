export default class ProfileController {

    constructor($window, Instagram) {
        var vm = this;
        vm.$window = $window;
        vm.user = navigation.params.user;
        
        Instagram.getUserById(vm.user.id).then(function(data){
            vm.userProfile = data;
        }); 
        
    }

    openProfile(link){
    	var vm = this;

    	vm.$window.open(link, '_system');
    }

}