define([
    'jquery',
    'backbone',
    './base',
    '../pages/reveal'],
    function ($, Backbone, BaseQuizView, RevealView) {
        "use strict";
        var McQuizView = BaseQuizView.extend({
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
            events: function(){
                return _.extend({},BaseQuizView.prototype.events,{
                    'click .answer-reveal-next' : 'advance'
                });
            }
        });
        return McQuizView;
    });