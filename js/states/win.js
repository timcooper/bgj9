var win = {};

win.create = function() {
	var winLabel = this.game.add.text(80, 80, "YOU WON", {
			font: "50px Arial",
			fill: "#00ff00"
		}),
		startLabel = this.game.add.text(80, this.game.world.height-80,
			"press W to restart",
			{
				font: "25px Arial",
				fill: "#ffffff"
			}
		),
		wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

	wKey.onDown.addOnce(this.start, this);
};

win.start = function() {
	this.game.state.start("menu");
};

module.exports = win;