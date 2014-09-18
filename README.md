Single-Page Webapp Template, Dev Server Included
=================================================

This project provides basic boilerplate for creating a single-page webapp with Backbone, Handlebars, Bootstrap and
Require.js. Out of the box, this template uses r.js to optimize the project by combining and uglifying related scripts.
It also provides a simple development server, so you can get up and running almost instantly.

Get up and running
--------------------

Make sure you have [Node](http://nodejs.org/) installed on your system. You also need to have
`grunt-cli` installed globally:

    $ npm install -g grunt-cli

Clone this repo to a local directory and run `npm install` to install dependencies:

    $ git clone git@github.com:shebson/backbone-handlebars-requirejs.git
    $ cd backbone-handlebars-requirejs
    $ npm install

Run the development server:

    $ grunt server

That's it! Your app is now running on port 3030. To see it, just open it in your browser:

    $ open http://localhost:3030

Grunt will watch your src directory for changes and recompile as needed.


Organization
--------------------

The project source is stored in the `src` directory. When grunt and r.js compiles your application, the optimized build
is stored in the `build` directory (which is ignored by git).

Deploying to Production
------------------------

To deploy to production, add your AWS credentials to an awsConfig.js file (do not check this in to Github). Then simply
run `grunt deploy`.


Acknowledgements
------------------

The development server, Gruntfile, and README were directly inspired by Spike Brehm's excellent
[Rendr app template](https://github.com/airbnb/rendr-app-template).

My thinking about developing, organizing, and optimizing Backbone webapps was also heavily influenced by Bill
Heaton's [blog post](http://www.hautelooktech.com/2012/02/01/optimize-and-build-a-backbone-js-javascript-application-with-require-js-using-packages/)
about engineering large Backbone projects at HauteLook.