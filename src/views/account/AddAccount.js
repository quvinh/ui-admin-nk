import React, { useState } from 'react'
import { postData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import Validator from '../../components/utils/Validation'

const AddAccount = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('123456')
    const [password_confirmation, setPasswordConfirmation] = useState('123456')
    const [fullname, setFullname] = useState('')
    const [phone, setPhone] = useState('')

    const history = useHistory()
    const [validator, showValidationMessage] = Validator()

    const onRegister = () => {
        if (validator.allValid()) {
            console.log("button clicked")
            const data = {
                username: username,
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                fullname: fullname,
                phone: phone,
            }
            console.log(data)
            Promise.all([postData('http://127.0.0.1:8000/api/auth/register', data)])
                .then(function (res) {
                    console.log("Successfully")
                    // history.push("/login")
                    history.push("/account")
                })
                .catch(err => {
                    console.log(err)
                })
        } else showValidationMessage(true)
    }

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thêm người dùng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a>Trang chủ</a></li>
                                <li className="breadcrumb-item active">Thêm người dùng</li>
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
                            <h3 className="card-title">Điền thông tin</h3>
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
                                                onChange={(e) => setUsername(e.target.value)} />
                                            <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                                {validator.message("username", username, "required", {
                                                    messages: {
                                                        required: "(*) Nhập tên đăng nhập"
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ fontSize: 11 }}>Họ và tên</label>
                                            <input type="text" name="fullname" className="form-control" placeholder="Họ và tên" onChange={(e) => setFullname(e.target.value)} />
                                            <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                                {validator.message("fullname", fullname, "required", {
                                                    messages: {
                                                        required: "(*) Nhập họ tên"
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ fontSize: 11 }}>Mật khẩu</label>
                                            <input type="password" name="password" className="form-control" placeholder="Mật khẩu"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)} />
                                            <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                                {validator.message("password", password, "required", {
                                                    messages: {
                                                        required: "(*) Nhập mật khẩu"
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ fontSize: 11 }}>Số điện thoại</label>
                                            <input type="text" name="phone" className="form-control" placeholder="0912345678" onChange={(e) => setPhone(e.target.value)} />
                                            <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                                {validator.message("phone", phone, "required", {
                                                    messages: {
                                                        required: "(*) Nhập SĐT"
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ fontSize: 11 }}>Nhập lại mật khẩu</label>
                                            <input type="password" name="password_confirmation" className="form-control" placeholder="Nhập lại mật khẩu"
                                                value={password_confirmation}
                                                onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                            <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                                {validator.message("password_confirmation", password_confirmation, "required", {
                                                    messages: {
                                                        required: "(*) Nhập xác nhận lại mật khẩu"
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label style={{ fontSize: 11 }}>Email</label>
                                            <input type="email" className="form-control" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                                            <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                                {validator.message("email", email, "required", {
                                                    messages: {
                                                        required: "(*) Nhập email"
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="card-footer p-0">
                                <div style={{ textAlign: "end" }}>
                                    <button className="btn btn-sm btn-primary" onClick={(e) => onRegister(e)}>
                                        <i className="fas fa-user-plus"></i> Thêm người dùng
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

export default AddAccount