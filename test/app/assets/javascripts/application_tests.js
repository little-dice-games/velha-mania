//= require phantomjs-polyfill/bind-polyfill.js
//= require mocha/mocha.js
//= require chai/chai.js
//= require application

mocha.ui('bdd');
mocha.reporter('html');
expect = chai.expect;

$(document).ready(function() {
    if (window.mochaPhantomJS) {
      mochaPhantomJS.run()
    } else {
      mocha.run();
    }
})