define([],
    function () {
        "use strict";
        var getBaseUrl = function () {
            var baseUrl;
            switch (window.location.hostname) {
                case 'localhost':
                    baseUrl = 'http://localhost/interact';
                    break;
                default:
                    baseUrl = 'https://api.tryinteract.com';
            }
            return baseUrl;
        }
        return getBaseUrl;
    });

