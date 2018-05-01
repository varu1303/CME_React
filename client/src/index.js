import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { HomePage } from './components/Home/Home';
import ProfilePage from './components/Profile/profile';
import LoginPage from './components/Login/Login';
import OrgForm from './components/Forms/OrgForm';
import Organisation from './components/Organisation/Organisation';
import DepForm from './components/Forms/DepForm';
import Department from './components/Department/Department';

const PrimaryLayout = () => (
  <div>
    <Header />
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/addOrg" component={OrgForm} />
      <Route path="/org/:id" component={Organisation} />
      <Route path="/addDep/:orgId" component={DepForm} />
      <Route path="/dep/:depId" component={Department} />
      <Redirect from="/logout" to="/" />
    </Switch>
  </div>
)



const App = () => (
  <BrowserRouter>
    <PrimaryLayout />
  </BrowserRouter>
)

ReactDOM.render(<App />, document.getElementById('start'));
