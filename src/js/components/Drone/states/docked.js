var docked = {},
	AppDispatcher = require("../../../dispatcher/AppDispatcher"),
	message = require("../entities/message"),
	music,
	game;


docked.create = function() {
	game = this.game;
	music = game.add.audio("mainLoop");
	music.fadeIn(4000);

	var nameLabel = game.add.text(80, 80, "DRONE IN CARGO", {
			font: "20px Courier",
			fontWeight: "bold",
			fill: "#53bdd0"
		});
};

docked.deploy = function(payload) {
	if(payload.action == "drone-deploy") {
		music.stop();
		game.sound.play("deployDrone");
		game.state.start("game");
		message.create("Drone deployed");
	}
	if(payload.action == "drone-repair" || payload.action == "sub-repair") {
		game.sound.play("repair");
	}
};

AppDispatcher.register(docked.deploy);

module.exports = docked;