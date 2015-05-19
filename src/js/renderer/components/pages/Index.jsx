'use strict';

import ipc from 'ipc';

import React from 'react';
import mui from 'material-ui';

import Reactable from 'reactable';

import FileSelector from '../FileSelector';
import DirectorySelector from '../DirectorySelector';

import consts from '../../../common/consts';

import outputFileSettings from '../../../common/TemplateConfig';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this._onSourceFileSelected = this._onSourceFileSelected.bind(this);
        this._onOpenSourceClicked = this._onOpenSourceClicked.bind(this);
        this._onOutputDirSelected = this._onOutputDirSelected.bind(this);
        this._onIncludeDraftChanged = this._onIncludeDraftChanged.bind(this);
        this._onOutputFileNameChanged = this._onOutputFileNameChanged.bind(this);

        this.state = {
            sourcePath: '',
            sourceData: null,
            outputDir: '',
            includeDraft: false,
            outputFileName: outputFileSettings.help.title
        };

        ipc.on(consts.ipc.csv.src.reply, (arg) => {
            console.log('async-tsv-send-reply', arg);

            let result = JSON.parse(arg);

            if (result.error) {
                return;
            }

            this.setState({sourceData: result.data});
        });
    }

    render() {
        let table;
        let outputDirSelector;
        let outputFileSettingsArea;

        if (this.state.sourceData) {
            // table
            table = this._renderTable();

            // output directory
            outputDirSelector = this._renderOutputDirSelector();
        }

        if (this.state.outputDir) {
            outputFileSettingsArea = this._renderOutputFileSettingsArea();
        }


        return (
            <section className="content-index container-fluid">
                <div className="row">
                    <FileSelector
                        className="col-xs-9 col-align-center"
                        acceptFileType=".csv"
                        onFileSelected={this._onSourceFileSelected}/>

                    <div className="col-xs-3 col-align-center">
                        <mui.RaisedButton
                            ref="readSourceButton"
                            primary={true}
                            label="Open"
                            onClick={this._onOpenSourceClicked}/>
                    </div>
                </div>
                {table}
                {outputDirSelector}
                {outputFileSettingsArea}
            </section>
        );
    }

    _onSourceFileSelected(filePath) {
        console.log(filePath);

        this.setState({sourcePath: filePath});
    }

    _onOpenSourceClicked() {
        console.log('_onOpenSourceClicked');
        ipc.send(consts.ipc.csv.src.send, this.state.sourcePath);
    }

    _onIncludeDraftChanged(e, checked) {
        this.setState({includeDraft: checked});
    }

    _onOutputDirSelected(path) {
        console.log('onOutputDirSelected:', path);

        this.setState({outputDir: path});
    }

    _onOutputFileNameChanged(e) {

    }

    _renderTable() {
        let tableStyle = {
            height: `${window.innerHeight * 0.5}px`,
            overflow: 'scroll'
        };
        return (
            <div className="row" style={tableStyle}>
                <Reactable.Table
                    className="table col-xs-12"
                    data={this.state.sourceData}/>
            </div>
        );
    }

    _renderOutputDirSelector() {
        return (
            <div className="row">
                <DirectorySelector
                    className="col-xs-9 col-align-center"
                    title="Choose Output Directory"
                    onDirectorySelected={this._onOutputDirSelected}/>

                <div className="col-xs-3 col-align-center">
                    <mui.Checkbox
                        ref="checkIncludeDraft"
                        label="include draft"
                        onCheck={this._onIncludeDraftChanged}
                        defaultSwitched={this.state.includeDraft}/>
                </div>
            </div>
        );
    }

    _renderOutputFileSettingsArea() {
        return (
            <div className="row">
                <mui.TextField
                    floatingLabelText="edit output file name"
                    hint="Column names can be used."
                    onChange={this._onOutputFileNameChanged}/>
            </div>
        );
    }

}

