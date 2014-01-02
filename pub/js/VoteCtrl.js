var app = angular.module('App', []);

app.controller("VoteCtrl", function($scope, $http){

    $scope.result = {};

    $http.get('/api/votes')
    .success(function(data, status, headers, config) {
        $scope.result = {
            "upvotes": data[0].upvotes,
            "downvotes": data[0].downvotes
        };
        console.warn(data);
        console.warn($scope.result);
    }).error(function(data, status, headers, config) {
        alert("Error retrieving votes! " + data);
    });

	$scope.voteUp = function () {
        $scope.result.upvotes += 1;
        $http.put('/api/votes/52c3b1b8ecd11f3d564076fe', $scope.result)
        .success(function(data, status, headers, config) {
            console.warn(data);
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}

	$scope.voteDown = function () {
		alert('Alright! You got me!');
        $scope.result.downvotes += 1;
        $http.put('/api/votes/52c3b1b8ecd11f3d564076fe', $scope.result)
        .success(function(data, status, headers, config) {
            console.warn(data);
        }).error(function(data, status, headers, config) {
            console.log("error", data, status, headers, config);
        });
	}
});