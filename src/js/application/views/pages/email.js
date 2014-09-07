define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/email.hbs',
    '../../models/email'],
    function ($, Backbone, Handlebars, emailTemplate, EmailModel) {
        "use strict";
        var EmailView = Backbone.View.extend({
            tagName: 'div',
            className: 'centered-container',
            parentDiv: '#quiz-content',
            render: function () {
                var template = Handlebars.compile(emailTemplate),
                    view = this;
                //TODO: choose appropriate email form view
                $(this.el).html(template());
                $(this.parentDiv).fadeOut(400, function () {
                    $(view.parentDiv).html(view.el).show();
                    $('.previous-container').hide();
                    $('.counter').hide();
                    $('.progress').fadeOut(400);
                    $('.email-modal').animate({top:0}, 600, "swing", function(){});
                });
            },
            events: {
                "submit #email-form": "saveEmail"
            },
            saveEmail: function (event) {
                var email = new EmailModel({
                    address: $('#email').val(),
                    quiz: this.quiz.get('id')
                });
                event.preventDefault();
                if (email.validateAddress()) {
                    email.save(); // If you want to handle errors, add an error callback
                    $('#email-form').trigger('emailSaved');
                } else {
                    this.showError();
                }
            },
            showError: function () {
                $('#email-error').removeClass('hide');
            }
        });
        return EmailView;
    });