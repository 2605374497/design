import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './view/Login';
import StudentIndex from './view/student/Index'

function App() {
  return (
    <Router>
      <Switch>
        <Route component={StudentIndex} path='/student/index'></Route>
        <Route exact component={Login} path='/'></Route>
      </Switch>
    </Router>
  )
}
export default App;
