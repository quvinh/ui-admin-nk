import React, { useState, useEffect, createRef, useRef } from 'react'
import { getData, postData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import { getToken, getUserID } from '../../components/utils/Common'

const EditAccount = (props) => {
    const [dataUser, setDataUser] = useState([])
    const [dataRoles, setRoles] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [roleID, setRoleID] = useState()

    const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])
    const [isCheckedWarehouseAll, setIsCheckedWarehouseAll] = useState(false)

    const [isSelected, setIsSelected] = useState(false)
    const history = useHistory()
    // console.log(props)

    const handleCheckWarehouseAll = (e) => {
        setIsCheckedWarehouseAll(!isCheckedWarehouseAll)
        setIsCheckedWarehouse(dataWarehouse.map(item => parseInt(item.id)))
        isCheckedWarehouseAll && setIsCheckedWarehouse([])
        setIsSelected(true)
    }

    const handleCheckWarehouse = (e) => {
        const { id, checked } = e.target
        console.log(id)
        setIsCheckedWarehouse([...isCheckedWarehouse, parseInt(id)])
        !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => parseInt(item) !== parseInt(id)))
        setIsSelected(true)
    }

    const handelSave = () => {
        console.log("......")
        if (roleID !== 0) {
            Promise.all([postData('/api/admin/auth_model/user_roles?token=' + getToken(), {
                user_id: dataUser[0].id,
                roles_id: roleID,
                warehouse_id: isCheckedWarehouse
            })])
                .then(function (res) {
                    console.log('SAVED roles')
                    history.push('/account')
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("NO")
        }
    }
    useEffect(() => {
        Promise.all([
            getData('/api/auth/get-user/' + props.match.params.id + '?token=' + getToken()),
            getData('/api/admin/auth_model/roles?token=' + getToken()),
            getData('/api/admin/warehouse?token=' + getToken()),
            getData('/api/auth/get-user/' + getUserID() + '?token=' + getToken())
        ])
            .then(function (res) {
                // console.log(res)
                setDataUser(res[0].data)
                setRoleID(res[0].role_id)
                setRoles(res[1].data)
                setDataWarehouse(res[2].data)
                setIsCheckedWarehouse(res[2].data.map(item => item.id))
            })
            .catch(error => {

            })
    }, [])
    console.log(isCheckedWarehouse)
    console.log(roleID)
    return (
        <div className="content-wrapper">
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
                                <button type="button" className="btn btn-sm btn-success" onClick={handelSave}>
                                    <i className="fas fa-save " /> Lưu
                                </button>
                                <Link to={"/account"} className="btn btn-sm btn-secondary" style={{ marginLeft: 5 }}>
                                    <i className="fas fa-times"></i> Huỷ
                                </Link>
                            </div>
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
                                                                value={item.id} checked={parseInt(item.id) === parseInt(roleID)}
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
                                                            id={item.id} checked={isCheckedWarehouse.includes(parseInt(item.id))} onChange={(e) => handleCheckWarehouse(e)} />
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
            </section >
        </div >
    )
}

export default EditAccount