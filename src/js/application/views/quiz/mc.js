define([
    'jquery',
    'backbone',
    './base',
    '../pages/reveal'],
    function ($, Backbone, BaseQuizView, RevealView) {
        "use strict";
        var McQuizView = BaseQuizView.extend({
            events: function(){
                return _.extend({},BaseQuizView.prototype.events,{
                    'click .answer-reveal-next' : 'advance'
                });
            },
            handleResponse: function (event) {
                this.saveResponse(event);
                if (this.model.get('settings').revealAnswer) {
                    this.revealAnswer();
                } else{
                    this.advance();
                }
            },
            getAnswer: function () {
                return this.model.get('answerKey')[this.currentQuestion];
            },
            getQuestion: function () {
                return this.model.get('questions')[this.currentQuestion]
            },
            revealAnswer: function () {
                var reveal = new RevealView({
                    response: this.responses.at(this.currentQuestion),
                    answer: this.getAnswer(),
                    question: this.getQuestion()
                });
                reveal.render();
            },
            calculateResult: function () {
                var answerKey = this.model.get('answerKey'),
                    results = this.model.get('results'),
                    statistics = this.model.get('statistics'),
                    responses = this.responses,
                    totalQuestions = this.model.get('totalQuestions'),
                    score = 0;

                for(var j = 0; j < totalQuestions; j++){
                    var responseIndex = responses.at(j).get('val');
                    var answerIndex = answerKey[j].index;
                    if(responseIndex == answerIndex)
                        score++;

                    //Update question statistics
                    statistics[j].totals[responseIndex]++;

                    //TODO: POST request to update statistics
                }

                //Store the proper result outcome
                var numResults = results.length,
                    max = totalQuestions + 1,
                    remainder = max % numResults,
                    minAmt = Math.floor(max / numResults),
                    amt = 0,
                    resultIndex = 0;

                for(var i = 0; i < totalQuestions; i++){
                    amt += minAmt;
                    if(i < remainder){
                        amt++;
                    }
                    if(score < amt){
                        resultIndex = i;
                        break;
                    }
                }

                this.result = results[resultIndex];
                this.result.showScore = true;
                this.result.score = score;
                this.result.total = totalQuestions;

            }
        });
        return McQuizView;
    });