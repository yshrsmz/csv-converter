'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import mui from 'material-ui';

window.React = React;
injectTapEventPlugin();

let Content = React.createClass({
    render() {
        return (
            <div><h1>This is React generated contents.</h1></div>
        );
    }
});

React.render(
    <Content/>,
    document.getElementById('content')
);
