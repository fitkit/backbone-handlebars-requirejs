define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/quiz.hbs',
    '../skeleton/pageCounter',
    '../pages/cover'],
    function ($, Backbone, Handlebars, quizTemplate, PageCounterView, CoverView) {
        "use strict";
        var BaseQuizView = Backbone.View.extend({
            tagName: 'div',
            parentDiv: '#content',
            events: {
                // ...
            },
            currentPage: 0,
            createPageCounter: function () {
                this.pageCounter = new PageCounterView({
                    totalQuestions: this.model.get('totalQuestions')
                });
            },
            render: function () {
                this.createPageCounter();
                var template = Handlebars.compile(quizTemplate);
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
                this.pageCounter.render(this.currentPage);
            }
        });
        return BaseQuizView;
    });