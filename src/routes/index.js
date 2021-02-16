import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Todo from '../screens/Todo';
import Fallback from './fallback';
import NotFound from './notfound';
import Login from '../screens/Login';

const MainRoute = () => {
  return (
    <Router>
      <Suspense fallback={<Fallback />}>
        <Switch>
          <Route path='/' exact component={Todo} />
          <Route path='/login' component={Login} />
          <Route path='*' component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default MainRoute;
