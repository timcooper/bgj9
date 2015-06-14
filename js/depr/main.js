var _ = require('lodash'),
	game = new Phaser.Game(320, 256, Phaser.AUTO, 'game'),
    states = {
      boot: require('./states/boot.js'),
      preloader: require('./states/preloader.js'),
      docked: require('./states/docked.js'),
      game: require('./states/game.js')
    },
    UI = require('./UI/init.js'),
    level;
global.PubSub = require("PubSub");
_.each(states, function(state, key) {
  game.state.add(key, state);
});

game.state.start('boot');