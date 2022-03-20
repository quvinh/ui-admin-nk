import React, { useState, useEffect, createRef, useRef } from 'react'
import { getData, postData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import Validator from '../../components/utils/Validation'
import { getToken } from '../../components/utils/Common'

const EditAccount = (props) => {
    const [dataUser, setDataUser] = useState([])
    // const myRef = useRef(null)

    const history = useHistory()
    useEffect(() => {
        Promise.all([
            getData('http://127.0.0.1:8000/api/auth/get-user/' + props.match.params.id + '?token=' + getToken())
        ])
            .then(function (res) {

                setDataUser(res[0].data)
            })
            .catch(error => {

            })
    }, [])
    console.log(dataUser.length)
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Cập nhật người dùng <i style={{ color: "#007bff", fontSize: 18 }}>{dataUser.length === 1 && dataUser[0].fullname}</i></h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a>Trang chủ</a></li>
                                <li className="breadcrumb-item active">Cập nhật người dùng</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-secondary">
                        <div className="card-header">
                            <h3 className="card-title">Phân quyền <i style={{ fontSize: 14 }}>{dataUser.length === 1 && ('Tên đăng nhập: ' + dataUser[0].username)}</i></h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ fontSize: 11 }}>Tên đăng nhập</label>
                                            <input type="text" name="username" className="form-control" placeholder="Tên đăng nhập"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </form>
                            <div className="card-footer p-0">
                                <div style={{ textAlign: "end" }}>
                                    <button className="btn btn-sm btn-primary">
                                        <i className="fas fa-user-plus" /> Thêm người dùng
                                    </button>
                                    <Link to={"/account"} className="btn btn-sm btn-secondary" style={{ marginLeft: 5 }}>
                                        <i className="fas fa-times"></i> Huỷ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Phân quyền</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* checkbox */}
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <label className="form-check-label">Checkbox</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                                <label className="form-check-label">Checkbox checked</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" disabled />
                                                <label className="form-check-label">Checkbox disabled</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        {/* radio */}
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="radio1" />
                                                <label className="form-check-label">Radio</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="radio1" defaultChecked />
                                                <label className="form-check-label">Radio checked</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" disabled />
                                                <label className="form-check-label">Radio disabled</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* select */}
                                        <div className="form-group">
                                            <label>Select</label>
                                            <select className="form-control">
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Select Disabled</label>
                                            <select className="form-control" disabled>
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* Select multiple*/}
                                        <div className="form-group">
                                            <label>Select Multiple</label>
                                            <select multiple className="form-control">
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Select Multiple Disabled</label>
                                            <select multiple className="form-control" disabled>
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* /.card-body */}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default EditAccount