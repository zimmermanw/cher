(function(){

    // create the module and name it scotchApp
    var app = angular.module('indexApp', ['ngRoute']);

    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'adminController'
            })

            // route for the about page
            .when('/about', {
                templateUrl : 'pages/admin.html',
                controller  : 'questionController'
            })

    });

    app.factory('sharedService', function($http) {
       return {
         getQuestion: function(callback) {
           $http.get('/questions.json').success(callback);
         },
         getPieces: function(callback){
            $http.get('/pieces.json').success(callback);
         }
       }
    });

    app.directive('longTermPick', function() {
      return {
          restrict: 'E',
          templateUrl: 'pages/long_term_picks.html',
          controller: 'longTermPickController',
          controllerAs: 'long'
      };
    });

    app.controller('longTermPickController', function(sharedService){
        var vm = this;
        vm.message = "Who will make it to Hometown Dates?"
        sharedService.getPieces(function(data) {
           vm.pieces = data.pieces;
        });
    })

    app.controller('adminController', function($scope, sharedService) {
        var vm = this;
        sharedService.getQuestion(function(data) {
           vm.questions = data.questions;

        });
        vm.editQuestion = function(ctl, selectedItem){
            ctl.questions[selectedItem].question = vm.questions[selectedItem].question
        }

        vm.edit = function(){
            vm.inEdit = true
            vm.inAdd =  false
        }
        vm.add = function(){
            vm.inAdd = true
            vm.inEdit = false
        }
      
    });

    
    app.controller('questionController', function(sharedService){
          var vm = this;
            sharedService.getQuestion(function(data) {
           vm.questions = data.questions;

        });
    })


    

       
    
   })()

