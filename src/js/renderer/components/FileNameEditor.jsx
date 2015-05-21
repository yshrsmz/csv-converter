'use strict';

import React from 'react';
import mui from 'material-ui';

export default class FileNameEditor extends React.Component {
    constructor(props) {
        super(props);

        this._onFileNameChanged = this._onFileNameChanged.bind(this);
        this._onResetClicked = this._onResetClicked.bind(this);

        this.state = {
            fileName: this.props.initialFileName
        };
    }

    static get propTypes() {
        return {
            initialFileName: React.PropTypes.string,
            title: React.PropTypes.string,
            hint: React.PropTypes.string,
            onFileNameChanged: React.PropTypes.func.isRequired
        };
    }

    static get defaultProps() {
        return {
            initialFileName: '',
            title: 'File Name',
            hint: ''
        }
    }

    render() {
        let textValue = null;
        if (this.state.fileName && this.state.fileName.length > 0) {
            textValue = this.state.fileName;
        }

        return (
            <div className={`fileNameEditor ${this.props.className}`}>
                <div className="row">
                    <div className="col-xs-9">
                        <mui.TextField
                            className="fileNameEditor__text"
                            floatingLabelText="edit output file name"
                            hint="Column names can be used."
                            onChange={this._onFileNameChanged}
                            value={textValue}/>
                    </div>
                    <div className="col-xs-3 col-align-center">
                        <mui.FlatButton
                            secondary={true}
                            label="Reset"
                            onClick={this._onResetClicked}/>
                    </div>
                </div>
            </div>
        );
    }

    _onFileNameChanged(e) {
        this._updateFileName(e.target.value);
    }

    _onResetClicked(e) {
        this._updateFileName(this.props.initialFileName);
    }

    _updateFileName(newValue) {
        if (newValue != this.state.fileName) {
            this.setState({ fileName: newValue });
            this.props.onFileNameChanged(newValue);
        }
    }

    getFileName() {
        return this.state.fileName;
    }
}
