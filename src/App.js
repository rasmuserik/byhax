import React from 'react';
import logo from './logo.svg';
import {__} from './i18n';
import Calendar from './Calendar';

function App(props) {
  return (
    <div>
      <img
        src={logo}
        style={{
          width: 64,
          height: 64
        }}
      />
      <div>{__('ByHax (under development)')}</div>
      <Calendar />
    </div>
  );
}

export default App;
