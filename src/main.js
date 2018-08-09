import { stateRouter } from './router';
import App from './components/App.html';

require('../public/global.css');

stateRouter.addState({
  name: 'app',
  route: '',
  template: App
});

stateRouter.evaluateCurrentRoute('app');
