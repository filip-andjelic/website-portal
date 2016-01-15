angular.module( "archModule", [ "ui.bootstrap", "appModule", "ngRoute" ])
	.config(function($routeProvider) {

		$routeProvider.when("/downtown", {
			tempalteUrl: "/views/downtown.html"
		}); 
		$routeProvider.when("/art-culture", {
			tempalteUrl: "/views/art-culture.html"
		});
		$routeProvider.when("/people", {
			tempalteUrl: "/views/people.html"
		});
		$routeProvider.when("/on-road", {
			tempalteUrl: "/views/on-road.html"
		});
		$routeProvider.otherwise({
			tempalteUrl: "/views/home.html"
		});

	});