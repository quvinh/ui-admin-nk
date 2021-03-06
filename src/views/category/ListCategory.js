import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { delData, getData, postData, putData } from '../../components/utils/Api'
import { getToken } from '../../components/utils/Common'
import Validator from '../../components/utils/Validation'

const ListCategory = () => {
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
                handleReload()
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
            }).catch(err => {
                console.log(err.response.status)
            })
    }
    const handleUpdate = (e) => {
        console.log(data)
        Promise.all([putData('/api/admin/category/update/' + id, data)])
            .then(function (res) {
                console.log('success')
                handleReload()
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
    useEffect(() => {
        Promise.all([(getData('/api/admin/category'))
        ])
            .then(function (res) {
                console.log(res[0].data)
                setDataTable(res[0].data)
            })
            .catch(error => {
                console.log(error.response.status)
            })
    }, [])
    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <h6><strong>Danh s??ch lo???i v???t t??</strong></h6>
                            <div className='modal-footer justify-content-end'>
                                <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg" onClick={(e) => setIsSelected(false)}>
                                    <i class="fa fa-plus" aria-hidden="true"></i> T???o m???i lo???i v???t t??
                                </button>
                            </div>
                            <table id="item" className="table table-bordered table-striped">
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
                                                <td>{item.name}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                    <div style={{ textAlign: "center" }}>
                                                        <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item" data-toggle="modal" data-target="#modal-lg" onClick={(e) => {
                                                                setId(item.id)
                                                                setName(item.name)
                                                                setNote(item.note)
                                                                setIsSelected(true)
                                                            }}>C???p nh???t</a>
                                                            <button className='dropdown-item' onClick={(e) => handleDelete(e, item.id)}>X??a</button>
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
                                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleAdd(e) }}>L??u</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ListCategory;
