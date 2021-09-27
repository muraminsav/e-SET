// import './App.css';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignForm from './components/SignForm';
import DashboardComponent from './components/DashboardComponent';
// import auth from './secure/auth';
import { UserContext } from './context/userContext';
import Profile from './components/Profile';
import Multi from './components/Multi';
import Solo from './components/Solo';
import About from './components/About';
import { getUser } from './api/Api';

function App(props) {
  const [userInfo, setUserInfo] = useState(UserContext);
  useEffect(async () => {
    try {
      const user = await getUser(localStorage.uId);
      setUserInfo({ ...user });
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  return (
    <Container>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <div className="w-100">
          <Router>
            <Switch>
              <Route
                exact
                path="/login"
                render={(props) => <SignForm {...props} display="none" />}
              />
              <Route
                exact
                path="/"
                render={(props) => <DashboardComponent {...props} />}
              />
              <Route
                exact
                path="/signup"
                component={(props) => <SignForm {...props} display="block" />}
              />
              <Route
                exact
                path="/about"
                render={(props) => <About {...props} />}
              />
              <Route
                exact
                path="/solo"
                render={(props) => <Solo {...props} />}
              />
              <Route
                exact
                path="/multi"
                render={(props) => <Multi {...props} />}
              />
              <Route
                exact
                path="/profile"
                render={(props) => <Profile {...props} />}
              />
              <Route
                exact
                path="**"
                render={() => (
                  <h1
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: '90vh' }}
                  >
                    404 page not found
                  </h1>
                )}
              />
            </Switch>
          </Router>
        </div>
      </UserContext.Provider>
    </Container>
  );
}

export default App;
