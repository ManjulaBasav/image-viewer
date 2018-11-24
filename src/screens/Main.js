import React, {Component} from 'react';
import Home from './home/Home';
import Login from './login/Login';
import Profile from './profile/Profile';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Main extends Component {

    constructor(props) {
        super (props);
        this.baseUrl = "https://api.instagram.com/v1/users/self/";
      }

    render() {
        return (
            <Router>
                <div>
                    <Route exact path='/' render={(props) => <Login {...props} baseUrl = {this.baseUrl}/>} />
                    <Route path='/home' render={(props) => <Home {...props}  baseUrl = {this.baseUrl}/>}/>
                    <Route path='/profile' render={(props) => <Profile {...props} baseUrl = {this.baseUrl}/>} />
                </div>
            </Router>
        )
    }
}

export default Main;