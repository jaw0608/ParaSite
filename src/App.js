/*DEPENDENCIES */
import React from 'react';
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
import Game from './components/Game';

/* SVGS */

/* CSS */
import './css/App.css';
import '../src/css/index.css';
import '../src/css/bootstrap/bootstrap.min.css';
import './css/Menu.css';
import './css/Game.css';
import './css/Login.css';

const App = () => {
  return(
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/menu" component={Menu}/>
            <Route path="/forgot" component={Forgot}/>
            <Route path="/resetPassword" component={ResetPassword}/>
            <Route path='/game' component={Game}/>
          </Switch>
        </Router>
      </div>
  )
}

export default App;