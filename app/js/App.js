/** @jsx React.DOM */
//var React = require('react');

var App = React.createClass({
	render: function() {
		return (
	      <div className="game">
	        <div className="game__update-list">
	          <ul>
	            <li className="game__update-item">Deploy your drone to scavenge for repair supplies.</li>
	          </ul>
	        </div>
	        <div className="game__actions">
	          <nav className="main-actions">
	            <ul>
	              <li><a className="btn is-active" href="#">Dirigible</a></li>{/*
	                    */}<li><a className="btn" href="#">Drone</a></li>
	            </ul>
	          </nav>
	          <section className="game__action-panel game__action-panel--sub is-active">
	            <h2>Dirigible</h2>
	            <ul>
	              <li>Oxygen Remaining: 40 days</li>
	              <li>Materials: 40/100</li>
	              <li>Hull: 50/100</li>
	              <li><a href="#" id="launch" className="btn">Deploy Drone</a>
	                <p className="dock-help">Drone deployed, return to dirigible to dock</p></li>
	              <li><a href="#" className="btn">Lights</a></li>
	            </ul>
	          </section>
	          <section className="game__action-panel game__action-panel--drone">
	            <h2>Drone</h2>
	            <ul>
	              <li>Charge: 50/10</li>
	              <li>Hull: 100/100</li>
	              <li><a href="#" className="btn">Lights</a>
	              </li><li><a href="#" className="btn">Repair</a></li>
	              <li><a href="#" className="btn">Upgrades</a>
	              </li></ul>
	          </section>
	        </div>
	        <div id="game" className="game__radar game__radar--drone" />
	        <div className="game__radar game__radar--sub" />
	      </div>
		);
	}

});

module.exports = App;