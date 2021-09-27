// import './App.css';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignForm from './components/SignForm';
import DashboardComponent from './components/DashboardComponent';
import auth from './secure/auth';
import { UserContext } from './context/userContext';
import Profile from './components/Profile';
import Multi from './components/Multi';
import Solo from './components/Solo';
import About from './components/About';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  const [userInfo, setUserInfo] = useState('');
  return (
    <Container>
      <div className="w-100">
        <Router>
          <Switch>
            <UserContext.Provider value={{ userInfo, setUserInfo }}>
              <Route
                exact
                path="/"
                render={(props) => (
                  <SignForm
                    {...props}
                    display="none"
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )}
              />
              <Route
                exact
                path="/me"
                render={() => (
                  <DashboardComponent
                    setIsAuthenticated={setIsAuthenticated}
                    isAuthenticated={isAuthenticated}
                  />
                )}
              />
              <Route exact path="/about" component={() => <About />} />
              <Route exact path="/solo" component={() => <Solo />} />
              <Route exact path="/multi" component={() => <Multi />} />
              <Route exact path="/profile" component={() => <Profile />} />
            </UserContext.Provider>
            <Route
              exact
              path="/signup"
              render={(props) => (
                <SignForm
                  {...props}
                  display="block"
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            />
            <Route
              exact
              path="**"
              render={(props) => (
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
    </Container>
  );
}

export default App;
