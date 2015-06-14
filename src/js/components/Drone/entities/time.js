var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message");

//var CHANGE_EVENT = 'change';

var time = assign({}, SaveStore.prototype, {
	getData: function() {
		return SaveStore.get("time");
	},

	setData: function(data) {
		return SaveStore.setTime(data);
	},

	tick: function(amount) {
		timeData = this.getData();
		timeData.remains -= amount;
		this.setData(timeData);
	},

    addChangeListener: function(callback) {
    	SaveStore.addChangeListener(callback);
    }

});

module.exports = time;