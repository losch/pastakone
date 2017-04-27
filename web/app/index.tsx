import { render } from 'inferno';
import routes from './router';
import { Provider } from 'inferno-redux';
import store from './store';
import {loadTheme} from './components/CodeEditor/themes';
import "./reset.css";
import "./global.css";

const container = document.getElementById('app');

// Preload theme
const theme = store.getState().settings.theme || 'monokai';
loadTheme(theme, () => {});

// Offblast!
render(<Provider store={store}>{routes}</Provider>, container);
