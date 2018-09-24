import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Login from '../components/Login';
import ListMessages from '../components/ListMessages';
import Message from '../components/Message';

export default class Routes extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Login} />
                <Route path='/login' component={Login} />
                <Route path='/home' component={ListMessages} />
                <Route path='/read/:id' component={Message} />
            </div>
        );
    }
}
