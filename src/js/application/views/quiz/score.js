define([
    'jquery',
    'backbone',
    './base'],
    function ($, Backbone, BaseQuizView) {
        "use strict";
        var ScoreQuizView = BaseQuizView.extend({
            calculateResult: function () {
                var answerKey = this.model.get('answerKey'),
                    results = this.model.get('results'),
                    responses = this.responses,
                    totalQuestions = this.model.get('totalQuestions'),
                    score = 0;

                for(var j = 0; j < totalQuestions; j++){
                    var responseIndex = responses.at(j).get('val');
                    score += parseInt(answerKey[j][responseIndex]);
                }

                //Store the proper result outcome
                var numResults = results.length,
                    resultIndex = 0;

                for(var i = 0; i < numResults; i++){
                    if((score >= results[i].min) && (score <= results[i].max)){
                        resultIndex = i;
                    }
                }

                this.result = results[resultIndex];
                this.result.showScore = true;
                this.result.score = score;

            }
        });
        return ScoreQuizView;
    });