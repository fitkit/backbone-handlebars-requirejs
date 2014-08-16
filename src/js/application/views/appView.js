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
                    "title": "Which World Cup team are you?",
                    "description": "Find out which team you should be supporting in the final.",
                    "totalQuestions": 2,
                    'type': "personality",
                    "custom": {
                        "cover":"https://s3-us-west-1.amazonaws.com/tryinteract-uploads/1-bg-2WJu6XiqJ1t2sMU.jpg",
                        "button":"Start Now"

                    }
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
                        alert('Something went wrong');
                }
                quizView.render();
            }
        });
        return AppView;
    });