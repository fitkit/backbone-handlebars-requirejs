var awsConfig = require('./awsConfig'), // The AWS config file is gitignored for security
    productionBucket = 'quiz.tryinteract.com';

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        requirejs: {
            compileProject: {
                options : {
                    appDir: "./src",
                    dir: "./build",
                    baseUrl: "js/application",
                    modules: [
                        {
                            name: 'initialize'
                        }
                    ],
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
                    },
                    optimizeCss: "standard",
                    inlineText: true,
                    removeCombined: true
                }
            }
        },
        aws_s3: {
            options: {
                accessKeyId: awsConfig.access,
                secretAccessKey: awsConfig.secret,
                region: 'us-west-1',
                uploadConcurrency: 5,
                downloadConcurrency: 5
            },
            production: {
                options: {
                    bucket: productionBucket,
                    differential: true // Only uploads changed files
                },
                files: [
                    {expand: true, cwd: 'build/', src: ['**'], dest: ''}
                    // Note: If you set up cache busting, you will want to set long-expiring cache-headers for
                    //       everything except index.html here
                ]
            },
            clean_production: {
                options: {
                    bucket: productionBucket,
                    differential: true
                },
                files: [
                    {dest: '/', 'action': 'delete', cwd: "build/", src: ['**']}
                ]
            }
        },
        watch: {
            scripts: {
                files: 'src/**/*',
                tasks: ['requirejs'],
                options: {
                    interrupt: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-aws-s3');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('runNode', function () {
        grunt.util.spawn({
            cmd: 'node',
            args: ['./node_modules/nodemon/nodemon.js', '--debug', 'server.js'],
            opts: {
                stdio: 'inherit'
            }
        }, function () {
            grunt.fail.fatal(new Error("nodemon quit"));
        });
    });

    grunt.registerTask('s3', ['aws_s3:production', 'aws_s3:clean_production']);
    grunt.registerTask('compile', ['requirejs']);

    // Run the server and watch for file changes
    grunt.registerTask('server', ['runNode', 'compile', 'watch']);

    // Deploy app to S3
    grunt.registerTask('deploy', ['compile','s3']);

    // Default task(s).
    grunt.registerTask('default', ['compile']);
};