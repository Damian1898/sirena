import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login';
import Home from '../components/Home';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path='/login' component={Login} />
                <Route path='/home' component={Home} />
            </div>
        );
    }
}
