define([
    'jquery',
    'backbone'],
    function ($, Backbone) {
        "use strict";
        var EmailModel = Backbone.Model.extend({
            url: function () {
                return 'http://localhost/interact/email';
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