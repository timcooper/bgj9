boot = {};

boot.create = function() {
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.state.start('preloader');
};

module.exports = boot;