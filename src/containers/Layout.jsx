import React, { Component } from 'react';
import { Switch } from 'react-router-dom'
import Routes from '../routes';

class LayoutComponent extends Component {
    render() {
        return (
            <Switch>
                <Routes/>
            </Switch>
        );
    }
}

export default LayoutComponent;