var Game = require('./components/Game.react');
var StartingSaveData = require('./StartingSaveData');
var SaveUtils = require('./utils/SaveUtils');
var React = require('React');

StartingSaveData.init();

SaveUtils.getSave();

React.initializeTouchEvents(true)
React.render(<Game/>, document.body);