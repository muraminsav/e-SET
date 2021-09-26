import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SignForm from './components/SignForm';
import DashboardComponent from './components/DashboardComponent';

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
              exact
              path="/signup"
              component={() => <SignForm display="block" />}
            />
            <Route
              exact
              path="/login"
              component={() => <SignForm display="none" />}
            />
          </Switch>
        </Router>
      </div>
    </Container>
  );
}

export default App;
