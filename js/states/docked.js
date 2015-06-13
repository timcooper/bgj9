var docked = {},
	music;

docked.create = function() {
	this.music = this.game.add.audio("mainLoop");
	//this.music.play();

	var nameLabel = this.game.add.text(80, 80, "DRONE IN CARGO", {
			font: "20px Courier",
			fontWeight: "bold",
			fill: "#53bdd0"
		});
};

docked.start = function() {
	this.music.stop();
	this.game.state.start("game");
};

module.exports = docked;