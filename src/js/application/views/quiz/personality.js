define([
    'jquery',
    'backbone',
    './base'],
    function ($, Backbone, BaseQuizView) {
        "use strict";
        var PersonalityQuizView = BaseQuizView.extend({
            calculateResult: function () {
                var answerKey = this.model.get('answerKey'),
                    results = this.model.get('results'),
                    statistics = this.model.get('statistics'),
                    responses = this.responses,
                    totalQuestions = this.model.get('totalQuestions'),
                    outcomes = [];

                //Initialize outcome array with zeros
                for(var i=0;i<results.length;i++)
                    outcomes[i] = 0;

                for(var j=0;j<totalQuestions;j++){
                    var responseIndex = responses.at(j).get('val');
                    var outcomeIndex = answerKey[j][responseIndex]-1;
                    outcomes[outcomeIndex]++;

                    //Update question statistics
                    statistics[j].totals[responseIndex]++;

                    //TODO: POST request to update statistics
                }

                //Store the proper result outcome
                var resultIndex = outcomes.indexOf(Math.max.apply(Math,outcomes));
                this.result = results[resultIndex];

            }
        });
        return PersonalityQuizView;
    });