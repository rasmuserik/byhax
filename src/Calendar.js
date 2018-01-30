import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';

function eventPath(date) {
  const ymd = date
    .toISOString()
    .split(/\D/g)
    .slice(0, 3);
  return ['events'].concat(ymd);
}

function CalendarEvent({startDate, endDate, name, description, _id}) {
  return <div>
    <hr />
    <div>{startDate} - {endDate}</div>
    <div>{name}</div>
    <div>{description}</div>
  </div>
}

function Calendar(props) {
  console.log(props.events.toJS());
  return <div>{props.events.map(o => CalendarEvent(o.toJS()))}</div>
}

function mapStateToProps(state) {
  return {events: state.getIn(eventPath(new Date()), new Immutable.List())};
}
function mapDispatchToProps(state) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
