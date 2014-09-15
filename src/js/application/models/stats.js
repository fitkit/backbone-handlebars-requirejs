define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var StatsModel = Backbone.Model.extend({
            url: function () {
                return 'http://localhost/interact/stats';
            }
        });
        return StatsModel;
    });