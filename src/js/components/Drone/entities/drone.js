var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message"),
	Sub = require("../entities/sub");

//var CHANGE_EVENT = 'change';

var drone = assign({}, SaveStore.prototype, {

	getData: function() {
		return SaveStore.get("drone");
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
	}

});

AppDispatcher.register(function(payload) {
	switch(payload.action) {
		case "drone-pickup":
			droneData = drone.getData();
			if(droneData.inventory.materials + payload.data.value > droneData.attributes.maxInventory){
				droneData.inventory.materials = droneData.attributes.maxInventory;
			}else{
				droneData.inventory.materials += payload.data.value;
			}
			drone.setData(droneData);
			break;

		case "drone-dock":
			droneData = drone.getData();
			subData = Sub.getData();

			if(droneData.inventory.materials == 0) {
				message.create("No materials to store in cargo");
				break;
			}

			total = subData.inventory.materials + droneData.inventory.materials;
			diff = subData.attributes.maxInventory - total;

			if(diff > 0) {
				subData.inventory.materials += droneData.inventory.materials;
				storedMats = droneData.inventory.materials;
				droneData.inventory.materials = 0;
			}else{
				subData.inventory.materials = subData.attributes.maxInventory;
				storedMats = droneData.inventory.materials + diff;
				droneData.inventory.materials = diff * -1;
			}
			message.create("Stored "+storedMats+" materials in cargo");

			if(subData.inventory.materials == subData.attributes.maxInventory) {
				message.create("Dirigible cargo full");
			}
			break;
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