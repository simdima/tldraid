import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ErrorNotification from './components/ErrorNotification';
import Header from './components/Header';
import Loader from './components/molecules/Loader';
import Home from './pages/Home';

const Settings = lazy(() => import('./pages/Settings'));

const App = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <BrowserRouter>
      <header className="flex-none">
        <Header />
      </header>
      <main className="flex flex-grow flex-col">
        <Suspense fallback={<Loader size="xl" />}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/settings" component={Settings} />
          </Switch>
        </Suspense>
      </main>
      <ErrorNotification />
    </BrowserRouter>
  );
};

export default App;
