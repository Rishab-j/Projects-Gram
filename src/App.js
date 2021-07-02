import { BrowserRouter, Switch, Route } from 'react-router-dom';
import DashBoard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import ProjectDetails from './components/projects/ProjectDetails';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import CreateProject from './components/projects/CreateProject';

export const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path = '/' component = { DashBoard } />
          <Route path = '/project/:id' component = { ProjectDetails } />
          <Route path = '/signin' component = { SignIn } />
          <Route path = '/signup' component = { SignUp } />
          <Route path = '/create' component = { CreateProject } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}


