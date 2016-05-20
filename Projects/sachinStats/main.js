console.log('fishhhh');
angular.module('sachinStats')
        
        // Directive for generic chart, pass in chart options
            .directive('hcChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        category: '=',
                        fetched:'=fetched',
                        data:'=',
                        heading:'@'

                    },
                    link: function (scope, element) {
                         scope.$watch('fetched', function(newValue, oldValue) {
                            
                              if (newValue !== oldValue) {
                                 if(scope.fetched){
                                    Highcharts.chart(element[0],{
                                        title: {
                                            text: scope.heading
                                        },
                                        xAxis: {
                                            categories: scope.category
                                        },

                                        series: [{
                                            data: scope.data
                                        }]

                                    });
                                    }
                              }
                          }, true);
                       
                    }
                };
            })
            // Directive for pie charts, pass in title and data only    
            .directive('hcPieChart', function () {
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        title: '@',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
                        scope.$watch('fetched', function(newValue, oldValue) {
                            
                            if (newValue !== oldValue) {
                                if(scope.fetched){ 

                                    Highcharts.chart(element[0], {
                                        chart: {
                                            type: 'pie'
                                        },
                                        title: {
                                            text: scope.title
                                        },
                                        
                                        plotOptions: {
                                            pie: {
                                                borderWidth: 1,
                                                borderColor: '#000',
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                innerSize: 100,
                                                depth: 70,
                                                dataLabels: {
                                                    enabled: true,
                                                    format: '{point.name}'
                                                }
                                            }
                                        },
                                        series: [{
                                            data: scope.data
                                        }]
                                    });
                                }
                            }
                        }, true);
                    }
                };
            })
            .directive('hiColumnChart',function(){
                return {
                    restrict: 'E',
                    template: '<div></div>',
                    replace:true,
                    scope: {
                        category:'=',
                        data: '=',
                        fetched:'=fetched'
                    },
                    link: function (scope, element) {
                        scope.$watch('fetched', function(newValue, oldValue) {
                            Highcharts.chart(element[0], {
                                chart: {
                                    type: 'column',
                                    
                                },
                                title: {
                                    text: false
                                },
                                xAxis: {
                                    categories: scope.category,
                                    title: {
                                        text: 'Years'
                                    }
                                },
                                yAxis: {
                                    min: 0,
                                    title: {
                                        text: false
                                    },
                                    stackLabels: {
                                        enabled: true,
                                        style: {
                                            fontWeight: 'bold',
                                            color: '#454552'
                                        }
                                    }
                                },
                                legend: {
                                    align: 'right',
                                    x: 0,
                                    verticalAlign: 'top',
                                    y: 0,
                                    floating: true,
                                    backgroundColor: 'white',
                                    borderColor: '#454552',
                                    borderWidth: 1,
                                    shadow: false
                                },
                                tooltip: {
                                    headerFormat: '<b>Year: {point.x}</b><br/>',
                                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                                },
                                plotOptions: {
                                    column: {
                                        stacking: 'normal',
                                        dataLabels: {
                                            enabled: true,
                                            formatter: function() {
                                                if (this.y != 0) {
                                                    return this.y
                                                }
                                            },
                                            color: 'white',
                                            style: {
                                                textShadow: '0 0 3px black'
                                            }
                                        }
                                    }
                                },
                                series:[{
                                            data: scope.data
                                        }]
                            });
                        });
                    }
                };
            });




angular.module('sachinStats')

.factory('dataFactory',["$log","$http", function($log, $http) {
  

  var dataFactory = {};

  

  dataFactory.getData = function() {

      return $http({

        method : 'GET',

        url : 'data/sachin.csv'

      });
    },
    

    return dataFactory;
  }]);


  angular
.module('sachinStats', [
  
  'ui.router',
  
  ])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', {
    url: '/home',
    templateUrl: 'views/main_nav.html',
    controller: 'MainController'
  })
  .state('home.sachin', {
    url: '/',
    controller: 'ManageController',
    views: {
      'home': {
        templateUrl: "views/sachin.html"
      }
    }
  })
  .state('home.batting', {
    url: '/batting',
    controller: 'battingController',
    views: {
      'home': {
        templateUrl: "views/batting.html"
      }
    }
  })
  .state('home.runsPerYear', {
    url: '/winLoss',
    controller: 'runsPerController',
    views: {
      'home': {
        templateUrl: "views/runs_per_year.html"
      }
    }
  })
  .state('home.centuries', {
    url: '/centuries',
    controller: 'centuriesController',
    views: {
      'home': {
        templateUrl: "views/centuries.html"
      }
    }
  })
  .state('home.opponent', {
    url: '/opponent',
    controller: 'opponentController',
    views: {
      'home': {
        templateUrl: "views/opponent.html"
      }
    }
  })
  .state('home.opponent.batting',{
    url:'/batting',
    controller:'opponentController',
    views:{
      'opponentBowlBat':{
        templateUrl:"views/opponent_runs.html"
      }
    }
  })
  .state('home.opponent.bowling',{
    url:'/bowling',
    controller:'opponentController',
    views:{
      'opponentBowlBat':{
        templateUrl:"views/opponent_wickets.html"
      }
    }
  }).state('home.centuries.half',{
    url:'/50',
    controller:'centuriesController',
    views:{
      'centuries':{
        templateUrl:"views/half_centuries.html"
      }
    }
  })
  .state('home.centuries.full',{
    url:'/100',
    controller:'centuriesController',
    views:{
      'centuries':{
        templateUrl:"views/full_centuries.html"
      }
    }
  }).state('home.batting.first',{
    url:'/first_innings',
    controller:'battingController',
    views:{
      'batting':{
        templateUrl:"views/batting_first.html"
      }
    }
  })
  .state('home.batting.second',{
    url:'/second_innings',
    controller:'battingController',
    views:{
      'batting':{
        templateUrl:"views/batting_second.html"
      }
    }
  });
  

  $urlRouterProvider.otherwise('home');
}]);

  angular.module('sachinStats')
.controller('MainController', ['$scope', '$state', function ($scope, $state) {
  $scope.firstVisit = true;
  if($scope.firstVisit){
    $state.go('home.sachin');
    $scope.firstVisit = false;
  }
  $scope.$on('$viewContentLoaded', function (){
    $scope.$broadcast ('viewContentLoaded');
  });
  $scope.highlightBatting=false;
  $scope.highlightRunsPerYear=false;
  $scope.highlightOpponent=false;
  $scope.highlightCenturies=false;
  $scope.goToBattingStats = function(){
    $scope.highlightBatting=true;
    $state.go('home.batting');
    
    $scope.highlightRunsPerYear=false;
    $scope.highlightOpponent=false;
    $scope.highlightCenturies=false;
  };
  $scope.goToRunsPerYearStats = function(){
    $state.go('home.runsPerYear');
    $scope.highlightRunsPerYear=true;
    $scope.highlightBatting=false;
    
    $scope.highlightOpponent=false;
    $scope.highlightCenturies=false;
    
  };
  $scope.goToOpponentStats = function(){
    $state.go('home.opponent');
    $scope.highlightOpponent=true;
    $scope.highlightBatting=false;
    $scope.highlightRunsPerYear=false;
    
    $scope.highlightCenturies=false;
      
  };
  $scope.goToCenturiesStats = function(){
    $state.go('home.centuries');
    $scope.highlightCenturies=true;
    $scope.highlightBatting=false;
    $scope.highlightRunsPerYear=false;
    $scope.highlightOpponent=false;
    
    
  };
  
}]);
angular.module('sachinStats')
.controller('winLossController', ['$scope', '$state','dataFactory', function ($scope, $state,dataFactory) {
    $scope.isFetched=false;
    $scope.yearWiseRuns=[];
    $scope.years=[];
    $scope.prepareGraphData=function(object){
        var isYear=true;
        angular.forEach(object,function(item,key){
                            if(key=='2012'){
                                isYear=false;
                            }
                            if(isYear){
                                $scope.yearWiseRuns.push(item);
                                $scope.years.push(key);
                            }
                            
                        });

    };
    $scope.runsPerYear=function(parsedData){
        var runsPerYear = parsedData.reduce(function (obj, el) {
            var years = el.date.slice(-4);
            var runs = parseInt(el.batting_score);
            
            obj[years] = obj[years] || 0
               
            if (runs) {
                obj[years] += runs
            }

            return obj
        });
        return runsPerYear;
        
    };
    $scope.getCsv = function(){
                dataFactory.getData()
                    .then(function(data){
                        var sachinData=Papa.parse(data.data.trim(), {
                                                header: true
                                            }).data;
                        $scope.isFetched=true;//to confirm that data is fetched and  can be used in directive
                        
                        
                        $scope.prepareGraphData($scope.runsPerYear(sachinData));
                        
                    
                    },function(error){
                      console.log(error);
                      return error;
                });
    };              

    $scope.getCsv();
  
  
}]);
angular.module('sachinStats')
.controller('opponentController', ['$scope', '$state','dataFactory', function ($scope, $state,dataFactory) {
    $scope.isFetched=false;
    $scope.opponentStats=[];
    $scope.wicketsStats=[];
    $scope.highlightTab=true;

    
    $scope.showBattingStats=function(){
        $state.go('home.opponent.batting');
        $scope.isVisited=false;
        $scope.highlightTab=true;
    }
    $scope.showBowlingStats=function(){
        $state.go('home.opponent.bowling');
        $scope.isVisited=false;
        $scope.highlightTab=false;
    }
    $scope.isVisited=true;
     
   

    $scope.prepareGraphData=function(array){
                var pieData=[]
                var isCountry=false;
                angular.forEach(array,function(item,key){
                     if(key=='2012'||key=='Australia'){
                            isCountry=true
                        }
                        if(!isCountry){
                            var obj = {
                                name: key,
                                y: item
                              };
                            pieData.push(obj);// Sample data for pie chart
                        }
                        
                    
                  
                });
                console.log(pieData);
    };

    $scope.runsAgainstOpponent=function(parsedData){
        var oppWiseRunsObj = parsedData.reduce(function (obj, el) {
            var countries = el.opposition.slice(2);
            var runs = parseInt(el.batting_score);
            
            obj[countries] = obj[countries] || 0
               
            if (runs) {
                obj[countries] += runs
            }

            return obj
        });
        var pieData=[];
        var isCountry=false;
        angular.forEach(oppWiseRunsObj,function(item,key){
            if(key=='Australia'){
                isCountry=true
            }
            if(isCountry){
                var obj = {
                    name: key,
                    y: item
                };
                pieData.push(obj);// Sample data for pie chart
            }
                        
                    
                  
        });
        return pieData;
        
    };
    $scope.wicketsAgainstOpponent=function(parsedData){
        var oppWiseWicketsObj = parsedData.reduce(function (obj, el) {
            var countries = el.date.slice(-4);
            var wickets = parseInt(el.wickets);
            
            obj[countries] = obj[countries] || 0
               
            if (wickets) {
                obj[countries] += wickets
            }
            
            return obj
        });
        var pieData=[];
        var isCountry=false;
        angular.forEach(oppWiseWicketsObj,function(item,key){
            if(key=='2012'){
                isCountry=true
            }
            if(!isCountry){
                var obj = {
                    name: key,
                    y: item
                };
                pieData.push(obj);// Sample data for pie chart
            }
                        
                    
                  
        });
        return pieData;
        
    };
                
    $scope.getCsv = function(){
         dataFactory.getData()
                .then(function(data){
                    var sachinData=Papa.parse(data.data.trim(), {
                                            header: true
                                        }).data;
                    $scope.isFetched=true;//to confirm that data is fetched and  can be used in directive
                    
                    $scope.opponentStats=$scope.runsAgainstOpponent(sachinData);
                    console.log($scope.opponentStats);
                    
                    $scope.wicketsStats=$scope.wicketsAgainstOpponent(sachinData);
                    
                
                },function(error){
                  console.log(error);
                  return error;
                });
    };              

  $scope.getCsv();
      
  
  
  
}]);
angular.module('sachinStats')
.controller('centuriesController', ['$scope', '$state','dataFactory', function ($scope, $state,dataFactory) {
    $scope.isFetched=false;
    $scope.years=[];
    $scope.yearWiseCenturies=[];
    $scope.yearWiseHalfCenturies=[];
    $scope.highlightTab=true;
     $scope.showHalfCenturies=function(){
        $state.go('home.centuries.half');
        $scope.isVisited=false;
        $scope.highlightTab=false;
    }
    $scope.showFullCenturies=function(){
        $state.go('home.centuries.full');
        $scope.isVisited=false;
        $scope.highlightTab=true;
    }
    $scope.isVisited=true;

    $scope.prepareGraphData=function(object){
        var isYear=true;
        angular.forEach(object,function(item,key){
                            if(key=='2012'){
                                isYear=false;
                            }
                            if(isYear){
                                $scope.yearWiseCenturies.push(item[1]);
                                $scope.yearWiseHalfCenturies.push(item[0]);
                                $scope.years.push(key);
                            }
                            
                        });

    };
    $scope.centuriesPerYear=function(parsedData){
        var centuriesPerYear = parsedData.reduce(function (obj, el) {
            var years = el.date.slice(-4);
            var runs = parseInt(el.batting_score);
            
            obj[years] = obj[years] || [0,0]
               
            if (50 <= runs && runs < 100) {
                obj[years][0] += 1
            } else if (100 <= runs) {
                obj[years][1] += 1
            }

            return obj
        });
        return centuriesPerYear;
        
    };

    $scope.getCsv = function(){
         dataFactory.getData()
                .then(function(data){
                    var sachinData=Papa.parse(data.data.trim(), {
                                            header: true
                                        }).data;
                    $scope.isFetched=true;//to confirm that data is fetched and  can be used in directive
                    
                    $scope.prepareGraphData($scope.centuriesPerYear(sachinData));
                    
                },function(error){
                  console.log(error);
                  return error;
                });
    };              

  $scope.getCsv();
      
  
}]);
angular.module('sachinStats')
.controller('battingController', ['$scope', '$state','dataFactory' ,function ($scope, $state,dataFactory) {
  
  $scope.isFetched=false;
  $scope.sachinData ;
  $scope.years=[];
  $scope.firstInningRuns=[];
  $scope.totalFirstInningsYearly=[];
  $scope.totalSecondInningsYearly=[];
  $scope.secondInningRuns=[];
  $scope.firstInning = true;
   $scope.showFirstInning=function(){
        $state.go('home.batting.first');
        $scope.isVisited=false;
        $scope.firstInning=true
    }
    $scope.showSecondInning=function(){
        $state.go('home.batting.second');
        $scope.isVisited=false;
        $scope.firstInning=false;
    }
    $scope.isVisited=true;

  $scope.prepareGraphData=function(object){
        var isYear=true;
        angular.forEach(object,function(item,key){
                            if(key=='2012'){
                                isYear=false;
                            }
                            if(isYear){
                                $scope.years.push(key);
                                $scope.firstInningRuns.push(item[0][1]);
                                $scope.totalFirstInningsYearly.push(item[0][0]);
                                $scope.secondInningRuns.push(item[1][1]);
                                $scope.totalSecondInningsYearly.push(item[1][0]);
                            }
                            
                        });
                    

    };
  $scope.centuriesPerYear=function(parsedData){
        var centuriesPerYear = parsedData.reduce(function (obj, el) {
            var years = el.date.slice(-4);
            var runs = parseInt(el.batting_score);
            var  inn = parseInt(el.batting_innings[0]);
             obj[years] = obj[years] || [
                [0, 0],
                [0, 0]
            ]

            if (runs >= 0) {
                if (inn === 1) {
                    // matches per year, runs per year
                    if (el.batting_score.slice(-1) !== '*') obj[years][0][0] += 1
                    obj[years][0][1] += runs
                } else if (inn === 2) {
                    if (el.batting_score.slice(-1) !== '*') obj[years][1][0] += 1
                    obj[years][1][1] += runs
                }
            }

            return obj
        });
        return centuriesPerYear;
        
  };

  $scope.getCsv = function(){
         dataFactory.getData()
                .then(function(data){
                    var sachinData=Papa.parse(data.data.trim(), {
                                            header: true
                                        }).data;
                    $scope.isFetched=true;//to confirm that data is fetched and  can be used in directive
                    
                    $scope.prepareGraphData($scope.centuriesPerYear(sachinData));
                
                },function(error){
                  console.log(error);
                  return error;
                });
    };              

  $scope.getCsv();
      
      
  
}]);
angular.module('sachinStats')
.controller('winLossController', ['$scope', '$state','dataFactory', function ($scope, $state,dataFactory) {
    $scope.isFetched=false;
    $scope.yearWiseRuns=[];
    $scope.years=[];
    $scope.prepareGraphData=function(object){
        var isYear=true;
        angular.forEach(object,function(item,key){
                            if(key=='2012'){
                                isYear=false;
                            }
                            if(isYear){
                                $scope.yearWiseRuns.push(item);
                                $scope.years.push(key);
                            }
                            
                        });

    };
    $scope.runsPerYear=function(parsedData){
        var runsPerYear = parsedData.reduce(function (obj, el) {
            var years = el.date.slice(-4);
            var runs = parseInt(el.batting_score);
            
            obj[years] = obj[years] || 0
               
            if (runs) {
                obj[years] += runs
            }

            return obj
        });
        return runsPerYear;
        
    };
    $scope.getCsv = function(){
                dataFactory.getData()
                    .then(function(data){
                        var sachinData=Papa.parse(data.data.trim(), {
                                                header: true
                                            }).data;
                        $scope.isFetched=true;//to confirm that data is fetched and  can be used in directive
                        
                        
                        $scope.prepareGraphData($scope.runsPerYear(sachinData));
                        
                    
                    },function(error){
                      console.log(error);
                      return error;
                });
    };              

    $scope.getCsv();
  
  
}]);

