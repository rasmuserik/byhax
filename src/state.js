import {createStore} from 'redux';
import Immutable from 'immutable';
import PouchDB from 'pouchdb';

const reducers = {};
reducers.eventObjects = (state, action) => {
  for (const {doc} of action.objs) {
    const path = ['events'].concat(
      doc.startDate.split(/\D/g).slice(0, 3)
    );
    const events = state
      .getIn(path, new Immutable.List())
      .filter(o => o.get('_id') !== doc._id)
      .push(Immutable.fromJS(doc));
    state = state.setIn(path, events);
  }
  return state;
};

const reducer = (state, action) =>
  reducers[action.type] ? reducers[action.type](state, action) : state;

export const store = createStore(
  reducer,
  new Immutable.fromJS({
    events: {}
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

const tinkuy = new PouchDB('tinkuy');
(async () => {
  try {
    await PouchDB.replicate('https://api.byhax.com/tinkuy', 'tinkuy');
  } catch (e) {
    console.error(e);
  }
  tinkuy
    .changes({since: 'now', live: true, include_docs: true})
    .on('change', ({doc}) =>
      store.dispatch({type: 'eventObjects', objs: [doc]})
    );
  const docs = await tinkuy.allDocs({include_docs: true});
  store.dispatch({type: 'eventObjects', objs: docs.rows});
})();
