'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Router from 'react-router';
import App from './renderer/components/App';
import Routes from './renderer/Routes';

window.React = React;
injectTapEventPlugin();

document.addEventListener('DOMContentLoaded', () => {
    Routes.run(App);
});
