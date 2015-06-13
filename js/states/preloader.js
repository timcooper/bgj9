var preloader = {};

preloader.preload = function() {
	var loadingLabel = this.game.add.text(80, 150, "loading...", {
		font: "30px Courier",
		fill: "#ffffff"
	});

	this.game.load.image("player", "assets/img/player.png");
	this.game.load.image("floor", "assets/img/floor.png");
	this.game.load.image("wall", "assets/img/wall.png");
	this.game.load.image("win", "assets/img/win.png");
	this.game.load.image("droneBG", "assets/img/drone-bg.png");

	this.game.load.audio("mainLoop", ["assets/audio/bgj9 exploration (draft 1) (loop).mp3"]);
	this.game.load.audio("tenseLoop", ["assets/audio/bgj9 tense (draft 1) (loop).mp3"]);
};

preloader.create = function() {
	this.game.state.start("docked");
};

module.exports = preloader;