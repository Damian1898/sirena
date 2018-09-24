import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Layout from './src/containers/Layout';
import Routes from './src/routes';


render(
    (
        <Layout>
            <BrowserRouter>
                <Switch>
                    <Routes />
                </Switch>
            </BrowserRouter>
        </Layout>
    ),
    document.getElementById('root')
);
