angular.module('TestMe', ['ngTest.cbSelector', 'ngTest.results', 'ngRoute'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: '/TestMe_NG-master/testForm.html',
      controller: 'CheckBoxController'
    }).
    when('/results', {
      templateUrl: '/TestMe_NG-master/results.html',
      controller: 'ResultsController'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);

angular.module('ngTest.cbSelector', [])
.controller('CheckBoxController', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.cbSelectedByVal = {
		abstract: false,
		publication: false,
		inventor: false,
		language: false,
		source: false,
		priority: false		
	};
	$scope.cbSelectAll = false;

	$scope.testSelectAll = function(){
		var isAllSelected = true;
		for(var key in $scope.cbSelectedByVal){
			if($scope.cbSelectedByVal.hasOwnProperty(key)){
				if($scope.cbSelectedByVal[key] == false){
					isAllSelected = false;
				}
			}
		}
		if(isAllSelected){
			$scope.cbSelectAll = true;
		}else{
			$scope.cbSelectAll = false;
		}
	};

	$scope.selectAllCheckBoxes = function(){
		if($scope.cbSelectAll){
			for(var key in $scope.cbSelectedByVal){
				if($scope.cbSelectedByVal.hasOwnProperty(key)){
					$scope.cbSelectedByVal[key] = true;
				}
			}
		}else{
			$scope.testSelectAll();
		}
	};

	$scope.submit = function(){
		//debugger;
		var selectedItems = [];
		for(var key in $scope.cbSelectedByVal){
			if($scope.cbSelectedByVal.hasOwnProperty(key)){
				if($scope.cbSelectedByVal[key] == true){
					selectedItems.push(key);
				}
			}
		}
		if(selectedItems && selectedItems.length==1 && selectedItems.indexOf("language")!= -1){
			alert('Please select more items!')
			return false;
		}else{
			console.log('Submitting...')
			$rootScope.selectedItems = selectedItems;
		}
	};
}]);

angular.module('ngTest.results', [])
.controller('ResultsController', ['$scope', '$rootScope', function($scope, $rootScope){
	console.log('Results');
	$scope.results = [];
	//debugger;
	if($rootScope.selectedItems){
		//debugger;
		$scope.results = $rootScope.selectedItems;
	}
}]);
