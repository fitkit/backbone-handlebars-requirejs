define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var EmailBaseView = Backbone.View.extend({
            tagName: 'div',
            className: 'centered-container',
            parentDiv: '#quiz-content',
            initialize: function (options) {
                this.quiz = options.quiz;
            },
            animateContent: function () {
                var view = this;
                $(this.parentDiv).fadeOut(400, function () {
                    $(view.parentDiv).html(view.el).show();
                    $('.previous-container').hide();
                    $('.counter').hide();
                    $('.progress').fadeOut(400);
                    $('.email-modal').animate({top:0}, 600, "swing", function(){});
                });
            },
            showError: function () {
                $('#email-error').removeClass('hide');
            }
        });
        return EmailBaseView;
    });