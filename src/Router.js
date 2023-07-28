/* eslint-disable */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DPChat from './routes/DPChat';
import Loading from './routes/Loading';
import Feedback from './routes/Feedback';
import Header from '../src/components/Header';
import ControlGroup from '../src/components/ControlGroup';
import Footer from './components/Header/Footer';
import BandwidthTest from './BandwidthTest';

const BANDWITH_TEST_ACTIVE = process.env.REACT_APP_BANDWIDTH_TEST_ACTIVE === 'true';

const App = () => (
  <Router>
    <Header />
    <ControlGroup />
    <Switch>
      <Route path='/video'>
        <DPChat />
      </Route>
      <Route path='/feedback'>
        <Feedback />
      </Route>
      <Route path='/'>
        <Loading />
      </Route>
    </Switch>
    <Footer />
    {BANDWITH_TEST_ACTIVE && <BandwidthTest /> }
  </Router>
);

export default App;
