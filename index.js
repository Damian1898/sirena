import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Layout from './src/containers/Layout';


render(
    (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    ),
    document.getElementById('root')
);
