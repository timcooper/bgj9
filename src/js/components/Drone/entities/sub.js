var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign");

//var CHANGE_EVENT = 'change';

var sub = assign({}, SaveStore.prototype, {
	getData: function() {
		return SaveStore.get("sub");
	},

	setData: function(newData) {
		SaveStore.setSub(newData);
	},

    addChangeListener: function(callback) {
    	SaveStore.addChangeListener(callback);
    },

	create: function(x, y, game) {
		this.sprite = game.add.sprite(x, y, "win");
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	}

});


/*sub.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case "RECEIVE_SAVE":
      console.log(action.save);
      data = action.save;
      sub.emitChange();
      break;

    default:
      // do nothing
  }

});*/

/*var sub = function(x, y, game) {
	this.game   = game;
	this.sprite = this.game.add.sprite(x, y, "player");
	this.health = 100;
	this.maxHealth = 100;
	this.charge = 100;
	this.maxCharge = 100;
	this.inventory = {};
	this.inventoryRoom = 10;
};*/

module.exports = sub;