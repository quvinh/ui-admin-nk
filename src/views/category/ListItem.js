import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { delData, getData, postData, putData } from '../../components/utils/Api'
import { getToken } from '../../components/utils/Common'
import Validator from '../../components/utils/Validation'

const ListItem = () => {
    //item
    const [dataTable, setDataTable] = useState('')
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
            }).catch(err => {
                console.log(err.response.status)
            })
    }
    const handleDelete = (e, id) => {
        Promise.all([delData('/api/admin/items/delete/' + id)])
            .then(function (res) {
                handleReloadItem()
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
                            <h6><strong>Danh m???c v???t t??</strong></h6>
                            <div className='modal-footer justify-content-end'>
                                <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-item" onClick={(e) => setIsSelectedItem(false)}>
                                    <i class="fa fa-plus" aria-hidden="true"></i> Th??m m???i v???t t??
                                </button>
                            </div>
                            <table id="inventory" className="table table-bordered table-striped">
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
                                                            <a className="dropdown-item" data-toggle="modal" data-target="#modal-item" onClick={(e) => {
                                                                setIdItem(item.id)
                                                                setNameItem(item.name)
                                                                setCategoryIdItem(item.category_id)
                                                                setUnitItem(item.unit)
                                                                setNoteItem(item.note)
                                                                setIsSelectedItem(true)
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
                                                    {/* <div className="form-group row"> */}
                                                    {/* 
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" onChange={(e) => { setCategoryIdItem(e.target.value) }} id="categoryid" placeholder="Tr???ng" value={categoryIdItem} />
                                        </div> */}
                                                    {/* <label htmlFor="shelf_name" className="col-sm-2 col-form-label">Nh??m:</label> */}
                                                    {/* <Box>
                                            <FormControl fullWidth>
                                                <InputLabel size="small">Lo???i v???t t??</InputLabel>
                                                <Select
                                                    label="Lo???i v???t t??"
                                                    size="small"
                                                    value={categoryIdItem}
                                                    onChange={(e) => {
                                                        setCategoryIdItem(e.target.value)
                                                    }}
                                                >
                                                    {
                                                        dataTable.map((item, index) => (
                                                            <option key={index} value={item.id}>{item.name}</option>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Box> */}
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
                                                    <div className="form-group row">
                                                        <label htmlFor="unit" className="col-sm-2 col-form-label">????n v??? t??nh:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" onChange={(e) => { setUnitItem(e.target.value) }} id="unit" placeholder="Tr???ng" value={unitItem} />
                                                        </div>
                                                    </div>
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
                                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => {
                                                        handleUpdateItem(e)
                                                    }}>L??u</button>
                                                </div>
                                            ) : (
                                                <div className="modal-footer justify-content-end">
                                                    <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => {
                                                        handleAddItem(e)
                                                    }}>L??u</button>
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

export default ListItem;
