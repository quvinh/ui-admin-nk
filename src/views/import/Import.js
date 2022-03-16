/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { getData } from '../../components/utils/Api'
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'
import { Autocomplete, TextField, Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import Validator from './Validation'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import CurrencyFormat from 'react-currency-format'


const Import = () => {
    const [item_id, setItemID] = useState('')
    const [batch_code, setBatchCode] = useState('')
    const [warehouse_id, setWarehouse] = useState('')
    const [supplier_id, setSuppliers] = useState()
    const [shelf_id, setShelf] = useState('')
    const [category_id, setCategory] = useState()
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')
    const [subUnit, setSubUnit] = useState('')
    const [amount, setAmount] = useState(0)
    const [subAmount, setSubAmount] = useState(1)
    const [price, setPrice] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [nameWarehouse, setNameWarehouse] = useState('')
    const [date, setDate] = useState(new Date)
    const [note, setNote] = useState('')

    const [userProfile, setUserProfile] = useState('')

    const [dataTable, setDataTable] = useState([])
    const [validator, showValidationMessage] = Validator()
    const [dataItem, setDataItem] = useState([])
    const [dataItemName, setDataItemName] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [dataSuppliers, setDataSuppliers] = useState([])
    const [dataShelf, setDataShelf] = useState([])
    const [dataCategory, setDataCategory] = useState([])

    const [code, setCode] = useState('')
    const [isWarehouseSelected, setIsWarehouseSelected] = useState(false)
    const [showWarehouse, setShowWarehouse] = useState(false)
    const [isItemSelected, setIsItemSelected] = useState(false)
    const [isUnitSelected, setIsUnitSelected] = useState(false)
    const [isCategorySelected, setIsCategorySelected] = useState(false)

    const setNull = () => {
        setName('')
        setItemID('')
        setBatchCode('')
        setAmount(0)
        setSubAmount(1)
        setPrice(0)
        setTotalPrice(0)
        setUnit('')
        setSubUnit('')
        setCategory('')
        setWarehouse('')
        setSuppliers('')
        setShelf('')
        setIsItemSelected(false)
        setIsWarehouseSelected(false)
        setIsCategorySelected(false)
        setDate(new Date())
    }

    const reset = () => {
        setNull()
        setIsCategorySelected(false)
        setIsItemSelected(false)
        setDataTable([])
    }

    const optionUnit = [
        { value: "Chiếc", label: "Chiếc" },
        { value: "Bộ", label: "Bộ" },
        { value: "Cái", label: "Cái" },
        { value: "Can", label: "Can" },
        { value: "Đôi", label: "Đôi" },
        { value: "Lon", label: "Lon" },
        { value: "Ông", label: "Ông" },
        { value: "Lô", label: "Lô" },
    ]

    const onChangeName = (e, newValue) => {
        setName(newValue)//)
        console.log("1: ", newValue)
        if (dataTable.length === 0) createCode()
        setIsItemSelected(false)

        dataItemName.map((item) => {
            if (item.name === newValue) {
                console.log("2.1: ", newValue)
                setNull()
                if (getRoleNames() !== 'admin') {
                    getDataShelf(getDataWarehouseID()[0])
                    setWarehouse(getDataWarehouseID()[0])
                    setShowWarehouse(true)
                } else { setShowWarehouse(false) }
                setItemID(item.id)
                setCategory(item.category_id)
                setUnit(item.unit)
                setName(item.name)
                setIsWarehouseSelected(true)
                setIsItemSelected(true)
            }
        })

        dataItem.map((item) => {
            if (item.name_item === newValue) {
                console.log("2.2: ", newValue)
                getDataShelf(item.warehouse_id)
                setItemID(item.item_id)
                setBatchCode(item.batch_code)
                setCategory(item.category_id)
                setShelf(item.shelf_id)
                setAmount(item.amount)
                setUnit(item.unit)
                setWarehouse(item.warehouse_id)
                setNameWarehouse(item.name_warehouse)
                setPrice(item.price)
                setSuppliers(item.supplier_id)
                setName(item.name_item)
                setTotalPrice((item.amount) * (item.price))
                setIsItemSelected(true)
                setIsWarehouseSelected(true)
                // console.log(item.name_item)
            }
        })
    }

    const onChangeWarehouse = (e, value) => {
        if (value) {
            let index = e.nativeEvent.target.selectedIndex;
            setWarehouse(e.target.value)
            setNameWarehouse(e.nativeEvent.target[index].text)
            setIsWarehouseSelected(true)
            setWarehouse(e.target.value)
            getDataShelf(e.target.value)
        } else {
            setIsWarehouseSelected(false)
            setWarehouse(null)
        }

        // console.log(e.nativeEvent.target[index].text)
    }
    const onChangeCategory = (e, value) => {
        if (value) {
            let index = e.nativeEvent.target.selectedIndex;
            setCategory(e.target.value)
            setIsCategorySelected(true)
            console.log('category', e.target.value)
            Promise.all(
                [getData('http://127.0.0.1:8000/api/admin/category/itemCategory/' + e.target.value + '?token=' + getToken()),
                getData('http://127.0.0.1:8000/api/admin/category/unitCategory/' + e.target.value + '?token=' + getToken())],
            ).then(function (res) {
                setDataItem(res[0].data)
                setUnit(res[1].data[0].unit)
            })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setIsCategorySelected(false)
            setWarehouse(null)
        }
    }

    const createCode = () => {
        const time = new Date()
        const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
            time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
        const code = "NH_" + date
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

    const onAddTable = (e) => {//Button click, add data table
        if (validator.allValid() && amount > 0) {
            if (dataTable.length > 0) {
                let amountTotal = 0
                let array = []
                dataTable.map((item, index) => {
                    if (item.item_id === item_id && item.batch_code === batch_code && item.supplier_id === supplier_id && item.shelf_id === shelf_id && item.warehouse_id === warehouse_id && item.price === price) {
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
                    note: note,
                    totalPrice: parseInt(amountTotal) * parseInt(price)
                }
                console.log(dataTable)
                array.length > 0 ? setDataTable([...array, data]) : (dataTable.length === 1 && dataTable[0].item_id === item_id ? setDataTable([data]) : setDataTable([...dataTable, data]))
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
                    note: note,
                    totalPrice: totalPrice
                }
                setDataTable([...dataTable, data])
                console.log(dataTable)
            }
        } else {
            showValidationMessage(true)
        }
    }

    const onRemoveRow = (e, index) => {
        var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
        setDataTable([...array])
    }
    // console.log(dataItemName)
    // console.log(name)
    useEffect(() => {
        Promise.all([
            getData(getRoleNames() === 'admin' ?
                'http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken() :
                'http://127.0.0.1:8000/api/admin/warehouse/show/' + getDataWarehouseID()[0] + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/suppliers?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/category?token=' + getToken()),
            getData(getRoleNames() === 'admin' ?
                'http://127.0.0.1:8000/api/admin/items/itemInWarehouse?token=' + getToken() :
                'http://127.0.0.1:8000/api/admin/items/searchItem/' + getDataWarehouseID()[0] + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/shelf?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/items?token=' + getToken())
        ])
            .then(res => {

                console.log(res[0].data)
                setWarehouse(getDataWarehouseID())
                setDataWarehouse(res[0].data)
                setDataSuppliers(res[1].data)
                setDataCategory(res[2].data)
                setDataItem(res[3].data)
                setDataShelf(res[4].data)
                setUserProfile(res[5].data[0].fullname)
                setDataItemName(res[6].data)
                console.log(getDataWarehouseID())
                if (getRoleNames() !== 'admin') {
                    setShowWarehouse(true)
                    setIsWarehouseSelected(true)
                    getDataShelf(getDataWarehouseID()[0])
                } else { setShowWarehouse(false) }
                // script()
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
                            <h3>Nhập vật tư</h3>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Nhập</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                        <div className="card-header">
                            <h4 className="card-title">Form</h4>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <Autocomplete
                                        id="name_item"
                                        freeSolo
                                        size='small'
                                        options={dataItemName.map((option) => option.name)}
                                        // value={name}
                                        // onChange={(e, newValue) => onChangeName(e, newValue)}
                                        inputValue={name}
                                        onInputChange={(e, newValue) => {
                                            onChangeName(e, newValue)
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Tên vật tư" />}
                                        disableClearable
                                    />
                                </div>
                                <div className="col-md-6">
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            renderInput={(props) => <TextField size='small' {...props} />}
                                            label="Ngày nhập"
                                            value={date}
                                            inputFormat={"dd/MM/yyyy hh:mm"}
                                            onChange={(newValue) => {
                                                setDate(newValue)
                                            }}
                                        />
                                    </LocalizationProvider>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        label="Mã vật tư"
                                        size="small"
                                        value={subAmount}
                                        onChange={(e) => {
                                            setSubAmount(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel style={{ fontSize: 12 }}>ĐVT</InputLabel>
                                                        <Select
                                                            size="small"
                                                            value={unit}
                                                            label="ĐVT"
                                                            onChange={(e) => {
                                                                (e.target.value === 'Lô') ? setIsUnitSelected(true) : setIsUnitSelected(false); setItemID(''); setCategory(''); setName(''); setIsItemSelected(false)
                                                                setUnit(e.target.value)
                                                            }}
                                                        >
                                                            <MenuItem value={'Chiếc'}>Chiếc</MenuItem>
                                                            <MenuItem value={'Bộ'}>Bộ</MenuItem>
                                                            <MenuItem value={'Cái'}>Cái</MenuItem>
                                                            <MenuItem value={'Can'}>Can</MenuItem>
                                                            <MenuItem value={'Đôi'}>Đôi</MenuItem>
                                                            <MenuItem value={'Lon'}>Lon</MenuItem>
                                                            <MenuItem value={'Ông'}>Ông</MenuItem>
                                                            <MenuItem value={'Lô'}>Lô</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                        </div>
                                        {
                                            (isUnitSelected) && (
                                                <>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <TextField
                                                                type="number"
                                                                label="Số lượng/Lô"
                                                                size="small"
                                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                                                                value={subAmount}
                                                                onChange={(e) => {
                                                                    setSubAmount(e.target.value)
                                                                    setTotalPrice(e.target.value * amount * price)
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <div className="form-group">
                                                            <Box>
                                                                <FormControl fullWidth>
                                                                    <InputLabel style={{ fontSize: 12 }}>ĐVT</InputLabel>
                                                                    <Select
                                                                        size="small"
                                                                        value={subUnit}
                                                                        label="ĐVT"
                                                                        disabled={isCategorySelected ? true : (isItemSelected ? true : false)}
                                                                        onChange={(e) => setSubUnit(e.target.value)}
                                                                    >
                                                                        <MenuItem value={'Chiếc'}>Chiếc</MenuItem>
                                                                        <MenuItem value={'Bộ'}>Bộ</MenuItem>
                                                                        <MenuItem value={'Cái'}>Cái</MenuItem>
                                                                        <MenuItem value={'Can'}>Can</MenuItem>
                                                                        <MenuItem value={'Đôi'}>Đôi</MenuItem>
                                                                        <MenuItem value={'Lon'}>Lon</MenuItem>
                                                                        <MenuItem value={'Ông'}>Ông</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Box>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        label="Mã sản xuất"
                                        size="small"
                                        value={subAmount}
                                        onChange={(e) => {
                                            setSubAmount(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel style={{ fontSize: 12 }}>Loại vật tư</InputLabel>
                                            <Select
                                                label="Loại vật tư"
                                                size="small"
                                                value={category_id}
                                                onChange={(e) => {
                                                    (parseInt(e.target.value)) ? onChangeCategory(e, true) : onChangeCategory(e, false)
                                                }}
                                            >
                                                {
                                                    dataCategory.map((item, index) => (
                                                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                    ))
                                                }
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </div>
                                <div style={{ color: "red", fontStyle: "italic" }}>
                                    {validator.message("category_id", category_id, "required", {
                                        messages: {
                                            required: "(*) Chọn loại vật tư"
                                        }
                                    })}
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Số lượng"
                                        name="amount"
                                        size="small"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value)
                                            setTotalPrice(e.target.value * amount * subAmount)
                                        }}
                                    />
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("amount", amount, "required|numberic|min:1,num", {
                                            messages: {
                                                required: "(*) Nhập số lượng",
                                                min: "(*) Số lượng nhập lớn hơn 0"
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel style={{ fontSize: 12 }}>Nhà cung cấp</InputLabel>
                                            <Select
                                                size="small"
                                                label="Nhà cung cấp"
                                                name="supplier_id"
                                                value={supplier_id}
                                                onChange={(e) => setSuppliers(e.target.value)}
                                            >
                                                {dataSuppliers.map((item, index) => (
                                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("supplier_id", supplier_id, "required", {
                                            messages: {
                                                required: "(*) Chọn nhà cung cấp",
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Đơn giá"
                                        name="price"
                                        size="small"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                                        value={price}
                                        onChange={(e) => {
                                            setAmount(e.target.value)
                                            setTotalPrice(e.target.value * amount * subAmount)
                                        }}
                                    />
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("price", price, "required|numberic|min:1,num", {
                                            messages: {
                                                required: "(*) Nhập Đơn giá",
                                                min: "(*) Nhập Đơn giá"
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel style={{ fontSize: 12 }}>Nhà kho</InputLabel>
                                            <Select
                                                disabled={showWarehouse}
                                                size="small"
                                                label="Nhà cung cấp"
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
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("warehouse_id", warehouse_id, "required", {
                                            messages: {
                                                required: "(*) Chọn nhà nhà kho",
                                            }
                                        })}
                                    </div>
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("supplier_id", supplier_id, "required", {
                                            messages: {
                                                required: "(*) Chọn nhà cung cấp",
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        label="Thành tiền"
                                        size="small"
                                        disabled value={totalPrice}
                                    />
                                </div>
                                <div className="col-md-6">
                                    {
                                        isWarehouseSelected && (
                                            <>
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel style={{ fontSize: 12 }}>Giá/kệ</InputLabel>
                                                        <Select
                                                            size="small"
                                                            label="Nhà cung cấp"
                                                            name="shelf_id"
                                                            value={shelf_id}
                                                            onChange={(e) => setShelf(e.target.value)}
                                                        >
                                                            {dataShelf.map((item, index) => (
                                                                <MenuItem key={index} value={item.shelf_id}>{item.shelf_name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                                <div style={{ color: "red", fontStyle: "italic" }}>
                                                    {validator.message("shelf_id", shelf_id, "required", {
                                                        messages: {
                                                            required: "(*) Chọn giá/kệ để chứa vật tư/phụ tùng",
                                                        }
                                                    })}
                                                </div>
                                            </>
                                        )
                                    }
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("supplier_id", supplier_id, "required", {
                                            messages: {
                                                required: "(*) Chọn nhà cung cấp",
                                            }
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        type="number"
                                        label="Số lượng"
                                        name="amount"
                                        size="small"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                                        value={amount}
                                        onChange={(e) => {
                                            setAmount(e.target.value)
                                            setTotalPrice(e.target.value * amount * subAmount)
                                        }}
                                    />
                                    <div style={{ color: "red", fontStyle: "italic" }}>
                                        {validator.message("amount", amount, "required|numberic|min:1,num", {
                                            messages: {
                                                required: "(*) Nhập số lượng",
                                                min: "(*) Số lượng nhập lớn hơn 0"
                                            }
                                        })}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Import