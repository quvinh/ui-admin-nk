import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../../components/utils/Api'
import { getToken, getUserID } from '../../components/utils/Common'

const Notification = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    useEffect(() => {
        script()
    }, []);
    // useEffect(() => {
    //     // const header = `Authorization: Bearer ${getToken()}`
    //     Promise.all([
    //         getData('http://127.0.0.1:8000/api/admin/notification/show/' + getUserID() + '?token=' + getToken()),
    //     ])
    //         .then(function (res) {
    //             setDataWarehouse(res[0].warehouse_id)
    //             setIsCheckedWarehouse(res[0].warehouse_id.map(item => item.id))
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }, [])

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thông báo</h1>
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
                <div className="row">
                    <div className="col-md-3">
                        <Link to={"/notification-add"} className="btn btn-primary btn-block mb-3">Tạo thông báo</Link>
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
                                            <i className="fas fa-inbox" /> Thông báo
                                            <span className="badge bg-primary float-right">12</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
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
                            <div className="card-body p-0">
                                <ul className="nav nav-pills flex-column">
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <i className="far fa-circle text-danger" />
                                            Important
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <i className="far fa-circle text-warning" /> Promotions
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link">
                                            <i className="far fa-circle text-primary" />
                                            Social
                                        </a>
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
                                <h3 className="card-title">Bảng</h3>
                            </div>
                            {/* /.card-header */}
                            <div className="card-body">
                                <table id="example1" className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th style={{ width: 10 }}>STT</th>
                                            <th>Người gửi</th>
                                            <th>Tiêu đề</th>
                                            <th>Thời gian</th>
                                            <th style={{ width: 10 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {
                                            dataTable.map((item, index) => (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.note}</td>
                                                    <td>Button</td>
                                                </tr>
                                            ))
                                        } */}
                                        <tr>
                                            <td>1</td>
                                            <td className="mailbox-name">admin</td>
                                            <td className="mailbox-subject"><b>THÔNG BÁO</b></td>
                                            <td>1</td>
                                            <td>
                                                <div style={{ textAlign: "center" }}>
                                                    <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                    </button>
                                                    <div className="dropdown-menu">
                                                        <Link className="dropdown-item" to={"/notification-read/1"}>Chi tiết</Link>
                                                        <a className="dropdown-item">Xoá</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                    </tfoot>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </div>

    )
}

export default Notification