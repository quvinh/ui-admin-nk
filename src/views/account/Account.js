import React, { useEffect, useState } from 'react';
// import { textFilter } from 'react-bootstrap-table2-filter';
import { Link, useHistory } from 'react-router-dom';
import { getRoleNames, getToken, getUserID } from '../../components/utils/Common';
import { getAllPermissions } from '../../components/utils/Common';
import { delData, getData, postData, putData } from '../../components/utils/Api';


const Account = () => {
    const [dataTable, setDataTable] = useState([])
    const [dataUserDetail, setUserDetail] = useState([])
    const [dataPermission, setPermission] = useState([])
    // const [dataCheckPermission, setDataCheckPermission] = useState([])
    const [dataRoles, setRoles] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])

    const [dataUserClick, setDataUserClick] = useState([])
    const [dataRoleClick, setDataRoleClick] = useState([])

    const [roleName, setRoleName] = useState('')
    const [rolesID, setRolesID] = useState()
    const [permissionID, setPermissionID] = useState('')

    const [isSelected, setIsSelected] = useState(false)

    const [isCheckedAll, setIsCheckedAll] = useState(false)
    const [isCheckedPermission, setIsCheckedPermission] = useState([])
    const [isCheckedRole, setIsCheckedRole] = useState()
    const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])

    //Modal
    const [visibleRoles, setVisibleRoles] = useState(false)
    const [visibleRemove, setVisibleRemove] = useState(false)
    const [visibleRemoveRole, setVisibleRemoveRole] = useState(false)
    const [visibleEditRole, setVisibleEditRole] = useState(false)
    const [visibleAddRole, setVisibleAddRole] = useState(false)
    const [visibleAlert, setVisibleAlert] = useState(false)

    const history = useHistory()

    const showPermission = (user_id, roles_id) => {
        console.log(user_id)
        console.log(roles_id)
        if (roles_id) {
            Promise.all([getData('http://127.0.0.1:8000/api/admin/auth_model/detail_roles/' + user_id + '/' + roles_id + '?token=' + getToken())])
                .then(function (res) {
                    console.log(res[0].roleName.id)
                    setIsCheckedPermission(res[0].data.map(item => item.name))
                    setIsCheckedWarehouse(res[0].manager.map(item => String(item.warehouse_id)))
                    setIsCheckedRole(res[0].roleName.id)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }
    console.log(isCheckedWarehouse)
    const handleCheckPermissionAll = (e) => {
        setIsCheckedAll(!isCheckedAll)
        setIsCheckedPermission(dataPermission.map(item => item.name))
        isCheckedAll && setIsCheckedPermission([])
        setIsSelected(true)
    }

    const handleCheckPermission = (e) => {
        const { name, checked } = e.target
        setIsCheckedPermission([...isCheckedPermission, name])
        !checked && setIsCheckedPermission(isCheckedPermission.filter(item => item !== name))
        setIsSelected(true)
    }

    const handleCheckWarehouse = (e) => {
        const { id, checked } = e.target
        console.log(id)
        setIsCheckedWarehouse([...isCheckedWarehouse, id])
        !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => item !== id))
        setIsSelected(true)
    }
    // console.log(isCheckedWarehouse.includes(1))

    const handleCheckRole = (e) => {
        setIsCheckedRole(e.target.value)
        setIsSelected(true)
    }
    console.log(isCheckedRole)
    const handleGetUsers = () => {
        Promise.all([getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken())])
            // Promise.all([getData('http://127.0.0.1:8000/api/auth/users', {headers:{'Authorization': 'Bearer ' + getToken()}})])
            .then(function (response) {
                console.log("daTA:", response)
                setDataTable(response[0].data)
            })
            .catch(err => {
                // history.push('/login')
                console.log(err)
            })
    }

    //Save user role
    const handelSave = (user_id, roles_id, permission, warehouse_id) => {
        console.log("......")
        if (user_id !== "" && roles_id !== "" && permission.length > 0 && warehouse_id.length > 0) {
            Promise.all([postData('http://127.0.0.1:8000/api/admin/auth_model/user_roles?token=' + getToken(), {
                user_id: user_id,
                roles_id: roles_id,
                permission: permission,
                warehouse_id: warehouse_id
            })])
                .then(function (res) {
                    console.log('SAVED roles')
                    handleGetUsers()
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("NO")
            setVisibleAlert(!visibleAlert)
        }
    }

    //Update role name
    const handelUpdateRoleName = (role_id, role_name) => {
        Promise.all([putData('http://127.0.0.1:8000/api/admin/auth_model/roles/update/' + role_id + '?token=' + getToken(), {
            name: role_name
        })])
            .then(function (res) {
                console.log('UPDATED role name')
                handleGetRoleNames()
                setVisibleEditRole(!visibleEditRole)
            })
            .catch(err => {
                console.log(err)
            })
    }

    //Add role name
    const handelAddRole = (role_name) => {
        Promise.all([postData('http://127.0.0.1:8000/api/admin/auth_model/roles/store?token=' + getToken(), {
            name: role_name
        })])
            .then(function (res) {
                console.log('STORED role name')
                handleGetRoleNames()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handelDeleteRole = (role_id) => {
        Promise.all([delData('http://127.0.0.1:8000/api/admin/auth_model/roles/delete/' + role_id + '?token=' + getToken())])
            .then(function (res) {
                console.log('UPDATED role name')
                handleGetRoleNames()
                handleGetUsers()
                setVisibleRemoveRole(!visibleRemoveRole)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (id) => {
        Promise.all([delData('http://127.0.0.1:8000/api/admin/detail_user/delete/' + id + '?token=' + getToken())])
            .then(function (res) {
                console.log('Deleted')
                handleGetUsers()
                setVisibleRemove(false)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleGetRoleNames = () => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/auth_model/roles?token=' + getToken())])
            .then(function (res) {
                setRoles(res[0].data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }


    useEffect(() => {
        // const header = `Authorization: Bearer ${getToken()}`
        Promise.all([
            getData('http://127.0.0.1:8000/api/auth/users?token=' + getToken()),
            // Promise.all([getData('http://127.0.0.1:8000/api/auth/users', {headers:{'Authorization': 'Bearer ' + getToken()}}),
            getData('http://127.0.0.1:8000/api/admin/detail_user/show/' + getUserID() + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/auth_model/roles?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/auth_model/permission?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
        ])
            .then(function (res) {

                setDataTable(res[0].data)
                setUserDetail(res[1].data)
                setRoles(res[2].data)
                setPermission(res[3].data)
                setDataWarehouse(res[4].data)
                script()
            })
            .catch(error => {
                console.log(error)
                // if (error.response.status === 403) {
                //   history.push('/404')
                // } else if (error.response.status === 401) {
                //   history.push('/login')
                // }
            })
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý người dùng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Người dùng</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div style={{ textAlign: "end" }}>
                                        <Link to={"/account-add"} className="btn btn-sm btn-primary">
                                            <i className="fas fa-user-plus"></i> Thêm người dùng
                                        </Link>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Tên đăng nhập</th>
                                                <th>Họ và tên</th>
                                                <th>Chức vụ</th>
                                                <th>Quyền hạn</th>
                                                <th style={{ width: 10 }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataTable.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{String(index + 1)}</td>
                                                        <td>{item.username}</td>
                                                        <td>{item.fullname}</td>
                                                        <td>{
                                                            (item.roles_id === null) ? (<span className="badge badge-warning">Chưa phân quyền</span>) : (
                                                                <span className="badge badge-primary">
                                                                    {dataRoles.map((value) => {
                                                                        if (value.id === item.roles_id) return value.name
                                                                    })}
                                                                </span>
                                                            )
                                                        }</td>
                                                        <td>
                                                            {/* {
                                                                getAllPermissions.map((item) => (
                                                                    <span className="badge badge-success">Success</span>
                                                                ))
                                                            } */}

                                                            <ul className="list-inline">
                                                                <li className="list-inline-item">
                                                                    <span className="badge badge-success">Chưa hoàn thành</span>
                                                                </li>
                                                                <li className="list-inline-item">
                                                                    <span className="badge badge-success">Chưa hoàn thành</span>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: "center" }}>
                                                                <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <button
                                                                        className="dropdown-item"
                                                                        // to={"/notification-read/1"}
                                                                        data-toggle="modal"
                                                                        data-target="#modal-lg"
                                                                        onClick={(e) => {
                                                                            setDataUserClick(item)
                                                                        }}>
                                                                        Chi tiết
                                                                    </button>
                                                                    <Link to={"/account-edit/" + item.id} className="dropdown-item">Cập nhật</Link>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        {/* <tfoot>
                                            <tr>
                                                <th>Rendering engine</th>
                                                <th>Browser</th>
                                                <th>Platform(s)</th>
                                                <th>Engine version</th>
                                                <th>CSS grade</th>
                                            </tr>
                                        </tfoot> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="modal-lg">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Thông tin người dùng</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td>Username</td>
                                        <td>{dataUserClick.username}</td>
                                    </tr>
                                    <tr>
                                        <td>Họ tên</td>
                                        <td>{dataUserClick.fullname}</td>
                                    </tr>
                                    <tr>
                                        <td>SĐT</td>
                                        <td>{dataUserClick.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{dataUserClick.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Chức vụ</td>
                                        <td>{
                                            (dataUserClick.roles_id === null) ? ("Chưa phân quyền") : (
                                                dataRoles.map((value) => {
                                                    if (value.id === dataUserClick.roles_id) return value.name
                                                })
                                            )
                                        }</td>
                                    </tr>
                                    <tr>
                                        <td>Địa chỉ</td>
                                        <td>{dataUserClick.address ? dataUserClick.address : "Chưa cập nhật"}</td>
                                    </tr>
                                    <tr>
                                        <td>Ngày sinh</td>
                                        <td>{dataUserClick.birthday ? dataUserClick.birthday : "Chưa cập nhật"}</td>
                                    </tr>
                                    <tr>
                                        <td>Giới tính</td>
                                        <td>{dataUserClick.gender ? dataUserClick.gender : "Chưa cập nhật"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer justify-content-between">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Account