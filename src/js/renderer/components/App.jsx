'use strict';

import React from 'react';
import mui from 'material-ui';
import Router from 'react-router';

import LeftNav from './LeftNav';

export default class App extends React.Component {
    constructor() {
        super();

        this._onMenuIconButtonTouchTap = this._onMenuIconButtonTouchTap.bind(this);

    }
    render() {
        return (

            <mui.AppCanvas predefinedLayout={1}>
                <mui.AppBar
                    className="mui-dark-theme"
                    title="CSV Converter"
                    zDepth={0}
                    onMenuIconButtonTouchTap={this._onMenuIconButtonTouchTap}>
                </mui.AppBar>

                <LeftNav ref="leftNav"/>

                <div className="content-root">

                    <Router.RouteHandler/>

                </div>

            </mui.AppCanvas>
        );
    }

    _onMenuIconButtonTouchTap() {
        this.refs.leftNav.toggle();
    }
}
