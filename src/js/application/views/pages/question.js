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
                });
            }
        });
        return QuestionView;
    });