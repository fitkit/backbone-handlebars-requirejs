define([
    'jquery',
    'backbone',
    'handlebars',
    'crossdomain',
    'text!../../templates/results.hbs',
    'text!../../templates/showAnswers.hbs'],
    function ($, Backbone, Handlebars, CrossDomain, resultsTemplate, showAnswersTemplate) {
        "use strict";
        var ResultsView = Backbone.View.extend({
            tagName: 'div',
            className: 'start-container',
            parentDiv: '#quiz-content',
            events: {
                "click .fb": "shareToFacebook"
            },
            initialize: function (options) {
                this.result = options.result;
                this.quiz = options.quiz;
            },
            render: function () {
                var template = Handlebars.compile(resultsTemplate),
                    view = this;
                $(this.el).html(template(this.result));
                $(this.parentDiv).html(this.el).show();
                if(this.quiz.get('settings').showAnswers){
                    this.showAnswers();
                }
                //Prepare twitter share
                this.getTwitterURL();
                twttr.ready(function (twttr) {
                    twttr.events.bind('tweet', function(event){
                        var id = event.target.getAttribute('data-id');
                        view.postTwitterShare(id);
                    });
                });
            },
            shareToFacebook: function (event) {
                var options = this.getPopupOptions(),
                    url = this.getFacebookURL();
                event.preventDefault();
                window.open(url,'sharer', options);
            },
            getPopupOptions: function () {
                var sTop = window.screen.height/2-(218),
                    sLeft = window.screen.width/2-(313),
                    options = 'toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft;
                return options;
            },
            getFacebookURL: function () {
                var params = $.param({
                        display: 'popup',
                        app_id: '746159965404389',
                        link: this.quiz.get('sharing').url,
                        picture: this.result.img,
                        name: 'I got ' + this.result.title + ' - ' + this.quiz.get('title'),
                        description: this.result.description.replace(/(<([^>]+)>)/ig,""),
                        redirect_uri: 'https://www.tryinteract.com/share.php?i=fb&id='+this.quiz.get('id')
                    }),
                    url = 'https://www.facebook.com/dialog/feed?' + params;
                return url;
            },
            getTwitterURL: function () {
                var params = {
                        url: this.quiz.get('sharing').url,
                        text: 'I got ' + this.result.title + ' - ' + this.quiz.get('title')
                    },
                    url;
                if (this.quiz.get('sharing').twitterVia) {
                    params.via = 'tryinteract'
                }
                var params = $.param(params),
                    url = 'https://twitter.com/intent/tweet?' + params;
                $('#tweet-btn').attr('href',url);
                $('#tweet-btn').attr('data-id',this.quiz.get('id'));
            },
            postTwitterShare: function (id) {
                $.ajax({
                    url: 'https://api.tryinteract.com/twitter',
                    data: {id: id},
                    type: 'POST'
                });
            },
            showAnswers: function () {
                var showAnswers = this.quiz.get('showAnswers');
                var showTemplate = Handlebars.compile(showAnswersTemplate);
                $('.centered-container').append(showTemplate({responses:showAnswers}));
            }
        });
        return ResultsView;
    });