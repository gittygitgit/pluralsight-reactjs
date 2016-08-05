"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';
var _authors = [];

// The only way to manipulate _authors state is via exported public API

// take an empty object, add functionality of EventEmitter, and finally
// add our own impl.  EventEmitter is similar to a base-class here.
var AuthorStore = assign({}, EventEmitter.prototype, {

  // This is where components register to be notified when the store changes
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  // Boilerplate is above^
  getAllAuthors: function() {
    return _authors;
  },

  getAuthorById: function(id) {
    return _.find(_authors, {id: id});
  }

});

// register the store to be notified of actions, and only
// act on those of interest.  Remember, this gets invoked for every 
// action received by the Dispatcher
Dispatcher.register(function(action) {
  switch(action.actionType) {
    case ActionTypes.INITIALIZE:
      _authors = action.initialData.authors;
      AuthorStore.emitChange();
      break;
    case ActionTypes.CREATE_AUTHOR:
      _authors.push(action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.UPDATE_AUTHOR:
      // replace existing author with updated author

      var existingAuthor = _.find(_authors, {id: action.author.id});
      var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
      _authors.splice(existingAuthorIndex, 1, action.author);
      AuthorStore.emitChange();
      break;
    case ActionTypes.DELETE_AUTHOR:
      _.remove(_authors, function(author) {
        return action.id === author.id;
      });    
    
      AuthorStore.emitChange();
      break;
    default:
      //no-op
  } 
});

// We export AuthorStore since it's the public API.  Anything else remains hidden to clients, 
// like the Dispatcher.register stuff.
module.exports = AuthorStore;
