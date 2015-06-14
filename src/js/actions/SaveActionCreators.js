var AppDispatcher = require('../dispatcher/AppDispatcher');

module.exports = {

  receiveAll: function(save) {
    AppDispatcher.handleServerAction({
      type: "RECEIVE_SAVE",
      save: save
    });
  },

};