/* eslint-disable no-undef */
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
import "./select-search.css"

const Export = (props) => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }
    const [item_id, setItemID] = useState('')
    const [batch_code, setBatchCode] = useState('')
    const [warehouse_id, setWarehouse] = useState('')
    const [supplier_id, setSuppliers] = useState()
    const [shelf_id, setShelfID] = useState('')
    const [category_id, setCategory] = useState()
    const [name, setName] = useState('')
    const [nameSelect, setNameSelect] = useState('')
    const [shelf_name, setShelfName] = useState('')
    const [unit, setUnit] = useState('')
    const [created_by, setCreatedBy] = useState('')
    const [amount, setAmount] = useState('')
    const [amountCurrent, setAmountCurrent] = useState(0)
    const [price, setPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [nameWarehouse, setNameWarehouse] = useState('')
    const [date, setDate] = useState(new Date)
    const [note, setNote] = useState('')
    const [kd, setKD] = useState('')

    const [dataTable, setDataTable] = useState([])
    const [dataItem, setDataItem] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    // const [dataSuppliers, setDataSuppliers] = useState([])
    const [dataShelf, setDataShelf] = useState([])
    // const [dataCategory, setDataCategory] = useState([])
    const [code, setCode] = useState('')

    const [validator, showValidationMessage] = Validator()

    const [isAmountSelected, setIsAmountSelected] = useState(false)
    const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)
    const [showWarehouse, setShowWarehouse] = useState(false)
    const [showAmountValid, setShowAmountValid] = useState(false)

    const history = useHistory()


    const handleSave = (e) => {
        if (dataTable.length > 0) {
            // const length = props.dataTable.length
            console.log(dataTable)
            dataTable.map((item, index) => {
                console.log("LOG")
                console.log(item)
                Promise.all([postData('/api/admin/export/store', item)])
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
    // const [isItemSelected, setIsItemSelected] = useState(false)

    const onChangeName = (e, newValue) => {
        setNameSelect(newValue)
        var checked = false
        console.log(newValue)
        dataItem.map((item) => {
            if (item.itemname === newValue.name && item.id === newValue.value) {
                setItemID(item.item_id)
                setBatchCode(item.batch_code)
                setCategory(item.category_id)
                setShelfID(item.shelf_id)
                setShelfName(item.shelf_name)
                setSuppliers(item.supplier_id)
                setUnit(item.unit)
                setName(item.itemname)
                console.log(item.warehouse_id)
                setWarehouse(item.warehouse_id)
                setPrice(item.price)
                setNameWarehouse(item.name_warehouse)
                setAmountCurrent(item.amount)
                getDataShelf(item.warehouse_id)
                setIsWarehouseSelected(true)
                checked = true
                Promise.all([getData('/api/admin/warehouse/kd/' + item.item_id + '/' + item.warehouse_id + '/' + item.shelf_id + '/' + item.batch_code + '/' + item.supplier_id)])
                    .then(function (res) {
                        // console.log(item.item_id, item.shelf_name)
                        // var value = dataTable.filter(i => i.item_id === item.item_id && i.item_id === item.item_id)
                        // console.log(value)
                        // value.length > 0 ? setKD(res[0].data - value[0].amount) : setKD(res[0].data)
                        setKD(res[0].data)
                    })
            }
        })
        if (amount > 0) {
            setIsAmountSelected(true)
            if (dataTable.length === 0) createCode()
        }
        if (!checked) setIsAmountSelected(false)
        setAmount(0)

        // dataTable.filter(item => [
        //     item.item_id === item_id,
        //     item.shelf_name === shelf_name
        // ]) ? setShowAmountValid(true) : setShowAmountValid(false)
        console.log('dataItem', dataItem)

        // console.log(getAmountValid())
    }

    const onChangeAmount = (e) => {
        (e.target.value > 0 && name.length > 0) ? setIsAmountSelected(true) : setIsAmountSelected(false)
        if (dataTable.length === 0) createCode()
    }

    const setNull = () => {
        setNameSelect('')
        setName('')
        setAmount(0)
        setAmountCurrent(0)
        setWarehouse('')
        setDate(new Date())
        setIsAmountSelected(false)
        setKD('')
        setShelfID('')
        // setDataWarehouse([])
    }

    const reset = () => {
        setNull()
        setDataTable([])
    }

    const createCode = () => {
        const time = new Date()
        const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
            time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
        const code = "EX_" + date
        console.log('CREATED: ' + code)
        setCode(code)
    }

    const onChangeWarehouse = (e, value) => {
        console.log(value)
        console.log(e)
        console.log(dataItem)
        if (value) {
            setIsWarehouseSelected(true)
            setWarehouse(e.target.value)
            getDataShelf(e.target.value)
            Promise.all([getData('/api/admin/items/searchItem/' + e.target.value)])
                .then(function (res) {
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

    const onChangeShelf = (e, newValue) => {
        console.log(e)
        // const index = e.nativeEvent.target.selectedIndex 
        // if (index === 0) {
        // setIsAmountSelected(false)
        // } else {
        setIsAmountSelected(true)
        setShelfName(newValue.props.children)
        setShelfID(e.target.value)
        console.log(e.target.value)
        console.log(dataItem)
        Promise.all([
            getData('/api/admin/warehouse/itemShelf/' + warehouse_id + '/' + e.target.value)
        ])
            .then(function (res) {
                console.log(res[0].data)
                setDataItem(res[0].data)
            })
            .catch(error => {
                if (error.response.status === 403) {
                    history.push('/404')
                } else if (error.response.status === 401) {
                    history.push('/login')
                }
            })
        // }
        setName('')
        setNameSelect('')
        setAmount(0)
        setAmountCurrent(0)
        setKD(0)
    }

    const onRemoveRow = (e, index) => {
        var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
        setDataTable([...array])
    }

    const getDataShelf = (id) => {
        Promise.all([getData('/api/admin/warehouse/shelfWarehouse/' + id)])
            .then(function (res) {
                console.log(res[0].data)
                setDataShelf(res[0].data)
            })
            .catch(err => {
                console.log(err)
            })
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
                    batch_code: batch_code,
                    warehouse_id: warehouse_id,
                    shelf_id: shelf_id,
                    supplier_id: supplier_id,
                    category_id: category_id,
                    name: name,
                    unit: unit,
                    created_by: getUserID(),//USER
                    amount: amountTotal,
                    price: price,
                    nameWarehouse: nameWarehouse,
                    shelf_name: shelf_name,
                    note: note,
                    totalPrice: totalPrice

                }
                console.log('dataItem', data)
                console.log(dataTable)
                array.length > 0 ? setDataTable([...array, data]) : (
                    dataTable.length === 1 &&
                        dataTable[0].item_id === item_id &&
                        dataTable[0].warehouse_id === warehouse_id &&
                        dataTable[0].batch_code === batch_code &&
                        dataTable[0].shelf_id === shelf_id &&
                        dataTable[0].supplier_id === supplier_id ? setDataTable([data]) : setDataTable([...dataTable, data]))
                console.log(dataTable)
            } else {
                const data = {
                    item_id: item_id,
                    code: code,
                    batch_code: batch_code,
                    warehouse_id: warehouse_id,
                    shelf_id: shelf_id,
                    supplier_id: supplier_id,
                    category_id: category_id,
                    name: name,
                    unit: unit,
                    created_by: getUserID(),//USER
                    amount: amount,
                    price: price,
                    nameWarehouse: nameWarehouse,
                    shelf_name: shelf_name,
                    note: note,
                    totalPrice: totalPrice
                }
                setDataTable([...dataTable, data])
                console.log('dataItem', data)
            }

            setAmount(0)
            setShowAmountValid(true)
            // setAmountCurrent(0)
        } else {
            showValidationMessage(true)
            setAmount(0)
            // setAmountCurrent(0)
        }
        script()

    }

    // dataTable.length > 0 && console.log(dataTable.filter(item => item.item_id === 'CBL6')[0].amount)

    const getAmountValid = () => {
        var amount = 0
        console.log(item_id, shelf_name)
        if (dataTable.length > 0) {
            const value = dataTable.filter(item => item.item_id === item_id && item.shelf_name === shelf_name)
            value.length > 0 ? amount = value[0].amount : amount = 0
        }
        console.log(amount)
        return parseInt(amount)
    }

    useEffect(() => {
        Promise.all([
            getData(getRoleNames() === 'admin' ?
                '/api/admin/items/itemInWarehouse' :
                getDataWarehouseID().length > 0 && '/api/admin/items/searchItem/' + getDataWarehouseID()[0]),
            getData('/api/admin/warehouse/show/' + getUserID()),
            getData('/api/auth/get-user/' + getUserID())
        ])
            .then(res => {
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
                history.push('/404')
            })
    }, [])

    const dataOption = dataItem.map((item, index) => ({
        name: item.itemname,
        value: item.id
    }))
    console.log('data', dataOption)

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h3>Xu???t v???t t??</h3>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang ch???</a></li>
                                <li className="breadcrumb-item active">Xu???t</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-info card-outline">
                        <div className="card-header">
                            <h4 className="card-title">??i???n th??ng tin v???t t?? c???n xu???t</h4>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-7">
                                    <SelectSearch
                                        options={dataOption}
                                        value={nameSelect}
                                        onChange={(e, newValue) => onChangeName(e, newValue)}
                                        search
                                        filterOptions={fuzzySearch}
                                    />
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("itemname", name, "required", {
                                            messages: {
                                                required: "(*) Nh???p t??n v???t t??"
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel size='small' style={{ fontSize: 12 }}>Nh?? kho</InputLabel>
                                            <Select
                                                disabled={showWarehouse}
                                                size="small"
                                                label="Nh?? kho"
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
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-2">
                                    <TextField
                                        fullWidth
                                        type="number"
                                        name="amount"
                                        inputProps={{ min: 0, max: kd - getAmountValid(), inputMode: 'numeric', pattern: '[0-9]*' }}
                                        size='small'
                                        label="S??? l?????ng"
                                        value={amount}
                                        onChange={(e) => {
                                            onChangeAmount(e)
                                            setAmount(parseInt(e.target.value) > kd ? kd : parseInt(e.target.value))
                                        }}
                                    />
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("amount", amount, "required", {
                                            messages: {
                                                required: "(*) Nh???p s??? l?????ng"
                                            }
                                        })}
                                    </div>

                                </div>
                                <div className="col-md-2">
                                    <TextField
                                        fullWidth
                                        disabled
                                        type={'number'}
                                        size='small'
                                        label="S??? l?????ng kh??? d???ng"
                                        value={kd - getAmountValid()}
                                        variant="outlined"
                                    />
                                </div>
                                <div className="col-md-3">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                                            <DateTimePicker
                                                renderInput={(props) => <TextField size='small' {...props} />}
                                                label="Ng??y nh???p"
                                                value={date}
                                                inputFormat={"dd/MM/yyyy hh:mm"}
                                                onChange={(newValue) => {
                                                    setDate(newValue)
                                                }}
                                            />
                                        </LocalizationProvider>
                                        {/* <CButton color="secondary" onClick={(e) => setNull()}>L??M M???I</CButton> */}
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel size='small' style={{ fontSize: 12 }}>Gi??/k???</InputLabel>
                                            <Select
                                                size="small"
                                                label="Nh?? cung c???p"
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
                            </div>
                        </div>
                        <div className="card-footer" >

                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <button style={{ width: "6%", marginRight: "10px" }} type="button"
                                    className="btn btn-block btn-primary btn-sm"
                                    onClick={(e) => reset()}>Reset
                                </button>
                                <button className="btn btn-sm btn-primary" onClick={(e) => {
                                    onAddTable(e)
                                    // setKD(parseInt(kd) - parseInt(amount))
                                    setKD(parseInt(kd))
                                    // setKD(parseInt(kd) - getAmountValid())
                                }}>
                                    <i className="fas fa-edit"></i> Th??m v??o DS
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-info card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Th??ng tin xu???t kho</h3>
                                    <div className="col" style={{ textAlign: "end" }}>
                                        <button className="btn btn-sm btn-success" onClick={(e) => handleSave(e)}>
                                            <i className="fas fa-save"></i> L??u nh???p
                                        </button>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className='text-center'>STT</th>
                                                <th className='text-center'>M?? v???t t??</th>
                                                <th className='text-center'>M?? s???n xu???t</th>
                                                <th className='text-center'>T??n v???t t??</th>
                                                <th className='text-center'>??VT</th>
                                                <th className='text-center'>S??? l?????ng</th>
                                                <th className='text-center'>????n gi??</th>
                                                <th className='text-center'>Gi?? k???</th>
                                                <th className='text-center'>Thao t??c</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataTable.map((item, index) => (
                                                    <tr>
                                                        <td className='text-center'>{index + 1}</td>
                                                        <td className='text-center'>{item.item_id}</td>
                                                        <td className='text-center'>{item.batch_code}</td>
                                                        <td className='text-center'>{item.name}</td>
                                                        <td className='text-center'>{item.unit}</td>
                                                        <td className='text-center'>{item.amount}</td>
                                                        <td className='text-center'>{(item.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                                        <td className='text-center'>{item.shelf_name}</td>
                                                        <td className='text-center'><button className="btn btn-sm btn-danger"
                                                            onClick={(e) => {
                                                                onRemoveRow(e, index)
                                                                setKD(parseInt(kd))
                                                            }}>
                                                            x
                                                        </button></td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <tfoot>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.card-body */}
                            </div>

                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </div >
    )
}

export default Export;