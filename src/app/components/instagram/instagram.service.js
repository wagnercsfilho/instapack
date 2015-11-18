var endPoint = "https://api.instagram.com/v1/";


export default class InstaService {

    constructor($http, $q) {
        this.$q = $q;
        this.$http = $http;
    }

    getByLocation(lat, lng, minTimestamp) {
        var deffered = this.$q.defer();
        var uri = null;
        if (minTimestamp) {
            uri = endPoint + 'media/search?&max_timestamp=' + minTimestamp + '&lat=' + lat + '&lng=' + lng;
        }
        else {
            uri = endPoint + 'media/search?lat=' + lat + '&lng=' + lng;
        }
        this.$http.jsonp(uri + '&client_id=8bbd5711d11c4bf9868c490b154c0c3f&callback=JSON_CALLBACK').success(function(response) {
            deffered.resolve(response.data);
        }).error(function(err) {
            deffered.reject(err);
        });

        return deffered.promise;

    }

    getUserSelf(){
        var deffered = this.$q.defer();
        this.$http.jsonp(endPoint + 'users/self?client_id=8bbd5711d11c4bf9868c490b154c0c3f&callback=JSON_CALLBACK').success(function(response) {
            deffered.resolve(response.data);
        }).error(function(err) {
            deffered.reject(err);
        });

        return deffered.promise;
    }

    getUserById(id) {
        var deffered = this.$q.defer();
        this.$http.jsonp(endPoint + 'users/' + id + '?client_id=8bbd5711d11c4bf9868c490b154c0c3f&callback=JSON_CALLBACK').success(function(response) {
            deffered.resolve(response.data);
        }).error(function(err) {
            deffered.reject(err);
        });

        return deffered.promise;

    }

    getUserMedia(id) {
        var deffered = this.$q.defer();
        this.$http.jsonp(endPoint + 'users/' + id + '/media/recent?client_id=8bbd5711d11c4bf9868c490b154c0c3f&callback=JSON_CALLBACK').success(function(response) {
            deffered.resolve(response.data);
        }).error(function(err) {
            deffered.reject(err);
        });

        return deffered.promise;

    }

    getLocations(lat, lng) {
        var deffered = this.$q.defer();
        this.$http.jsonp(endPoint + 'locations/search?lat=' + lat + '&lng=' + lng + '&client_id=8bbd5711d11c4bf9868c490b154c0c3f&callback=JSON_CALLBACK').success(function(response) {
            deffered.resolve(response.data);
        }).error(function(err) {
            deffered.reject(err);
        });

        return deffered.promise;

    }

    getMediaByLocationId(id) {
        var deffered = this.$q.defer();
        this.$http.jsonp(endPoint + 'locations/' + id + '/media/recent?client_id=8bbd5711d11c4bf9868c490b154c0c3f&callback=JSON_CALLBACK').success(function(response) {
            deffered.resolve(response.data);
        }).error(function(err) {
            deffered.reject(err);
        });

        return deffered.promise;

    }
}