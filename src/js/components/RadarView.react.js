var React = require("React"),
droneInit = require("./Drone/init");

var RadarView = React.createClass({

	componentDidMount: function() {
		if(this.props.type == "drone")
	  		new droneInit(320, 256, Phaser.AUTO, 'game')
	},

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
});

module.exports = RadarView;