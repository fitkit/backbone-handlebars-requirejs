define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var EmailModel = Backbone.Model.extend({
            url: function () {
                return '/email/' + this.get('quiz');
            },
            validateAddress: function () {
                // TODO: Validate email
                if (this.get('address')) {
                    return true;
                } else {
                    return false;
                }
            }
        });
        return EmailModel;
    });