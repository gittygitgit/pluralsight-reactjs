"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

// This is a factory of action creators.
var AuthorActions = {
  
  createAuthor: function(author) {
    // Normally this would invoke some type of API via AJAX w/ promises or other async mechanism
    var newAuthor = AuthorApi.saveAuthor(author);

    // The action is the object being dispatched
    // Hey dispatcher, go tell all interested stores that an author was created.
    Dispatcher.dispatch({
      actionType: ActionTypes.CREATE_AUTHOR,
      author: newAuthor
    });
  },
  updateAuthor: function(author) {
    // Normally this would invoke some type of API via AJAX w/ promises or other async mechanism
    var updatedAuthor = AuthorApi.saveAuthor(author);

    Dispatcher.dispatch({
      actionType: ActionTypes.UPDATE_AUTHOR,
      author: updatedAuthor
    });
  }, 
  deleteAuthor: function(id) {
    AuthorApi.deleteAuthor(id);

    Dispatcher.dispatch({
      actionType: ActionTypes.DELETE_AUTHOR,
      id: id
    });
  }

};

module.exports = AuthorActions;
