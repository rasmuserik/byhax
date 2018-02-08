import React from 'react';
import Immutable from 'immutable';
import {connect} from 'react-redux';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import {withStyles} from 'material-ui/styles';
import _ from 'lodash';
import {__} from './i18n';

const styles = theme => ({
  calDate: {
    marginLeft: 16
  },
  sunday: {
    color: 'red'
  },
  center: {
    textAlign: 'center'
  },
  paper: {
    padding: 16,
    marginTop: 16,
    color: theme.palette.text.secondary
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
  return (
    <Paper key={_id} className={classes.paper}>
      {startDate.slice(11, 16) + ' '}
      <strong>{name}</strong>
      <div className={classes.truncate}>{description}</div>
    </Paper>
  );
}

function Calendar({events, classes}) {
  events = events.toJS();
  if (!events.length) {
    return <div />;
  }
  const dates = Object.values(events).map(o => o.startDate);
  const firstDate = _.min(dates);
  const lastDate = _.max(dates);
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
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let date = new Date(firstDate.slice(0, 10));
  let prevMonth = '';
  let result = [];
  let dateString;
  do {
    const nextDate = new Date(24 * 60 * 60 * 1000 + +date);

    const month = months[date.getMonth()];
    const weekDay = days[date.getDay()];

    dateString = date.toISOString();
    const nextDateString = nextDate.toISOString();
    const dayEvents = _.sortBy(
      events.filter(
        o => o.startDate >= dateString && o.startDate <= nextDateString
      ),
      ['startDate']
    );
    result.push(
      <Grid item key={dateString} xs={2} className={classes.calDate}>
        <h2>
          {' '}
          <big>{date.getDate()}</big> <br />
          <small className={date.getDay() ? '' : classes.sunday}>
            {__(weekDay)}
          </small>
        </h2>
      </Grid>
    );
    result.push(
      <Grid item key={dateString + 'events'} xs={8}>
        {dayEvents.map(event => CalendarEvent({event, classes}))}
      </Grid>
    );
    result = result.concat();

    date = nextDate;
  } while (dateString <= lastDate);

  return (
    <Grid container spacing={24}>
      {result}
    </Grid>
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

  return {events};
}
function mapDispatchToProps(state) {
  return {};
}
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Calendar)
);
