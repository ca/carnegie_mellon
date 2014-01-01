var app = angular.module('App', []);

app.controller("VoteCtrl", function($scope, $http){

	$scope.votes = 0;

    $scope.result = {};

    $http.get('/api/votes')
    .success(function(data, status, headers, config) {
        $scope.result = {
            "upvotes": data[data.length - 1].upvotes,
            "downvotes": data[data.length - 1].downvotes
        };
        console.warn(data);
        console.warn($scope.result);
    }).error(function(data, status, headers, config) {
        alert("Error retrieving votes! " + data);
    });

	$scope.voteUp = function () {
		$scope.votes += 1;
        $scope.result.upvotes += 1;
        $http.put('/api/votes/52c3b1b8ecd11f3d564076fe', $scope.result)
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