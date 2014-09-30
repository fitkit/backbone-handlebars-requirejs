require.config({
    paths: {
        jquery : '../vendor/jquery/jquery-1.11.0',
        underscore : '../vendor/underscore/underscore',
        backbone : '../vendor/backbone/backbone',
        crossdomain : '../vendor/backbone/crossdomain',
        handlebars : '../vendor/handlebars/handlebars',
        bootstrap : '../vendor/bootstrap/bootstrap',
        text : '../vendor/require/text',
        async : '../vendor/require/async'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        handlebars: {
            exports: 'Handlebars'
        }
    }
});

require(['app'], function (App) {
    "use strict";
    App.init();
});