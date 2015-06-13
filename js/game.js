var _ = require('lodash'),
	game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv'),
    states = {
      boot: require('./states/boot.js'),
      preloader: require('./states/preloader.js'),
      menu: require('./states/menu.js'),
      game: require('./states/game.js'),
      win: require('./states/win.js')
    };

_.each(states, function(state, key) {
  game.state.add(key, state);
});

game.state.start('boot');