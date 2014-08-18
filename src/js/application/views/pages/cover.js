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
            }
        });
        return CoverView;
    });