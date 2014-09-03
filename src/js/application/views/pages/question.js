define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/question/image.hbs',
    'text!../../templates/question/text.hbs'],
    function ($, Backbone, Handlebars, imageQuestionTemplate, textQuestionTemplate) {
        "use strict";
        var QuestionView = Backbone.View.extend({
            tagName: 'div',
            className: 'centered-container',
            parentDiv: '#quiz-content',
            events: {
             // ...
            },
            initialize: function (options) {
                //HELP: Not sure if initialize is needed
                this.model = options.model;
                this.response = options.response;
            },
            render: function () {
                var template,
                    view = this;
                switch (this.model.get('type')) {
                    case 'image':
                        template = Handlebars.compile(imageQuestionTemplate);
                        break;
                    case 'text':
                        template = Handlebars.compile(textQuestionTemplate);
                        break
                    default:
                        throw 'Invalid question type';
                }

                $(this.el).html(template(this.model.toJSON()));
                $(this.parentDiv).fadeOut(400, function () {
                    $(view.parentDiv).html(view.el).fadeIn(400);
                    //HELP: Might be a better way to do this
                    if(view.response != null)
                        $('.question-answer-container').eq(parseInt(view.response)).addClass('question-answer-container-selected');
                });
            }
        });
        return QuestionView;
    });