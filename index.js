(function(){

    // create the module and name it scotchApp
    var app = angular.module('indexApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'homeController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/admin.html',
                controller  : 'questionController'
            })

    });

    app.factory('questionService', function($http) {
       return {
         getQuestion: function(callback) {
           $http.get('/questions.json').success(callback);
         }
       }
    });

    app.controller('homeController', function($scope, questionService) {
        var vm = this;
      questionService.getQuestion(function(data) {
         vm.foo = data;

      });
      
    });

    
    app.controller('questionController', function(){

    })


    

       
    
   })()

