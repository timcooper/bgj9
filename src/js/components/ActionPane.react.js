var React = require("React"),
	AppDispatcher = require("../dispatcher/AppDispatcher");

var ActionPane = React.createClass({
	deployDrone: function(e) {
		if($(e.target).hasClass("is-disabled")) return;
		AppDispatcher.dispatch({
			action: "drone-deploy"
		});
	},
	unloadDrone: function(e) {
		if($(e.target).hasClass("is-disabled")) return;
		AppDispatcher.dispatch({
			action: "drone-unload"
		});
	},
	repairDrone: function(e) {
		if($(e.target).hasClass("is-disabled") || this.data.attributes.health == this.data.attributes.maxHealth) return;
		AppDispatcher.dispatch({
			action: "drone-repair"
		});
	},
	chargeDrone: function(e) {
		if($(e.target).hasClass("is-disabled")) return;
		AppDispatcher.dispatch({
			action: "drone-charge"
		});
	},
	repairSub: function(e) {
		if($(e.target).hasClass("is-disabled")) return;
		AppDispatcher.dispatch({
			action: "sub-repair"
		});
	},
	endGame: function(e) {
		AppDispatcher.dispatch({
			action: "sub-escape",
			disabled: $(e.target).hasClass("is-disabled")
		});
	},
	render: function() {
		var cx = React.addons.classSet;
		var classes = cx({
		  'game__action-panel': true,
		  'game__action-panel--sub': this.props.type == 'sub',
		  'game__action-panel--drone': this.props.type == 'drone',
		  'is-active': this.props.type == 'sub'
		});

		this.data = this.props.data;
		var winCondition = this.props.type == 'sub' && this.data.attributes.health == this.data.attributes.maxHealth;

		switch(this.props.type) {
			case "sub":
			  dockClasses = cx({
			  	'btn': true,
			  	'is-disabled': !this.props.docked || this.props.droneDead
			  });
	          escapeClasses = cx({
	          	'btn': true,
	          	'is-disabled': !winCondition
	          });
	          repairClasses = cx({
	          	'btn': true,
	          	'is-disabled': this.data.attributes.health == this.data.attributes.maxHealth || this.data.inventory.materials == 0
	          });
			  help = '';
			  if(this.props.droneDead) {
			  	help = <p className="dock-help">Drone lost</p>
			  }else if(!this.props.docked) {
			  	help = <p className="dock-help">Drone deployed, return to sub to dock</p>
			  }
	          return (<section className={classes}>
	            <dl className="attributes">
	              <dt>O<sub>2</sub> Remaining</dt><dd>{this.props.time.remains} hours</dd>
	              <dt>Hull</dt><dd>{this.data.attributes.health}/{this.data.attributes.maxHealth}</dd>
	              <dt>Materials</dt><dd>{this.data.inventory.materials}/{this.data.attributes.maxInventory}</dd>
              	</dl>
              	<ul className="list-inline">
	              <li><a href="#" className={dockClasses} onClick={this.deployDrone}>Deploy Drone</a>
	                {help}</li>
	              <li><a href="#" className={repairClasses} onClick={this.repairSub}>Repair</a></li>
	              <li><a href="#" className={escapeClasses} onClick={this.endGame}>Escape</a></li>
	            </ul>
	          </section>)
	          break;
	        case "drone":
	          unloadClasses = cx({
	          	'btn': true,
	          	'is-disabled': !this.data.docked || this.data.inventory.materials == 0
	          });
	          chargeClasses = cx({
	          	'btn': true,
	          	'is-disabled': !this.data.docked || this.data.attributes.charge == this.data.attributes.maxCharge
	          });
	          repairClasses = cx({
	          	'btn': true,
	          	'is-disabled': !this.data.docked || this.data.attributes.health == this.data.attributes.maxHealth
	          });
	          if(!this.data.dead) {
	          	return (<section className={classes}>
	            	<dl className="attributes">
		              <dt>Charge</dt><dd>{parseInt(this.data.attributes.charge)}/{this.data.attributes.maxCharge}</dd>
		              <dt>Hull</dt><dd>{this.data.attributes.health}/{this.data.attributes.maxHealth}</dd>
		              <dt>Materials</dt><dd>{this.data.inventory.materials}/{this.data.attributes.maxInventory}</dd>
	              	</dl>
              		<ul className="list-inline">
		              <li><a href="#" className={unloadClasses} onClick={this.unloadDrone}>Unload</a></li>
		              <li><a href="#" className={chargeClasses} onClick={this.chargeDrone}>Charge</a></li>
		              <li><a href="#" className={repairClasses} onClick={this.repairDrone}>Repair</a></li>
		            </ul>
		          </section>)
	          }else{
	          	return(<section className={classes}>
		            <h2>Drone Lost</h2>
		          </section>)
	          }
	          break;
		};
	}
});

module.exports = ActionPane;