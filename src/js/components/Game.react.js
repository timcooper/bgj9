var UI = require('./UI.react');
var React = require('React');
var AppDispatcher = require("../dispatcher/AppDispatcher");
//var key = require('keymaster');

var Game = React.createClass({

	getInitialState: function() {
		return {loaded: false, started: false};
	},

	onLoad: function() {
		this.setState({loaded: true, started: false});
	},

  onStart: function() {
    this.setState({loaded: true, started: true})
  },

  render: function() {
    return (
    	<div className="container">
    		<UI started={this.state.started} onLoad={this.onLoad} />
        <Start started={this.state.started} loaded={this.state.loaded} onStart={this.onStart} />
        <Preloader loaded={this.state.loaded} />
    	</div>
    );
  }

});

var Preloader = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'game': true,
      'game--preload': true,
      'is-disabled': this.props.loaded
    });
    return <div className={classes}>Loading...</div>;
  }
});

var Start = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'game': true,
      'game--start': true,
      'is-disabled': this.props.started || !this.props.loaded
    });
    return (
      <div className={classes}>
        <div className="intro">
          <h1 className="intro__title">Submersive Intent</h1>
          <div className="intro__text">
            <p>The Deep Sea Trading Co. has contracted you to explore a new cave system thought to be rich in valuable mineral deposits.</p>
            <p>Unfortunately, you went and crashed your solo submersible in said cave and now need to scavenge around with your convenient minisub drone.</p>
            <p>Explore the cave and gather enough materials to fully repair your sub before you run out of oxygen!</p>
          </div>
          <a href="#" className="btn" onClick={this.props.onStart}>Start Game</a>
        </div>
      </div>
    );
  }
});

module.exports = Game;