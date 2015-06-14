var UI = require('./UI.react');
var React = require('React');
var AppDispatcher = require("../dispatcher/AppDispatcher");
//var key = require('keymaster');

var Game = React.createClass({

	getInitialState: function() {
		return {loaded: false};
	},

	onLoad: function() {
		this.setState({loaded: true});
	},

  render: function() {
  	if(this.state.loaded) {
  		preloader = '';
  	}else{
  		preloader = <Preloader />;
  	}
  	var test = this.state.loaded ? 'LOADED' : 'NOT LOADED';
    return (
    	<div className="container">
    		{preloader}
    		<UI onLoad={this.onLoad} />
    	</div>
    );
  }

});

var Preloader = React.createClass({
  render: function() {
    return <div className="game game-preload">Loading...</div>;
  }
});

module.exports = Game;