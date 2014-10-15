define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/quiz.hbs',
    '../../collections/questions',
    '../../collections/responses',
    '../../models/stats',
    '../skeleton/pageCounter',
    '../pages/cover',
    '../pages/question',
    '../email/delegate',
    '../pages/results'],
    function ($, Backbone, Handlebars, quizTemplate, QuestionCollection, ResponseCollection, StatsModel, PageCounterView, CoverView, QuestionView, EmailView, ResultsView) {
        "use strict";
        var BaseQuizView = Backbone.View.extend({
            tagName: 'div',
            parentDiv: '#content',
            initialize: function () {
                $(window).on("resize",this.resizeContent);
            },
            resizeContent: function () {
                $("#quiz-content").height($(window).height()-50);
            },
            events: {
                "click .start-quiz": "handleStart",
                "click .question-answer-container": "handleResponse",
                "click .previous-btn": "handlePrevious",
                "click .skip": "renderResults",
                "emailSaved": "renderResults"
            },
            currentQuestion: 0,
            createPageCounter: function () {
                this.pageCounter = new PageCounterView({
                    model: this.model
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
                if(this.model.get('custom').fontType || this.model.get('custom').customFontType)
                    this.setFontType();
            },
            renderCover: function () {
                var coverView = new CoverView({
                    model: this.model
                });
                coverView.render();
                this.resizeContent();
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
            handleEmail: function () {
                this.calculateResult();
                this.updateStatistics();
                if (this.model.get('settings').mailProvider == 'null') {
                    $('.previous-container').hide();
                    $('.counter').hide();
                    $('.progress').fadeOut(400);
                    this.renderResults();
                }else {
                    this.renderEmail();
                }
            },
            renderEmail: function () {
                var emailView = new EmailView({
                    quiz: this.model
                });
                emailView.render();
            },
            renderResults: function () {
                var resultsView = new ResultsView({
                        result: this.result,
                        quiz: this.model
                    });
                if (this.model.get('settings').mailProvider == 'null') {
                    resultsView.render();
                }else {
                    $('.email-modal').animate({top:"-100%"}, 400, "swing", function(){
                        resultsView.render();
                    });
                }
                
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
            saveResponse: function (event) {
                var response = parseInt($(event.currentTarget).find('input').val(), 10),
                    qnum = this.currentQuestion;
                if(!this.responses.at(qnum)){
                    this.responses.add({val:response});
                }else{
                    this.responses.at(qnum).set('val',response);
                }
            },
            handleResponse: function (event) {
                //If lock is held, stop event
                if($(event.currentTarget).hasClass('disabled')){
                    return false;
                }else{
                    $(event.currentTarget).addClass('disabled');
                }
                this.saveResponse(event);
                this.advance(event);
            },
            advance: function (event) {
                if (event) {
                    event.preventDefault();
                }
                this.currentQuestion++;
                if(this.currentQuestion == this.model.get('totalQuestions')){
                    this.handleEmail();
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
            updateStatistics: function () {
                var stats = new StatsModel({
                    quiz: this.model.get('id'),
                    responses: JSON.stringify(this.responses.toJSON())
                });
                stats.save();
            },
            setFontType: function () {
                if(this.model.get('custom').fontType)
                    $('body').css('font-family',this.model.get('custom').fontType);
                else if(this.model.get('custom').customFontType)
                    $('#content').append('<style>@font-face{font-family:fontType;src:url(font/'+this.model.get('custom').customFontType+');}body,html{font-family:fontType;}</style>');
            }
        });
        return BaseQuizView;
    });