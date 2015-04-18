localStorage.clear()

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