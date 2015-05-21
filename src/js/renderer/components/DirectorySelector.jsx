'use strict';

import ipc from 'ipc';

import React from 'react';
import mui from 'material-ui';

import consts from '../../common/consts';


export default class DirectorySelector extends React.Component {

    constructor(props) {
        super(props);

        this._onTextChanged = this._onTextChanged.bind(this);
        this._onButtonClick = this._onButtonClick.bind(this);

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
            onDirectorySelected: React.PropTypes.func.isRequired
        }
    }

    static get defaultProps() {
        return {
            title: 'Choose Directory',
            hint: 'Absolute path to the target directory',
            className: ''
        }
    }

    render() {
        let textValue = null;
        if (this.state.targetPath && this.state.targetPath.length > 0) {
            textValue = this.state.targetPath;
        }

        return (
            <div className={`directorySelector ${this.props.className}`}>
                <div className="row">
                    <div className="col-xs-9">
                        <mui.TextField
                            ref="targetDirName"
                            hintText={this.props.hint}
                            floatingLabelText={this.props.title}
                            className="directorySelector__text"
                            onChange={this._onTextChanged}
                            value={textValue}/>
                    </div>
                    <div className="col-xs-3 col-align-center">
                        <mui.RaisedButton
                            secondary={true}
                            onClick={this._onButtonClick}
                            label="Select Directory"/>
                    </div>
                </div>
            </div>
        );
    }

    _onTextChanged(e) {
        this._updateDirPath(e.target.value);
    }

    _onButtonClick() {
        ipc.send(consts.ipc.pick.dir.send, consts.ipc.pick.dir.reply);
    }

    _updateDirPath(newValue) {
        if (newValue != this.state.targetPath) {
            this.setState({targetPath: newValue});
            this.props.onDirectorySelected(newValue);
        }
    }

    _handleEvents() {
        ipc.on(consts.ipc.pick.dir.reply, (selectedPaths) => {
            console.log('selectedpaths:', selectedPaths);

            if (selectedPaths && selectedPaths.length > 0) {
                this._updateDirPath(selectedPaths[0]);
            }
        });
    }
}
