/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { getData, putData, delData, postData } from '../../components/utils/Api'
import { useHistory } from 'react-router-dom';
import Validator from '../../components/utils/Validation'
import { getAllPermissions, getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'

const Supplier = () => {

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const [dataTable, setDataTable] = useState([])
    const [isSelected, setIsSelected] = useState(false)

    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [code, setCode] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [contactPerson, setContactPerson] = useState('')
    const [note, setNote] = useState('')

    const handleCode = (e) => {
        setCode(e.target.value);
    }

    const handleName = (e) => {
        setName(e.target.value);
    }


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleAddress = (e) => {
        setAddress(e.target.value);
    }

    const handleContactPerson = (e) => {
        setContactPerson(e.target.value);
    }

    const handlePhone = (e) => {
        setPhone(e.target.value);
    }

    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const setNull = () => {
        setCode('')
        setName('')
        setContactPerson('')
        setEmail('')
        setPhone('')
        setAddress('')
        setNote('')
    }
    const handleDelete = (e, id) => {
        console.log(id)
        Promise.all([delData('/api/admin/suppliers/delete/' + id + '?token=' + getToken())])
            .then(function (res) {
                handleReload()
                // eClick.closest('tr').remove();
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleReload = () => {
        Promise.all([getData('/api/admin/suppliers?token=' + getToken())])
            .then(function (res) {
                setDataTable(res[0].data)
                script()
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleAddForm = () => {
        const data = {
            code: code,
            name: name,
            email: email,
            address: address,
            contact_person: contactPerson,
            phone: phone,
            note: note
        }
        console.log(data);
        Promise.all([postData('/api/admin/suppliers/store?token=' + getToken(), data)])
            .then(function (res) {
                console.log('Added succesfully', res)
                handleReload()
            }).catch(error => {
                console.log(data)
                // validatorAll()
                console.log(':(((')
                console.log(error)
            })
    }

    const handleUpdateForm = (e) => {
        const data = {
            code: code,
            name: name,
            email: email,
            address: address,
            contact_person: contactPerson,
            phone: phone,
            note: note
        }
        console.log(id);
        Promise.all([putData('/api/admin/suppliers/update/' + id + '?token=' + getToken(), data)])
            .then(function (res) {
                console.log('Added succesfully', res)
                handleReload()
            }).catch(error => {
                console.log(data)
                // validatorAll()
                console.log(':(((')
                console.log(error)
            })

    }
    const handleSuppliers = (id) => {
        Promise.all([getData('/api/admin/suppliers/show/' + id + '?token=' + getToken()),
        ])
            .then(function (res) {
                console.log(res[0].data)
                setName(res[0].data.name)
                setContactPerson(res[0].data.contact_person)
                setPhone(res[0].data.phone)
                setCode(res[0].data.code)
                setEmail(res[0].data.email)
                setAddress(res[0].data.address)
                setNote(res[0].data.note)
            })
    }


    useEffect(() => {
        Promise.all([getData('/api/admin/suppliers?token=' + getToken())])
            .then(function (res) {
                // console.log(res[0].data)
                setDataTable(res[0].data)
                script()
            })
            .catch(error => {
                console.log(error)
            })

    }, [])
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý nhà cung cấp</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Nhà cung cấp</li>
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
                                    <h3 className="card-title"></h3>
                                    {
                                        getAllPermissions().includes("Thêm nhà cung cấp") && (
                                            <div className='modal-footer justify-content-end'>
                                                <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg">
                                                    <i className="fa fa-plus" aria-hidden="true"></i> tạo mới
                                                </button>
                                            </div>
                                        )
                                    }
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="supplier" className="table table-hover ">
                                        <thead>
                                            <tr>
                                                <th className='text-center'>STT</th>
                                                <th className='text-center'>Mã nhà cung cấp</th>
                                                <th className='text-center'>Tên nhà cung cấp</th>
                                                <th className='text-center'>Người liên hệ</th>
                                                <th className='text-center'>Email</th>
                                                <th className='text-center'>Điện thoại</th>
                                                <th className='text-center'>Địa chỉ</th>
                                                <th className='text-center'>Chú thích</th>
                                                <th className='text-center'>Thao tác</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                dataTable.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='text-center'>{String(index + 1)}</td>
                                                        <td className='text-center'>{item.code}</td>
                                                        <td className='text-center'>{item.name}</td>
                                                        <td className='text-center'>{item.contact_person}</td>
                                                        <td className='text-center'>{item.email}</td>
                                                        <td className='text-center'>{item.phone}</td>
                                                        <td className='text-center'>{item.address}</td>
                                                        <td className='text-center'>{item.note}</td>
                                                        <td className='text-center'>
                                                            <div>
                                                                <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    {
                                                                        getAllPermissions().includes("Xóa nhà cung cấp") && (
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                handleDelete(item.id)
                                                                            }} data-toggle="modal" data-target="#modal-lg">xóa</a>
                                                                        )
                                                                    }
                                                                    {
                                                                        getAllPermissions().includes("Sửa nhà cung cấp") && (
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                setIsSelected(true)
                                                                                setId(item.id)
                                                                                handleSuppliers(item.id)
                                                                            }} data-toggle="modal" data-target="#modal-lg">Cập nhật</a>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="modal-lg">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        (isSelected) ? (
                                            <>
                                                <h4 className="modal-title">Cập nhật</h4>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close"
                                                    onClick={(e) => {
                                                        setNull()
                                                        setIsSelected(false)
                                                    }}>
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="modal-title">Tạo mới</h4>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close"
                                                    onClick={(e) => {
                                                        setIsSelected(false)
                                                        setNull()
                                                    }}>
                                                    <span aria-hidden="true">×</span>
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="modal-body">
                                    <form className="form-horizontal">
                                        <hr />
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label htmlFor="code" className="col-sm-2 col-form-label">Mã nhà cung cấp</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleCode} id="code" placeholder="Trống" value={code} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="name" className="col-sm-2 col-form-label">Tên nhà cung cấp</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleName} id="name" placeholder="Trống" value={name} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="contact_person" className="col-sm-2 col-form-label">Người liên hệ</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleContactPerson} id="contact_person" placeholder="Trống" value={contactPerson} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control" onChange={handleEmail} id="email" placeholder="Trống" value={email} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="phone" className="col-sm-2 col-form-label">Điện thoại</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handlePhone} id="phone" placeholder="Trống" value={phone} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="address" className="col-sm-2 col-form-label">Địa chỉ</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleAddress} id="address" placeholder="Trống" value={address} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="note" className="col-sm-2 col-form-label">Ghí chú:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleNote} id="note" placeholder="Trống" value={note} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-end">
                                    {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                    {
                                        (isSelected) ? (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateForm(e) }}>Lưu</button>
                                        ) : (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleAddForm(e) }}>Lưu</button>
                                        )
                                    }
                                </div>
                            </div>
                            {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Supplier;
