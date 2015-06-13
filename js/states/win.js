var win = {};

win.create = function() {
	var winLabel = this.game.add.text(80, 80, "win", {
			font: "20px Arial",
			fill: "#00ff00"
		}),
		startLabel = this.game.add.text(80, 120,
			"press W to restart",
			{
				font: "16px Arial",
				fill: "#ffffff"
			}
		),
		wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

	wKey.onDown.addOnce(this.start, this);
};

win.start = function() {
	this.game.state.start("game");
};

module.exports = win;