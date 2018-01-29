import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';

function Calendar(props) {
  console.log(props.events.toJS());
  return <div>Calendar</div>;
}

function mapStateToProps(state) {
  const ymd = new Date()
    .toISOString()
    .split(/\D/g)
    .slice(0, 3);
  const path = ['events'].concat(ymd);
  return {events: state.getIn(path, new Immutable.List())};
}
function mapDispatchToProps(state) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
