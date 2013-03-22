

require.config({
  // Testacular serves files under /base, which is the basePath from your config file


  // example of using shim, to load non AMD libraries (such as Backbone, jquery)
  shim: {
    underscore:{exports:"_"}
  },

  paths: {
    'chai': 'lib/chai/chai',
    'jquery': 'lib/jquery.1.7.2',
    'underscore': 'lib/underscore',
    'test': 'test/test'
  },

  deps: [
    'test'
  ],

  callback: mocha.run

});
