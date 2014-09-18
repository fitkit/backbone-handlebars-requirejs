define([
    'jquery',
    'backbone',
    '../utils/getBaseUrl'],
    function ($, Backbone, getBaseUrl) {
        "use strict";
        var BaseModel = Backbone.Model.extend({
            baseUrl: getBaseUrl()
        });
        return BaseModel;
    });