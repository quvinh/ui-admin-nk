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
        Promise.all([delData('/api/admin/suppliers/delete/' + id)])
            .then(function (res) {
                handleReload()
                // eClick.closest('tr').remove();
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleReload = () => {
        Promise.all([getData('/api/admin/suppliers')])
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
        Promise.all([postData('/api/admin/suppliers/store', data)])
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
        Promise.all([putData('/api/admin/suppliers/update/' + id, data)])
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
        Promise.all([getData('/api/admin/suppliers/show/' + id),
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
        Promise.all([getData('/api/admin/suppliers')])
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
                            <h1>Qu???n l?? nh?? cung c???p</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang ch???</a></li>
                                <li className="breadcrumb-item active">Nh?? cung c???p</li>
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
                                        getAllPermissions().includes("Th??m nh?? cung c???p") && (
                                            <div className='modal-footer justify-content-end'>
                                                <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg">
                                                    <i className="fa fa-plus" aria-hidden="true"></i> t???o m???i
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
                                                <th className='text-center'>M?? nh?? cung c???p</th>
                                                <th className='text-center'>T??n nh?? cung c???p</th>
                                                <th className='text-center'>Ng?????i li??n h???</th>
                                                <th className='text-center'>Email</th>
                                                <th className='text-center'>??i???n tho???i</th>
                                                <th className='text-center'>?????a ch???</th>
                                                <th className='text-center'>Ch?? th??ch</th>
                                                <th className='text-center'>Thao t??c</th>
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
                                                                        getAllPermissions().includes("X??a nh?? cung c???p") && (
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                handleDelete(item.id)
                                                                            }} data-toggle="modal" data-target="#modal-lg">x??a</a>
                                                                        )
                                                                    }
                                                                    {
                                                                        getAllPermissions().includes("S???a nh?? cung c???p") && (
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                setIsSelected(true)
                                                                                setId(item.id)
                                                                                handleSuppliers(item.id)
                                                                            }} data-toggle="modal" data-target="#modal-lg">C???p nh???t</a>
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
                                                <h4 className="modal-title">C???p nh???t</h4>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close"
                                                    onClick={(e) => {
                                                        setNull()
                                                        setIsSelected(false)
                                                    }}>
                                                    <span aria-hidden="true">??</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="modal-title">T???o m???i</h4>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close"
                                                    onClick={(e) => {
                                                        setIsSelected(false)
                                                        setNull()
                                                    }}>
                                                    <span aria-hidden="true">??</span>
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
                                                <label htmlFor="code" className="col-sm-2 col-form-label">M?? nh?? cung c???p</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleCode} id="code" placeholder="Tr???ng" value={code} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="name" className="col-sm-2 col-form-label">T??n nh?? cung c???p</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleName} id="name" placeholder="Tr???ng" value={name} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="contact_person" className="col-sm-2 col-form-label">Ng?????i li??n h???</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleContactPerson} id="contact_person" placeholder="Tr???ng" value={contactPerson} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-10">
                                                    <input type="email" className="form-control" onChange={handleEmail} id="email" placeholder="Tr???ng" value={email} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="phone" className="col-sm-2 col-form-label">??i???n tho???i</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handlePhone} id="phone" placeholder="Tr???ng" value={phone} />
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label htmlFor="address" className="col-sm-2 col-form-label">?????a ch???</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleAddress} id="address" placeholder="Tr???ng" value={address} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="note" className="col-sm-2 col-form-label">Gh?? ch??:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleNote} id="note" placeholder="Tr???ng" value={note} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-end">
                                    {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                    {
                                        (isSelected) ? (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateForm(e) }}>L??u</button>
                                        ) : (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleAddForm(e) }}>L??u</button>
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
