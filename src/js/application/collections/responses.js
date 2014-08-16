define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var ResponseCollection = Backbone.Collection.extend({
            url: '' // TODO: What is this URL?
        });
        return ResponseCollection;
    });

