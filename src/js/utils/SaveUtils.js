var SaveActionCreators = require('../actions/SaveActionCreators');

module.exports = {

  getSave: function() {
    // simulate retrieving data from a database
    var save = JSON.parse(localStorage.getItem('save'));

    // simulate success callback
    SaveActionCreators.receiveAll(save);
  }

};