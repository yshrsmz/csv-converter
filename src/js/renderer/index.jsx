'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from './renderer/components/App';
import Routes from './renderer/Routes';

window.React = React;
injectTapEventPlugin();


React.render(Routes, function(Handler) {
    React.render(<Handler/>, document.getElementById('content'));
});
