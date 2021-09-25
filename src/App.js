import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignForm from './components/SignForm';
import DashboardComponent from './components/DashboardComponent';
import Solo from './components/Solo';
import About from './components/About';
import Multi from './components/Multi';
import Profile from './components/Profile';

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
            <Route exact path="/me" component={DashboardComponent} />
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
            <Route path="/multi" component={() => <Multi />} />
            <Route path="/profile" component={() => <Profile />} />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
