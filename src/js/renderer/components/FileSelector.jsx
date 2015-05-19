'use strict';

import React from 'react';
import mui from 'material-ui';

class FileSelector extends React.Component {

    constructor(props) {
        super(props);

        this._onButtonClick = this._onButtonClick.bind(this);
        this._onFileSelected = this._onFileSelected.bind(this);
        this._onTextChanged = this._onTextChanged.bind(this);

        this.state = {
            targetPath: ''
        };
    }

    static get propTypes() {
        return {
            title: React.PropTypes.string,
            hint: React.PropTypes.string,
            className: React.PropTypes.string,
            acceptFileType: React.PropTypes.string,
            onFileSelected: React.PropTypes.func.isRequired
        }
    }

    static get defaultProps() {
        return {
            title: 'Choose File',
            hint: 'Absolute path to the target file',
            className: '',
            acceptFileType: '*'
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
                            onClick={this._onButtonClick}>
                            <span className="mui-raised-button-label">Select File</span>

                            <form ref="filePickerForm">
                                <input
                                    ref="filePicker"
                                    type="file"
                                    className="fileSelector__button__input"
                                    accept={this.props.acceptFileType}
                                    onChange={this._onFileSelected}></input>
                            </form>
                        </mui.RaisedButton>
                    </div>
                </div>
            </div>
        );
    }

    _onButtonClick() {

    }

    _onFileSelected(e) {
        if (e.target.files.length > 0) {
            this._updateFilePath(e.target.files[0].path);
        }
    }

    _onTextChanged(e) {
        console.log('textchanged', e.target.value);
        this._updateFilePath(e.target.value);
    }

    _updateFilePath(newValue) {
        if (newValue != this.state.targetPath) {
            this.setState({targetPath: newValue});
            this.props.onFileSelected(newValue);

            this.refs.filePickerForm.getDOMNode().reset();
        }
    }
}

export default FileSelector;
