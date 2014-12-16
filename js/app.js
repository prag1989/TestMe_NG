angular.module('TestMe', ['ngTest.cbSelector', 'ngTest.results', 'ngRoute'])
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: '/testForm.html',
      controller: 'CheckBoxController'
    }).
    when('/results', {
      templateUrl: '/results.html',
      controller: 'ResultsController'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);

angular.module('ngTest.cbSelector', [])
.controller('CheckBoxController', ['$scope', '$rootScope','$location', function($scope, $rootScope, $location){
	$scope.cbSelectedByVal = {
		abstract: false,
		publication: false,
		inventor: false,
		language: false,
		source: false,
		priority: false		
	};
	$scope.cbSelectAll = false;

	$scope.getKeys = function(Obj,order){
		return Object.keys(Obj).sort(); //ensures that checkboxes are sorted by name.
	}

	//checks for the indeterminate condition.
	var checkIndeterminate = function(selectObject){
		var keys = $scope.getKeys(selectObject);
		var counter = 0; max_limit = keys.length, t = true;
		var elm = document.getElementById('selectAllChkBox');
		keys.forEach(function(el, i){
			t = t && selectObject[el];
			if(selectObject[el]){counter++;}
		});
		if(counter<max_limit && counter!==0){
			if(elm!==null){
				elm.indeterminate = true;
			}
		}
		else{
			elm.indeterminate = false;
		}
	};

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
		checkIndeterminate($scope.cbSelectedByVal);

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
		var selectedItems = [];
		for(var key in $scope.cbSelectedByVal){
			if($scope.cbSelectedByVal.hasOwnProperty(key)){
				if($scope.cbSelectedByVal[key] == true){
					selectedItems.push(key);
				}
			}
		}
		if(selectedItems && selectedItems.length==1 && selectedItems.indexOf("language")!= -1){
			alert('Please select more items!');
		}else{
			$rootScope.selectedItems = selectedItems;
			$location.url('/results'); //prevents page change when only language is selected.
		}
	};

	

}]);



angular.module('ngTest.results', [])
.controller('ResultsController', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.results = [];
	if($rootScope.selectedItems){
		$scope.results = $rootScope.selectedItems;
	}
}]);
