define(['angular', 'app'], function(angular, app) {
	'use strict';

	return angular.module('devBackend', [app.name, 'ngMockE2E'])
		.value('results', {})
		.run(function($httpBackend, results) {
			var fields = [{
				name: "Abstract",
				checked: false
			}, {
				name: "Publication",
				checked: false
			}, {
				name: "Inventor",
				checked: false
			}, {
				name: "Language",
				checked: false
			}, {
				name: "Source",
				checked: false
			}, {
				name: "Priority",
				checked: false
			}];

			//var results = {};

			$httpBackend.whenGET('/fields').respond(fields);
			$httpBackend.whenPOST('/results').respond(function(method, url, data) {
				results = angular.fromJson(data);
				console.log("whenPOST results", results);
				return [200, results, {}];
			});
			$httpBackend.whenGET('/results').respond(function(){
				console.log("whenGET results", results);
				return [200, results, {}];
			});
			$httpBackend.whenGET(/^views\/.+/).passThrough();
		})

	// .service('results', function() {
	// 	this.results = {}
	// 	this.getResults = function() {
	// 		return results;
	// 	}
	// 	this.setResults = function(results) {
	// 		this.results = results;
	// 	}
	// });
});