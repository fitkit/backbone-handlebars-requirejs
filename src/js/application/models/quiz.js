define([
    'jquery',
    'backbone',
    './base'],
    function ($, Backbone, BaseModel) {
        "use strict";
        var QuizModel = BaseModel.extend({
            url: function () {
                return this.baseUrl + '/quiz/' + this.get('user') + '/' + this.get('id');
            }
        });
        return QuizModel;
    });