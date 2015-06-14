var PubSub = require("PubSub");

var drone = function(x, y, game) {
	this.game   = game;
	this.sprite = this.game.add.sprite(x, y, "player");
	this.health = 100;
	this.maxHealth = 100;
	this.charge = 100;
	this.maxCharge = 100;
	this.inventory = {};
	this.inventoryRoom = 10;
};

drone.prototype.dock = function(channel, message) {
	console.log('DOCKED', message);
};

drone.prototype.create = function() {
	this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	this.sprite.body.setSize(10, 10, 0, 0);
	this.sprite.body.maxVelocity.set(50);
	this.sprite.body.drag.set(25);
	this.sprite.body.bounce.set(0.6);

	this.sprite.anchor.setTo(0.5, 0.5);

	PubSub.subscribe('drone.dock', this.dock);

	return this.sprite;
}

module.exports = drone;