/* eslint-disable jsx-a11y/anchor-is-valid */
import { FormControl, InputLabel, Select } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { delData, getData, postData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'
import Validator from '../../components/utils/Validation'

const Category = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [note, setNote] = useState('')
    const [isSelected, setIsSelected] = useState(false)

    const [validator, showValidationMessage] = Validator()
    const [dataTable, setDataTable] = useState([])
    const history = useHistory()
    const handleDelete = (e, id) => {
        Promise.all([delData('/api/admin/category/delete/' + id)])
            .then(function (res) {
                // handleReload()
                script()
            })
            .catch(error => {
                console.log(error)
            })
    }
    const handleReload = () => {
        Promise.all([getData('/api/admin/category')])
            .then(function (res) {
                setDataTable(res[0].data)
            })
    }

    const data = {
        id: id,
        name: name,
        note: note
    }

    const handleAdd = () => {
        Promise.all([postData('/api/admin/category/store', data)])
            .then(function (res) {
                handleReload()
                // history.goBack();
                // history.push('/category')
                setNull()
                script()
            }).catch(err => {
                console.log(err.response.status)
            })
        // history.push('/category')  

    }
    const handleUpdate = (e) => {
        console.log(data)
        Promise.all([putData('/api/admin/category/update/' + id, data)])
            .then(function (res) {
                console.log('success')
                setNull()
            }).catch(err => {
                console.log(err.response.status)
            })
    }
    const handleName = (e) => setName(e.target.value)

    const handleNote = (e) => setNote(e.target.value)

    const setNull = () => {
        setId('')
        setName('')
        setNote('')
        setIsSelected(false)
    }


    //item
    const [dataItem, setDataItem] = useState('')
    const [nameItem, setNameItem] = useState('')
    const [categoryIdItem, setCategoryIdItem] = useState('')
    const [idItem, setIdItem] = useState('')
    const [unitItem, setUnitItem] = useState('')
    const [noteItem, setNoteItem] = useState('')

    const [isSelectedItem, setIsSelectedItem] = useState(false)

    const handleReloadItem = () => {
        Promise.all([getData('/api/admin/items')])
            .then(function (res) {
                setDataItem(res[0].data)
            })
    }

    const setNullItem = () => {
        setNameItem('')
        setCategoryIdItem('')
        setIdItem('')
        setUnitItem('')
        setNoteItem('')
    }

    const dataList = {
        name: nameItem,
        category_id: categoryIdItem,
        id: idItem,
        unit: unitItem,
        note: noteItem
    }
    const handleAddItem = () => {
        console.log(dataList)
        Promise.all([postData('/api/admin/items/store', dataList)])
            .then(function (res) {
                handleReloadItem()
                setNullItem()
            }).catch(err => {
                console.log(err.response.status)
            })
    }
    const handleUpdateItem = (e) => {
        console.log(dataList)
        Promise.all([putData('/api/admin/items/update/' + idItem, dataList)])
            .then(function (res) {
                console.log('success')
                handleReloadItem()
                setNullItem()
            }).catch(err => {
                console.log(err.response.status)
            })
    }

    const handleDeleteItem = (e, id) => {
        Promise.all([delData('/api/admin/items/delete/' + id)])
            .then(function (res) {
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        Promise.all([(getData('/api/admin/category')),
        (getData('/api/admin/items')),
        ])
            .then(function (res) {
                console.log(res[0].data)
                setDataTable(res[0].data)
                setDataItem(res[1].data)
                script()
            })
            .catch(error => {
                console.log(error.response.status)
            })
    }, [])
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Lo???i v???t t??</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang ch???</a></li>
                                <li className="breadcrumb-item active">Lo???i v???t t??</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div class="col-12 col-sm-12">
                            <div class="card card-primary card-outline card-outline-tabs">
                                <div class="card-header p-0 border-bottom-0">
                                    <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Lo???i v???t t??</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" href="#custom-tabs-four-profile" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Danh m???c v???t t??</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-four-tabContent">
                                        <div class="tab-pane fade show active" id="custom-tabs-four-home" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
                                            <h6><strong>Danh s??ch lo???i v???t t??</strong></h6>
                                            <div className='modal-footer justify-content-end'>
                                                {
                                                    getAllPermissions().includes("Th??m lo???i v???t t??") && (
                                                        <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg" onClick={(e) => setIsSelected(false)}>
                                                            <i className="fa fa-plus" aria-hidden="true"></i> T???o m???i lo???i v???t t??
                                                        </button>
                                                    )
                                                }
                                            </div>
                                            <table id="item" className="table table-bordered table-striped tbl">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Lo???i v???t t??</th>
                                                        <th>Ghi ch??</th>
                                                        <th style={{ width: 10 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataTable && dataTable.map((item, index) => (
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td id="name">{item.name}</td>
                                                                <td id="note">{item.note}</td>
                                                                <td>
                                                                    <div style={{ textAlign: "center" }}>
                                                                        <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            {
                                                                                getAllPermissions().includes("S???a lo???i v???t t??") && (
                                                                                    <a className="dropdown-item" data-toggle="modal" data-target="#modal-lg" onClick={(e) => {
                                                                                        setId(item.id)
                                                                                        setName(item.name)
                                                                                        setNote(item.note)
                                                                                        setIsSelected(true)
                                                                                    }}>C???p nh???t</a>
                                                                                )
                                                                            }
                                                                            {
                                                                                getAllPermissions().includes("Xo?? lo???i v???t t??") && (
                                                                                    <button className='dropdown-item btnDelete' onClick={(e) => handleDelete(e, item.id)}>X??a</button>
                                                                                )
                                                                            }

                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                                <tfoot>
                                                </tfoot>
                                            </table>
                                        </div>


                                        <div class="tab-pane fade" id="custom-tabs-four-profile" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">
                                            <h6><strong>Danh m???c v???t t??</strong></h6>
                                            <div className='modal-footer justify-content-end'>
                                                {
                                                    getAllPermissions().includes("Th??m v???t t??") && (
                                                        <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-item" onClick={(e) => setIsSelected(false)}>
                                                            <i className="fa fa-plus" aria-hidden="true"></i> Th??m m???i v???t t??
                                                        </button>
                                                    )
                                                }
                                            </div>
                                            <table id="list-item" className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>M?? v???t t??</th>
                                                        <th>T??n v???t t??</th>
                                                        <th>Nh??m</th>
                                                        <th>DVT</th>
                                                        <th>M?? t???</th>
                                                        <th style={{ width: 10 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataItem && dataItem.map((item, index) => (
                                                            <tr>
                                                                <td>{index + 1}</td>
                                                                <td>{item.id}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.category_name}</td>
                                                                <td>{item.unit}</td>
                                                                <td>{item.note}</td>
                                                                <td>
                                                                    <div style={{ textAlign: "center" }}>
                                                                        <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            {
                                                                                getAllPermissions().includes("S???a v???t t??") && (
                                                                                    <a className="dropdown-item" data-toggle="modal" data-target="#modal-item" onClick={(e) => {
                                                                                        setIdItem(item.id)
                                                                                        setNameItem(item.name)
                                                                                        setCategoryIdItem(item.category_id)
                                                                                        setUnitItem(item.unit)
                                                                                        setNoteItem(item.note)
                                                                                        setIsSelectedItem(true)
                                                                                    }}>C???p nh???t</a>
                                                                                )
                                                                            }
                                                                            {
                                                                                getAllPermissions().includes("Xo?? v???t t??") && (
                                                                                    <button className='dropdown-item btnDelete' onClick={(e) => {
                                                                                        handleDeleteItem(e, item.id)
                                                                                    }}>X??a</button>
                                                                                )
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                                <tfoot>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </section>
            <div className="modal fade" data-backdrop="static" id="modal-lg">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                (isSelected) ? (
                                    <>
                                        <h4 className="modal-title">C???p nh???t lo???i v???t t??</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" onClick={(e) => { setNull() }}>??</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="modal-title">Th??m lo???i v???t t?? m???i</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" onClick={(e) => { setNull() }}>??</span>
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
                                        <label htmlFor="shelf_name" className="col-sm-2 col-form-label">T??n lo???i v???t t??:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={(e) => { handleName(e) }} id="name" placeholder="Tr???ng" value={name} />
                                        </div>
                                    </div>
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("name", name, "required", {
                                            messages: {
                                                required: "(*) Nh???p t??n lo???i v???t t??"
                                            }
                                        })}
                                    </div>
                                    <div className="form-group row">
                                        <label htmlFor="position" className="col-sm-2 col-form-label">Ghi ch??:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={(e) => { handleNote(e) }} id="note" placeholder="Tr???ng" value={note} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            (isSelected) ? (
                                <div className="modal-footer justify-content-end">
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdate(e) }}>L??u</button>
                                </div>
                            ) : (
                                <div className="modal-footer justify-content-end">
                                    <button type="button" className="btn btn-success" data-dismiss="modal" id="addbtn" onClick={(e) => { handleAdd(e) }}>L??u</button>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
            <div className="modal fade" data-backdrop="static" id="modal-item">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            {
                                (isSelectedItem) ? (
                                    <>
                                        <h4 className="modal-title">C???p nh???t v???t t??</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" onClick={(e) => { setNullItem() }}>??</span>
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="modal-title">Th??m m???i danh m???c v???t t??</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true" onClick={(e) => { setNullItem() }}>??</span>
                                        </button>
                                    </>
                                )
                            }
                        </div>
                        <div className="modal-body">
                            <form className="form-horizontal">
                                <hr />
                                <div className="card-body">
                                    {isSelectedItem ? (<></>) : (
                                        <>
                                            <div className="form-group row">
                                                <label htmlFor="id" className="col-sm-2 col-form-label">M?? v???t t??</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={(e) => { setIdItem(e.target.value) }} id="id" placeholder="Tr???ng" value={idItem} />
                                                </div>
                                            </div>
                                        </>

                                    )}

                                    <div className="form-group row">
                                        <label htmlFor="name" className="col-sm-2 col-form-label">T??n v???t t??:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={(e) => { setNameItem(e.target.value) }} id="name" placeholder="Tr???ng" value={nameItem} />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div className='row'>
                                            <div className='col-md-2'>
                                                <label>Nh??m</label>
                                            </div>
                                            <div className='col-md-10'>
                                                <select class="form-control" value={categoryIdItem} onChange={(e) => {
                                                    setCategoryIdItem(e.target.value)
                                                }}>
                                                    <option>Ch???n lo???i v???t t??</option>
                                                    {
                                                        dataTable && dataTable.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                    {/* </div> */}
                                    {/* <div className="form-group row"> */}
                                    <div className='row' style={{ marginBottom: "15px" }}>
                                        <div className='col-md-2'>
                                            <label>????n v??? t??nh:</label>
                                        </div>
                                        <div className='col-md-10'>
                                            <select class="form-control" value={unitItem} onChange={(e) => {
                                                setUnitItem(e.target.value)
                                            }}>
                                                <option>Ch???n ????n v??? t??nh</option>
                                                <option value={'Chi???c'}>Chi???c</option>
                                                <option value={'B???'}>B???</option>
                                                <option value={'C??i'}>C??i</option>
                                                <option value={'Can'}>Can</option>
                                                <option value={'????i'}>????i</option>
                                                <option value={'Lon'}>Lon</option>
                                                <option value={'??ng'}>??ng</option>
                                            </select>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                    <div className="form-group row">
                                        <label htmlFor="note" className="col-sm-2 col-form-label">Ghi ch??:</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={(e) => { setNoteItem(e.target.value) }} id="note" placeholder="Tr???ng" value={noteItem} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {
                            (isSelectedItem) ? (
                                <div className="modal-footer justify-content-end">
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateItem(e) }}>L??u</button>
                                </div>
                            ) : (
                                <div className="modal-footer justify-content-end">
                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleAddItem(e) }}>L??u</button>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category