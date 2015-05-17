'use strict';

import React from 'react';
import mui from 'material-ui';
import Router from 'react-router';

import LeftNav from './LeftNav';
console.log('app init');
export default class App extends React.Component {
    render() {
        console.log('app render');
        return (

            <mui.AppCanvas predefinedLayout={1}>
                <mui.AppBar
                    title="TSV Converter"
                    zDepth={0}>
                </mui.AppBar>

                <LeftNav ref="leftNav"/>

                <div className="content">

                    <mui.Toolbar className="toolbar">
                        <mui.ToolbarGroup key={0} float="left">
                            <div>toolbar</div>
                        </mui.ToolbarGroup>
                    </mui.Toolbar>

                    <Router.RouteHandler/>

                </div>

            </mui.AppCanvas>
        );
    }
}
