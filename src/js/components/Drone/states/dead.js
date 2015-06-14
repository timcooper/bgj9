var dead = {},
	AppDispatcher = require("../../../dispatcher/AppDispatcher");


dead.create = function() {
	game = this.game;
	music = game.add.audio("mainLoop");
	music.play();

	var nameLabel = game.add.text(80, 80, "DRONE LOST", {
		font: "20px Courier",
		fontWeight: "bold",
		fill: "#53bdd0"
	});

	AppDispatcher.dispatch({
		action: "drone-dead"
	});
};

module.exports = dead;