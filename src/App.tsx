import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Settings from './pages/Settings';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        <Switch>
          <Route
            path='/'
            exact
            component={Home}
          />
          <Route
            path='/settings'
            component={Settings}
          />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
