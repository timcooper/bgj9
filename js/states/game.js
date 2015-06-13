var game = {};

game.create = function() {
	this.game.world.setBounds(-160, -120, 960, 720);

	var bg = this.game.add.tileSprite(0, 0, 320, 240, 'droneBG');
	bg.fixedToCamera = true;

	this.game.camera.x = -90; //70
	this.game.camera.y = 20; //140

	this.game.add.tileSprite(0, 0, 640, 480, 'droneMap');

	this.player = this.game.add.sprite(0, 0, "player");
	this.player.fixedToCamera = true;
	this.player.cameraOffset.setTo((this.game.camera.width/2)-12, (this.game.camera.height/2)-12);
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);

	this.win = this.game.add.sprite(256, 256, "win");
	this.game.physics.enable(this.win, Phaser.Physics.ARCADE);

	this.cursors = this.game.input.keyboard.createCursorKeys();
};

game.update = function() {
	this.game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

	if (this.cursors.up.isDown)
    {
        this.game.camera.y -= 5;
    }
    else if (this.cursors.down.isDown)
    {
        this.game.camera.y += 5;
    }

    if (this.cursors.left.isDown)
    {
        this.game.camera.x -= 5;
    }
    else if (this.cursors.right.isDown)
    {
        this.game.camera.x += 5;
    }
};

game.Win = function() {
	this.game.state.start("win");
};

module.exports = game;