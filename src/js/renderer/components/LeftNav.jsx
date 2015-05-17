'use strict';

import React from 'react';
import mui from 'material-ui';

let menuItems = [
    {route: 'top', text: 'Top'}
];

export default class LeftNav extends React.Component {
    constructor() {
        super();

        this._onLeftNavChange = this._onLeftNavChange.bind(this);
    }

    render() {
        return (
            <mui.LeftNav
                ref="leftNav"
                docked={false}
                isInitiallyOpen={false}
                menuItems={menuItems}
                onChange={this._onLeftNavChange}/>
        );
    }

    _onLeftNavChange(e, key, payload) {
        this.context.router.transitionTo(payload.route);
    }
}
