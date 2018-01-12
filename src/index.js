import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {AppRegistry} from 'react-native';

AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  rootTag: document.getElementById('root')
});
registerServiceWorker();
