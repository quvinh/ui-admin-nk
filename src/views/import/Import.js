/* eslint-disable no-unused-expressions */
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

const Import = () => {
    const [item_id, setItemID] = useState('')
    const [batch_code, setBatchCode] = useState('')
    const [warehouse_id, setWarehouse] = useState('')
    const [supplier_id, setSuppliers] = useState('')
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

    const handleChangeSuppliers = (e) => {
        setSuppliers(e.target.value)
        console.log(e.target.value)
    }

    const history = useHistory()

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

    const onChangeName = (e, newValue) => {
        setName(newValue)//)
        console.log("1: ", newValue)
        if (dataTable.length === 0) createCode()
        setIsItemSelected(false)
        if (dataItem && dataItem.map(item => item.itemname).includes(newValue)) {
            dataItem && dataItem.map((item) => {
                if (item.itemname === newValue) {
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
                    setName(item.itemname)
                    setTotalPrice(parseInt(item.amount) * parseInt(item.price))
                    setIsItemSelected(true)
                    setIsWarehouseSelected(true)
                    // console.log(item.name_item)
                }
            })
        } else {
            dataItemName.map((item) => {
                if (item.name === newValue) {
                    console.log(item)
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
                    setIsWarehouseSelected(false)
                    setIsItemSelected(true)
                }
            })
        }

        setIsUnitSelected(false)
    }

    const onChangeWarehouse = (e, newValue, value) => {
        if (value) {
            // let index = e.nativeEvent.target.selectedIndex;
            setWarehouse(e.target.value)
            setNameWarehouse(newValue.props.children)
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
            // let index = e.nativeEvent.target.selectedIndex;
            setCategory(e.target.value)
            setIsCategorySelected(true)
            console.log('category', e.target.value)
            Promise.all(
                [getData('/api/admin/category/itemCategory/' + e.target.value),
                getData('/api/admin/category/unitCategory/' + e.target.value)],
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
            console.log(dataTable)
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
                array.length > 0 ? setDataTable([...array, data]) : (
                    dataTable.length === 1 &&
                        dataTable[0].item_id === item_id &&
                        dataTable[0].warehouse_id === warehouse_id &&
                        dataTable[0].batch_code === batch_code &&
                        dataTable[0].shelf_id === shelf_id &&
                        dataTable[0].supplier_id === supplier_id ? setDataTable([data]) : setDataTable([...dataTable, data]))
                // console.log(dataTable)
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
        script()
    }

    const onRemoveRow = (e, index) => {
        var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
        setDataTable([...array])
    }

    const handleSave = () => {
        if (dataTable.length > 0) {
            var checked = false
            dataTable.map((item, index) => {
                console.log(item)
                Promise.all([postData('/api/admin/import/store', item)])
                    .then(function (res) {
                        console.log("SAVED")
                        // alert()
                        reset()
                    })
                    .catch(err => {
                        console.log(err)
                        checked = false
                    })
            })
        }
    }

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const alert = () => {
        const compile = document.createElement("script")
        compile.src = $(function () {
            var Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            $('.toastrDefaultSuccess').click(function () {
                toastr.success('Lưu thành công')
            });
        })
        compile.async = true
        document.body.appendChild(compile)
    }

    useEffect(() => {
        Promise.all([
            getData('/api/admin/warehouse/show/' + getUserID()),
            getData('/api/admin/suppliers'),
            getData('/api/admin/category'),
            getData(getRoleNames() === 'admin' ?
                '/api/admin/items/itemInWarehouse' :
                '/api/admin/items/searchItem/' + getDataWarehouseID()[0]),
            getData('/api/admin/shelf'),
            getData('/api/auth/get-user/' + getUserID()),
            getData('/api/admin/items')
        ])
            .then(res => {

                console.log(res[1].data)
                setDataWarehouse(res[0].data)
                setDataSuppliers(res[1].data)
                setDataCategory(res[2].data)
                setDataItem(res[3].data)
                setDataShelf(res[4].data)
                setUserProfile(res[5].data[0].fullname)
                setDataItemName(res[6].data)
                if (getRoleNames() !== 'admin') {
                    setShowWarehouse(true)
                    setIsWarehouseSelected(true)
                    getDataShelf(getDataWarehouseID()[0])
                } else { setShowWarehouse(false) }
                // script()
            })
            .catch(error => {
                console.log(error)
                // history.push("/login")
            })

        alert()
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
                                        id="itemname"
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
                                    <div className="row">
                                        <div className="col-md-8">
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DateTimePicker
                                                    renderInput={(props) => <TextField size='small' {...props} />}
                                                    label="Ngày nhập kho"
                                                    value={date}
                                                    inputFormat={"dd/MM/yyyy hh:mm"}
                                                    onChange={(newValue) => {
                                                        setDate(newValue)
                                                    }}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="col-md-4">
                                            <button type="button" class="btn btn-block btn-secondary" onClick={(e) => setNull()}>Làm mới</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        label="Mã vật tư"
                                        size="small"
                                        value={item_id}
                                        onChange={(e) => {
                                            setItemID(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel size="small">ĐVT</InputLabel>
                                                        <Select
                                                            size="small"
                                                            value={unit}
                                                            label="ĐVT"
                                                            onChange={(e, newValue) => {
                                                                (e.target.value === 'Lô') ? setIsUnitSelected(true) : (
                                                                    setIsUnitSelected(false),
                                                                    // setCategory(''),
                                                                    // setName(''),
                                                                    setNull(),
                                                                    setIsItemSelected(false)
                                                                )
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
                                                                    <InputLabel size="small">ĐVT</InputLabel>
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
                                        value={batch_code}
                                        onChange={(e) => {
                                            setBatchCode(e.target.value)
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <Box>
                                        <FormControl fullWidth>
                                            <InputLabel size="small">Loại vật tư</InputLabel>
                                            <Select
                                                disabled={isItemSelected}
                                                label="Loại vật tư"
                                                size="small"
                                                value={category_id > 0 ? parseInt(category_id) : ""}
                                                onChange={(e) => {
                                                    (parseInt(e.target.value)) ? onChangeCategory(e, true) : onChangeCategory(e, false)
                                                }}
                                            >
                                                {
                                                    dataCategory.map((item, index) => (
                                                        <option key={index} value={item.id}>{item.name}</option>
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
                                    {/* <TextField
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
                                    /> */}
                                    <CurrencyFormat className="form-control" placeholder="Số lượng" name="amount" value={String(amount).length < 9 ? amount : 1} thousandSeparator={true} prefix={'Số lượng: '} onValueChange={(values) => {
                                        const { formattedValue, value } = values
                                        setAmount(value)
                                        setTotalPrice(value * price * subAmount)
                                    }} />
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
                                            <InputLabel size="small">Nhà cung cấp</InputLabel>
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
                                    {/* <TextField
                                        fullWidth
                                        type="number"
                                        label="Đơn giá"
                                        name="price"
                                        size="small"
                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                                        value={price}
                                        onChange={(e) => {
                                            setPrice(e.target.value)
                                            setTotalPrice(e.target.value * amount * subAmount)
                                        }}
                                    /> */}
                                    <CurrencyFormat className="form-control" type="text" placeholder="Đơn giá" name="price" value={String(price).length < 12 ? price : 100000} thousandSeparator={true} prefix={'Đơn giá: '} suffix={' VND '} onValueChange={(values) => {
                                        const { formattedValue, value } = values
                                        setPrice(value)
                                        setTotalPrice(value * amount * subAmount)
                                    }} />
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
                                            <InputLabel size="small">Nhà kho</InputLabel>
                                            <Select
                                                disabled={showWarehouse}
                                                size="small"
                                                label="Nhà kho"
                                                name="warehouse_id"
                                                value={warehouse_id}
                                                onChange={(e, newValue) => {
                                                    (parseInt(e.target.value)) ? onChangeWarehouse(e, newValue, true) : onChangeWarehouse(e, newValue, false)
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
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    {/* <TextField
                                        fullWidth
                                        aria-readonly
                                        label="Thành tiền"
                                        size="small"
                                        value={totalPrice}
                                    /> */}
                                    <CurrencyFormat disabled className="form-control" type="text" placeholder="Thành tiền" value={totalPrice} thousandSeparator={true} prefix={'Thành tiền: '} suffix={' VND '} />
                                </div>
                                <div className="col-md-6">
                                    {
                                        isWarehouseSelected ? (
                                            <>
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel size="small">Giá/kệ</InputLabel>
                                                        <Select
                                                            size="small"
                                                            label="Nhà giá/kệ"
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
                                        ) : (
                                            <Box>
                                                <FormControl fullWidth>
                                                    <InputLabel size="small">Giá/kệ</InputLabel>
                                                    <Select
                                                        disabled
                                                        size="small"
                                                        label="Nhà cung cấp"
                                                        name="shelf_id"
                                                        value={shelf_id}
                                                        onChange={(e) => setShelf(e.target.value)}
                                                    >
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="row" style={{ marginBottom: 10 }}>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        label="Người tạo"
                                        name='created_by'
                                        value={userProfile}
                                        size="small"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        label="Ghi chú"
                                        value={note}
                                        size="small"
                                        onChange={(e) => setNote(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer" style={{ textAlign: "end" }}>
                            <button class="btn btn-sm btn-primary" style={{ width: 200 }} onClick={(e) => onAddTable(e)}>
                                <i class="fas fa-edit"></i> Thêm vào DS
                            </button>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col" style={{ textAlign: "start" }}>
                                    <h3 className="card-title">Danh sách nhập</h3>
                                </div>
                                <div className="col" style={{ textAlign: "end" }}>
                                    <button style={{ width: 200 }} type="button" className="btn btn-sm btn-success toastrDefaultSuccess" onClick={handleSave} disabled={dataTable.length > 0 ? false : true}>
                                        <i className="fas fa-save"></i> Lưu nhập
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table id="example1" className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã vật tư</th>
                                        <th>Mã sản xuất</th>
                                        <th>Tên vật tư</th>
                                        <th>ĐVT</th>
                                        <th>Số lượng</th>
                                        <th>Đơn giá</th>
                                        <th>Tiền hàng</th>
                                        <th>Kho</th>
                                        <th>Ghi chú</th>
                                        <th>Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataTable.map((item, index) => (
                                            <tr key={index}>
                                                <td>{String(index + 1)}</td>
                                                <td>{item.item_id}</td>
                                                <td>{item.batch_code}</td>
                                                <td>{item.name}</td>
                                                <td>{item.unit}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.price}</td>
                                                <td>{item.totalPrice}</td>
                                                <td>{item.nameWarehouse}</td>
                                                <td>{item.note}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-danger" onClick={(e) => {
                                                        onRemoveRow(e, index)
                                                    }}>
                                                        X
                                                    </button>
                                                </td>
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
            </section >
        </div >
    )
}

export default Import