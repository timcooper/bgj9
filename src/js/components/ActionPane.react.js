var React = require("React"),
	AppDispatcher = require("../dispatcher/AppDispatcher");

var ActionPane = React.createClass({
	deployDrone: function(e) {
		if($(e.target).hasClass("is-disabled")) return;
		AppDispatcher.dispatch({
			action: "drone-deploy"
		});
		$("#launch").addClass('is-disabled');
		$('.dock-help').show();
	},
	dockDrone: function(payload) {
		if(payload.action == "drone-dock") {
			$('.dock-help').hide();
			$("#launch").removeClass('is-disabled');
		}
	},
	render: function() {
		var cx = React.addons.classSet;
		var classes = cx({
		  'game__action-panel': true,
		  'game__action-panel--sub': this.props.type == 'sub',
		  'game__action-panel--drone': this.props.type == 'drone',
		  'is-active': this.props.type == 'sub'
		});

		var data = this.props.data;

		AppDispatcher.register(this.dockDrone);

		switch(this.props.type) {
			case "sub":
	          return (<section className={classes}>
	            <h2>Dirigible</h2>
	            <ul>
	              <li>Oxygen Remaining: {this.props.time.remains} hours</li>
	              <li>Materials: {data.inventory.materials}/{data.attributes.maxInventory}</li>
	              <li>Hull: {data.attributes.health}/{data.attributes.maxHealth}</li>
	              <li><a id="launch" href="#" className="btn" onClick={this.deployDrone}>Deploy Drone</a>
	                <p className="dock-help">Drone deployed, return to dirigible to dock</p></li>
	              <li><a href="#" className="btn">Lights</a></li>
	              <li><a href="#" className="btn">Repair</a></li>
	            </ul>
	          </section>)
	          break;
	        case "drone":
	          return (<section className={classes}>
	            <h2>Drone</h2>
	            <ul>
	              <li>Charge: {data.attributes.charge}/{data.attributes.maxCharge}</li>
	              <li>Hull: {data.attributes.health}/{data.attributes.maxHealth}</li>
	              <li>Materials: {data.inventory.materials}/{data.attributes.maxInventory}</li>
	              <li><a href="#" className="btn">Repair</a></li>
	            </ul>
	          </section>)
	          break;
		};
	}
});

module.exports = ActionPane;