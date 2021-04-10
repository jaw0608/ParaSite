/*DEPENDENCIES */
import React, { Component } from 'react';
import { useRoutes } from 'hookrouter';
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
import Options from './components/Options';
import ResetPassword from './components/ResetPassword';

/* SVGS */

/* CSS */
import './App.css';
import '../src/index.css';
import '../src/css/bootstrap.min.css';
import './css/menu.css';

// export default function App() {
//   const routes = {
//     "/": () => <Login />,
//     "/register": () => <Register />,
//     "/menu": () => <Menu />,
//     "/forgot": () => <Forgot />,
//     "resetPassword": () => <ResetPassword />
//   }
//   const routeResult = useRoutes(routes);
//   return routeResult; 
// }

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
            <Route path="/options" component={Options}/>
            <Route path="/resetPassword" component={ResetPassword}/>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
