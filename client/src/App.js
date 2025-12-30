import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Layout from './common/Layout';
import Home from './Home';
import Todos from './todos/Todos';
import Posts from './posts/Posts';
import Users from './users/Users';
import Photos from './photos/Photos';
import Nav from './Nav';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/nav' element={<Nav />} />
          <Route path = '/' element = {<Layout />}>
            <Route path = '/' element={<Home />} />   
            <Route path = '/todos' element = {<Todos/>}/>
            <Route path = '/posts' element = {<Posts/>}/>
            <Route path = '/users' element = {<Users/>}/>
            <Route path = '/photos' element = {<Photos/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
