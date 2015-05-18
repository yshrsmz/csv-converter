'use strict';

import ipc from 'ipc';

import React from 'react';

import FileSelector from '../FileSelector';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this._onSourceFileSelected = this._onSourceFileSelected.bind(this);

        this.state = {
            sourcePath: ''
        };
    }
    render() {
        return (
            <section className="content-index container-fluid">
                <div className="row">
                    <FileSelector
                        className="col-xs-12 col-md-12"
                        acceptFileType=".csv"
                        onFileSelected={this._onSourceFileSelected}/>
                </div>
            </section>
        );
    }

    _onSourceFileSelected(files) {
        console.log(files[0].path);

        this.setState({ sourcePath: files[0].path });
    }
}
