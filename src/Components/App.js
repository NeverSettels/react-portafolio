import React from 'react';
import '../App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from './home/Landing'
import Header from "./Header"
import Main from './profile/Main';


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/profile">
          <Main />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
