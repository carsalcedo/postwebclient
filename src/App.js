import React from 'react'
import {Container} from '@material-ui/core';
import './index.css'
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Router>
      <Container maxWidth='xl' component='main'>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={() => <Redirect to='/posts' />}/>
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
      <Footer/>
    </Router>
    //quede en la hora 6:11:00
  )
}

export default App