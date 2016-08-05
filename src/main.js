"use strict";

// Browserify will include this and other js files in a single file bundle.js
  
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

// Swap in following for clean client url's
//Router.run(routes, Router.HistoryLocation, function(Handler) {
Router.run(routes, function(Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});
