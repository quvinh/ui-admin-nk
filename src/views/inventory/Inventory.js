import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../components/utils/Api'
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'
import { Autocomplete, TextField, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import Validator from '../../components/utils/Validation'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CurrencyFormat from 'react-currency-format'
import { useHistory } from 'react-router-dom'
import SelectSearch, { fuzzySearch } from 'react-select-search'
import "../export/Export"

const Inventory = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const [dataItem, setDataItem] = useState([])
    const [difference, setDifference] = useState('')
    const [name, setName] = useState('')
    const [item_id, setItemID] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [amount, setAmount] = useState('')
    const [unit, setUnit] = useState('')
    const [description, setDesription] = useState('')
    const [nameWarehouse, setNameWarehouse] = useState('')
    const [warehouse_id, setWarehouse] = useState('')
    const [nameSelect, setNameSelect] = useState('')
    const [shelf_name, setShelfName] = useState('')
    const [shelf_id, setShelfID] = useState('')
    const [amountCurrent, setAmountCurrent] = useState(0)
    const [price, setPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [date, setDate] = useState(new Date)

    const [dataTable, setDataTable] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    // const [dataSuppliers, setDataSuppliers] = useState([])
    const [dataShelf, setDataShelf] = useState([])
    // const [dataCategory, setDataCategory] = useState([])
    const [code, setCode] = useState('')
    const [showWarehouse, setShowWarehouse] = useState(false)
    const [validator, showValidationMessage] = Validator()

    const [isAmountSelected, setIsAmountSelected] = useState(false)
    const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)

    const handleNameChange = (e) => {
        setName(e.value.target)
    }
    const handleDifference = (e) => {
        setDifference(e.target.value)
    }

    const onChangeAmount = (e) => {
        (e.target.value > 0 && name.length > 0) ? setIsAmountSelected(true) : setIsAmountSelected(false)
        if (dataTable.length === 0) createCode()
    }

    
    const setNull = () => {
        setItemID('')
        setName('')
        setNameSelect('')
        setAmount(0)
        // setWarehouse('')
        setDate(new Date())
        setShelfID('')
        // setDataWarehouse([])
    }

    const createCode = () => {
        const time = new Date()
        const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
            time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
        const code = "EX_" + date
        console.log('CREATED: ' + code)
        setCode(code)
    }

    const getDataShelf = (id) => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
            .then(function (res) {
                console.log(res[0].data)
                setDataShelf(res[0].data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const reset = () => {
        setNull()
        setDataTable([])
    }
    const onChangeShelf = (e, newValue) => {
        console.log(e)
        // const index = e.nativeEvent.target.selectedIndex 
        // if (index === 0) {
        // setIsAmountSelected(false)
        // } else {
        setIsAmountSelected(true)
        console.log(newValue.props.children)
        setShelfName(newValue.props.children)
        setShelfID(e.target.value)
        console.log(e.target.value)
        console.log(dataItem)
        Promise.all([
            getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + warehouse_id + '/' + e.target.value + '?token=' + getToken())
        ])
            .then(function (res) {
                console.log(res[0].data)
                setDataItem(res[0].data)
            })
            .catch(error => {
                console.log(error)
            })
        // }
        setName('')
        setAmount(0)
        setItemID('')
        setUnit('')
    }
    const handleSave = (e) => {
        if (dataTable.length > 0) {
            // const length = props.dataTable.length
            console.log(dataTable)
            dataTable.map((item, index) => {
                console.log("LOG")
                console.log(item)
                Promise.all([postData('http://127.0.0.1:8000/api/admin/export/store?token=' + getToken(), item)])
                    .then(function (res) {
                        console.log("SAVED")
                        reset()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }
    const onChangeName = (e, newValue) => {
        setNameSelect(newValue)
        var checked = false
        console.log(newValue)
        console.log(dataItem)
        dataItem.map((item) => {
            if (item.itemname === newValue.name && item.id === newValue.value) {
                setItemID(item.item_id)
                setShelfID(item.shelf_id)
                setShelfName(item.shelf_name)
                setUnit(item.unit)
                setName(item.itemname)
                console.log(item.amount)
                setWarehouse(item.warehouse_id)
                setPrice(item.price)
                setNameWarehouse(item.name_warehouse)
                setAmount(item.amount)
                getDataShelf(item.warehouse_id)
                setIsWarehouseSelected(true)
                checked = true
            }
        })
        if (amount > 0) {
            setIsAmountSelected(true)
            if (dataTable.length === 0) createCode()
        }
        if (!checked) {
            setIsAmountSelected(false)
            setAmount(0)
        }

    }
    console.log(amount)

    const onChangeWarehouse = (e, value) => {
        console.log(value)
        console.log(e)
        console.log(dataItem)
        if (value) {
            setIsWarehouseSelected(true)
            setWarehouse(e.target.value)
            getDataShelf(e.target.value)
            Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value + '?token=' + getToken())])
                .then(function (res) {
                    reset()
                    setDataItem(res[0].data)
                    console.log(res[0].data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setIsWarehouseSelected(false)
            setWarehouse(null)
        }
        setAmount(0)
        setAmountCurrent(0)
        setName('')
        setShelfID(null)
        setIsAmountSelected(false)
    }
    const onRemoveRow = (e, index) => {
        var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
        setDataTable([...array])
    }

    const onAddTable = (e) => {//Button click, add data table
        if (validator.allValid() && amount > 0) {
            if (dataTable.length > 0) {
                let amountTotal = 0
                let array = []
                dataTable.map((item, index) => {
                    if (item.item_id === item_id && item.warehouse_id === warehouse_id && item.shelf_id === shelf_id) {
                        amountTotal = parseInt(item.amount) + parseInt(amount)
                        array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
                    }
                })
                amountTotal > 0 ? amountTotal = amountTotal : amountTotal = amount
                const data = {
                    item_id: item_id,
                    code: code,
                    warehouse_id: warehouse_id,
                    shelf_id: shelf_id,
                    name: name,
                    unit: unit,
                    created_by: getUserID(),//USER
                    amount: amountTotal,
                    price: price,
                    nameWarehouse: nameWarehouse,
                    shelf_name: shelf_name,
                    totalPrice: totalPrice,
                    description: description,

                }
                console.log(data)
                console.log(dataTable)
                array.length > 0 ? setDataTable([...array, data]) : (dataTable.length === 1 && dataTable[0].item_id === item_id &&
                    dataTable[0].warehouse_id === warehouse_id && dataTable[0].shelf_id === shelf_id ?
                    setDataTable([data]) : setDataTable([...dataTable, data]))
                console.log(dataTable)
            } else {
                const data = {
                    item_id: item_id,
                    code: code,
                    warehouse_id: warehouse_id,
                    shelf_id: shelf_id,
                    name: name,
                    unit: unit,
                    created_by: getUserID(),//USER
                    amount: amount,
                    price: price,
                    nameWarehouse: nameWarehouse,
                    shelf_name: shelf_name,
                    description: description,
                    totalPrice: totalPrice
                }
                setDataTable([...dataTable, data])
                console.log(data)
            }

            setAmount(0)
            // setAmountCurrent(0)
        } else {
            showValidationMessage(true)
            setAmount(0)
            // setAmountCurrent(0)
        }
        script()
        console.log(dataTable)
    }

    const getIdWarehouseRole = () => {
        var nameRole = ''
        getRoleNames().split(' ').map((item) => {
            if (!isNaN(item)) nameRole = item
        })
        return nameRole
    }



    useEffect(() => {
        Promise.all([
            getData(getRoleNames() === 'admin' ?
                'http://127.0.0.1:8000/api/admin/items/itemInWarehouse?token=' + getToken() :
                getDataWarehouseID().length > 0 && 'http://127.0.0.1:8000/api/admin/items/searchItem/' + getDataWarehouseID()[0] + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + getUserID() + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken())
        ])
            .then(res => {
                console.log(res[0].data)
                setDataItem(res[0].data)
                setDataWarehouse(res[1].data)
                setCreatedBy(res[2].data[0].fullname)
                if (getRoleNames() !== 'admin') {
                    if (getDataWarehouseID().length > 0) {
                        setWarehouse(getDataWarehouseID()[0])
                        setIsWarehouseSelected(true)
                        setShowWarehouse(true)
                    }
                } else { setShowWarehouse(false) }
            })
            .catch(error => {
                // if (error.response.status === 403) {

                // }
                console.log(error)
            })
    }, [])
    const dataOption = dataItem.map((item, index) => ({
        name: item.itemname,
        value: item.id
    }))

    return (
        <div>
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
                                    <li className="breadcrumb-item active">Inventory</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <div className="card card-info card-outline">
                                    <div className="card-header">
                                        <h4 className="card-title">Thành viên tham gia</h4>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">

                                    </div>
                                </div>
                                <div className="card card-success card-outline">
                                    <div className="card-header">
                                        <h4 className="card-title">Vật tư</h4>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row" style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <SelectSearch
                                                    placeholder='Tên vật tư'
                                                    options={dataOption}
                                                    value={nameSelect}
                                                    onChange={(e, newValue) => onChangeName(e, newValue)}
                                                    search
                                                    filterOptions={fuzzySearch}
                                                />
                                                
                                                {/* <div style={{ color: "red", fontStyle: "italic" }}>
                                                    {validator.message("itemname", name, "required", {
                                                        messages: {
                                                            required: "(*) Nhập tên vật tư"
                                                        }
                                                    })}
                                                </div> */}

                                            </div>
                                            <div className='col-md-3'>
                                                <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        disabled
                                                        renderInput={(props) => <TextField size='small' {...props} />}
                                                        label="Ngày tạo"
                                                        value={date}
                                                        inputFormat={"dd/MM/yyyy hh:mm"}
                                                        onChange={(newValue) => {
                                                            setDate(newValue)
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                            <div className='col-md-3'>
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    disabled
                                                    label="Người tạo"
                                                    size="small"
                                                    value={createdBy}
                                                // onChange={(e) => {
                                                //     setItemID(e.target.value)
                                                // }}
                                                />
                                            </div>

                                        </div>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    name="item_id"
                                                    disabled
                                                    // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    size='small'
                                                    label="Mã vặt tư"
                                                    value={item_id}
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <TextField
                                                            fullWidth
                                                            type="number"
                                                            name="amount"
                                                            disabled
                                                            // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                            size='small'
                                                            label="Số lượng"
                                                            value={amount}
                                                        />

                                                    </div>
                                                    <div className='col-md-6'>
                                                        <TextField
                                                            fullWidth
                                                            type="number"
                                                            name="amount"
                                                            // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                            size='small'
                                                            label="Số lượng chênh lệch"
                                                        // value={amount}
                                                        // onChange={(e) => {
                                                        //     onChangeAmount(e)
                                                        //     setAmount(parseInt(e.target.value) > kd ? kd : parseInt(e.target.value))
                                                        // }}
                                                        />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel size='small' style={{ fontSize: 12 }}>Nhà kho</InputLabel>
                                                        <Select
                                                            disabled={showWarehouse}
                                                            size="small"
                                                            label="Nhà kho"
                                                            name="warehouse_id"
                                                            value={warehouse_id}
                                                            onChange={(e) => {
                                                                (parseInt(e.target.value)) ? onChangeWarehouse(e, true) : onChangeWarehouse(e, false)
                                                            }}
                                                        >
                                                            {dataWarehouse.map((item, index) => (
                                                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>

                                            </div>
                                            <div className='col-md-6'>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    name="amount"
                                                    disabled
                                                    // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    size='small'
                                                    label="Đơn vị tính"
                                                // value={amount}
                                                // onChange={(e) => {
                                                //     onChangeAmount(e)
                                                //     setAmount(parseInt(e.target.value) > kd ? kd : parseInt(e.target.value))
                                                // }}
                                                />
                                            </div>


                                        </div>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel size='small' style={{ fontSize: 12 }}>Giá/kệ</InputLabel>
                                                        <Select
                                                            size="small"
                                                            label="Giá/Kệ"
                                                            name="shelf_id"
                                                            value={shelf_id}
                                                            onChange={(e, newValue) => {
                                                                onChangeShelf(e, newValue)
                                                                setShelfID(e.target.value)
                                                            }}
                                                        >
                                                            {dataShelf.map((item, index) => (
                                                                <MenuItem key={index} value={item.shelf_id}>{item.shelf_name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                            <div className='col-md-6'>
                                                <TextField
                                                    fullWidth
                                                    type="text"
                                                    name="amount"
                                                    // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    size='small'
                                                    label="Mô tả"
                                                // value={amount}
                                                // onChange={(e) => {
                                                //     onChangeAmount(e)
                                                //     setAmount(parseInt(e.target.value) > kd ? kd : parseInt(e.target.value))
                                                // }}
                                                />
                                            </div>
                                        </div>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card card-warning card-outline">
                                    <div className="card-header">
                                        <h4 className="card-title">Danh sách vật tư</h4>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <hr />
                                        <table id="item" className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th className="text-center">Mã VT</th>
                                                    <th className="text-center">Tên VT</th>
                                                    <th className="text-center">DVT</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-center">Chênh lệch</th>
                                                    <th className="text-center">Giá trị</th>
                                                    <th className="text-center">Chênh lệch giá</th>
                                                    <th className="text-center">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Inventory;
