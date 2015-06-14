var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require("react/lib/Object.assign");

var CHANGE_EVENT = 'change';

var _save = {};

var SaveStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _save[id];
  },

  getAll: function() {
    return _save;
  },

  setDrone: function(data) {
    _save['drone'] = data;
    this.emit(CHANGE_EVENT);
  },

  setSub: function(data) {
    _save['sub'] = data;
    this.emit(CHANGE_EVENT);
  },

  addMessage: function(data) {
    _save['messages'].unshift(data);
    this.emit(CHANGE_EVENT);
  }

});


SaveStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case "RECEIVE_SAVE":
      _save = action.save;
      SaveStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = SaveStore;