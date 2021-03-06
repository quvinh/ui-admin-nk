/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { getData, putData, delData, postData } from '../../components/utils/Api'
import { Link, useHistory } from 'react-router-dom';
import Validator from '../../components/utils/Validation'
import { getAllPermissions, getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'



const WarehouseShow = (props) => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const [validator, showValidationMessage] = Validator()
    const [value, setValue] = React.useState(0);
    const [isSelected, setIsSelected] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //Add Shelf
    const [nameShelf, setNameShelf] = useState('');
    const [position, setPosition] = useState('');
    const [status, setStatus] = useState(true);
    const [idShelf, setIdShelf] = useState('')

    const handleNameShelf = (e) => {
        setNameShelf(e.target.value);
    }
    const handlePosition = (e) => {
        setPosition(e.target.value);
    }

    const setNullShelf = () => {
        setNameShelf('')
        setPosition('')
        setStatus(true)
    }

    const handleReloadShelf = () => {
        // history.push('/warehouse-show/' + props.match.params.id)
        Promise.all([getData('/api/admin/warehouse/shelfWarehouse/' + props.match.params.id)])
            .then(function (res) {
                setDataShelf(res[0].data)
                // script()
            })
    }
    const handleAddShelf = (e) => {
        const data = {
            name: nameShelf,
            position: position,
            warehouse_id: props.match.params.id,
        }
        console.log(data)
        Promise.all([postData('/api/admin/shelf/store/', data)])
            .then(function (res) {
                console.log('Added succesfully', res)
                handleReloadShelf()
                // setDataShelf([...dataShelf, data])
                setIsSelected(false)
                setNullShelf()
                // history.push('/404')
            }).catch(error => {
                console.log(error)
                showValidationMessage(true)
            })


    }

    const handleUpdateShelf = (e) => {
        const shelf = {
            name: nameShelf,
            position: position,
            status: status,
        }
        Promise.all([putData('/api/admin/shelf/update/' + idShelf, shelf)])
            .then(response => {
                console.log(response)
                console.log('Edited successfully ^^')
                handleReloadShelf()
                setNullShelf()
                setIsSelected(false)
            }).catch((err) => {
                console.log(err)
                showValidationMessage(true)
            })
    }

    const handleDeleteShelf = (e, shelf_id) => {
        // if (count === 0) {
        Promise.all([delData('/api/admin/shelf/delete/' + shelf_id)])
            .then(function (res) {
                handleReloadShelf()
            })
            .catch(error => {
                console.log(error)
            })
        // }
        // else {
        // }
    }

    //Item
    const [amountNotValid, setAmountNotValid] = useState('')
    const [listItem, setListItem] = useState([])
    const [isSelectedItem, setIsSelectedItem] = useState(false)

    const [idItem, setIdItem] = useState('')
    const [nameItem, setNameItem] = useState('')
    const [batchCodeItem, setBatchCodeItem] = useState('')
    const [categoryNameItem, setCategoryNameItem] = useState('')
    const [categoryIdItem, setCategoryIdItem] = useState('')
    const [amountItem, setAmountItem] = useState('')
    const [unitItem, setUnitItem] = useState('')
    const [shelfIdItem, setShelfIdItem] = useState('')
    const [shelfNameItem, setShelfNameItem] = useState('')
    const [priceItem, setPriceItem] = useState('')
    const [warehouseIdItem, setWarehouseIdItem] = useState('')
    const [warehouseNameItem, setWarehouseNameItem] = useState('')
    const [statusItem, setStatusItem] = useState('')

    const handleGetItem = (item) => {
        // setDataItem(item)
        setNameItem(item.itemname)
        setItemShelfId(item.shelf_id)
        setAmount(item.amount)
        setPrice(item.price)
        setStatusItem(item.status)
    }

    const handleAmountItemChange = (e) => {
        setAmountItem(e.target.value)
    }

    const handleReloadItem = () => {
        Promise.all([getData('/api/admin/warehouse/listItem/' + props.match.params.id)])
            .then(response => {
                setListItem(response[0].data)
            })
    }

    const handleUpdateItem = (e) => {
        console.log(shelfIdItem)
        const dataItem = {
            // shelf_id: itemShelfId,
            amount: amountItem,
            // price: itemPrice,
            status: 0,
        }
        console.log(dataItem)
        Promise.all([putData('/api/admin/detail_item/update/' + shelfIdItem, dataItem)])
            .then(response => {
                console.log('Edited successfully ^^')
                // handleClick(shelfId)
                handleReloadItem()
                setIsSelectedItem(false)
            }).catch((err) => {
                console.log(err)
                showValidationMessage(true)
            })
    }

    const handleValid = (id, shelfid, warehouseid) => {
        console.log(id)
        console.log(shelfid)
        console.log(warehouseid)
        if (id !== '') {
            Promise.all([getData('/api/admin/warehouse/amountItemKKD/' + id + '/' + shelfid + '/' + warehouseid, { delay: false })])
                // getData('/api/admin/warehouse/amountItemKKDTransfer' + id + '/' + shelfid + '/' + warehouseid +'',
                .then(function (response) {
                    console.log(response[0].data)
                    setAmountNotValid(response[0].data)
                })
        }
        else {
            return Error;
        }
    }

    const handleDetailItem = (id, shelfid, warehouseid) => {
        console.log(id)
        console.log(shelfid)
        console.log(warehouseid)
        Promise.all([getData('/api/admin/warehouse/detailItemId/' + id + '/' + shelfid + '/' + warehouseid, { delay: false })])
            .then(function (response) {
                console.log(response[0].data)
                setIdItem(response[0].data[0].id)
                setNameItem(response[0].data[0].itemname)
                setCategoryIdItem(response[0].data[0].categoryid)
                setCategoryNameItem(response[0].data[0].categoryname)
                setShelfIdItem(response[0].data[0].shelfid)
                setShelfNameItem(response[0].data[0].shelfname)
                setWarehouseIdItem(response[0].data[0].warehouseid)
                setWarehouseNameItem(response[0].data[0].warehousename)
                setPriceItem(response[0].data[0].price)
                setAmountItem(response[0].data[0].amount)
                setUnitItem(response[0].data[0].unit)
                setStatusItem(response[0].data[0].itemstatus)
            })
    }


    //Warehouse
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const history = useHistory()
    const [dataShelf, setDataShelf] = useState([])



    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const handleReload = () => {
        Promise.all([getData('/api/admin/warehouse/show/' + props.match.params.id)])
            .then(response => {
                setName(response[0].data.name)
                setLocation(response[0].data.location)
                setNote(response[0].data.note)
            })
    }


    const handleUpdate = (e) => {
        const warehouse = {
            name: name,
            location: location,
            note: note
        }
        console.log(warehouse)
        console.log(props)
        Promise.all([putData('/api/admin/warehouse/update/' + props.match.params.id, warehouse)])
            .then(response => {
                // console.log(data)
                console.log('Edited successfully ^^')
                handleReload()
                // history.push('/warehouses')
            }).catch((err) => {
                console.log(err)
                showValidationMessage(true)
            })
    }

    //Managers
    const [dataManager, setDataManager] = useState([])

    useEffect(() => {
        // console.log(props)
        Promise.all([
            getData('/api/admin/warehouse/show2/' + props.match.params.id),
            getData('/api/admin/warehouse/shelfWarehouse/' + props.match.params.id),
            getData('/api/admin/warehouse/listItem/' + props.match.params.id),
            getData('/api/admin/warehouse/managerShow/' + props.match.params.id)
        ])
            .then(function (response) {
                setName(response[0].data.name)
                setLocation(response[0].data.location)
                setNote(response[0].data.note)
                setDataShelf(response[1].data)
                console.log(response[2].data)
                setListItem(response[2].data)
                console.log(response[3].data)
                setDataManager(response[3].data)
                // script()
            })
    }, []);
    return (
        < div className="content-wrapper" >
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Kho</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang ch???</a></li>
                                <Link className="breadcrumb-item active" to={'/warehouse'}>Kho</Link>
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
                                            <a class="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Th??ng tin kho</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" href="#custom-tabs-four-profile" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Danh s??ch v???t t??</a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-four-tabContent">
                                        <div class="tab-pane fade show active" id="custom-tabs-four-home" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">

                                            <form className="form-horizontal">
                                                <hr style={{ border: "1px solid gray" }} />
                                                {/* <div className="row"> */}
                                                <div className="row">
                                                    <div className="col">
                                                        <h6><strong>Chi ti???t kho</strong></h6>
                                                    </div>
                                                    <div className="col">
                                                        <div style={{ textAlign: "end" }}>
                                                            {
                                                                getAllPermissions().includes("S???a kho") && (
                                                                    <button className="btn btn-sm btn-primary" onClick={(e) => handleUpdate(e)} >
                                                                        <i className="fas fa-edit"></i> C???p nh???t
                                                                    </button>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* </div> */}
                                                <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
                                                    <hr />
                                                    <div className="card-body">
                                                        {/* <div className="form-group row">
                                                        <label htmlFor="warehouse_code" className="col-sm-2 col-form-label">M?? kho</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="warehouse_code" placeholder="Tr???ng" />
                                                        </div>
                                                    </div> */}
                                                        <div className="form-group row">
                                                            <label htmlFor="warehouse_name" className="col-sm-2 col-form-label">T??n kho</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handleName} id="warehouse_name" placeholder="Tr???ng" value={name} />
                                                            </div>
                                                        </div>
                                                        <div style={{ color: "red", fontStyle: "italic" }}>
                                                            {validator.message("warehouse_name", name, "required", {
                                                                messages: {
                                                                    required: "(*) Nh???p t??n kho"
                                                                }
                                                            })}
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="warehouse_name" className="col-sm-2 col-form-label">?????a ch???</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handleLocation} id="location" placeholder="Tr???ng" value={location} />
                                                            </div>
                                                        </div>
                                                        <div style={{ color: "red", fontStyle: "italic" }}>
                                                            {validator.message("location", location, "required", {
                                                                messages: {
                                                                    required: "(*) Nh???p v??? tr??"
                                                                }
                                                            })}
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="warehouse_note" className="col-sm-2 col-form-label">M?? t???</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handleNote} id="warehouse_note" placeholder="Tr???ng" value={note} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <hr />
                                            <br />
                                            <hr style={{ border: "1px solid gray" }} />
                                            <div className="row">
                                                <div className="col">
                                                    <h6><strong>Danh s??ch gi??</strong></h6>
                                                </div>
                                                <div className="col">
                                                    <div style={{ textAlign: "end" }}>
                                                        <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg">
                                                            <i class="fa fa-plus" aria-hidden="true"></i> T???o m???i
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <table id="shelf" className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>T??n gi?? k???</th>
                                                        <th>V??? tr??</th>
                                                        <th style={{ width: "10px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataShelf.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{String(index + 1)}</td>
                                                                <td>{item.shelf_name}</td>
                                                                <td>{item.position}</td>
                                                                <td className='text-center'>
                                                                    <div>
                                                                        <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <a className="dropdown-item" onClick={(e) => { handleDeleteShelf(e, item.shelf_id) }}>X??a</a>
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                setIdShelf(item.shelf_id)
                                                                                setNameShelf(item.shelf_name)
                                                                                setPosition(item.position)
                                                                                setStatus(item.status)
                                                                                setIsSelected(true)
                                                                            }} data-toggle="modal" data-target="#modal-lg">C???p nh???t</a>
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

                                            <hr style={{ border: "1px solid gray" }} />
                                            <h3>Danh s??ch ng?????i ph??? tr??ch</h3>
                                            <hr />
                                            <table id="manager" className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className='text-center'>STT</th>
                                                        {/* <th className='text-center'>M?? nh??n vi??n</th> */}
                                                        <th className='text-center'>H??? v?? t??n</th>
                                                        <th className='text-center'>Email</th>
                                                        <th className='text-center'>S??? ??i???n tho???i</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataManager.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className='text-center'>{String(index + 1)}</td>
                                                                {/* <td className='text-center'>{item.user_id}</td> */}
                                                                <td className='text-center'><span className="badge badge-primary">{item.fullname}</span></td>
                                                                <td className='text-center'>{item.email}</td>
                                                                <td className='text-center'>{item.phone}</td>
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
                                        <div class="tab-pane fade" id="custom-tabs-four-profile" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">
                                            <table id="item" className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className='text-center'>STT</th>
                                                        <th className='text-center'>M?? v???t t??</th>
                                                        <th className='text-center'>T??n v???t t??</th>
                                                        <th className='text-center'>Lo???i v???t t??</th>
                                                        <th className='text-center'>T??n gi?? k???</th>
                                                        <th className='text-center'>T???ng s??? l?????ng</th>
                                                        <th className='text-center' style={{ width: "10px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        listItem.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className='text-center'>{String(index + 1)}</td>
                                                                <td className='text-center'>{item.id}</td>
                                                                <td className='text-center'><b>{item.itemname}</b></td>
                                                                <td className='text-center'>{item.categoryname}</td>
                                                                <td className='text-center'>{item.shelfname}</td>
                                                                <td className='text-center'>{item.amount}</td>
                                                                <td className='text-center'>
                                                                    <div>
                                                                        <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                handleDetailItem(item.id, item.shelf_id, item.warehouse_id)
                                                                                handleValid(item.id, item.shelf_id, item.warehouse_id)
                                                                            }} data-toggle="modal" data-target="#modal-item">Chi ti???t</a>
                                                                            {
                                                                                getRoleNames() === 'admin' ? (
                                                                                    <>
                                                                                        <a className="dropdown-item" onClick={(e) => {
                                                                                            handleDetailItem(item.id, item.shelf_id, item.warehouse_id)
                                                                                            setIsSelectedItem(true)
                                                                                        }} data-toggle="modal" data-target="#modal-item">C???p nh???t</a>
                                                                                    </>
                                                                                ) : (
                                                                                    <></>
                                                                                )
                                                                            }

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
                                                    onClick={(e) => { setIsSelected(false) }}>
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
                                                        setNullShelf()
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
                                                <label htmlFor="shelf_name" className="col-sm-2 col-form-label">T??n gi??/k???:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleNameShelf} id="shelf_name" placeholder="Tr???ng" value={nameShelf} />
                                                </div>
                                            </div>
                                            <div style={{ color: "red", fontStyle: "italic" }}>
                                                {validator.message("shelf_name", nameShelf, "required", {
                                                    messages: {
                                                        required: "(*) Nh???p t??n k???"
                                                    }
                                                })}
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="position" className="col-sm-2 col-form-label">V??? tr??:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handlePosition} id="position" placeholder="Tr???ng" value={position} />
                                                </div>
                                            </div>
                                            <div style={{ color: "red", fontStyle: "italic" }}>
                                                {validator.message("position", position, "required", {
                                                    messages: {
                                                        required: "(*) Nh???p v??? tr??"
                                                    }
                                                })}
                                            </div>
                                            {/* {
                                                (isSelected) ? (
                                                    <>
                                                        <div className="form-group row">
                                                            <label htmlFor="position" className="col-sm-2 col-form-label">V??? tr??:</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handlePosition} id="position" placeholder="Tr???ng" value={position} />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (<></>)
                                            } */}
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-end">
                                    {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                    {
                                        (isSelected) ? (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateShelf(e) }}>L??u</button>
                                        ) : (
                                            <button type="button" className="btn btn-success" onClick={(e) => { handleAddShelf(e) }}>L??u</button>
                                        )
                                    }
                                </div>
                            </div>
                            {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                    </div>
                    <div className="modal fade" id="modal-item">
                        <div className="modal-dialog modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        (isSelectedItem) ? (
                                            <h4 className="modal-title">C???p nh???t s??? l?????ng v???t t??</h4>
                                        ) : (
                                            <h4 className="modal-title">Th??ng tin chi ti???t v???t t??</h4>
                                        )
                                    }

                                    <button type="button" className="close"
                                        data-dismiss="modal" aria-label="Close"
                                        onClick={(e) => { setIsSelectedItem(false) }}>
                                        <span aria-hidden="true">??</span>
                                    </button>

                                </div>
                                <div className="modal-body">
                                    <form className="form-horizontal">
                                        <hr />
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group row">
                                                        <label htmlFor="item_id" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>M?? VT:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="item_id" placeholder="Tr???ng" value={idItem} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="item_name" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>T??n VT:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="item_name" placeholder="Tr???ng" value={nameItem} disabled />
                                                        </div>
                                                    </div>
                                                    {
                                                        (isSelectedItem) ? (
                                                            <>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>S??? l?????ng:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" onChange={(e) => handleAmountItemChange(e)} id="amount" placeholder="Tr???ng" value={amountItem} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>T???ng s??? l?????ng:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" id="amount" placeholder="Tr???ng" value={amountItem} disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount_valid" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Kh??? d???ng</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" id="amount_valid" placeholder="Tr???ng" value={amountItem - amountNotValid} disabled />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }


                                                    <div className="form-group row">
                                                        <label htmlFor="unit" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>DVT:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="unit" placeholder="Tr???ng" value={unitItem} disabled />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-md-6'>
                                                    <div className="form-group row">
                                                        <label htmlFor="position" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>M?? gi??/k???:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="position" placeholder="Tr???ng" value={shelfIdItem} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="category_name" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Lo???i:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="category_name" placeholder="Tr???ng" value={categoryNameItem} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="shelf_name" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>T??n gi??/k???:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="shelf_name" placeholder="Tr???ng" value={shelfNameItem} disabled />
                                                        </div>
                                                    </div>
                                                    {
                                                        (isSelectedItem) ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount_not_valid" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>Kh??ng kh??? d???ng</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" id="amount_not_valid" placeholder="Tr???ng" value={amountNotValid} disabled />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }

                                                    <div className="form-group row">
                                                        <label htmlFor="shelf_name" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>T??n kho:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="shelf_name" placeholder="Tr???ng" value={warehouseNameItem} disabled />
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-end">
                                    {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                    {
                                        (isSelectedItem) ? (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateItem(e) }}>L??u</button>
                                        ) : (
                                            <></>
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

export default WarehouseShow;
