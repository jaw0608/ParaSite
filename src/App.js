/*DEPENDENCIES */
import  React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

/* COMPONENTS */
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import Menu from '../src/components/Menu';

/* SVGS */

/* CSS */
import './App.css';
import '../src/index.css';
import '../src/css/bootstrap.min.css';

class App extends Component{
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/menu" component={Menu}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
