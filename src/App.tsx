import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ErrorToast from './components/ErrorToast';
import Header from './components/Header';
import Home from './pages/Home';
import Settings from './pages/Settings';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <BrowserRouter>
      <header className='h-1/4 flex-none'>
        <Header />
      </header>
      <main className='flex flex-col flex-grow'>
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
      <ErrorToast />
    </BrowserRouter>
  );
};

export default App;
