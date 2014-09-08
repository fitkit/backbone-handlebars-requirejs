define([
    'jquery',
    'backbone',
    '../models/quiz',
    '../views/quiz/mc',
    '../views/quiz/personality',
    '../views/quiz/score'
    ],
    function ($, Backbone, QuizModel, McQuizView, PersonalityQuizView, ScoreQuizView) {
        "use strict";
        var AppView = Backbone.View.extend({
            el: '#content',
            render: function () {
                this.model = new QuizModel({
                    user: this.user,
                    id: this.id
                });
                this.fetchQuiz();
            },
//            fetchQuiz: function () {
//                this.model.fetch({
//                    success: this.renderQuiz
//                });
//            },
            fetchQuiz: function () {
                var fakeData = {
                    "id": "fooBar",
                    "sharing": {
                        "url": "http://tryinteract.com",
                        "twitterVia": "true"
                    },
                    "title": "Which World Cup team are you?",
                    "description": "Find out which team you should be supporting in the final.",
                    "totalQuestions": 2,
                    "type": "personality",
                    "custom": {
                        "cover":"https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-bg-2WJu6XiqJ1t2sMU.jpg",
                        "button":"Start Now",
                        "bgColor":"#ffffff",
                        "fontColor":"#3d3d3d"
                    },
                    "questions": [
                        {
                            "type": "image",
                            "img": "https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-bg-2WJu6XiqJ1t2sMU.jpg",
                            "bgColorRGB": "255,255,255,0.9",
                            "title": "Which player do you like more?",
                            "options": [
                                {
                                    "index": 0,
                                    "alphaIndex": "A",
                                    "img": "https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-ans-dRZj854JNjYupgM.jpg",
                                    "text": "Gotze"
                                },
                                {
                                    "index": 1,
                                    "alphaIndex": "B",
                                    "img": "https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-ans-LyUtkREZoOjnh3m.jpg",
                                    "text": "Messi"
                                }
                            ]
                        },
                        {
                            "type": "text",
                            "title": "Which team do you want to win?",
                            "options": [
                                {
                                    "index": 0,
                                    "alphaIndex": "A",
                                    "text": "Argentina"
                                },
                                {
                                    "index": 1,
                                    "alphaIndex": "B",
                                    "text": "Germany"
                                }
                            ]
                        }
                    ],
                    "answerKey": [
                        [1,2],
                        [2,1]
                    ],
                    "results": [
                        {
                            "img": "https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-res-uSV7OZnTxaRJ1gw.jpg",
                            "title": "Germany",
                            "description": "<p>You should be supporting the Germans. BEER</p>"
                        },
                        {
                            "img": "https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-res-FZYqrS5QpT1BLh2.jpg",
                            "title": "Argentina",
                            "description": "<p>This team is also known as Messi.</p>"
                        }
                    ],
                    "settings": {
                        "revealAnswer": true,
                        "mailProvider": "feedburner",
                        "mailingList": "CrazySexyFunTraveler"
                    },
                    "statistics": [
                        {
                            "totals": ["4","6"]
                        },
                        {
                            "totals": ["7","3"]
                        }
                    ]
                };
                this.model.set(fakeData);
                this.renderQuiz();
            },
            renderQuiz: function () {
                var quizView;
                switch (this.model.get('type')) {
                    case "score":
                        quizView = new ScoreQuizView({
                            model: this.model
                        });
                        break;
                    case "personality":
                        quizView = new PersonalityQuizView({
                            model: this.model
                        });
                        break;
                    case "mc":
                        quizView = new McQuizView({
                            model: this.model
                        });
                        break;
                    default:
                        throw 'Invalid quiz type'
                }
                quizView.render();
            }
        });
        return AppView;
    });