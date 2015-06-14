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
		this.game = game;
		this.sprite = this.game.add.sprite(x, y, "player");
		this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.body.setSize(10, 10, 0, 0);
		this.sprite.body.maxVelocity.set(50);
		this.sprite.body.drag.set(25);
		this.sprite.body.bounce.set(0.6);

		this.sprite.anchor.setTo(0.5, 0.5);

		this.keyboard = this.game.input.keyboard;

		this.data = this.getData();

		this.prevCharge = this.data.attributes.charge;
		this.charge = this.prevCharge;

		return this;
	},

	update: function() {
		if(!Phaser.Point.equals(this.sprite.body.acceleration,new Phaser.Point(0,0))) {
			if(this.charge - 0.005 < 0) {
				this.data.attributes.charge = 0;
				this.game.state.start("dead");
			}
			this.charge -= 0.005;

			if(parseInt(this.charge, 10) < parseInt(this.prevCharge, 10)) {
				this.data.attributes.charge = parseInt(this.charge, 10);
				this.prevCharge = parseInt(this.charge, 10);
				this.setData(this.data);
			}
		}

		this.sprite.body.acceleration.set(0);

		if(this.keyboard.isDown(Phaser.Keyboard.A)) {
			if(this.sprite.body.velocity.x > 0) {
				this.sprite.body.acceleration.x = -50;
			}else{
				this.sprite.body.acceleration.x = -25;
			}
		} else if(this.keyboard.isDown(Phaser.Keyboard.D)) {
			if(this.sprite.body.velocity.x < 0) {
				this.sprite.body.acceleration.x = 50;
			}else{
				this.sprite.body.acceleration.x = 25;
			}
		}

		if(this.keyboard.isDown(Phaser.Keyboard.W)) {
			if(this.sprite.body.velocity.y > 0) {
				this.sprite.body.acceleration.y = -50;
			}else{
				this.sprite.body.acceleration.y = -25;
			}
		} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
			if(this.sprite.body.velocity.y < 0) {
				this.sprite.body.acceleration.y = 50;
			}else{
				this.sprite.body.acceleration.y = 25;
			}
		}
	}

});

AppDispatcher.register(function(payload) {
	switch(payload.action) {
		case "drone-dead":
			droneData = drone.getData();
			droneData.dead = true;
			drone.setData(droneData);
			break;
		case "drone-deploy":
		case "drone-dock":
			droneData = drone.getData();
			droneData.docked = payload.action == "drone-dock";
			time.tick(.5);
			break;
		case "drone-charge":
			droneData = drone.getData();

			charged = droneData.attributes.maxCharge - droneData.attributes.charge;
			duration = Math.ceil(charged/10);

			droneData.attributes.charge = droneData.attributes.maxCharge;

			time.tick(duration);

			message.create("Charged "+charged+"% in "+duration+" hours");

			break;
		case "drone-repair":
			droneData = drone.getData();
			subData = sub.getData();

			if(droneData.attributes.health == droneData.attributes.maxHealth) {
				message.create("Drone does not need repairs");
				break;
			}

			if(subData.inventory.materials == 0) {
				message.create("No materials in sub cargo to use for repairs");
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
				message.create("Submersible cargo full");
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
				message.create("Submersible cargo full");
			}

			time.tick(2);

			break;
	}
});

module.exports = drone;