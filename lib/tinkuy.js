const fetch = require('node-fetch');

const syncFrequency = 5 * 60 * 1000;

exports.tinkuy = async mycrud => {
  tinkuySync(mycrud);
  setInterval(() => tinkuySync(mycrud), syncFrequency)
}
async function tinkuySync(mycrud) {
  // rate limit tinkuy sync, across restarts of server
  let lastSync = await mycrud.get('tinkuy', '_server', 'lastEventSync', '1970-01-01')
  lastSync = +(new Date(lastSync.data))
  if( lastSync > Date.now() - syncFrequency) {
    console.log('tinkuy-sync skipped');
    return;
  }
  mycrud.put('tinkuy', '_server', 'lastEventSync', new Date().toISOString());

  console.log('tinkuy-sync started');
  console.time('tinkuy-sync');

  let eventsRaw;
  try {
    eventsRaw = require('./events.json');
  } catch(e) {
    eventsRaw = await (await fetch('https://www.tinkuy.dk/events.json')).json();
  }

  const events = eventsRaw.map(o => {
    const startDate =
      +new Date(o.startdate) +
      +new Date(o.starttime) -
      +new Date('2000-01-01');
    return {
      _id: `${o.startdate}_${o.id}`,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(
        startDate + o.duration * 60 * 1000
      ).toISOString(),
      name: o.name,
      description: o.description,
      confirmed: o.confirmed,
      url: `https://www.tinkuy.dk/events/${o.id}`
    };
  });

  for(const event of events) {
    let prevEvent = JSON.parse((await mycrud.get('tinkuy', 'events', event._id, '{}')).data);
    for(k in event) {
      if(prevEvent[k] !== event[k]) {
        await mycrud.put('tinkuy', 'events', event._id, JSON.stringify(event));
        break;
      }
    }
  }
  console.timeEnd('tinkuy-sync');
};

