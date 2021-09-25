import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignForm from './components/SignForm';
import DashboardComponent from './components/DashboardComponent';
import Solo from './components/Solo';
import About from './components/About';
import Multi from './components/Multi';
import Profile from './components/Profile';
import ProtectedRoutes from './secure/ProtectedRoutes';

function App() {
  return (
    <Container>
      <div className="w-100">
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <SignForm display="none" />}
            />
            <ProtectedRoutes exact path="/me" component={DashboardComponent} />
            <Route
              path="/signup"
              component={() => <SignForm display="block" />}
            />
            <Route
              path="/login"
              component={() => <SignForm display="none" />}
            />
            <Route exact path="/about" component={() => <About />} />
            <Route exact path="/solo" component={() => <Solo />} />
            <ProtectedRoutes path="/multi" component={() => <Multi />} />
            <ProtectedRoutes path="/profile" component={() => <Profile />} />
            <Route path="**" component={() => <h1>404 page not found</h1>} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
