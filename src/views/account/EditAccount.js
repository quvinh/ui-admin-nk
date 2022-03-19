import React, { useState, useEffect, createRef, useRef } from 'react'
import { getData, postData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import Validator from '../../components/utils/Validation'
import { getToken } from '../../components/utils/Common'

const EditAccount = (props) => {
    const [dataUser, setDataUser] = useState([])
    const [dataRoles, setRoles] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [roleID, setRoleID] = useState()

    const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])
    const [isCheckedWarehouseAll, setIsCheckedWarehouseAll] = useState(false)

    const [isSelected, setIsSelected] = useState(false)
    const history = useHistory()
    console.log(dataWarehouse)

    const handleCheckWarehouseAll = (e) => {
        setIsCheckedWarehouseAll(!isCheckedWarehouseAll)
        setIsCheckedWarehouse(dataWarehouse.map(item => String(item.id)))
        isCheckedWarehouseAll && setIsCheckedWarehouse([])
        setIsSelected(true)
    }

    const handleCheckWarehouse = (e) => {
        const { id, checked } = e.target
        console.log(id)
        setIsCheckedWarehouse([...isCheckedWarehouse, id])
        !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => String(item) !== String(id)))
        setIsSelected(true)
    }

    useEffect(() => {
        Promise.all([
            getData('http://127.0.0.1:8000/api/auth/get-user/' + props.match.params.id + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/auth_model/roles?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
        ])
            .then(function (res) {
                setDataUser(res[0].data)
                setRoles(res[1].data)
                setDataWarehouse(res[2].data)
            })
            .catch(error => {

            })
    }, [])
    console.log(isCheckedWarehouse)
    console.log(roleID)
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
                                <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                                <li className="breadcrumb-item"><Link to={"/account"}>Người dùng</Link></li>
                                <li className="breadcrumb-item active">Cập nhật người dùng</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <i style={{ fontSize: 18 }}>{dataUser.length === 1 && ('Tên đăng nhập: ' + dataUser[0].username)}</i>
                        </div>
                        <div className="col">
                            <div style={{ textAlign: "end" }}>
                                <button type="button" className="btn btn-sm btn-success">
                                    <i className="fas fa-save " /> Lưu
                                </button>
                                <Link to={"/account"} className="btn btn-sm btn-secondary" style={{ marginLeft: 5 }}>
                                    <i className="fas fa-times"></i> Huỷ
                                </Link>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="card card-secondary">
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
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Chức vụ</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                {
                                                    dataRoles && dataRoles.map((item, index) => (
                                                        <div className="form-group" key={index}>
                                                            <div className="form-check">
                                                                <input className="form-check-input" name="role" type="radio"
                                                                    // value={item.id} checked={String(item.id) === String(isCheckedRole)} Chưa lm xong
                                                                    onClick={() => {
                                                                        // permissionChecked(item.id)
                                                                        // setRoleName(item.name)
                                                                        setRoleID(item.id)
                                                                        setIsSelected(true)
                                                                    }} />
                                                                <label className="form-check-label">{item.name}</label>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">Hoạt động</h3>
                                        </div>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" onChange={() => handleCheckWarehouseAll()} checked={isCheckedWarehouseAll} />
                                                    <label className="form-check-label">Chọn tất cả</label>
                                                </div>
                                                {
                                                    dataWarehouse && dataWarehouse.map((item, index) => (
                                                        <div className="form-check" key={index}>
                                                            <input className="form-check-input" type="checkbox"
                                                                id={parseInt(item.id)} checked={isCheckedWarehouse.includes(String(item.id))} onChange={(e) => handleCheckWarehouse(e)} />
                                                            <label className="form-check-label">{item.name}</label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-footer p-0">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditAccount