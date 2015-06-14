var SaveStore = require("../../../stores/SaveStore"),
	assign = require("react/lib/Object.assign"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message"),
	time = require("../entities/time");

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

AppDispatcher.register(function(payload) {
	switch(payload.action) {
		case "sub-repair":
			subData = sub.getData();

			if(subData.inventory.materials == 0) {
				message.create("No materials in sub cargo to use for repairs");
				break;
			}

			maxRepair = subData.attributes.repairRate * subData.inventory.materials;
			neededRepair = subData.attributes.maxHealth - subData.attributes.health;

			total = subData.attributes.health + maxRepair;
			diff = subData.attributes.maxHealth - total;

			if(diff > 0) {
				subData.attributes.health += maxRepair;
				usedMats = subData.inventory.materials;
				subData.inventory.materials = 0;
				message.create("Submersible repaired by "+maxRepair+" for "+usedMats+" materials");
			}else{
				subData.attributes.health = subData.attributes.maxHealth;
				usedMats = Math.ceil(neededRepair / subData.attributes.repairRate);
				subData.inventory.materials -= usedMats;
				message.create("Submersible fully repaired for "+usedMats+" materials");
			}

			time.tick(1);

			break;
		case "sub-escape":
			if(payload.disabled) {
				message.create("Submersible hull not fully repaired");
				break;
			}

			alert("winner!");
			break;
	}
});

module.exports = sub;