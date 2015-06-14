/**
 * Copyright 2013-2014 Atlassian, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 */

var Drone = require('./Drone/entities/drone');

function getStateFromStores() {
  return Drone.getData();
}

var React = require('React'),
  UpdateList = require("./UpdateList.react"),
  MainControls = require("./MainControls.react"),
  RadarView = require("./RadarView.react");

var UI = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    Drone.addChangeListener(this._onChange);
  },

  render: function() {
    var drone = this.state.drone;
    var messages = this.state.messages;
    var sub = this.state.sub;
    var time = this.state.time;

    return (
      <div className="game">
        <UpdateList messages={messages} />
        <MainControls drone={drone} sub={sub} time={time} />
        <RadarView type="drone" />
        <RadarView type="sub" />
      </div>
    );

  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = UI;