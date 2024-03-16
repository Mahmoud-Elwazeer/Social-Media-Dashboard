import './App.css';
import { HashRouter, Route, Router, Switch } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
    <Register/>
      {/* <Router>
        <switch>
          <Route exact path='/register'>
            <Register/>
          </Route>
          <Route exact path='/login'>
            <Login/>
          </Route>
        </switch>
      </Router> */}
    </div>
  );
}

export default App;
