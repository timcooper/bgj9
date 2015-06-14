var game = {},
	message = require("../entities/message"),
	AppDispatcher = require("../../../dispatcher/AppDispatcher");

game.create = function() {
	this.music = this.game.add.audio("tenseLoop");
	this.music.play();

	this.game.world.setBounds(0, 0, 960, 768);
	this.game.renderer.renderSession.roundPixels = true;

	if(typeof this.cave === "undefined") {
		this.cave = new (require("../entities/cave.js"))(this.game);
		this.cave.create();
	}else{
		this.cave.renderMap();
	}

	var bg = this.game.add.tileSprite(0, 0, 320, 256, 'droneBG');
	bg.fixedToCamera = true;

	var player = require("../entities/drone.js");
	this.player = player.create(this.cave.playerX, this.cave.playerY, this.game);
	this.cave.addPlayer(this.player.sprite);

	this.game.camera.bounds = null;
	this.game.camera.follow(this.player.sprite);

	this.sub = require("../entities/sub.js");
	this.sub.create(this.cave.playerX-40, this.cave.playerY-40, this.game);
};

game.update = function() {
	this.cave.update();
	this.player.update();

	playerData = this.player.getData();
	if(playerData.dead) {
		this.music.stop();
		this.game.state.start("dead");
	}

	this.game.physics.arcade.overlap(this.player.sprite, this.sub.sprite, this.dockDrone, null, this);
};

game.dockDrone = function() {
	this.music.stop();
	this.game.sound.play("dockDrone");
	this.game.state.start("docked");
	message.create("Drone docked");
	AppDispatcher.dispatch({
		action: "drone-dock"
	});
};

module.exports = game;