define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/cover.hbs'],
    function ($, Backbone, Handlebars, coverTemplate) {
        "use strict";
        var CoverView = Backbone.View.extend({
            tagName: 'div',
            className: 'start-container',
            parentDiv: '#quiz-content',
            render: function () {
                var template = Handlebars.compile(coverTemplate);
                $(this.el).html(template(this.model.toJSON()));
                $(this.parentDiv).html(this.el);
                this.changeBtnColor();
            },
            events: {
                'mouseenter .start-quiz': 'hoverBtnColor',
                'mouseleave .start-quiz': 'changeBtnColor'
            },
            changeBtnColor: function() {
                $('.start-quiz').css('background-color',this.model.get('custom').btnColor);
            },
            hoverBtnColor: function () {
                $('.start-quiz').css('background-color',this.model.get('custom').btnColorHover);
            }
        });
        return CoverView;
    });