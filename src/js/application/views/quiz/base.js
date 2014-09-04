define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/quiz.hbs',
    '../../collections/questions',
    '../../collections/responses',
    '../skeleton/pageCounter',
    '../pages/cover',
    '../pages/question',
    '../pages/email',
    '../pages/results'],
    function ($, Backbone, Handlebars, quizTemplate, QuestionCollection, ResponseCollection, PageCounterView, CoverView, QuestionView, EmailView, ResultsView) {
        "use strict";
        var BaseQuizView = Backbone.View.extend({
            tagName: 'div',
            parentDiv: '#content',
            events: {
                "click .start-quiz": "handleStart",
                "click .question-answer-container": "handleResponse",
                "click .previous-btn": "handlePrevious",
                "click .skip": "handleSkip"
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
            createResponseCollection: function () {
                this.responses = new ResponseCollection();
            },
            render: function () {
                var template = Handlebars.compile(quizTemplate);
                this.createQuestionCollection();
                this.createResponseCollection();
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
                $("#quiz-content").height($(window).height()-50);
            },
            renderPageCount: function () {
                this.pageCounter.render(this.currentQuestion);
            },
            getCurrentQuestion: function () {
                return this.questions.at(this.currentQuestion);
            },
            getResponse: function () {
                if(!this.responses.at(this.currentQuestion))
                    return null;
                else
                    return this.responses.at(this.currentQuestion).get('val');
            },
            renderQuestion: function () {
                var question = this.getCurrentQuestion(),
                    response = this.getResponse(),
                    questionView = new QuestionView({
                        model: question,
                        response: response
                    });
                questionView.render();
                this.pageCounter.render(this.currentQuestion);
            },
            renderEmail: function () {
                //TODO: possibly calculate score and post updates before this
                this.calculateResult();
                var emailView = new EmailView();
                emailView.render();
            },
            renderResults: function () {
                var resultsView = new ResultsView({
                        result: this.result
                    });
                $('.email-modal').animate({top:"-100%"}, 400, "swing", function(){
                    resultsView.render();
                });
            },
            updateProgressBar: function () {
                $('.progress').animate({
                    width: (((this.currentQuestion+1)/this.model.get('totalQuestions'))*100)+'%'
                }, 1000, function(){});
            },
            handleStart: function () {
                this.renderQuestion();
                this.updateProgressBar();
            },
            handleResponse: function (event) {
                var response = $(event.currentTarget).find('input').val();
                var qnum = this.currentQuestion;
                if(!this.responses.at(qnum)){
                    this.responses.add({val:response});
                }else{
                    this.responses.at(qnum).set('val',response);
                }
                this.currentQuestion++;
                if(this.currentQuestion == this.model.get('totalQuestions')){
                    this.renderEmail();
                }else{
                    this.renderQuestion();
                    this.updateProgressBar();
                }    
            },
            handlePrevious: function () {
                if(this.currentQuestion > 0)
                    this.currentQuestion--;
                this.renderQuestion();
            },
            handleSkip: function () {
                this.renderResults();
            }
        });
        return BaseQuizView;
    });