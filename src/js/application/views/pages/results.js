define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/results.hbs'],
    function ($, Backbone, Handlebars, resultsTemplate) {
        "use strict";
        var ResultsView = Backbone.View.extend({
            tagName: 'div',
            className: 'start-container',
            parentDiv: '#quiz-content',
            initialize: function (options) {
                this.result = options.result;
            },
            render: function () {
                var template = Handlebars.compile(resultsTemplate);
                
                //TODO: Add social media model and content

                $(this.el).html(template(this.result));
                $(this.parentDiv).html(this.el).show();
            }
        });
        return ResultsView;
    });