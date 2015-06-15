var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message");

var time = assign({}, SaveStore.prototype, {
	getData: function() {
		return SaveStore.get("time");
	},

	setData: function(data) {
		return SaveStore.setTime(data);
	},

	tick: function(amount) {
		timeData = this.getData();
		if(timeData.remains - amount < 0) {
			SaveStore.setDead(true);
		}
		timeData.remains -= amount;
		this.setData(timeData);
	},

    addChangeListener: function(callback) {
    	SaveStore.addChangeListener(callback);
    }

});

module.exports = time;