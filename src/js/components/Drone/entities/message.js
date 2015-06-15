var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign");

var message = assign({}, SaveStore.prototype, {
	getData: function() {
		return SaveStore.get("messages");
	},

    addChangeListener: function(callback) {
    	SaveStore.addChangeListener(callback);
    },

	create: function(message) {
		SaveStore.addMessage(message);
	}

});

module.exports = message;