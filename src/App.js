/*DEPENDENCIES */
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

/* COMPONENTS */
import Login from './components/Login';
import Register from './components/Register';
import Menu from './components/Menu';
import Forgot from './components/Forgot';
import ResetPassword from './components/ResetPassword';
import Game from './components/Game';
import { PublicRoute, ProtectedRoute } from './components/misc/Routes';
import NotFoundPage from './components/NotFoundPage'

/* SVGS */

/* CSS */
import './css/App.css';
import '../src/css/index.css';
import '../src/css/bootstrap/bootstrap.min.css';
import './css/Menu.css';
import './css/Game.css';
import './css/Login.css';

const App = () => {
  const [state, setState] = useState({ user: null, isAuthenticated: false });

  return(
    <div className="App">
        <Router>
          <Switch>
            <PublicRoute exact path="/" component={() => <Login state={state} setState={setState}/>} />
            <PublicRoute path="/register" component={Register} />
            <PublicRoute path="/forgot" component={Forgot}/>
            <PublicRoute path="/resetPassword" component={ResetPassword}/>
            <ProtectedRoute state={state} setState={setState} path="/menu" component={Menu} />
            <ProtectedRoute state={state} setState={setState} path='/game' component={Game} />
            <PublicRoute path='/*' component={NotFoundPage}/>
          </Switch>
        </Router>
      </div>
  )

}

export default App;
