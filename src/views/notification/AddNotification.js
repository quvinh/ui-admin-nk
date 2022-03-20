/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

const AddNotification = () => {

    const script = () => {
        const compile = document.createElement("script")
        compile.src = $(function () {
            $('#compose-textarea').summernote()
        })
        compile.async = true
        document.body.appendChild(compile)
    }

    useEffect(() => {
        script()
    }, []);
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Tạo thông báo</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Thông báo</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Link to={"/notification"} className="btn btn-primary btn-block mb-3">Các thông báo</Link>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Mục</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item active">
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-inbox" /> Inbox
                                                <span className="badge bg-primary float-right">12</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-envelope" /> Sent
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-file-alt" /> Drafts
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-filter" /> Junk
                                                <span className="badge bg-warning float-right">65</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-trash-alt" /> Trash
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Labels</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="far fa-circle text-danger" /> Important</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="far fa-circle text-warning" /> Promotions</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="far fa-circle text-primary" /> Social</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-9">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Tạo mới</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Tới:" />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Tiêu đề:" />
                                    </div>
                                    <div className="form-group">
                                        <textarea id="compose-textarea" className="form-control" style={{ height: 300 }} defaultValue={"                      <h3>Tiêu đề</h3>\n                        <p>Nội dung</p>\n                      <ul>\n                        <li>Nội dung 1</li>\n                        <li>Nội dung 2</li>\n                     </ul>\n                    "} />
                                    </div>
                                    <div className="form-group">
                                        <div className="btn btn-default btn-file">
                                            <i className="fas fa-paperclip" /> Attachment
                                            <input type="file" name="attachment" />
                                        </div>
                                        <p className="help-block">Max. 32MB</p>
                                    </div>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <div className="float-right">
                                        <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button>
                                        <button type="submit" className="btn btn-primary"><i className="far fa-envelope" /> Send</button>
                                    </div>
                                    <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button>
                                </div>
                                {/* /.card-footer */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

export default AddNotification