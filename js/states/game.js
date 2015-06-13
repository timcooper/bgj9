var game = {};

game.create = function() {
	this.game.world.setBounds(0, 0, 960, 768);
	this.game.renderer.renderSession.roundPixels = true;

	this.cave = new (require("../components/cave.js"))(this.game);
	this.cave.create();

	this.player = this.game.add.sprite(this.cave.playerX, this.cave.playerY, "player");
	this.cave.addPlayer(this.player);
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.player.body.setSize(10, 10, 0, 0);
	this.player.body.maxVelocity.set(50);
	this.player.body.drag.set(25);
	this.player.body.bounce.set(0.6);

	this.player.anchor.setTo(0.5, 0.5);

	this.game.camera.bounds = null;
	this.game.camera.follow(this.player);

	this.win = this.game.add.sprite(550, 360, "win");
	this.game.physics.enable(this.win, Phaser.Physics.ARCADE);

	var bg = this.game.add.tileSprite(0, 0, 320, 256, 'droneBG');
	bg.fixedToCamera = true;

	this.keyboard = this.game.input.keyboard;
};

game.update = function() {
	this.cave.update();
	this.game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

	this.player.body.acceleration.set(0);

	if(this.keyboard.isDown(Phaser.Keyboard.A)) {
		if(this.player.body.velocity.x > 0) {
			this.player.body.acceleration.x = -50;
		}else{
			this.player.body.acceleration.x = -25;
		}
	} else if(this.keyboard.isDown(Phaser.Keyboard.D)) {
		if(this.player.body.velocity.x < 0) {
			this.player.body.acceleration.x = 50;
		}else{
			this.player.body.acceleration.x = 25;
		}
	}

	if(this.keyboard.isDown(Phaser.Keyboard.W)) {
		if(this.player.body.velocity.y > 0) {
			this.player.body.acceleration.y = -50;
		}else{
			this.player.body.acceleration.y = -25;
		}
	} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
		if(this.player.body.velocity.y < 0) {
			this.player.body.acceleration.y = 50;
		}else{
			this.player.body.acceleration.y = 25;
		}
	}
};

game.Win = function() {
	this.game.state.start("win");
};

module.exports = game;