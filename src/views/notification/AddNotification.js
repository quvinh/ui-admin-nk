/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getData, postData } from '../../components/utils/Api'
import { getToken, getUserID } from '../../components/utils/Common'
// import Select, { components } from 'react-select'
const AddNotification = () => {
    const [title, setTitle] = useState()
    const [content, setContent] = useState('Nội dung')
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])
    const history = useHistory()

    const handleCheckWarehouse = (e) => {
        const { id, checked } = e.target
        console.log(id)
        setIsCheckedWarehouse([...isCheckedWarehouse, parseInt(id)])
        !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => parseInt(item) !== parseInt(id)))
        setIsSelected(true)
    }

    const handleSave = () => {
        isCheckedWarehouse.map(item => {
            Promise.all([
                postData('http://127.0.0.1:8000/api/admin/notification/store?token=' + getToken(), {
                    title: title,
                    content: content,
                    status: 0,
                    created_by: getUserID(),
                    warehouse_id: item
                }),
            ])
                .then(function (res) {
                    // history.push('/notification')
                })
                .catch(error => {
                    console.log(error)
                })
        })
        history.push('/notification')
    }

    useEffect(() => {
        // const header = `Authorization: Bearer ${getToken()}`
        Promise.all([
            getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken()),
        ])
            .then(function (res) {
                setDataWarehouse(res[0].warehouse_id)
                setIsCheckedWarehouse(res[0].warehouse_id.map(item => item.id))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
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
                                        {/* <input className="form-control" placeholder="Tới:" /> */}
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title"><b>Gửi tới:</b></h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                        <i className="fas fa-minus" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                {
                                                    dataWarehouse && dataWarehouse.map((item, index) => (
                                                        <div className="form-check" key={index}>
                                                            <input className="form-check-input" type="checkbox"
                                                                id={item.id} checked={isCheckedWarehouse.includes(parseInt(item.id))} onChange={(e) => handleCheckWarehouse(e)} />
                                                            <label className="form-check-label">{item.name}</label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Tiêu đề:" onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" value={content} style={{ height: 300 }} onChange={(e) => setContent(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        {/* <div className="btn btn-default btn-file">
                                            <i className="fas fa-paperclip" /> Attachment
                                            <input type="file" name="attachment" />
                                        </div>
                                        <p className="help-block">Max. 32MB</p> */}
                                    </div>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <div className="float-right">
                                        {/* <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button> */}
                                        <button type="submit" className="btn btn-primary" onClick={handleSave}><i className="far fa-envelope" /> Tạo</button>
                                    </div>
                                    {/* <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button> */}
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