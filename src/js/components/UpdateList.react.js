var React = require('React');
var UpdateItem = require("./UpdateItem.react");

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

module.exports = UpdateList;