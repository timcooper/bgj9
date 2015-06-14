/** @jsx React.DOM */
//var React = require('react');
var PubSub = require("PubSub");
var messages = [
	"Deploy your drone to scavenge for repair supplies"
];
var addUpdate = function(channel, message) {
	console.log(message);
	messages.push(message);
};
console.log(PubSub);
PubSub.subscribe('updates.add', function() { console.log('what') });
console.log(PubSub);

	PubSub.subscribe('drone.dock', function() { console.log('what') });
var UpdateItem = React.createClass({
	ass: function() {
		console.log("WHAT");
	},
	render: function() {
		PubSub.subscribe('updates.add', this.ass);
		return (
            <li className="game__update-item">{this.props.message}</li>
        );
	}
});
var UpdateList = React.createClass({
	render: function() {
	    var messageNodes = this.props.messages.map(function (message) {
	      return (
	        <UpdateItem message={message} />
	      );
	    });
		return (
	        <div className="game__update-list">
	          <ul>
	            {messageNodes}
	          </ul>
	        </div>
        );
	}
});

var ActionPane = React.createClass({
	render: function() {
		var cx = React.addons.classSet;
		var classes = cx({
		  'game__action-panel': true,
		  'game__action-panel--sub': this.props.type == 'sub',
		  'game__action-panel--drone': this.props.type == 'drone',
		  'is-active': this.props.type == 'sub'
		});
		return (
          <section className={classes}>
            <h2>{this.props.type=='drone' ? "Drone" : "Dirigible"}</h2>
            <ul>
              <li>Oxygen Remaining: 40 days</li>
              <li>Materials: 40/100</li>
              <li>Hull: 50/100</li>
              <li><a href="#" id="launch" className="btn">Deploy Drone</a>
                <p className="dock-help">Drone deployed, return to dirigible to dock</p></li>
              <li><a href="#" className="btn">Lights</a></li>
            </ul>
          </section>
		);
	}
})

var MainControls = React.createClass({
	render: function() {
		return (
	        <div className="game__actions">
	          <nav className="main-actions">
	            <ul>
	              <li><a className="btn is-active" href="#">Dirigible</a></li>{/*
	              */}<li><a className="btn" href="#">Drone</a></li>
	            </ul>
	          </nav>
	          <ActionPane type="sub" />
	          <ActionPane type="drone" />
	        </div>
        );
	}
})

var RadarView = React.createClass({
	render: function() {
		var cx = React.addons.classSet;
		var classes = cx({
		  'game__radar': true,
		  'game__radar--sub': this.props.type == 'sub',
		  'game__radar--drone': this.props.type == 'drone'
		});
		return (
			<div id={this.props.type=='drone'?'game':''} className={classes} />
		);
	}
})

var Game = React.createClass({
	render: function() {
		return (
	      <div className="game">
	      	<UpdateList messages={messages} />
	      	<MainControls />
	      	<RadarView type="drone" />
	      	<RadarView type="sub" />
	      </div>
		);
	}

});

module.exports = Game;