var preloader = {};

preloader.preload = function() {
	var loadingLabel = this.game.add.text(80, 150, "loading...", {
		font: "30px Courier",
		fill: "#ffffff"
	});

	this.game.load.image("player", "assets/img/player.png");
	this.game.load.image("win", "assets/img/win.png");
};

preloader.create = function() {
	this.game.state.start("menu");
};

module.exports = preloader;