var UI = require('./UI.react');
var React = require('React');
var AppDispatcher = require("../dispatcher/AppDispatcher");
var SaveStore = require("../stores/SaveStore");

var Game = React.createClass({

	getInitialState: function() {
		return {loaded: false, started: false, dead: false, escaped: false };
	},

  componentDidMount: function() {
    SaveStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({dead: SaveStore.get("dead"), escaped: SaveStore.get("escaped")});
  },

	onLoad: function() {
		this.setState({loaded: true});
	},

  onStart: function() {
    this.setState({started: true})
  },

  onRestart: function() {
    window.location.reload();
  },

  render: function() {
    return (
    	<div className="container">
    		<UI started={this.state.started} dead={this.state.dead} escaped={this.state.escaped} onLoad={this.onLoad} />
        <Start started={this.state.started} loaded={this.state.loaded} onStart={this.onStart} />
        <Preloader loaded={this.state.loaded} dead={this.state.dead} />
        <Dead dead={this.state.dead} onRestart={this.onRestart} />
        <Escaped escaped={this.state.escaped} onRestart={this.onRestart} />
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
    return <div className={classes}>
      <div className="intro">
        <h1 className="intro__title">Submersive Intent</h1>
        <div className="intro__text">
          <p>Loading&hellip;</p>
        </div>
      </div>
      <div className="spinner"></div>
    </div>;
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

var Escaped = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'game': true,
      'game--start': true,
      'is-disabled': !this.props.escaped
    });
    return (
      <div className={classes}>
        <div className="intro">
          <h1 className="intro__title">You Escaped</h1>
          <div className="intro__text">
            <p>Congratulations, you were able to repair your submersible and escape the cave.</p>
            <p>Please hold for next assignment.</p>
          </div>
          <a href="#" className="btn" onClick={this.props.onRestart}>Restart</a>
        </div>
      </div>
    );
  }
});

var Dead = React.createClass({
  render: function() {
    var cx = React.addons.classSet;
    var classes = cx({
      'game': true,
      'game--start': true,
      'is-disabled': !this.props.dead
    });
    return (
      <div className={classes}>
        <div className="intro">
          <h1 className="intro__title">You Died</h1>
          <div className="intro__text">
            <p>You ran out of oxygen and suffocated. It was not nice.</p>
          </div>
          <a href="#" className="btn" onClick={this.props.onRestart}>Restart</a>
        </div>
      </div>
    );
  }
});

module.exports = Game;