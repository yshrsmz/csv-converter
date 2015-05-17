'use strict';

import React from 'react';
import Router from 'react-router';

import Index from './components/Index';

let Route = Router.Route;
let NotFoundRoute = Router.NotFoundRoute;
let DefaultRoute = Router.DefaultRoute;
let Link = Router.Link;

export default {
    run(App) {
        let Routes = (
            <Route handler={App} path="/">
                <Route name="top" handler={Index}/>
                <DefaultRoute handler={Index}/>
            </Route>
        );

        Router.run(Routes, (Handler) => {
            React.render(<Handler/>, document.getElementById('app'));
        })
    }
}




