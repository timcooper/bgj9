var React = require('React');

var UpdateItem = React.createClass({
	render: function() {
		return (
            <li className="game__update-item">{this.props.message}</li>
        );
	}
});

module.exports = UpdateItem;