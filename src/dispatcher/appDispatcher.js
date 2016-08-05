/*
 * AppDispatcher
 *
 * A singleton that operates as the central hub for application updates.
 */
"use strict";
var Dispatcher = require('flux').Dispatcher;

module.exports = new Dispatcher();
