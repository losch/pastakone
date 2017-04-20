import { render } from 'inferno';
import routes from './router';
import "./reset.css";
import "./global.css";

const container = document.getElementById('app');

render(routes, container);
