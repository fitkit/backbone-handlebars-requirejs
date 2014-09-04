define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/email.hbs'],
    function ($, Backbone, Handlebars, emailTemplate) {
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
            }
        });
        return EmailView;
    });