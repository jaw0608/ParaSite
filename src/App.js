/*DEPENDENCIES */
import React, { Component } from 'react';
import { useRoutes } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

/* COMPONENTS */
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Forgot from './components/Forgot';
import ResetPassword from './components/ResetPassword';

/* SVGS */

/* CSS */
import './css/App.css';
import '../src/index.css';
import '../src/css/bootstrap.min.css';
import './css/menu.css';

class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/menu" component={Menu}/>
            <Route path="/forgot" component={Forgot}/>
            <Route path="/resetPassword" component={ResetPassword}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
