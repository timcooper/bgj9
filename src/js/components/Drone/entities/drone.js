var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign");

//var CHANGE_EVENT = 'change';

var drone = assign({}, SaveStore.prototype, {

	getData: function() {
		return SaveStore.getAll();
	},

	setData: function(newData) {
		SaveStore.setDrone(newData);
	},

    addChangeListener: function(callback) {
    	SaveStore.addChangeListener(callback);
    },

	create: function(x, y, game) {
		this.sprite = game.add.sprite(x, y, "player");
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.setSize(10, 10, 0, 0);
		this.sprite.body.maxVelocity.set(50);
		this.sprite.body.drag.set(25);
		this.sprite.body.bounce.set(0.6);

		this.sprite.anchor.setTo(0.5, 0.5);

		return this;
	},

	dock: function(channel, message) {
		console.log('DOCKED', message);
	}

});


/*drone.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.type) {

    case "RECEIVE_SAVE":
      console.log(action.save);
      data = action.save;
      drone.emitChange();
      break;

    default:
      // do nothing
  }

});*/

/*var drone = function(x, y, game) {
	this.game   = game;
	this.sprite = this.game.add.sprite(x, y, "player");
	this.health = 100;
	this.maxHealth = 100;
	this.charge = 100;
	this.maxCharge = 100;
	this.inventory = {};
	this.inventoryRoom = 10;
};*/

module.exports = drone;