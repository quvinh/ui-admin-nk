/* eslint-disable no-undef */
import React, { useState, useEffect, createRef, useRef } from 'react'
import { delData, getData, postData, putData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import Validator from '../../components/utils/Validation'
import { getRoleNames, getToken } from '../../components/utils/Common'

const Role = () => {
    const [dataTable, setDataTable] = useState([])
    const [dataRoles, setRoles] = useState([])
    const [dataPermission, setPermission] = useState([])

    const [newRole, setNewRole] = useState()
    const [roleName, setRoleName] = useState()
    const [roleID, setRoleID] = useState()

    const [isCheckedPermission, setIsCheckedPermission] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    const [isCheckedImport, setIsCheckedImport] = useState([])
    const [isCheckedImportAll, setIsCheckedImportAll] = useState(false)
    const [isCheckedExportAll, setIsCheckedExportAll] = useState(false)
    const [isCheckedTransferAll, setIsCheckedTransferAll] = useState(false)
    const [isCheckedWarehouseAll, setIsCheckedWarehouseAll] = useState(false)
    const [isCheckedShelfAll, setIsCheckedShelfAll] = useState(false)
    const [isCheckedCategoryAll, setIsCheckedCategoryAll] = useState(false)
    const [isCheckedItemAll, setIsCheckedItemAll] = useState(false)
    const [isCheckedSupplierAll, setIsCheckedSupplierAll] = useState(false)
    const [isCheckedNotificationAll, setIsCheckedNotificationAll] = useState(false)

    const [validator, showValidationMessage] = Validator()

    const permissionChecked = (role_id) => {
        if (role_id) {
            Promise.all([getData('/api/admin/auth_model/roles/show/' + role_id)])
                .then(function (res) {
                    console.log(res)
                    setIsCheckedPermission(res[0].data.map(item => item.name))
                    // setIsCheckedImport(res[0].dataImport.map(item => item))
                    //   setIsCheckedWarehouse(res[0].manager.map(item => String(item.warehouse_id)))
                    //   setIsCheckedRole(res[0].roleName.id)
                })
                .catch(err => {
                    console.log(err)
                })

            setIsSelected(true)
        }
    }

    console.log(dataPermission)
    const handleCheckImportAll = (e) => {
        const { checked } = e.target
        setIsCheckedImportAll(!isCheckedImportAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataImport.includes(item)), ...dataPermission.dataImport.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataImport.includes(item)))
        setIsSelected(true)
    }

    const handleCheckExportAll = (e) => {
        const { checked } = e.target
        setIsCheckedExportAll(!isCheckedExportAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataExport.includes(item)), ...dataPermission.dataExport.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataExport.includes(item)))
        setIsSelected(true)
    }

    const handleCheckTransferAll = (e) => {
        const { checked } = e.target
        setIsCheckedTransferAll(!isCheckedTransferAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataTransfer.includes(item)), ...dataPermission.dataTransfer.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataTransfer.includes(item)))
        setIsSelected(true)
    }

    const handleCheckWarehouseAll = (e) => {
        const { checked } = e.target
        setIsCheckedWarehouseAll(!isCheckedWarehouseAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataWarehouse.includes(item)), ...dataPermission.dataWarehouse.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataWarehouse.includes(item)))
        setIsSelected(true)
    }

    const handleCheckShelfAll = (e) => {
        const { checked } = e.target
        setIsCheckedShelfAll(!isCheckedShelfAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataShelf.includes(item)), ...dataPermission.dataShelf.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataShelf.includes(item)))
        setIsSelected(true)
    }

    const handleCheckCategoryAll = (e) => {
        const { checked } = e.target
        setIsCheckedCategoryAll(!isCheckedCategoryAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataCategory.includes(item)), ...dataPermission.dataCategory.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataCategory.includes(item)))
        setIsSelected(true)
    }

    const handleCheckItemAll = (e) => {
        const { checked } = e.target
        setIsCheckedItemAll(!isCheckedItemAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataItem.includes(item)), ...dataPermission.dataItem.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataItem.includes(item)))
        setIsSelected(true)
    }

    const handleCheckNotificationAll = (e) => {
        const { checked } = e.target
        setIsCheckedNotificationAll(!isCheckedNotificationAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataNotification.includes(item)), ...dataPermission.dataNotification.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataNotification.includes(item)))
        setIsSelected(true)
    }

    const handleCheckSupplierAll = (e) => {
        const { checked } = e.target
        setIsCheckedSupplierAll(!isCheckedSupplierAll)
        checked && setIsCheckedPermission([...isCheckedPermission.filter(item => !dataPermission.dataSupplier.includes(item)), ...dataPermission.dataSupplier.map(item => item)])
        !checked && isCheckedPermission && setIsCheckedPermission(isCheckedPermission.filter(item => !dataPermission.dataSupplier.includes(item)))
        setIsSelected(true)
    }

    const handleCheckPermission = (e) => {
        const { name, checked } = e.target
        setIsCheckedPermission([...isCheckedPermission, name])
        !checked && setIsCheckedPermission(isCheckedPermission.filter(item => item !== name))
        setIsSelected(true)
    }

    //Add role name
    const handleAddRole = (role_name) => {
        if (validator.allValid()) {
            Promise.all([postData('/api/admin/auth_model/roles/store', {
                name: role_name
            })])
                .then(function (res) {
                    console.log('STORED role name')
                    handleGetRoleNames()
                })
                .catch(err => {
                    console.log(err)
                })
        } else showValidationMessage(true)
        setNewRole('')
    }

    const handleGetRoleNames = () => {
        Promise.all([getData('/api/admin/auth_model/roles')])
            .then(function (res) {
                setRoles(res[0].data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handelDeleteRole = (role_id) => {
        Promise.all([delData('/api/admin/auth_model/roles/delete/' + role_id)])
            .then(function (res) {
                console.log('UPDATED role name')
                handleGetRoleNames()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const alert = () => {
        const compile = document.createElement("script")
        compile.src = $(function () {
            var Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            $('.toastrDefaultSuccess').click(function () {
                toastr.success('L??u th??nh c??ng')
            });
        })
        compile.async = true
        document.body.appendChild(compile)
    }

    const handleSave = () => {
        console.log("......")
        if (roleID && isCheckedPermission) {
            Promise.all([putData('/api/admin/auth_model/roles/update/' + roleID, {
                permission: isCheckedPermission
            })])
                .then(function (res) {
                    console.log('SAVED roles')
                    setIsSelected(false)
                    // alert()
                })
                .catch(err => {
                    console.log(err)
                })

        } else {
            console.log("NO")
        }

    }
    
    useEffect(() => {
        // const header = `Authorization: Bearer ${getToken()}`
        Promise.all([
            getData('/api/admin/auth_model/roles'),
            getData('/api/admin/auth_model/permission'),
        ])
            .then(function (res) {
                setRoles(res[0].data)
                setPermission(res[1])

            })
            .catch(error => {
                console.log(error)
            })
        alert()
    }, [])

    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Ch???c v???</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Trang ch???</Link></li>
                                <li className="breadcrumb-item active">Ch???c v???</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                        </div>
                        <div className="col">
                            <div style={{ textAlign: "end" }}>
                                <button type="button" className="btn btn-sm btn-success toastrDefaultSuccess" onClick={handleSave}>
                                    <i className="fas fa-save " /> L??u
                                </button>
                                <Link to={"/"} className="btn btn-sm btn-secondary" style={{ marginLeft: 5 }}>
                                    <i className="fas fa-times"></i> Hu???
                                </Link>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="card card-secondary">
                        <div className="card-header">
                            <h3 className="card-title">Ch???c v???</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col"></div>
                                <div className="col">
                                    <div className="form-group">
                                        <input type="text" name="newRole" className="form-control" placeholder="Th??m m???i ch???c v???"
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                        />
                                        <div style={{ color: "red", fontStyle: "italic", fontSize: 11 }}>
                                            {validator.message("newRole", newRole, "required", {
                                                messages: {
                                                    required: "(*) T??n ch???c v??? kh??ng ???????c tr???ng"
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-header">
                                            Danh s??ch
                                        </div>
                                        <div className="card-body">
                                            {
                                                dataRoles && dataRoles.map((item, index) => (
                                                    <div className="form-group" key={index}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" name="role" type="radio" onClick={() => {
                                                                permissionChecked(item.id)
                                                                setRoleName(item.name)
                                                                setRoleID(item.id)
                                                            }} />
                                                            <label className="form-check-label">{item.name}</label>
                                                            {
                                                                item.id !== 1 && (
                                                                    <button className="btn btn-sm btn-danger" style={{ float: "right" }} onClick={() => {
                                                                        handelDeleteRole(item.id)
                                                                        getRoleNames()
                                                                    }}>Xo??</button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="col"><button className="btn btn-sm btn-primary" onClick={() => handleAddRole(newRole)}>Th??m m???i</button></div>
                            </div>

                            <div className="card-footer p-0">
                            </div>
                        </div>
                    </div>
                    <h6><i>* Quy???n h???n {roleName && (<span style={{fontSize: 22, color: "blue"}}>- <u>{roleName}</u></span>)}</i></h6>
                    <div className="row">
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Nh???p v???t t??</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckImportAll(e)} checked={isCheckedImportAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataImport && dataPermission.dataImport.map((item, index) => (
                                            <div className="form-group" key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Kho</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckWarehouseAll(e)} checked={isCheckedWarehouseAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataWarehouse && dataPermission.dataWarehouse.map((item, index) => (
                                            <div className="form-group" key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Th??ng b??o</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckNotificationAll(e)} checked={isCheckedNotificationAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataNotification && dataPermission.dataNotification.map((item, index) => (
                                            <div className="form-group">
                                                <div className="form-check" key={index}>
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Xu???t v???t t??</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckExportAll(e)} checked={isCheckedExportAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataExport && dataPermission.dataExport.map((item, index) => (
                                            <div className="form-group" key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Gi??/k???</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckShelfAll(e)} checked={isCheckedShelfAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataShelf && dataPermission.dataShelf.map((item, index) => (
                                            <div className="form-group" key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Nh?? cung c???p</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckSupplierAll(e)} checked={isCheckedSupplierAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataSupplier && dataPermission.dataSupplier.map((item, index) => (
                                            <div className="form-group" key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Lu??n chuy???n</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckTransferAll(e)} checked={isCheckedTransferAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataTransfer && dataPermission.dataTransfer.map((item, index) => (
                                            <div className="form-group" key={index}>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Lo???i v???t t??</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckCategoryAll(e)} checked={isCheckedCategoryAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataCategory && dataPermission.dataCategory.map((item, index) => (
                                            <div className="form-group">
                                                <div className="form-check" key={index}>
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>V???t t??</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" onChange={(e) => handleCheckItemAll(e)} checked={isCheckedItemAll} />
                                            <label className="form-check-label">Ch???n t???t c???</label>
                                        </div>
                                    </div>
                                    {
                                        dataPermission.dataItem && dataPermission.dataItem.map((item, index) => (
                                            <div className="form-group">
                                                <div className="form-check" key={index}>
                                                    <input className="form-check-input" type="checkbox" name={item}
                                                        checked={isCheckedPermission.includes(item)}
                                                        onChange={(e) => handleCheckPermission(e)} />
                                                    <label className="form-check-label">{item}</label>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title"><b>Th???ng k??</b></h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" name="Th???ng k??" checked={isCheckedPermission.includes("Th???ng k??")} onChange={(e) => handleCheckPermission(e)} />
                                            <label className="form-check-label">Th???ng k??</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Role