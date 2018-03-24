import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import {withStyles} from 'material-ui/styles';
import _ from 'lodash';
import {__} from './i18n';

const styles = theme => ({
  center: {
    textAlign: 'center'
  },
  calMonth: {
    fontSize: 12,
    fontWeight: 'normal'
  },
  calDay: {
    fontSize: 36
  },
  calDayOfWeek: {
    fontSize: 24
  },
  calDate: {
    float: 'left',
    marginLeft: 16
  },
  pastEvent: {
    color: '#aaa'
  },
  futureEvent: {
    color: '#333'
  },
  dayHeader: {
    display: 'inline-block',
    float: 'left',
    marginLeft: 16
  },
  sunday: {
    color: 'red'
  },
  event: {
    padding: 16,
    marginTop: 16,
    marginLeft: '25%',
    width: '70%'
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});
function eventPath(date) {
  const ymd = date
    .toISOString()
    .split(/\D/g)
    .slice(0, 3);
  return ['events'].concat(ymd);
}

function CalendarEvent({
  classes,
  event: {startDate, endDate, name, description, _id}
}) {
  const today = new Date().toISOString();
  return (
    <Paper
      key={_id}
      className={
        classes.event +
        ' ' +
        (startDate < today ? classes.pastEvent : classes.futureEvent)
      }>
      {startDate.slice(11, 16) + ' '}
      <strong>{name}</strong>
      <div className={classes.truncate}>{description}</div>
    </Paper>
  );
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];
function dayHeader({classes, date}) {
  const month = months[date.getMonth()];
  const isodate = date.toISOString().slice(0, 10);
  const weekDay = days[date.getDay()];
  return (
    <h2 className={classes.dayHeader}>
      {' '}
      <div className={classes.calMonth}>{__(month)}</div>
      <div className={classes.calDay}>{date.getDate()}</div>
      <div
        className={
          classes.calDayOfWeek +
          ' ' +
          (date.getDay() ? '' : classes.sunday)
        }>
        {__(weekDay)}
      </div>
    </h2>
  );
}

function CalendarEvents({events, classes}) {
  events = events.toJS();
  const result = [];
  let prevDay;
  for (const event of events) {
    const day = event.startDate.slice(0, 10);
    if (prevDay !== day) {
      prevDay = day;
      result.push(<br />);
      result.push(<br />);
      result.push(dayHeader({classes, date: new Date(day)}));
    }
    result.push(CalendarEvent({classes, event}));
  }
  /*
  if (!events.length) {
    return <div />;
  }
  const dates = Object.values(events).map(o => o.startDate);
  const firstDate = _.min(dates);
  const lastDate = _.max(dates);


  let date = new Date(firstDate.slice(0, 10));
  //let prevMonth = '';
  let result = [];
  let dateString;
  const calendarEvent = (event) => CalendarEvent({event, classes});
  let nextDateString;
  const eventsFilter = o => o.startDate >= dateString && o.startDate <= nextDateString
  do {
    const nextDate = new Date(24 * 60 * 60 * 1000 + +date);


    dateString = date.toISOString();
    nextDateString = nextDate.toISOString();
    const dayEvents = _.sortBy(
      events.filter(eventsFilter
      ),
      ['startDate']
    );
    result.push(
      dayHeader({classes, date})
    );
    result.push(
      <Grid item key={dateString + 'events'} xs={8}>
        {dayEvents.map(calendarEvent)}
      </Grid>

    );
    result = result.concat();

    date = nextDate;
  } while (dateString <= lastDate);
  */

  return result;
}
function Calendar({events, classes}) {
  return (
    <div>
      Februar
      <h1 className={classes.center}>Marts</h1>
      {CalendarEvents({events, classes})}
    </div>
  );
}

function mapStateToProps(state) {
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  let events = new Immutable.List();
  for (let i = -10; i < 20; ++i) {
    events = events.concat(
      state.getIn(
        eventPath(new Date(now + i * day)),
        new Immutable.List()
      )
    );
  }
  console.log(events.toJS());
  return {events};
}
function mapDispatchToProps(state) {
  return {};
}
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Calendar)
);
