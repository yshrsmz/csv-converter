'use strict';

import React from 'react';
import mui from 'material-ui';

class FileSelector extends React.Component {

    constructor(props) {
        super(props);

        this._onButtonClick = this._onButtonClick.bind(this);
        this._onFileSelected = this._onFileSelected.bind(this);

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
            hint: 'Absolute Path to the target file',
            className: '',
            acceptFileType: '*'
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <div className="row">
                    <div className="col-xs-8 col-md-8">
                        <mui.TextField
                            refs="targetFileName"
                            hintText={this.props.hint}
                            floatingLabelText={this.props.title}
                            value={this.state.targetPath}
                            className="fileSelector__text"/>
                    </div>
                    <div className="col-xs-4 col-md-4 col-align-center">
                        <mui.RaisedButton
                            primary={true}
                            onClick={this._onButtonClick}>
                            <span className="mui-raised-button-label">Select File</span>
                            <input
                                refs="filePicker"
                                type="file"
                                className="fileSelector__button__input"
                                accept={this.props.acceptFileType}
                                onChange={this._onFileSelected}></input>
                        </mui.RaisedButton>
                    </div>
                </div>
            </div>
        );
    }

    _onButtonClick() {
        console.log('click');
    }

    _onFileSelected(e) {
        if (e.target.files.length > 0) {
            this.setState({targetPath: e.target.files[0].path});

            this.props.onFileSelected(e.target.files);
        }
    }
}

export default FileSelector;
