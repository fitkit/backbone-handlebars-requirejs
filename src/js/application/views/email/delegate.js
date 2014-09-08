define([
    'jquery',
    'backbone',
    'handlebars',
    './serverSide',
    './feedBurner'],
    function ($, Backbone, Handlebars, ServerSideView, FeedBurnerView) {
        "use strict";
        var EmailDelegate = function (options) {
            switch (options.quiz.get('settings').mailProvider) {
                case "feedburner":
                    return new FeedBurnerView(options);
                default:
                    return new ServerSideView(options);
            }
        };
        return EmailDelegate;
    });