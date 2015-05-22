'use strict';

import ipc from 'ipc';

import React from 'react';
import mui from 'material-ui';

import consts from '../../common/consts';

class FileSelector extends React.Component {

    constructor(props) {
        super(props);

        this._onButtonClick = this._onButtonClick.bind(this);
        this._onTextChanged = this._onTextChanged.bind(this);

        this.state = {
            targetPath: ''
        };

        this._handleEvents();
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string,
            hint: React.PropTypes.string,
            className: React.PropTypes.string,
            acceptExtensions: React.PropTypes.array,
            onFileSelected: React.PropTypes.func.isRequired
        }
    }

    static get defaultProps() {
        return {
            title: 'Choose File',
            hint: 'Absolute path to the target file',
            className: '',
            acceptExtensions: []
        }
    }

    render() {
        let textValue = null;
        if (this.state.targetPath && this.state.targetPath.length > 0) {
            textValue = this.state.targetPath;
        }
        return (
            <div className={this.props.className}>
                <div className="row">
                    <div className="col-xs-9">
                        <mui.TextField
                            ref="targetFileName"
                            hintText={this.props.hint}
                            floatingLabelText={this.props.title}
                            className="fileSelector__text"
                            onChange={this._onTextChanged}
                            value={textValue}/>
                    </div>
                    <div className="col-xs-3 col-align-center">
                        <mui.RaisedButton
                            secondary={true}
                            label="Select File"
                            onClick={this._onButtonClick}/>
                    </div>
                </div>
            </div>
        );
    }

    _handleEvents() {
        ipc.on(consts.ipc.pick.file.reply, (filePaths) => {
            if (filePaths && filePaths.length > 0) {
                this._updateFilePath(filePaths[0]);
            }
        });
    }

    _onButtonClick() {
        console.log('_onButtonClick: ', this.props.acceptExtensions);
        ipc.send(consts.ipc.pick.file.send, this.props.acceptExtensions);
    }

    _onTextChanged(e) {
        this._updateFilePath(e.target.value);
    }

    _updateFilePath(newValue) {
        if (newValue != this.state.targetPath) {
            this.setState({targetPath: newValue});
            this.props.onFileSelected(newValue);
        }
    }
}

export default FileSelector;
