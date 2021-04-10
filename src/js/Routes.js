const PrivateRoute = (route, authComp, loggedIn) => {
    return(
      <Route to={route} render={ component => {
        return loggedIn ? {authComp} : {Login}
      }}/>
    );
  }