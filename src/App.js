import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// 登录
import Login from './view/Login';
// 学生首页
import StudentIndex from './view/student/Index';
// 通知公告
import Announce from './view/student/Announce';
// 教务动态
import Active from './view/student/Active';
// 公告细节
import AnnounceDetail from './view/student/AnnounceDetail';
// 动态细节
import ActiveDetail from './view/student/ActiveDetail';
// 公选课
import Independent from './view/student/Independent';
// 自主选课
import Course from './view/student/Course';
// 教师首页
import TeacherIndex from './view/teacher/Index';
// 教师课程
import Project from './view/teacher/project';
// 管理员首页
import AdminIndex from './view/admin/Index';

function App() {
  return (
    <Router>
      <Switch>
        {/* 教师页面 */}
        <Route component={Project} path='/teacher/class'></Route>
        <Route component={TeacherIndex} path='/teacher/index'></Route>
        {/* 管理员页面 */}
        <Route component={AdminIndex} path='/admin/index'></Route>
        {/* 学生页面 */}
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
