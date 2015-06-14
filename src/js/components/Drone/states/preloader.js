var preloader = {};

preloader.preload = function(onLoad) {
	var loadingLabel = this.game.add.text(80, 150, "loading...", {
		font: "30px Courier",
		fill: "#ffffff"
	});

	this.game.load.image("player", "assets/img/player.png");
	this.game.load.image("floor", "assets/img/floor.png");
	this.game.load.image("wall", "assets/img/wall.png");
	this.game.load.image("pickup", "assets/img/pickup.png");
	this.game.load.image("sub", "assets/img/sub.png");
	this.game.load.image("droneBG", "assets/img/drone-bg.png");

	this.game.load.audio("mainLoop", ["assets/audio/exploration.mp3", "assets/audio/exploration.ogg"]);
	this.game.load.audio("tenseLoop", ["assets/audio/tense.mp3", "assets/audio/tense.ogg"]);
	//this.game.load.audio("megaTenseLoop", ["assets/audio/megatense.mp3", "assets/audio/megatense.ogg"]);

	this.game.load.audio("deployDrone", ["assets/audio/deployDrone.mp3", "assets/audio/deployDrone.ogg"]);
	this.game.load.audio("dockDrone", ["assets/audio/dockDrone.mp3", "assets/audio/dockDrone.ogg"]);

	this.game.load.audio("enemyAttack", ["assets/audio/enemyAttack.mp3", "assets/audio/enemyAttack.ogg"]);
	this.game.load.audio("repair", ["assets/audio/repair.mp3", "assets/audio/repair.ogg"]);
	this.game.load.audio("crash", ["assets/audio/crash.mp3", "assets/audio/crash.ogg"]);
	this.game.load.audio("pickup", ["assets/audio/pickup.mp3", "assets/audio/pickup.ogg"]);
	this.game.load.audio("unload", ["assets/audio/unload.mp3", "assets/audio/unload.ogg"]);
	//this.game.load.audio("subCreak", ["assets/audio/subCreak.mp3", "assets/audio/subCreak.ogg"]);
};

preloader.update = function() {
	if(this.cache.isSoundDecoded('mainLoop')) {
		this.game.onLoad();
		this.game.state.start("docked");
	}
}

module.exports = preloader;