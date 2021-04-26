import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './view/Login';
import StudentIndex from './view/student/Index';
import Announce from './view/student/Announce';
import Active from './view/student/Active';
import AnnounceDetail from './view/student/AnnounceDetail';
import ActiveDetail from './view/student/ActiveDetail';
import Independent from './view/student/Independent';
import Course from './view/student/Course';
import TeacherIndex from './view/teacher/Index';
import AdminIndex from './view/admin/Index';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={TeacherIndex} path='/teacher/index'></Route>
        <Route component={AdminIndex} path='/admin/index'></Route>
        <Route component={Course} path='/student/chance/course'></Route>
        <Route component={Independent} path='/student/chance/independent'></Route>
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
