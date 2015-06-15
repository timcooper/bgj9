var preloader = {};

preloader.preload = function(onLoad) {
	var loadingLabel = this.game.add.text(80, 150, "loading...", {
		font: "30px Courier",
		fill: "#ffffff"
	});

	this.game.load.image("player", "assets/img/player.png");
	this.game.load.image("floor", "assets/img/floor.png");
	this.game.load.image("wall", "assets/img/wall.png?v1");
	this.game.load.image("pickup", "assets/img/pickup.png");
	this.game.load.image("sub", "assets/img/sub.png");
	this.game.load.image("droneBG", "assets/img/drone-bg.png");

	this.game.load.audio("mainLoop", ["assets/audio/exploration.m4a", "assets/audio/exploration.ogg", "assets/audio/exploration.mp3"]);
	this.game.load.audio("tenseLoop", ["assets/audio/tense.m4a", "assets/audio/tense.ogg", "assets/audio/tense.mp3"]);

	this.game.load.audio("deployDrone", ["assets/audio/deployDrone.m4a", "assets/audio/deployDrone.ogg", "assets/audio/deployDrone.mp3"]);
	this.game.load.audio("dockDrone", ["assets/audio/dockDrone.m4a", "assets/audio/dockDrone.ogg", "assets/audio/dockDrone.mp3"]);

	this.game.load.audio("enemyAttack", ["assets/audio/enemyAttack.m4a", "assets/audio/enemyAttack.ogg", "assets/audio/enemyAttack.mp3"]);
	this.game.load.audio("repair", ["assets/audio/repair.m4a", "assets/audio/repair.ogg", "assets/audio/repair.mp3"]);
	this.game.load.audio("crash", ["assets/audio/crash.m4a", "assets/audio/crash.ogg", "assets/audio/crash.mp3"]);
	this.game.load.audio("pickup", ["assets/audio/pickup.m4a", "assets/audio/pickup.ogg", "assets/audio/pickup.mp3"]);
	this.game.load.audio("unload", ["assets/audio/unload.m4a", "assets/audio/unload.ogg", "assets/audio/unload.mp3"]);
	this.game.load.audio("subCreak", ["assets/audio/subCreak.m4a", "assets/audio/subCreak.ogg", "assets/audio/subCreak.mp3"]);
};

preloader.update = function() {
	if(this.cache.isSoundDecoded('mainLoop')) {
		this.game.onLoad();
		this.game.state.start("docked");
	}
}

module.exports = preloader;