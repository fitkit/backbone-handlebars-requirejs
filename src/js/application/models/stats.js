define([
    'jquery',
    'backbone',
    'crossdomain',
    './base'],
    function ($, Backbone, Crossdomain, BaseModel) {
        "use strict";
        var StatsModel = BaseModel.extend({
            url: function () {
                return this.baseUrl + '/stats';
            }
        });
        return StatsModel;
    });