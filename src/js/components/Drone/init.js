var droneInit = function(callback) {
	var game = new Phaser.Game(320, 256, Phaser.AUTO, 'game'),
	_ = require("lodash"),
	states = {
	  boot: require('./states/boot.js'),
	  preloader: require('./states/preloader.js'),
	  docked: require('./states/docked.js'),
	  game: require('./states/game.js')
	};

	_.each(states, function(state, key) {
	  game.state.add(key, state);
	});

	game.onLoad = callback;

	game.state.start('boot');
};

module.exports = droneInit;