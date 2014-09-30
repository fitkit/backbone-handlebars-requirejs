define([
    'backbone',
    'views/404',
    'views/appView'
    ],
    function (Backbone, error404View, AppView) {
        "use strict"
        var AppRouter = Backbone.Router.extend({
            routes: {
                ':user/:id': 'quiz',
                '*actions' : 'error404'
            },
            quiz: function (user, id) {
                var appView = new AppView({
                    user: user,
                    id: id
                });
                appView.render();
            },
            error404: function () {
                error404View.render();
            }
        });
        var init = function () {
            var app_router = new AppRouter();
            Backbone.history.start();
        };
        return {
            init: init
        };
    });