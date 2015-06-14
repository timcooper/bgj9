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

	this.dirigible = require("../entities/sub.js");
	this.dirigible.create(this.cave.playerX-40, this.cave.playerY-40, this.game);

	this.keyboard = this.game.input.keyboard;
};

game.update = function() {
	this.cave.update();
	this.game.physics.arcade.overlap(this.player.sprite, this.dirigible.sprite, this.dockDrone, null, this);

	this.player.sprite.body.acceleration.set(0);

	if(this.keyboard.isDown(Phaser.Keyboard.A)) {
		if(this.player.sprite.body.velocity.x > 0) {
			this.player.sprite.body.acceleration.x = -50;
		}else{
			this.player.sprite.body.acceleration.x = -25;
		}
	} else if(this.keyboard.isDown(Phaser.Keyboard.D)) {
		if(this.player.sprite.body.velocity.x < 0) {
			this.player.sprite.body.acceleration.x = 50;
		}else{
			this.player.sprite.body.acceleration.x = 25;
		}
	}

	if(this.keyboard.isDown(Phaser.Keyboard.W)) {
		if(this.player.sprite.body.velocity.y > 0) {
			this.player.sprite.body.acceleration.y = -50;
		}else{
			this.player.sprite.body.acceleration.y = -25;
		}
	} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
		if(this.player.sprite.body.velocity.y < 0) {
			this.player.sprite.body.acceleration.y = 50;
		}else{
			this.player.sprite.body.acceleration.y = 25;
		}
	}
};

game.dockDrone = function() {
	AppDispatcher.dispatch({
		action: "drone-dock"
	});
	message.create("Drone Docked!");
	this.music.stop();
	this.game.state.start("docked");
};

module.exports = game;