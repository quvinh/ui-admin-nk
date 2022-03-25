import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../components/utils/Api'
import { getToken, getUserID } from '../../components/utils/Common'

const ReadNotification = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [createdBy, setCreateBy] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    useEffect(() => {
        Promise.all([getData('/api/admin/notification/show/' + props.match.params.id + '?token=' + getToken()),
        ]).then(function (res) {
            console.log(res[0])
            setTitle(res[0].data[0].title)
            setContent(res[0].data[0].content)
            setCreateBy(res[0].data[0].fullname)
            setCreatedAt(res[0].data[0].created_at)

        }).catch(error => {
            console.log('error')
        })
    }, [])
    // console.log(title)
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Xem thông báo</h1>
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
                                            <a className="nav-link">
                                                <i className="fas fa-inbox" /> Inbox
                                                <span className="badge bg-primary float-right"></span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-trash-alt" /> Trash
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                        {/* /.col */}
                        <div className="col-md-9">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Thông báo từ {createdBy}</h3>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool" title="Previous"><i className="fas fa-chevron-left" /></a>
                                        <a href="#" className="btn btn-tool" title="Next"><i className="fas fa-chevron-right" /></a>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <div className="mailbox-read-info">
                                        <h6>From: {createdBy}
                                            <span className="mailbox-read-time float-right">{createdAt}</span></h6>
                                    </div>
                                    <div className="mailbox-controls with-border text-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default btn-sm" data-container="body" title="Delete">
                                                <i className="far fa-trash-alt" />
                                            </button>
                                        </div>
                                        <button type="button" className="btn btn-default btn-sm" title="Print">
                                            <i className="fas fa-print" />
                                        </button>
                                    </div>
                                    <div className="mailbox-read-message">
                                        <h3>{title}</h3>
                                        <br />
                                        {content}

                                    </div>
                                </div>
                                <div className="card-footer bg-white">
                                    <ul className="mailbox-attachments d-flex align-items-stretch clearfix">

                                    </ul>
                                </div>
                                <div className="card-footer">
                                    <div className="float-right">
                                        {/* <button type="button" className="btn btn-default"><i className="fas fa-reply" /> Reply</button> */}
                                        {/* <button type="button" className="btn btn-default"><i className="fas fa-share" /> Forward</button> */}
                                    </div>
                                    <button type="button" className="btn btn-default"><i className="far fa-trash-alt" /> Delete</button>
                                    {/* <button type="button" className="btn btn-default"><i className="fas fa-print" /> Print</button> */}
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

export default ReadNotification