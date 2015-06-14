var UI = {},
	PubSub = require("PubSub"),
	docked = require('../states/docked.js'),
	droneDeployed = false;

$('.main-actions .btn').click(function(e) {
	var $elem = $(e.target);

	$elem.addClass("is-active");
	$elem.parent().siblings().children().removeClass("is-active");
	if(e.target.innerHTML == "Dirigible") {
		$('.game__action-panel--sub').addClass("is-active");
		$('.game__action-panel--drone').removeClass("is-active");
	}else{
		$('.game__action-panel--sub').removeClass("is-active");
		$('.game__action-panel--drone').addClass("is-active");
	}
});

$('#launch').click(function() {
	if(!droneDeployed)
		UI.launchDrone();
});

UI.dockDrone = function() {
	droneDeployed = false;
	PubSub.publish('updates.add', "Drone docked!");
	//$('.game__update-list ul').prepend('<li class="game__update-item">Drone docked!</li>');
	$('.dock-help').hide();
	$("#launch").removeClass('is-disabled');
	docked.game.state.start("docked");
}

UI.launchDrone = function() {
	droneDeployed = true;
	PubSub.publish('updates.add', "Drone deployed!");
	//$('.game__update-list ul').prepend('<li class="game__update-item">Drone deployed!</li>');
	$('.dock-help').show();
	$("#launch").addClass('is-disabled');
	docked.start();
}

PubSub.subscribe('drone.dock', UI.dockDrone);

module.exports = UI;