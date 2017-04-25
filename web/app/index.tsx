import { render } from 'inferno';
import routes from './router';
import { Provider } from 'inferno-redux';
import store from './store';
import "./reset.css";
import "./global.css";

const container = document.getElementById('app');

render(
  <Provider store={store}>{routes}</Provider>, container
);
