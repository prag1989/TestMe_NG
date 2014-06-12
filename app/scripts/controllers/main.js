define(['angular'], function(angular) {
	'use strict';

	angular.module('testmeNgApp.controllers.MainCtrl', [])
		.controller('MainCtrl', function($scope, $location, $http, fields) {
			$scope.fields = fields;
			$scope.selectAll = false;
			$scope.attempedSubmit = false;

			$scope.toggleSelectAll = function() {
				var previousSelectedState = $scope.selectAll;

				if (previousSelectedState) {
					checkAllWithBoolean($scope.fields, true);
					$scope.selectAll = true;
					return;
				} else {
					checkAllWithBoolean($scope.fields, false);
					$scope.selectAll = false;
					return;
				}
			};

			$scope.updateSelectAll = function() {
				$scope.selectAll = isAllSelected($scope.fields) ? true : false;
			};

			$scope.isFieldTheOnlyOneChecked = function(field) {
				//If the field is not checked then return false right away
				if (!field.checked) {
					return false;
				}

				//If it is checked then loop through the rest of the fields to
				//check if any of them are checked as well
				var result = true;
				angular.forEach($scope.fields, function(currentField) {
					if (currentField.id != field.id && currentField.checked) {
						result = false;
					}
				})
				return result;
			};

			$scope.submit = function(form) {
				$scope.attempedSubmit = true;

				var results = getCheckedFields($scope.fields);
				if (form.$valid) {
					$http.post('/results', results).then(function() {
						$location.path("/results");
					});

				}
			}

			//Private methods
			function checkAllWithBoolean(checkedObject, booleanValue) {
				angular.forEach(checkedObject, function(field) {
					field.checked = booleanValue;
				});
			}

			function isAllSelected(checkedObject) {
				var result = true;
				angular.forEach(checkedObject, function(field) {
					if (result !== false) {
						if (!field.checked) {
							result = false;
						}
					}

				});
				return result;
			}

			function getCheckedFields(fields) {
				var checkedFields = [];
				angular.forEach(fields, function(field) {
					if (field.checked) {
						checkedFields.push(field);
					}
				});
				return checkedFields;
			}
		});
});