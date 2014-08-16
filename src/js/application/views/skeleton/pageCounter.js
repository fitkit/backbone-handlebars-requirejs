define([
    'jquery',
    'backbone',
    'handlebars',
    'text!../../templates/pageCounter.hbs'],
    function ($, Backbone, Handlebars, pageCounterTemplate) {
        "use strict";
        var PageCounterView = Backbone.View.extend({
            tagName: 'div',
            parentDiv: '#page-counter',
            render: function (page) {
                var template = Handlebars.compile(pageCounterTemplate);
                $(this.el).html(template({
                    page: page,
                    totalQuestions: this.totalQuestions,
                    hasPrevious: this.hasPrevious(page)
                }));
                $(this.parentDiv).html(this.el);
            },
            hasPrevious: function (page) {
                if (page > 1) {
                    return true;
                }
                return false;
            }
        });
        return PageCounterView;
    });