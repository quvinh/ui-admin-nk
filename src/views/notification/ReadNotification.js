import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../components/utils/Api'
import { getToken, getUserID } from '../../components/utils/Common'

const ReadNotification = (props) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [createdBy, setCreateBy] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    console.log(props)
    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/notification/show/' + props.match.params.id + '?token=' + getToken()),
    ]).then(function(res) {
        console.log(res[0].data)
        setTitle(res[0].data[0].title)
        setContent(res[0].data[0].content)
        setCreateBy(res[0].data[0].fullname)
        setCreatedAt(res[0].data[0].created_at)
    }).catch(error => {
        console.log(error)
    })
    },[])
    console.log(title)
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
                            <Link to={"/notification"} className="btn btn-primary btn-block mb-3">Back to Inbox</Link>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Folders</h3>
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
                                    <h3 className="card-title">Read Mail</h3>
                                    <div className="card-tools">
                                        <a href="#" className="btn btn-tool" title="Previous"><i className="fas fa-chevron-left" /></a>
                                        <a href="#" className="btn btn-tool" title="Next"><i className="fas fa-chevron-right" /></a>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0">
                                    <div className="mailbox-read-info">
                                        <h5>{title}</h5>
                                        <h6>From: {createdBy}
                                            <span className="mailbox-read-time float-right">{createdAt}</span></h6>
                                    </div>
                                    {/* /.mailbox-read-info */}
                                    <div className="mailbox-controls with-border text-center">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default btn-sm" data-container="body" title="Delete">
                                                <i className="far fa-trash-alt" />
                                            </button>
                                            <button type="button" className="btn btn-default btn-sm" data-container="body" title="Reply">
                                                <i className="fas fa-reply" />
                                            </button>
                                            <button type="button" className="btn btn-default btn-sm" data-container="body" title="Forward">
                                                <i className="fas fa-share" />
                                            </button>
                                        </div>
                                        {/* /.btn-group */}
                                        <button type="button" className="btn btn-default btn-sm" title="Print">
                                            <i className="fas fa-print" />
                                        </button>
                                    </div>
                                    {/* /.mailbox-controls */}
                                    <div className="mailbox-read-message">
                                        {/* <p>Hello John,</p> */}
                                        {content}
                                        {/* <p>Thanks,<br />Jane</p> */}
                                    </div>
                                    {/* /.mailbox-read-message */}
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer bg-white">
                                    <ul className="mailbox-attachments d-flex align-items-stretch clearfix">
                                        {/* <li>
                                            <span className="mailbox-attachment-icon"><i className="far fa-file-pdf" /></span>
                                            <div className="mailbox-attachment-info">
                                                <a href="#" className="mailbox-attachment-name"><i className="fas fa-paperclip" /> Sep2014-report.pdf</a>
                                                <span className="mailbox-attachment-size clearfix mt-1">
                                                    <span>1,245 KB</span>
                                                    <a href="#" className="btn btn-default btn-sm float-right"><i className="fas fa-cloud-download-alt" /></a>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="mailbox-attachment-icon"><i className="far fa-file-word" /></span>
                                            <div className="mailbox-attachment-info">
                                                <a href="#" className="mailbox-attachment-name"><i className="fas fa-paperclip" /> App Description.docx</a>
                                                <span className="mailbox-attachment-size clearfix mt-1">
                                                    <span>1,245 KB</span>
                                                    <a href="#" className="btn btn-default btn-sm float-right"><i className="fas fa-cloud-download-alt" /></a>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="mailbox-attachment-icon has-img"><img src="../../dist/img/photo1.png" alt="Attachment" /></span>
                                            <div className="mailbox-attachment-info">
                                                <a href="#" className="mailbox-attachment-name"><i className="fas fa-camera" /> photo1.png</a>
                                                <span className="mailbox-attachment-size clearfix mt-1">
                                                    <span>2.67 MB</span>
                                                    <a href="#" className="btn btn-default btn-sm float-right"><i className="fas fa-cloud-download-alt" /></a>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <span className="mailbox-attachment-icon has-img"><img src="../../dist/img/photo2.png" alt="Attachment" /></span>
                                            <div className="mailbox-attachment-info">
                                                <a href="#" className="mailbox-attachment-name"><i className="fas fa-camera" /> photo2.png</a>
                                                <span className="mailbox-attachment-size clearfix mt-1">
                                                    <span>1.9 MB</span>
                                                    <a href="#" className="btn btn-default btn-sm float-right"><i className="fas fa-cloud-download-alt" /></a>
                                                </span>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                                {/* /.card-footer */}
                                <div className="card-footer">
                                    <div className="float-right">
                                        <button type="button" className="btn btn-default"><i className="fas fa-reply" /> Reply</button>
                                        <button type="button" className="btn btn-default"><i className="fas fa-share" /> Forward</button>
                                    </div>
                                    <button type="button" className="btn btn-default"><i className="far fa-trash-alt" /> Delete</button>
                                    <button type="button" className="btn btn-default"><i className="fas fa-print" /> Print</button>
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