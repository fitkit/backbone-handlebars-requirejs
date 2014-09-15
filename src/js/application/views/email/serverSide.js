define([
    'jquery',
    'backbone',
    'handlebars',
    './base',
    'text!../../templates/email/default.hbs',
    '../../models/email'],
    function ($, Backbone, Handlebars, EmailBaseView, emailTemplate, EmailModel) {
        "use strict";
        var EmailView = EmailBaseView.extend({
            render: function () {
                var template = Handlebars.compile(emailTemplate);
                $(this.el).html(template());
                this.animateContent();
            },
            events: {
                "submit #email-form": "saveEmail"
            },
            saveEmail: function (event) {
                var email = new EmailModel({
                        quiz: this.quiz.get('id'),
                        address: $('#email').val()
                    });
                event.preventDefault();
                if (email.validateAddress()) {
                    email.save();
                    $('#email-form').trigger('emailSaved');
                } else {
                    this.showError();
                }
            }
        });
        return EmailView;
    });