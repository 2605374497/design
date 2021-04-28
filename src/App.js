import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// 登录
import Login from './view/Login';
// 学生首页
import StudentIndex from './view/student/Index';
// 通知公告
import StudentAnnounce from './view/student/Announce';
// 教务动态
import StudentActive from './view/student/Active';
// 公告细节
import StudentAnnounceDetail from './view/student/AnnounceDetail';
// 动态细节
import StudentActiveDetail from './view/student/ActiveDetail';
// 公选课
import Independent from './view/student/Independent';
// 自主选课
import Course from './view/student/Course';
// 教师首页
import TeacherIndex from './view/teacher/Index';
// 教师课程
import Project from './view/teacher/project';
// 通知公告
import TeacherAnnounce from './view/teacher/Announce';
// 教务动态
import TeacherActive from './view/teacher/Active';
// 公告细节
import TeacherAnnounceDetail from './view/teacher/AnnounceDetail';
// 动态细节
import TeacherActiveDetail from './view/teacher/ActiveDetail';
// 管理员首页
import AdminIndex from './view/admin/Index';


function App() {
  return (
    <Router>
      <Switch>
        {/* 教师页面 */}
        <Route component={Project} path='/teacher/class'></Route>
        <Route component={TeacherActiveDetail} path='/teacher/active/detail'></Route>
        <Route component={TeacherAnnounceDetail} path='/teacher/announce/detail'></Route>
        <Route component={TeacherActive} path='/teacher/active'></Route>
        <Route component={TeacherAnnounce} path='/teacher/announce'></Route>
        <Route component={TeacherIndex} path='/teacher/index'></Route>
        {/* 管理员页面 */}
        <Route component={AdminIndex} path='/admin/index'></Route>
        
        {/* 学生页面 */}
        <Route component={Course} path='/student/chance/course'></Route>
        <Route component={Independent} path='/student/chance/independent'></Route>
        <Route component={StudentActiveDetail} path='/student/active/detail'></Route>
        <Route component={StudentAnnounceDetail} path='/student/announce/detail'></Route>
        <Route component={StudentActive} path='/student/active'></Route>
        <Route component={StudentAnnounce} path='/student/announce'></Route>
        <Route component={StudentIndex} path='/student/index'></Route>
        <Route exact component={Login} path='/'></Route>
      </Switch>
    </Router>
  )
}
export default App;
