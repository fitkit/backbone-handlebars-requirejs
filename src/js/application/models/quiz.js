define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var QuizModel = Backbone.Model.extend({
            url: function () {
                return 'http://localhost/interact/quiz/' + this.get('user') + '/' + this.get('id');
            }
        });
        return QuizModel;
    });