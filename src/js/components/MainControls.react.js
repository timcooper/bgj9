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
	changePane: function(e) {
		var $elem = $(e.target);

		$elem.addClass("is-active");
		$elem.parent().siblings().children().removeClass("is-active");
		if(e.target.innerHTML == "Submersible") {
			$('.game__action-panel--sub').addClass("is-active");
			$('.game__action-panel--drone').removeClass("is-active");
		}else{
			$('.game__action-panel--sub').removeClass("is-active");
			$('.game__action-panel--drone').addClass("is-active");
		}
	},
	render: function() {
		return (
	        <div className="game__actions">
	          <nav className="main-actions">
	            <ul className="tabs">
	              <li className="tabs__item"><a className="btn is-active tabs__link" href="#" onClick={this.changePane}>Submersible</a></li>{/*
	              */}<li><a className="btn tabs__link" href="#" onClick={this.changePane}>Drone</a></li>
	            </ul>
	          </nav>
	          <ActionPane type="sub" data={this.props.sub} time={this.props.time} docked={this.props.drone.docked} droneDead={this.props.drone.dead} />
	          <ActionPane type="drone" data={this.props.drone} />
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