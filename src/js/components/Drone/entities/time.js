var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign");

//var CHANGE_EVENT = 'change';

var time = assign({}, SaveStore.prototype, {
	getData: function() {
		return SaveStore.get("time");
	},

    addChangeListener: function(callback) {
    	SaveStore.addChangeListener(callback);
    }

});

module.exports = time;