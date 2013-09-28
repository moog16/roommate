##PadShacker

PadShacker is a web app to find your next roommate. It is a cross between Tinder and okCupid, which are two dating web applications. PadShacker uses an algorithm similar to okCupid to calculate the compatibility between two people. This app connects to each person's Facebook account and shows mutual information between the two parties. 

The tech stack that this app uses is the MEAN boilerplate. This includes MongoDB, Express.js, Angular.js, and Node.js. For authentication I used passport, and mongoose to interact with my MongoDB.

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).


### Optional (Requirements for Grunt)
* Compass - an open-source CSS Authoring Framework, install via [Ruby Gems](http://rubygems.org).
* Grunt - Download and Install [Grunt](http://gruntjs.com).

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.
* UI Bootstrap - Defined as bower module in the [bower.json](bower.json) file.
* Flatstrap - Defined as bower module in the [bower.json](bower.json) file.

## Quick Install

 The quickest way to get started with PadShacker is to clone the project and utilize it like this:

  Install dependencies:

    $ npm install

  Export the node Path to load your lib into project (default in HEROKU)
    $ export NODE_PATH=lib

  We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:
    $ grunt

  When not using grunt you can use:

    $ node server.js
    
  Then open a browser and go to:

    http://padshacker.com:3000

  You can change the path by setting your *Port* environment variable
	export PORT=your_port_number


## Configuration
All configuration is specified in the [config](config/) folder, particularly the [config.js](config/config.js) file. Here you will need to specify your application name, database name.

### Environmental Settings

There are three environments provided by default, __development__, __test__, and __production__. Each of these environments has the following configuration options:

* db - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment, and __production__ for the production environment.
* root - This is determined automatically at the start of this file, but can be overridden here.
* app.name - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.


To run with a different environment, just specify NODE_ENV as you call grunt:

	$ NODE_ENV=test grunt

If you are using node instead of grunt, it is very similar:

	$ NODE_ENV=test node server

Setup environment variables
	$ vi ~/.bash_profile

  Within the `./bash_profile` file include your Facebook API Key and APP Secret
	export FACEBOOK_ROOMMATES_APIKEY=YOUR_FACEBOOK_APIKEY
	export FACEBOOK_ROOMMATES_APPSECRET=YOUR_FACEBOOK_APP_SECRET

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.

## Getting Started
  We pre-included an article example, check it out:
  * [The Model](https://github.com/linnovate/mean/blob/master/app/models/article.js) - Where we define our object schema.
  * [The Controller](https://github.com/linnovate/mean/blob/master/app/controllers/articles.js) - Where we take care of our backend logic.
  * [NodeJS Routes](https://github.com/linnovate/mean/blob/master/config/routes.js) - Where we define our REST service routes.
  * [AngularJs Routes](https://github.com/linnovate/mean/blob/master/public/js/config.js) - Where we define our CRUD routes.
  * [The AngularJs Service](https://github.com/linnovate/mean/blob/master/public/js/services/articles.js) - Where we connect to our REST service.
  * [The AngularJs Controller](https://github.com/linnovate/mean/blob/master/public/js/controllers/articles.js) - Where we take care of  our frontend logic.
  * [The AngularJs Views Folder](https://github.com/linnovate/mean/blob/master/public/views/articles) - Where we keep our CRUD views.

## MEAN Modules
   Mean presents a growing eco-system of MEAN based modules in the npm repository, To write (and contribute) your own MEAN based module checkout [mean-logger](https://npmjs.org/package/mean-logger) for examples.

## Credits
MEAN Boilerplate developed by linnovate

## License

(The MIT License)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
