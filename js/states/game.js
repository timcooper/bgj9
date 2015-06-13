var game = {};

game.create = function() {
	this.game.world.setBounds(0, 0, 960, 768);
	this.game.renderer.renderSession.roundPixels = true;
	var bg = this.game.add.tileSprite(0, 0, 320, 256, 'droneBG');
	bg.fixedToCamera = true;

	//this.game.camera.x = 70 - 160;
	//this.game.camera.y = 140 - 120;

	//this.game.add.tileSprite(0, 0, 640, 480, 'droneMap');

	//this.player = this.game.add.sprite(0, 0, "player");
	//this.player.fixedToCamera = true;
	//this.player.cameraOffset.setTo((this.game.camera.width/2)-12, (this.game.camera.height/2)-12);


	this.cave = new (require("../components/cave.js"))(this.game);
	this.cave.create();

	this.player = this.game.add.sprite(this.cave.playerX, this.cave.playerY, "player");
	this.cave.addPlayer(this.player);
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.player.body.setSize(5, 5, 10, 10);
	//this.player.fixedToCamera = true;
	//this.player.cameraOffset.setTo((this.game.camera.width/2)-12, (this.game.camera.height/2)-12);
	this.game.camera.bounds = null;
	this.game.camera.follow(this.player);

	this.win = this.game.add.sprite(550, 360, "win");
	this.game.physics.enable(this.win, Phaser.Physics.ARCADE);

	this.keyboard = this.game.input.keyboard;
};

game.update = function() {
	this.cave.update();
	this.game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

	if(this.keyboard.isDown(Phaser.Keyboard.A)) {
		this.player.body.velocity.x = -175;
	} else if(this.keyboard.isDown(Phaser.Keyboard.D)) {
		this.player.body.velocity.x = 175;
	} else {
		this.player.body.velocity.x = 0;
	}
	if(this.keyboard.isDown(Phaser.Keyboard.W)) {
		this.player.body.velocity.y = -175;
	} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
		this.player.body.velocity.y = 175;
	} else {
		this.player.body.velocity.y = 0;
	}
};

game.Win = function() {
	this.game.state.start("win");
};

module.exports = game;