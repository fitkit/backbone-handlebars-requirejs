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
                    statistics = this.model.get('statistics'),
                    responses = this.responses,
                    totalQuestions = this.model.get('totalQuestions'),
                    score = 0;

                for(var j = 0; j < totalQuestions; j++){
                    var responseIndex = responses.at(j).get('val');
                    score += answerKey[j][responseIndex];

                    //Update question statistics
                    statistics[j].totals[responseIndex]++;

                    //TODO: POST request to update statistics
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

            }
        });
        return ScoreQuizView;
    });