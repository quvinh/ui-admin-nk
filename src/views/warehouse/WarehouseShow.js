/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { getData, putData, delData, postData } from '../../components/utils/Api'
import { useHistory } from 'react-router-dom';
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'



const WarehouseShow = (props) => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

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
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.match.params.id + '?token=' + getToken())])
            .then(function (res) {
                setDataShelf(res[0].data)
            })
    }
    const handleAddShelf = (e) => {
        const data = {
            name: nameShelf,
            position: position,
            warehouse_id: props.match.params.id,
        }
        Promise.all([postData('http://127.0.0.1:8000/api/admin/shelf/store/' + props.match.params.id + '?token=' + getToken(), data)])
            .then(function (res) {
                console.log('Added succesfully', res)
                setDataShelf([...dataShelf, data])
                setIsSelected(false)
                setNullShelf()
            }).catch(error => {
                console.log(error)
            })
    }

    const handleUpdateShelf = (e) => {
        const shelf = {
            name: nameShelf,
            position: position,
            status: status,
        }
        Promise.all([putData('http://127.0.0.1:8000/api/admin/shelf/update/' + idShelf + '?token=' + getToken(), shelf)])
            .then(response => {
                console.log(response)
                console.log('Edited successfully ^^')
                handleReloadShelf()
                setNullShelf()
                setIsSelected(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleDeleteShelf = (e, shelf_id) => {
        // if (count === 0) {
        Promise.all([delData('http://127.0.0.1:8000/api/admin/shelf/delete/' + shelf_id + '?token=' + getToken())])
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
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/listItem/' + props.match.params.id + '?token=' + getToken())])
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
        Promise.all([putData('http://127.0.0.1:8000/api/admin/detail_item/update/' + shelfIdItem + '?token=' + getToken(), dataItem)])
            .then(response => {
                console.log('Edited successfully ^^')
                // handleClick(shelfId)
                handleReloadItem()
                setIsSelectedItem(false)
            }).catch((err) => {
                console.log(err)
            })
    }

    const handleValid = (id, shelfid, warehouseid) => {
        console.log(id)
        console.log(shelfid)
        console.log(warehouseid)
        if (id !== '') {
            Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKD/' + id + '/' + shelfid + '/' + warehouseid + '?token=' + getToken(), { delay: false })])
                // getData('http://127.0.0.1:8000/api/admin/warehouse/amountItemKKDTransfer' + id + '/' + shelfid + '/' + warehouseid +'?token=' + getToken(),
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
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/detailItemId/' + id + '/' + shelfid + '/' + warehouseid + '?token=' + getToken(), { delay: false })])
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
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + props.match.params.id + '?token=' + getToken())])
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
        Promise.all([putData('http://127.0.0.1:8000/api/admin/warehouse/update/' + props.match.params.id + '?token=' + getToken(), warehouse)])
            .then(response => {
                // console.log(data)
                console.log('Edited successfully ^^')
                handleReload()
                // history.push('/warehouses')
            }).catch((err) => {
                console.log(err)
            })
    }

    //Managers
    const [dataManager, setDataManager] = useState([])

    useEffect(() => {
        console.log(props)
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + props.match.params.id + '?token=' + getToken()),
        getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + props.match.params.id + '?token=' + getToken()),
        getData('http://127.0.0.1:8000/api/admin/warehouse/listItem/' + props.match.params.id + '?token=' + getToken()),
        getData('http://127.0.0.1:8000/api/admin/warehouse/managerShow/' + props.match.params.id + '?token=' + getToken()),
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
                script()
                console.log(response[1].data)
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
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Kho</li>
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
                                            <a class="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" href="#custom-tabs-four-home" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">Thông tin kho</a>
                                        </li>
                                        <li class="nav-item">
                                            <a class="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" href="#custom-tabs-four-profile" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">Danh sách vật tư</a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="card-body">
                                    <div class="tab-content" id="custom-tabs-four-tabContent">
                                        <div class="tab-pane fade show active" id="custom-tabs-four-home" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">

                                            <form className="form-horizontal">
                                                <hr style={{ border: "1px solid red" }} />
                                                {/* <div className="row"> */}
                                                <h6><strong>Detail</strong></h6>
                                                <button className="btn btn-sm btn-primary" onClick={(e) => handleUpdate(e)} style={{ marginTop: "-50px", marginLeft: "1484px" }}>
                                                    <i className="fas fa-edit"></i> Cập nhật
                                                </button>
                                                {/* </div> */}
                                                <div style={{ marginTop: "-10px", marginBottom: "10px" }}>
                                                    <hr />
                                                    <div className="card-body">
                                                        {/* <div className="form-group row">
                                                        <label htmlFor="warehouse_code" className="col-sm-2 col-form-label">Mã kho</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="warehouse_code" placeholder="Trống" />
                                                        </div>
                                                    </div> */}
                                                        <div className="form-group row">
                                                            <label htmlFor="warehouse_name" className="col-sm-2 col-form-label">Tên kho</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handleName} id="warehouse_name" placeholder="Trống" value={name} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="warehouse_name" className="col-sm-2 col-form-label">Địa chỉ</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handleLocation} id="warehouse_name" placeholder="Trống" value={location} />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="warehouse_note" className="col-sm-2 col-form-label">Mô tả</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handleNote} id="warehouse_note" placeholder="Trống" value={note} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <hr />
                                            <br />
                                            <hr style={{ border: "1px solid blue" }} />
                                            <h6><strong>Danh sách kệ</strong></h6>
                                            <button style={{ marginTop: "-50px", marginLeft: "1495px" }} type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg">
                                                <i class="fa fa-plus" aria-hidden="true"></i> tạo mới
                                            </button>

                                            <table id="shelf" className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Tên giá kệ</th>
                                                        <th>Vị trí</th>
                                                        <th style={{ width: "10px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataShelf.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{String(index + 1)}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.position}</td>
                                                                <td className='text-center'>
                                                                    <div>
                                                                        <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                        </button>
                                                                        <div className="dropdown-menu">
                                                                            <a className="dropdown-item" onClick={(e) => { handleDeleteShelf(e, item.id) }}>Xóa</a>
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                setIdShelf(item.id)
                                                                                setNameShelf(item.name)
                                                                                setPosition(item.position)
                                                                                setStatus(item.status)
                                                                                setIsSelected(true)
                                                                            }} data-toggle="modal" data-target="#modal-lg">Cập nhật</a>
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
                                            <h6>Danh sách nhân viên phụ trách</h6>
                                            <hr />
                                            <table id="manager" className="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th className='text-center'>STT</th>
                                                        <th className='text-center'>Mã nhân viên</th>
                                                        <th className='text-center'>Tên nhân viên</th>
                                                        <th className='text-center'>Email</th>
                                                        <th className='text-center'>Số điện thoại</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        dataManager.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className='text-center'>{String(index + 1)}</td>
                                                                <td className='text-center'>{item.userid}</td>
                                                                <td className='text-center'>{item.fullname}</td>
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
                                                        <th className='text-center'>Mã vật tư</th>
                                                        <th className='text-center'>Tên vật tư</th>
                                                        <th className='text-center'>Loại vật tư</th>
                                                        <th className='text-center'>Tên giá kệ</th>
                                                        <th className='text-center'>Tổng số lượng</th>
                                                        <th className='text-center' style={{ width: "10px" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        listItem.map((item, index) => (
                                                            <tr key={index}>
                                                                <td className='text-center'>{String(index + 1)}</td>
                                                                <td className='text-center'>{item.id}</td>
                                                                <td className='text-center'>{item.itemname}</td>
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
                                                                            }} data-toggle="modal" data-target="#modal-item">Chi tiết</a>
                                                                            <a className="dropdown-item" onClick={(e) => {
                                                                                handleDetailItem(item.id, item.shelf_id, item.warehouse_id)
                                                                                setIsSelectedItem(true)
                                                                            }} data-toggle="modal" data-target="#modal-item">Cập nhật</a>
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
                                                <h4 className="modal-title">Cập nhật</h4>
                                                <button type="button" className="close"
                                                    data-dismiss="modal" aria-label="Close"
                                                    onClick={(e) => { setIsSelected(false) }}>
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
                                                        setNullShelf()
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
                                                <label htmlFor="shelf_name" className="col-sm-2 col-form-label">Tên giá/kệ:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handleNameShelf} id="shelf_name" placeholder="Trống" value={nameShelf} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="position" className="col-sm-2 col-form-label">Vị trí:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={handlePosition} id="position" placeholder="Trống" value={position} />
                                                </div>
                                            </div>
                                            {
                                                (isSelected) ? (
                                                    <>
                                                        <div className="form-group row">
                                                            <label htmlFor="position" className="col-sm-2 col-form-label">Vị trí:</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={handlePosition} id="position" placeholder="Trống" value={position} />
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (<></>)
                                            }
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer justify-content-end">
                                    {/* <button type="button" className="btn btn-default" data-dismiss="modal">Close</button> */}
                                    {
                                        (isSelected) ? (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateShelf(e) }}>Lưu</button>
                                        ) : (
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleAddShelf(e) }}>Lưu</button>
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
                                            <h4 className="modal-title">Cập nhật số lượng vật tư</h4>
                                        ) : (
                                            <h4 className="modal-title">Thông tin chi tiết vật tư</h4>
                                        )
                                    }

                                    <button type="button" className="close"
                                        data-dismiss="modal" aria-label="Close"
                                        onClick={(e) => { setIsSelectedItem(false) }}>
                                        <span aria-hidden="true">×</span>
                                    </button>

                                </div>
                                <div className="modal-body">
                                    <form className="form-horizontal">
                                        <hr />
                                        <div className="card-body">
                                            <div className='row'>
                                                <div className='col-md-6'>
                                                    <div className="form-group row">
                                                        <label htmlFor="item_id" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Mã VT:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="item_id" placeholder="Trống" value={idItem} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="item_name" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Tên VT:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="item_name" placeholder="Trống" value={nameItem} disabled />
                                                        </div>
                                                    </div>
                                                    {
                                                        (isSelectedItem) ? (
                                                            <>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Số lượng:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" onChange={(e) => handleAmountItemChange(e)} id="amount" placeholder="Trống" value={amountItem} />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>Tổng số lượng:</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" id="amount" placeholder="Trống" value={amountItem} disabled />
                                                                    </div>
                                                                </div>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount_valid" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Khả dụng</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" id="amount_valid" placeholder="Trống" value={amountItem - amountNotValid} disabled />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }


                                                    <div className="form-group row">
                                                        <label htmlFor="unit" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>DVT:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="unit" placeholder="Trống" value={unitItem} disabled />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-md-6'>
                                                    <div className="form-group row">
                                                        <label htmlFor="position" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>Mã giá/kệ:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="position" placeholder="Trống" value={shelfIdItem} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="category_name" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Loại:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="category_name" placeholder="Trống" value={categoryNameItem} disabled />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label htmlFor="shelf_name" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>Tên giá/kệ:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="shelf_name" placeholder="Trống" value={shelfNameItem} disabled />
                                                        </div>
                                                    </div>
                                                    {
                                                        (isSelectedItem) ? (
                                                            <></>
                                                        ) : (
                                                            <>
                                                                <div className="form-group row">
                                                                    <label htmlFor="amount_not_valid" className="col-sm-2 col-form-label" style={{ textAlign: "right" }}>Không khả dụng</label>
                                                                    <div className="col-sm-10">
                                                                        <input type="number" className="form-control" id="amount_not_valid" placeholder="Trống" value={amountNotValid} disabled />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        )
                                                    }

                                                    <div className="form-group row">
                                                        <label htmlFor="shelf_name" className="col-sm-2 col-form-label" style={{ textAlign: "right", marginBottom: "24px" }}>Tên kho:</label>
                                                        <div className="col-sm-10">
                                                            <input type="text" className="form-control" id="shelf_name" placeholder="Trống" value={warehouseNameItem} disabled />
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
                                            <button type="button" className="btn btn-success" data-dismiss="modal" onClick={(e) => { handleUpdateItem(e) }}>Lưu</button>
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
