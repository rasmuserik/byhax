import PouchDB from 'pouchdb';

export const tinkuy = new PouchDB('tinkuy');
PouchDB.replicate('https://api.byhax.com/tinkuy', 'tinkuy');
console.log(tinkuy);
