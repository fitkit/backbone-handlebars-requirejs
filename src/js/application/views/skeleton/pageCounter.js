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
            hasPrevious: function (page) {
                if (!this.model.get('settings').revealAnswer){
                    if (page > 0)
                        return true;
                }
                return false;
            },
            render: function (page) {
                var template = Handlebars.compile(pageCounterTemplate),
                    view = this;

                $(this.el).html(template({
                    page: page+1,
                    totalQuestions: this.model.get('totalQuestions'),
                    hasPrevious: this.hasPrevious(page)
                }));

                if(page == 0){
                    $(this.parentDiv).fadeOut(400, function () {
                        $(view.parentDiv).html(view.el).fadeIn(400);
                    });
                }else{
                    $(this.parentDiv).html(this.el);
                }
                
            }
        });
        return PageCounterView;
    });