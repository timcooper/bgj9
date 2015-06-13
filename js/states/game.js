var game = {};

game.create = function() {
	this.keyboard = this.game.input.keyboard;

	this.player = this.game.add.sprite(16, 16, "player");
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

	this.win = this.game.add.sprite(256, 256, "win");
	this.game.physics.enable(this.win, Phaser.Physics.ARCADE);
};

game.update = function() {
	this.game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

	if(this.keyboard.isDown(Phaser.Keyboard.A)) {
		this.player.body.velocity.x = -80;
	} else if(this.keyboard.isDown(Phaser.Keyboard.D)) {
		this.player.body.velocity.x = 80;
	} else {
		this.player.body.velocity.x = 0;
	}
	if(this.keyboard.isDown(Phaser.Keyboard.W)) {
		this.player.body.velocity.y = -80;
	} else if(this.keyboard.isDown(Phaser.Keyboard.S)) {
		this.player.body.velocity.y = 80;
	} else {
		this.player.body.velocity.y = 0;
	}
};

game.Win = function() {
	this.game.state.start("win");
};

module.exports = game;