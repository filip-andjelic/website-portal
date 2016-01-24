angular.module( "appModule", []);
// Main controlle of the app
angular.module( "appModule" )
.controller( "omniaCtrl", [ "$scope" , "$route", "$routeParams", "$location",
	function( $scope, $route, $routeParams, $location ) {

		this.$route 			= $route;
    this.$location 		= $location;
    this.$routeParams = $routeParams;

    $scope.page = 0;
    $scope.clickPage = function ( event, number ) {
    	// triger if page is not already opened
    	if( number !== $scope.page  && !$(event.currentTarget).hasClass('prev-tab')){
	    	var homePage = $('#home');
	    	homePage.removeClass();
	    	$scope.page = number;
	    	switch(number) {
	    		case 1:
	    			homePage.addClass('back-tab top-left-tab');
	    			break;
	    		case 2:
	    			//homePage.removeClass();
	    			homePage.addClass('back-tab top-right-tab');
	    			break;
	    		case 3:
	    			//homePage.removeClass();
	    			homePage.addClass('back-tab bot-right-tab');
	    			break;
	    		case 4:
	    			//homePage.removeClass();
	    			homePage.addClass('back-tab bot-left-tab');
	    			break;			
	    	}
    	}
    	$('.prev-tab').removeClass('prev-tab');
    };
    $scope.$watch('page', function(newVal, oldVal){
			$scope.$broadcast('pageSwitch', $scope.page);
		});
}]);
// Directive pages for topics
angular.module( "appModule" )
.directive( "topicHolder", function( $http ){
	return {
		restrict: "A",
		scope: {
			topic: "@"
		},
		templateUrl: "views/home.html",
		link: function (scope, element, attrs) {

			var childScope = $(element).children().scope();
			scope.json = {};
			scope.loadOrganize = function (name) {
				setTimeout(function(){
					$http({
						method: 'GET',
						url:    '/website-development/demo-data/'+name+'.json'
					}).then(function(response){
						scope.json 							= response.data.organize;
						childScope.content.json = response.data.organize;
					});
				},0);
			};
			scope.topic = attrs.topic;

			switch(scope.topic) {
				case 'downtownData': 
					scope.loadOrganize('default-organize');
					scope.content = {
						header: 'DOWNTOWN',
						page:   1
					};
					childScope.content = scope.content;
					break;
				case 'artCultureData': 
					scope.loadOrganize('default-organize');
					scope.content = {
						header: 'ART',
						page:   2
					};
					childScope.content = scope.content;
					break;
				case 'peopleData': 
					scope.loadOrganize('default-organize');
					scope.content = {
						header: 'PEOPLE',
						page:   3
					};
					childScope.content = scope.content;
					break;
				case 'roadData': 
					scope.loadOrganize('default-organize');
					scope.content = {
						header: 'ROAD',
						page:   4
					};
					childScope.content = scope.content;
					break;
				case 'homeData': 
					scope.loadOrganize('box-organize');
					scope.content = {
						header: 'HOME',
						page:   0
					};
					childScope.content = scope.content;
					break;
			}
		}
	}
});
// Controller for page directives
angular.module( "appModule" )
.controller( 'topicController', ["$scope", "$http", function( $scope, $http ) {

	$scope.page = $('#arch-wrapper').scope().page;
	$scope.$on('pageSwitch', function(event, param){
		$scope.page = param;
		$scope.goToList = [
			{	
				link:  $scope.page === 1 ? 0 : 1,
				title: $scope.page === 1 ? 'Home' : 'Downtown'
			},{	
				link:  $scope.page === 2 ? 0 : 2,
				title: $scope.page === 2 ? 'Home' : 'Art & Culture'
			},{	
				link:  $scope.page === 3 ? 0 : 3,
				title: $scope.page === 3 ? 'Home' : 'People'
			},{	
				link:  $scope.page === 4 ? 0 : 4,
				title: $scope.page === 4 ? 'Home' : 'Hit The Road'
			}
		];
	});
	$scope.goToList = [
		{	
			link:  $scope.page === 1 ? 0 : 1,
			title: $scope.page === 1 ? 'Home' : 'Downtown'
		},{	
			link:  $scope.page === 2 ? 0 : 2,
			title: $scope.page === 2 ? 'Home' : 'Art & Culture'
		},{	
			link:  $scope.page === 3 ? 0 : 3,
			title: $scope.page === 3 ? 'Home' : 'People'
		},{	
			link:  $scope.page === 4 ? 0 : 4,
			title: $scope.page === 4 ? 'Home' : 'Hit The Road'
		}
	];
	// triggers when top navigation link is clicked
	$scope.clickLink = function(event, link) {
		var homePage = $('#home');
  	homePage.removeClass();
  	var prevTab = $(event.currentTarget).closest('.topic-container').parent();
  	prevTab.addClass('prev-tab');
  	$('#arch-wrapper').scope().page = link;
  	switch(link) {
  		case 1:
  			homePage.addClass('back-tab top-left-tab');
  			break;
  		case 2:
  			//homePage.removeClass();
  			homePage.addClass('back-tab top-right-tab');
  			break;
  		case 3:
  			//homePage.removeClass();
  			homePage.addClass('back-tab bot-right-tab');
  			break;
  		case 4:
  			//homePage.removeClass();
  			homePage.addClass('back-tab bot-left-tab');
  			break;			
  	}
	};
	// defines object for bottom content
	$scope.botLinks 	= {};
	$scope.leftLinks  = {};
	$scope.rightLinks = {};
	$scope.midLinks	  = {};
	$scope.loadMidLinks = function () {
		$scope.midLinks = {
			link: 'Ponitac_GTO-wallpaper-10304245.jpg',
			id: 13
		};
	};
	$scope.loadMidLinks();
	$scope.loadContentLinks = function () {
		$http({
			method: 'GET',
			url:    '/website-development/demo-data/'+$scope.topic+'-content.json'
		}).then(function(response){
			$scope.topicContent = response.data.data.content;
		  $scope.botLinks 		= $scope.topicContent.botLinks;
			$scope.leftLinks  	= $scope.topicContent.leftLinks;
			$scope.rightLinks 	= $scope.topicContent.rightLinks;
		});
	};
	$scope.loadContentLinks();

	$scope.switchBoxes = function (event) {
		var pickedBox 		 = $(event.currentTarget);
		var thisPage	  	 = pickedBox.scope().content.page;
		var currentPage    = pickedBox.scope().page;
		var currentMidLink = pickedBox.closest('.tab-content').find('.mid-box').scope();
		if ( thisPage === currentPage ) {
			var pickedLink 		 = pickedBox.find('div').scope();
			var midContent 		 = {
				url: currentMidLink.url,
				text: currentMidLink.text
			};
			currentMidLink.url  = pickedLink.url;
			currentMidLink.text = pickedLink.text;
			pickedLink.url 		  = midContent.url;
			pickedLink.text 		= midContent.text;
		}
	};
}]);
// directive for link holder in bottom content panel 
angular.module( "appModule" )
.directive( 'bottomLink', function( $http, $timeout ) {
  return {
  	restrict: 'A',
  	scope: {
  		link: '@'
  	},
  	template: '<div class="bottom-link"><div class="link-content" ng-style="{\'background-image\': \'url(/website-development/assets/img/\'+url+\')\'}"></div></div>',
  	link: function( scope, element, attrs ) {

  		scope.link = scope.$eval(attrs.link);
  		scope.url  = scope.link.link;
  		//console.log(scope.$parent.topic);
  		//console.log(scope.url);
  		/* loading dinymical data
  		$http({
  			method: 'GET',
  			url:    '/website-development/assets/img/'+scope.link
  		}).then(function(response){
  			scope.bottomContent = response;
  		});
			*/
  	}
  }		
});
// directive for link holder in left content panel 
angular.module( "appModule" )
.directive( 'leftBox', function( $http, $timeout ) {
  return {
  	restrict: 'A',
  	scope: {
  		link: '@'
  	},
  	template: '<div class="left-box"><div class="box-content" ng-style="{\'background-image\': \'url(/website-development/assets/img/\'+url+\')\'}"><span class="box-text">{{text}}</span></div></div>',
  	link: function( scope, element, attrs ) {

  		scope.box  = scope.$eval(attrs.box);
  		scope.url  = scope.box.link;
  		scope.text = scope.box.text;
  		//console.log(scope.text);
  		/* loading dinymical data
  		$http({
  			method: 'GET',
  			url:    '/website-development/assets/img/'+scope.link
  		}).then(function(response){
  			scope.bottomContent = response;
  		});
			*/
  	}
  }		
});
// directive for link holder in right content panel 
angular.module( "appModule" )
.directive( 'rightBox', function( $http, $timeout ) {
  return {
  	restrict: 'A',
  	scope: {
  		link: '@'
  	},
  	template: '<div class="right-box"><div class="box-content" ng-style="{\'background-image\': \'url(/website-development/assets/img/\'+url+\')\'}"><span class="box-text">{{text}}</span></div></div>',
  	link: function( scope, element, attrs ) {

  		scope.box  = scope.$eval(attrs.box);
  		scope.url  = scope.box.link;
  		scope.text = scope.box.text;
  		//console.log(scope.url);
  		/* loading dinymical data
  		$http({
  			method: 'GET',
  			url:    '/website-development/assets/img/'+scope.link
  		}).then(function(response){
  			scope.bottomContent = response;
  		});
			*/
  	}
  }		
});
// directive for content holder in mid panel
angular.module( "appModule" )
.directive( 'midBox', function( $http, $timeout ) {
  return {
  	restrict: 'A',
  	scope: {
  		link: '@'
  	},
  	template: '<div class="mid-box"><div class="box-content" ng-style="{\'background-image\': \'url(/website-development/assets/img/\'+url+\')\'}"><div class="content-header"><span class="header">{{text}}</span></div></div></div>',
  	link: function ( scope, element, attrs) {
  		scope.box = scope.$eval(attrs.box);
  		scope.url  = scope.box.link;
  	}
  } 
});