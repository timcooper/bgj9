var menu = {};

menu.create = function() {
	var nameLabel = this.game.add.text(80, 80, "BGJ 09", {
			font: "50px Arial",
			fill: "#ffffff"
		}),
		startLabel = this.game.add.text(80, this.game.world.height-80,
			"Press W to start",
			{
				font: "25px Arial",
				fill: "#ffffff"
			}
		),
		wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);

	wKey.onDown.addOnce(this.start, this);
};

menu.start = function() {
	this.game.state.start("game");
};

module.exports = menu;