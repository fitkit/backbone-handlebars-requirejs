define([
    'jquery',
    'backbone',
    'handlebars',
    './base',
    'text!../../templates/email/feedburner.hbs',
    '../../models/email'],
    function ($, Backbone, Handlebars, EmailBaseView, emailTemplate, EmailModel) {
        "use strict";
        var EmailView = EmailBaseView.extend({
            render: function () {
                var template = Handlebars.compile(emailTemplate);
                $(this.el).html(template(this.quiz.get('custom')));
                this.animateContent();
            },
            events: {
                "submit #feedburner-form": "openPopup"
            },
            openPopup: function () {
                var email = new EmailModel({
                        quiz: this.quiz.get('id'),
                        address: $('#email').val()
                    }),
                    url = 'http://feedburner.google.com/fb/a/mailverify?uri=' + this.quiz.get('settings').mailList,
                    popupOptions = "scrollbars=yes,width=550,height=520";
                if (email.validateAddress()) {
                    email.save();
                    window.open(url, 'popupwindow', popupOptions);
                    $('#feedburner-form').trigger('emailSaved');
                } else {
                    this.showError();
                }
            }
        });
        return EmailView;
    });