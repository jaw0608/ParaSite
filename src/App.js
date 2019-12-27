/*DEPENDENCIES */
import  React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

/* COMPONENTS */
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';

/* SVGS */

/* CSS */
import './App.css';
import '../src/css/bootstrap.min.css';

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
            <Route path="/menu" authComp={Menu} loggedIn={this.state.loggedIn}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
