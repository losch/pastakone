import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';
import HomeView from './HomeView';
import PastaView from './PastaView';
import Layout from './components/Layout';

const browserHistory = createBrowserHistory();

function NoMatch() {
  return <div>404 :-(</div>;
}

const routes = (
  <Router history={ browserHistory }>
    <Route component={ Layout }>
      <IndexRoute component={ HomeView }/>
      <Route path="/pastas/:id" component={ PastaView }/>
      <Route path="*" component={ NoMatch }/>
    </Route>
  </Router>
);

export default routes;
