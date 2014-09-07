define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var QuizModel = Backbone.Model.extend({
            url: function () {
                return '/quiz/' + this.get('user') + '/' + this.get('id');
            }
        });
        return QuizModel;
    });