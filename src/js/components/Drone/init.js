var droneInit = function(callback) {
	var game = new Phaser.Game(320, 256, Phaser.AUTO, 'game'),
	states = {
	  boot: require('./states/boot.js'),
	  preloader: require('./states/preloader.js'),
	  docked: require('./states/docked.js'),
	  game: require('./states/game.js'),
	  dead: require('./states/dead.js')
	};

	for(key in states) {
		game.state.add(key, states[key]);
	}

	game.onLoad = callback;

	game.state.start('boot');
};

module.exports = droneInit;