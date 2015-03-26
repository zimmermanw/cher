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
                controller  : 'gameController'
            })

    });

    app.controller('weeklyPickController', function(){
        this.message = "Who will be eliminated this week?";
    })

    app.factory('sharedService', function($http) {
        var picks = {longterm: {hometown: '',
                                fantasy: '',
                                'final': ''     
                                        },
                    weekly: "Bob"
                                    }
       return {
         getQuestion: function(callback) {
           $http.get('/questions.json').success(callback);
         },
         getPieces: function(callback){
            $http.get('/pieces.json').success(callback);
         },
         picks: picks
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
        vm.homeMessage = "Who will make it to Hometown Dates?"
        vm.fantasyMessage = "Who will make it to the Fantasy Suite?"
        vm.finalMessage = "Who will make it to the final rose ceremony?"
        // sharedService.getPieces(function(data) {
        //    vm.pieces = data.pieces;
        // });
        vm.clicked = function(event, id, ctl){
            var $selector = $(event.target);
            var name = ""
            function addPick(){
                var type = $selector.data('round')
                $('.long-term-pics').css('opacity', '1')
                $('.long-term-pics').data('clicked',false)
                $selector.data('clicked',true)
                $selector.css('opacity', '.4')
                for(var i=0,ii=ctl.pieces.length; i < ii; i++){
                   if (ctl.pieces[i].id == id) {
                        sharedService.picks.longterm[type] = ctl.pieces[i].name
                   }
                }
            }
            if($selector.data('clicked') == false){
                addPick()
            } else {
                $selector.data('clicked',false)
                $selector.css('opacity', '.4')
            }
            
        }
            
            
    })

    app.controller('adminController', function($scope, sharedService) {
        var vm = this;
        sharedService.getQuestion(function(data) {
           vm.questions = data.questions;

        });
        sharedService.getPieces(function(data) {
           vm.pieces = data.pieces;
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
        vm.addPlayer = function(ctl,id){
            console.log('in hy')
            for(var i=0,ii=vm.pieces.length; i < ii; i++){
               if (vm.pieces[i].id == id) {
                vm.pieces[i].isAlive = true
                ctl.pieces[i].isAlive = vm.pieces[i].isAlive
               }
            }
        }
      
    });

    
    app.controller('gameController', function(sharedService){
          var vm = this;
            sharedService.getQuestion(function(data) {
           vm.questions = data.questions;
        });
            vm.picks = sharedService.picks
            sharedService.getPieces(function(data) {
                vm.pieces = data.pieces;
            });      
    })


    

       
    
   })()

