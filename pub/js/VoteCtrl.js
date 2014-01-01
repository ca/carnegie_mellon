var app = angular.module('App', []);

app.controller("VoteCtrl", function($scope, $http){

	$scope.votes = 0;

    $http.get('/api/votes')
    .success(function(data, status, headers, config) {
        $scope.votes = data;
    }).error(function(data, status, headers, config) {
        alert("Error retrieving votes! " + data);
    });

	$scope.voteUp = function () {
		$scope.votes += 1;
        $http.post('/api/votes', $scope.votes)
        .success(function(data, status, headers, config) {
            console.warn(data);
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}

	$scope.voteDown = function () {
		var confirmation = confirm('Are you sure you want to do that?');
		if (confirmation) {
			var secondary = confirm('Are you really sure?');
			if (secondary) {
				alert('Okay fine! But I\'ll remember this!');
				$scope.votes -= 1;
			} else {
				alert('I thought so! Thanks!');
				$scope.votes += 1;
			}
		} else {
			alert('I thought so! Thanks!');
			$scope.votes += 1;
		}
	}
});