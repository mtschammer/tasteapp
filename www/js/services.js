angular.module('tasteapp.services', [])
    .factory('Players', function () {
        var players = [
            {
                name: '',
                done: false,
                male: false
            },
            {
                name: '',
                done: false,
                male: true
            }
        ];
        return players;
    })
    .factory('Categories', function () {
        return ['bleh1', 'bleh2', 'bleh3'];
    })
    .factory('Questions', function () {
        return  function(players){
            var males = players.filter(function(player){return player.male == true;});
            var females = players.filter(function(player){return player.male == false;});

            if(males.length && !females.length){
                return QUESTIONS_M2M;
            }
            else if(females.length && !males.length){
                return QUESTIONS_F2F;
            }

            return QUESTIONS_F2M;
        };
    })
    .factory('Results', function () {
        return {
            answers: [],
            results: [],
            matchAnswers: function (answers) {
                results = [];
                for (question in answers[0]) {
                    if (answers[0][question] == 3 || answers[0][question] == 2) {
                        // If the answer of the first player isn't "Yes" or "If other", don't even bother.
                        var match = true;
                        for (i = 1; i < answers.length; i++) {
                            // Go through the answers of the other players.
                            if (!(answers[0][question] == 3 && answers[i][question] == 3) &&
                                (answers[0][question] != 2 && answers[i][question] != 2)) {
                                // No direct 'Yes' match.
                                match = false;
                            }
                            else if ((!(answers[0][question] == 2 && answers[i][question] == 3)
                                && !(answers[0][question] == 3 && answers[i][question] == 2))
                                && (answers[0][question] != 3 && answers[i][question] != 3)) {
                                // Making sure this isn't a case of "If other".
                                match = false;
                            }
                        }

                        if (match) {
                            results.push(question);
                        }
                    }
                }
                return results;
            }
        };
    });