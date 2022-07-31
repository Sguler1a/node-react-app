import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import Landing from '../Landing'
import Search from '../Search'
import MyPage from '../MyPage'
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/reviews" exact component={Home} />
      <Route path='/mypage' exact component={MyPage}/>
      <Route path='/search' exact component={Search}/>
      </Switch>
    </Router>
  );
}