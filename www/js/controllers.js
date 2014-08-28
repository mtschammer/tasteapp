angular.module('tasteapp.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

    })
    .controller('HomeCtrl', function ($scope, $state, Players, Results) {
        $scope.players = Players;
        $scope.results = Results;
        $scope.results.answers = [];
        $scope.begin = function (item, event) {
            $state.go('app.questions');
        };
    })
    .controller('QuestionsCtrl', function ($scope, $state, $ionicScrollDelegate, $ionicSlideBoxDelegate, Players,
                                           Categories, Questions, Results) {
        $scope.players = Players;
        $scope.questions = Questions($scope.players);
        $scope.results = Results;
        $scope.categories = Categories;
        $scope.answers = {};
        $scope.playerNumber = 0;

        $scope.prevSlide = function () {
            $ionicSlideBoxDelegate.previous();
        };

        $scope.slideHasChanged = function (index) {
            $ionicScrollDelegate.scrollTop(true);
        };

        $scope.nextSlide = function () {
            $ionicSlideBoxDelegate.next();
        };

        $scope.saveAnswers = function (playerNumber) {
            $scope.results.answers.push(angular.copy($scope.answers));
            $scope.answers = {};
            if ($scope.playerNumber == $scope.players.length - 1) {
                $state.go('app.results');
            }

            $scope.playerNumber += 1;
            $ionicSlideBoxDelegate.slide(0);

        };
    })
    .controller('ResultsCtrl', function ($scope, Players, Categories, Questions, Results) {
        $scope.players = Players;
        $scope.results = Results;
        $scope.categories = Categories;
        $scope.questions = Questions($scope.players);
        $scope.results['results'] = $scope.results.matchAnswers($scope.results['answers']);
    });
