import logo from './logo.svg';
import './styles/App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './view/Login';
import About from './view/About'

function App() {
  return (
    <Router>
      <Switch>
        <Route component={About} path='/About'></Route>
        <Route exact component={Login} path='/'></Route>
      </Switch>
    </Router>
  )
}
export default App;
