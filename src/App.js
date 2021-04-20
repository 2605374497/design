import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './view/Login';
import StudentIndex from './view/student/Index';
import Announce from './view/student/Announce';
import Active from './view/student/Active';
import AnnounceDetail from './view/student/AnnounceDetail';
import ActiveDetail from './view/student/ActiveDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={ActiveDetail} path='/student/active/detail'></Route>
        <Route component={AnnounceDetail} path='/student/announce/detail'></Route>
        <Route component={Active} path='/student/active'></Route>
        <Route component={Announce} path='/student/announce'></Route>
        <Route component={StudentIndex} path='/student/index'></Route>
        <Route exact component={Login} path='/'></Route>
      </Switch>
    </Router>
  )
}
export default App;
