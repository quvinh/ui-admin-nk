import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getRoleNames, getToken, getUserID, getAllPermissions, getDataWarehouseID } from '../../components/utils/Common'
import { getData } from '../../components/utils/Api'
// import { ShowExport } from './ShowExport'

const Export = () => {

    return (
        <div className="wrapper">
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <div className="card card-default">
                            <div className="card-header">
                                <h3 className="card-title">Select2 (Default Theme)</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Minimal</label>
                                            <select className="form-control select2" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Disabled</label>
                                            <select className="form-control select2" disabled="disabled" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Multiple</label>
                                            <select className="select2" multiple="multiple" data-placeholder="Select a State" style={{ width: '100%' }}>
                                                <option>Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Disabled Result</label>
                                            <select className="form-control select2" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option disabled="disabled">California (disabled)</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <h5>Custom Color Variants</h5>
                                <div className="row">
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group">
                                            <label>Minimal (.select2-danger)</label>
                                            <select className="form-control select2 select2-danger" data-dropdown-css-class="select2-danger" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="form-group">
                                            <label>Multiple (.select2-purple)</label>
                                            <div className="select2-purple">
                                                <select className="select2" multiple="multiple" data-placeholder="Select a State" data-dropdown-css-class="select2-purple" style={{ width: '100%' }}>
                                                    <option>Alabama</option>
                                                    <option>Alaska</option>
                                                    <option>California</option>
                                                    <option>Delaware</option>
                                                    <option>Tennessee</option>
                                                    <option>Texas</option>
                                                    <option>Washington</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
                                the plugin.
                            </div>
                        </div>
                        <div className="card card-default">
                            <div className="card-header">
                                <h3 className="card-title">Select2 (Bootstrap4 Theme)</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Minimal</label>
                                            <select className="form-control select2bs4" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Disabled</label>
                                            <select className="form-control select2bs4" disabled="disabled" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label>Multiple</label>
                                            <select className="select2bs4" multiple="multiple" data-placeholder="Select a State" style={{ width: '100%' }}>
                                                <option>Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label>Disabled Result</label>
                                            <select className="form-control select2bs4" style={{ width: '100%' }}>
                                                <option selected="selected">Alabama</option>
                                                <option>Alaska</option>
                                                <option disabled="disabled">California (disabled)</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
                                the plugin.
                            </div>
                        </div>
                        <div className="card card-default">
                            <div className="card-header">
                                <h3 className="card-title">Bootstrap Duallistbox</h3>
                                <div className="card-tools">
                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                        <i className="fas fa-minus" />
                                    </button>
                                    <button type="button" className="btn btn-tool" data-card-widget="remove">
                                        <i className="fas fa-times" />
                                    </button>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Multiple</label>
                                            <select className="duallistbox" multiple="multiple">
                                                <option selected>Alabama</option>
                                                <option>Alaska</option>
                                                <option>California</option>
                                                <option>Delaware</option>
                                                <option>Tennessee</option>
                                                <option>Texas</option>
                                                <option>Washington</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer">
                                Visit <a href="https://github.com/istvan-ujjmeszaros/bootstrap-duallistbox#readme">Bootstrap Duallistbox</a> for more examples and information about
                                the plugin.
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="card card-danger">
                                    <div className="card-header">
                                        <h3 className="card-title">Input masks</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Date masks:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="far fa-calendar-alt" /></span>
                                                </div>
                                                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="dd/mm/yyyy" data-mask />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="far fa-calendar-alt" /></span>
                                                </div>
                                                <input type="text" className="form-control" data-inputmask-alias="datetime" data-inputmask-inputformat="mm/dd/yyyy" data-mask />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>US phone mask:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-phone" /></span>
                                                </div>
                                                <input type="text" className="form-control" data-inputmask="&quot;mask&quot;: &quot;(999) 999-9999&quot;" data-mask />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Intl US phone mask:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-phone" /></span>
                                                </div>
                                                <input type="text" className="form-control" data-inputmask="'mask': ['999-999-9999 [x99999]', '+099 99 99 9999[9]-9999']" data-mask />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>IP mask:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="fas fa-laptop" /></span>
                                                </div>
                                                <input type="text" className="form-control" data-inputmask="'alias': 'ip'" data-mask />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-info">
                                    <div className="card-header">
                                        <h3 className="card-title">Color &amp; Time Picker</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Color picker:</label>
                                            <input type="text" className="form-control my-colorpicker1" />
                                        </div>
                                        <div className="form-group">
                                            <label>Color picker with addon:</label>
                                            <div className="input-group my-colorpicker2">
                                                <input type="text" className="form-control" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text"><i className="fas fa-square" /></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bootstrap-timepicker">
                                            <div className="form-group">
                                                <label>Time picker:</label>
                                                <div className="input-group date" id="timepicker" data-target-input="nearest">
                                                    <input type="text" className="form-control datetimepicker-input" data-target="#timepicker" />
                                                    <div className="input-group-append" data-target="#timepicker" data-toggle="datetimepicker">
                                                        <div className="input-group-text"><i className="far fa-clock" /></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">Date picker</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label>Date:</label>
                                            <div className="input-group date" id="reservationdate" data-target-input="nearest">
                                                <input type="text" className="form-control datetimepicker-input" data-target="#reservationdate" />
                                                <div className="input-group-append" data-target="#reservationdate" data-toggle="datetimepicker">
                                                    <div className="input-group-text"><i className="fa fa-calendar" /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Date and time:</label>
                                            <div className="input-group date" id="reservationdatetime" data-target-input="nearest">
                                                <input type="text" className="form-control datetimepicker-input" data-target="#reservationdatetime" />
                                                <div className="input-group-append" data-target="#reservationdatetime" data-toggle="datetimepicker">
                                                    <div className="input-group-text"><i className="fa fa-calendar" /></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Date range:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="far fa-calendar-alt" />
                                                    </span>
                                                </div>
                                                <input type="text" className="form-control float-right" id="reservation" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Date and time range:</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text"><i className="far fa-clock" /></span>
                                                </div>
                                                <input type="text" className="form-control float-right" id="reservationtime" />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Date range button:</label>
                                            <div className="input-group">
                                                <button type="button" className="btn btn-default float-right" id="daterange-btn">
                                                    <i className="far fa-calendar-alt" /> Date range picker
                                                    <i className="fas fa-caret-down" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        Visit <a href="https://getdatepicker.com/5-4/">tempusdominus </a> for more examples and information about
                                        the plugin.
                                    </div>
                                </div>
                                <div className="card card-success">
                                    <div className="card-header">
                                        <h3 className="card-title">iCheck Bootstrap - Checkbox &amp; Radio Inputs</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group clearfix">
                                                    <div className="icheck-primary d-inline">
                                                        <input type="checkbox" id="checkboxPrimary1" defaultChecked />
                                                        <label htmlFor="checkboxPrimary1">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-primary d-inline">
                                                        <input type="checkbox" id="checkboxPrimary2" />
                                                        <label htmlFor="checkboxPrimary2">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-primary d-inline">
                                                        <input type="checkbox" id="checkboxPrimary3" disabled />
                                                        <label htmlFor="checkboxPrimary3">
                                                            Primary checkbox
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group clearfix">
                                                    <div className="icheck-primary d-inline">
                                                        <input type="radio" id="radioPrimary1" name="r1" defaultChecked />
                                                        <label htmlFor="radioPrimary1">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-primary d-inline">
                                                        <input type="radio" id="radioPrimary2" name="r1" />
                                                        <label htmlFor="radioPrimary2">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-primary d-inline">
                                                        <input type="radio" id="radioPrimary3" name="r1" disabled />
                                                        <label htmlFor="radioPrimary3">
                                                            Primary radio
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group clearfix">
                                                    <div className="icheck-danger d-inline">
                                                        <input type="checkbox" defaultChecked id="checkboxDanger1" />
                                                        <label htmlFor="checkboxDanger1">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-danger d-inline">
                                                        <input type="checkbox" id="checkboxDanger2" />
                                                        <label htmlFor="checkboxDanger2">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-danger d-inline">
                                                        <input type="checkbox" disabled id="checkboxDanger3" />
                                                        <label htmlFor="checkboxDanger3">
                                                            Danger checkbox
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* radio */}
                                                <div className="form-group clearfix">
                                                    <div className="icheck-danger d-inline">
                                                        <input type="radio" name="r2" defaultChecked id="radioDanger1" />
                                                        <label htmlFor="radioDanger1">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-danger d-inline">
                                                        <input type="radio" name="r2" id="radioDanger2" />
                                                        <label htmlFor="radioDanger2">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-danger d-inline">
                                                        <input type="radio" name="r2" disabled id="radioDanger3" />
                                                        <label htmlFor="radioDanger3">
                                                            Danger radio
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                {/* checkbox */}
                                                <div className="form-group clearfix">
                                                    <div className="icheck-success d-inline">
                                                        <input type="checkbox" defaultChecked id="checkboxSuccess1" />
                                                        <label htmlFor="checkboxSuccess1">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-success d-inline">
                                                        <input type="checkbox" id="checkboxSuccess2" />
                                                        <label htmlFor="checkboxSuccess2">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-success d-inline">
                                                        <input type="checkbox" disabled id="checkboxSuccess3" />
                                                        <label htmlFor="checkboxSuccess3">
                                                            Success checkbox
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                {/* radio */}
                                                <div className="form-group clearfix">
                                                    <div className="icheck-success d-inline">
                                                        <input type="radio" name="r3" defaultChecked id="radioSuccess1" />
                                                        <label htmlFor="radioSuccess1">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-success d-inline">
                                                        <input type="radio" name="r3" id="radioSuccess2" />
                                                        <label htmlFor="radioSuccess2">
                                                        </label>
                                                    </div>
                                                    <div className="icheck-success d-inline">
                                                        <input type="radio" name="r3" disabled id="radioSuccess3" />
                                                        <label htmlFor="radioSuccess3">
                                                            Success radio
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        Many more skins available. <a href="https://bantikyan.github.io/icheck-bootstrap/">Documentation</a>
                                    </div>
                                </div>
                                <div className="card card-secondary">
                                    <div className="card-header">
                                        <h3 className="card-title">Bootstrap Switch</h3>
                                    </div>
                                    <div className="card-body">
                                        <input type="checkbox" name="my-checkbox" defaultChecked data-bootstrap-switch />
                                        <input type="checkbox" name="my-checkbox" defaultChecked data-bootstrap-switch data-off-color="danger" data-on-color="success" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-default">
                                    <div className="card-header">
                                        <h3 className="card-title">bs-stepper</h3>
                                    </div>
                                    <div className="card-body p-0">
                                        <div className="bs-stepper">
                                            <div className="bs-stepper-header" role="tablist">
                                                {/* your steps here */}
                                                <div className="step" data-target="#logins-part">
                                                    <button type="button" className="step-trigger" role="tab" aria-controls="logins-part" id="logins-part-trigger">
                                                        <span className="bs-stepper-circle">1</span>
                                                        <span className="bs-stepper-label">Logins</span>
                                                    </button>
                                                </div>
                                                <div className="line" />
                                                <div className="step" data-target="#information-part">
                                                    <button type="button" className="step-trigger" role="tab" aria-controls="information-part" id="information-part-trigger">
                                                        <span className="bs-stepper-circle">2</span>
                                                        <span className="bs-stepper-label">Various information</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="bs-stepper-content">
                                                {/* your steps content here */}
                                                <div id="logins-part" className="content" role="tabpanel" aria-labelledby="logins-part-trigger">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email" />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputPassword1">Password</label>
                                                        <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                                                    </div>
                                                    <button className="btn btn-primary" onclick="stepper.next()">Next</button>
                                                </div>
                                                <div id="information-part" className="content" role="tabpanel" aria-labelledby="information-part-trigger">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputFile">File input</label>
                                                        <div className="input-group">
                                                            <div className="custom-file">
                                                                <input type="file" className="custom-file-input" id="exampleInputFile" />
                                                                <label className="custom-file-label" htmlFor="exampleInputFile">Choose file</label>
                                                            </div>
                                                            <div className="input-group-append">
                                                                <span className="input-group-text">Upload</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary" onclick="stepper.previous()">Previous</button>
                                                    <button type="submit" className="btn btn-primary">Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        Visit <a href="https://github.com/Johann-S/bs-stepper/#how-to-use-it">bs-stepper documentation</a> for more examples and information about the plugin.
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-default">
                                    <div className="card-header">
                                        <h3 className="card-title">Dropzone.js <small><em>jQuery File Upload</em> like look</small></h3>
                                    </div>
                                    <div className="card-body">
                                        <div id="actions" className="row">
                                            <div className="col-lg-6">
                                                <div className="btn-group w-100">
                                                    <span className="btn btn-success col fileinput-button">
                                                        <i className="fas fa-plus" />
                                                        <span>Add files</span>
                                                    </span>
                                                    <button type="submit" className="btn btn-primary col start">
                                                        <i className="fas fa-upload" />
                                                        <span>Start upload</span>
                                                    </button>
                                                    <button type="reset" className="btn btn-warning col cancel">
                                                        <i className="fas fa-times-circle" />
                                                        <span>Cancel upload</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 d-flex align-items-center">
                                                <div className="fileupload-process w-100">
                                                    <div id="total-progress" className="progress progress-striped active" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
                                                        <div className="progress-bar progress-bar-success" style={{ width: '0%' }} data-dz-uploadprogress />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table table-striped files" id="previews">
                                            <div id="template" className="row mt-2">
                                                <div className="col-auto">
                                                    <span className="preview"><img src="data:," alt data-dz-thumbnail /></span>
                                                </div>
                                                <div className="col d-flex align-items-center">
                                                    <p className="mb-0">
                                                        <span className="lead" data-dz-name />
                                                        (<span data-dz-size />)
                                                    </p>
                                                    <strong className="error text-danger" data-dz-errormessage />
                                                </div>
                                                <div className="col-4 d-flex align-items-center">
                                                    <div className="progress progress-striped active w-100" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={0}>
                                                        <div className="progress-bar progress-bar-success" style={{ width: '0%' }} data-dz-uploadprogress />
                                                    </div>
                                                </div>
                                                <div className="col-auto d-flex align-items-center">
                                                    <div className="btn-group">
                                                        <button className="btn btn-primary start">
                                                            <i className="fas fa-upload" />
                                                            <span>Start</span>
                                                        </button>
                                                        <button data-dz-remove className="btn btn-warning cancel">
                                                            <i className="fas fa-times-circle" />
                                                            <span>Cancel</span>
                                                        </button>
                                                        <button data-dz-remove className="btn btn-danger delete">
                                                            <i className="fas fa-trash" />
                                                            <span>Delete</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        Visit <a href="https://www.dropzonejs.com">dropzone.js documentation</a> for more examples and information about the plugin.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div></section>
            </div>
        </div>

    )
}

export default Export;
