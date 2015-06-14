var React = require("React"),
	ActionPane = require("./ActionPane.react");

var MainControls = React.createClass({
	changePane: function(e) {
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
	},
	render: function() {
		return (
	        <div className="game__actions">
	          <nav className="main-actions">
	            <ul>
	              <li><a className="btn is-active" href="#" onClick={this.changePane}>Dirigible</a></li>{/*
	              */}<li><a className="btn" href="#" onClick={this.changePane}>Drone</a></li>
	            </ul>
	          </nav>
	          <ActionPane type="sub" data={this.props.sub} time={this.props.time} />
	          <ActionPane type="drone" data={this.props.drone} />
	        </div>
        );
	}
});

module.exports = MainControls;