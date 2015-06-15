var React = require("React"),
	ActionPane = require("./ActionPane.react");

function isTouch() {
	var bool = false;
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      bool = true;
    }
    return bool;
}

var MainControls = React.createClass({
	getInitialState: function() {
		return {
			activePane: 1
		};
	},
	changePane: function(id, e) {
		e.preventDefault();
		this.setState({activePane: id});
	},
	render: function() {
		var cx = React.addons.classSet;
		var subClasses = cx({
		  'btn': true,
		  'tabs__link': true,
		  'is-active': this.state.activePane == 1
		});
		var droneClasses = cx({
		  'btn': true,
		  'tabs__link': true,
		  'is-active': this.state.activePane == 2
		});
		return (
	        <div className="game__actions">
	          <nav className="main-actions">
	            <ul className="tabs">
	              <li className="tabs__item"><a className={subClasses} href="#" onClick={this.changePane.bind(this, 1)}>Submersible</a></li>{/*
	              */}<li><a className={droneClasses} href="#" onClick={this.changePane.bind(this, 2)}>Drone</a></li>
	            </ul>
	          </nav>
	          <ActionPane type="sub" isActive={this.state.activePane == 1} data={this.props.sub} time={this.props.time} docked={this.props.drone.docked} droneDead={this.props.drone.dead} />
	          <ActionPane type="drone" isActive={this.state.activePane == 2} data={this.props.drone} />
	          <TouchControls />
	        </div>
        );
	}
});

var TouchControls = React.createClass({
  dispatchEvent: function(type, key) {
  	var charCode = key.charCodeAt(0),
  		e = new Event(type);

    e.which = charCode;
    e.keyCode = charCode;
    e.charCode = charCode;

    window.dispatchEvent(e);
  },
  render: function() {
  	if(!isTouch()) {
  		return <div></div>;
  	}
    return (
      <div className="touch-controls">
        <div className="touch__key touch__key--up" onTouchEnd={this.dispatchEvent.bind(this, 'keyup', 'W')} onTouchStart={this.dispatchEvent.bind(this, 'keydown', 'W')}></div>
        <div className="touch__key touch__key--left" onTouchEnd={this.dispatchEvent.bind(this, 'keyup', 'A')} onTouchStart={this.dispatchEvent.bind(this, 'keydown', 'A')}></div>
        <div className="touch__key touch__key--right" onTouchEnd={this.dispatchEvent.bind(this, 'keyup', 'D')} onTouchStart={this.dispatchEvent.bind(this, 'keydown', 'D')}></div>
        <div className="touch__key touch__key--down" onTouchEnd={this.dispatchEvent.bind(this, 'keyup', 'S')} onTouchStart={this.dispatchEvent.bind(this, 'keydown', 'S')}></div>
      </div>
    );
  }
});

module.exports = MainControls;