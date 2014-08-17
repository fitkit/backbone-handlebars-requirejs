define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/quiz.hbs',
    '../../collections/questions',
    '../skeleton/pageCounter',
    '../pages/cover',
    '../pages/question'],
    function ($, Backbone, Handlebars, quizTemplate, QuestionCollection, PageCounterView, CoverView, QuestionView) {
        "use strict";
        var BaseQuizView = Backbone.View.extend({
            tagName: 'div',
            parentDiv: '#content',
            events: {
                "click .start-quiz": "renderQuestion"
            },
            currentQuestion: 0,
            createPageCounter: function () {
                this.pageCounter = new PageCounterView({
                    totalQuestions: this.model.get('totalQuestions')
                });
            },
            createQuestionCollection: function () {
                this.questions = new QuestionCollection(
                    this.model.get('questions')
                );
            },
            render: function () {
                var template = Handlebars.compile(quizTemplate);
                this.createQuestionCollection();
                this.createPageCounter();
                $(this.el).html(template(this.model.toJSON()));
                $(this.parentDiv).html(this.el);
                this.renderCover();
                document.title = this.model.get('title');
            },
            renderCover: function () {
                var coverView = new CoverView({
                    model: this.model
                });
                coverView.render();
            },
            renderPageCount: function () {
                this.pageCounter.render(this.currentQuestion);
            },
            getCurrentQuestion: function () {
                return this.questions.at(this.currentQuestion);
            },
            renderQuestion: function () {
                var question = this.getCurrentQuestion(),
                    questionView = new QuestionView({
                        model: question
                    });
                questionView.render();
            }
        });
        return BaseQuizView;
    });