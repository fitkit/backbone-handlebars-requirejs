define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/reveal/correct.hbs',
    'text!../../templates/reveal/incorrect.hbs'],
    function ($, Backbone, Handlebars, correctTemplate, incorrectTemplate) {
        "use strict";
        var RevealView = Backbone.View.extend({
            tagName: 'div',
            className: "answer-reveal-container",
            parentDiv: '#answer-reveal',
            initialize: function (options) {
                this.answer = options.answer;
                this.question = options.question;
                this.response = options.response;
            },
            isCorrect: function () {
                if (this.response.get('val') === this.answer.index) {
                    return true;
                } else {
                    return false;
                }
            },
            render: function () {
                var template;
                if (this.isCorrect()) {
                    template = correctTemplate;
                } else {
                    template = incorrectTemplate;
                }
                template = Handlebars.compile(template);
                $(this.el).html(template({
                    explanation: this.answer.explanation,
                    response: this.question.options[this.response.get('val')].text,
                    question: this.question.title,
                    answer: this.question.options[this.answer.index].text
                }));
                $(this.parentDiv).html(this.el).fadeIn(200);
            }
        });
        return RevealView;
    });