var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message"),
	sub = require("../entities/sub"),
	time = require("../entities/time");

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
		case "drone-deploy":
		case "drone-dock":
			time.tick(.5);
			break;
		case "drone-repair":
			droneData = drone.getData();
			subData = sub.getData();

			if(droneData.attributes.health == droneData.attributes.maxHealth) {
				message.create("Drone does not need repairs");
				break;
			}

			if(subData.inventory.materials == 0) {
				message.create("No materials in dirigible cargo to use for repairs");
				break;
			}

			maxRepair = droneData.attributes.repairRate * subData.inventory.materials;
			neededRepair = droneData.attributes.maxHealth - droneData.attributes.health;

			total = droneData.attributes.health + maxRepair;
			diff = droneData.attributes.maxHealth - total;

			if(diff > 0) {
				droneData.attributes.health += maxRepair;
				usedMats = subData.inventory.materials;
				subData.inventory.materials = 0;
				message.create("Drone repaired by "+maxRepair+" for "+usedMats+" materials");
			}else{
				droneData.attributes.health = droneData.attributes.maxHealth;
				usedMats = Math.ceil(neededRepair / droneData.attributes.repairRate);
				subData.inventory.materials -= usedMats;
				message.create("Drone fully repaired for "+usedMats+" materials");
			}

			time.tick(1);

			break;

		case "drone-pickup":
			droneData = drone.getData();
			if(droneData.inventory.materials + payload.data.value > droneData.attributes.maxInventory){
				droneData.inventory.materials = droneData.attributes.maxInventory;
			}else{
				droneData.inventory.materials += payload.data.value;
			}
			drone.setData(droneData);
			break;

		case "drone-unload":
			droneData = drone.getData();
			subData = sub.getData();

			if(droneData.inventory.materials == 0) {
				message.create("No materials to store in cargo");
				break;
			}

			if(subData.inventory.materials == subData.attributes.maxInventory) {
				message.create("Dirigible cargo full");
				break
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

			time.tick(2);

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