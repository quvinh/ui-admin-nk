import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getData, postData } from '../../components/utils/Api'
import { getRoleNames, getToken, getUserID } from '../../components/utils/Common'
import Validator from './Validation';
import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Paper } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { styled } from '@mui/material/styles';

const Transfer = () => {
    const history = useHistory()
    const [item_id, setItemID] = useState('')
    const [batch_code, setBatchCode] = useState('')
    const [fromWarehouse, setFromWarehouse] = useState('')
    const [fromShelf, setFromShelf] = useState('')
    const [supplier_id, setSupplier] = useState()
    const [toWarehouse, setToWarehouse] = useState('')
    const [toShelf, setToShelf] = useState('')
    const [category_id, setCategory] = useState()
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')
    const [created_by, setCreatedBy] = useState('')
    const [amount, setAmount] = useState('')
    const [amountCurrent, setAmountCurrent] = useState(0)
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState(new Date)
    const [note, setNote] = useState('')
    const [kd, setKD] = useState('')

    const [nameFromShelf, setNameFromShelf] = useState('')
    const [nameFromWarehouse, setNameFromWarehouse] = useState('')
    const [nameToShelf, setNameToShelf] = useState('')
    const [nameToWarehouse, setNameToWarehouse] = useState('')

    const [dataTable, setDataTable] = useState([])
    const [dataItem, setDataItem] = useState([])
    const [dataFromWarehouse, setDataFromWarehouse] = useState([])
    const [dataFromShelf, setDataFromShelf] = useState([])
    const [dataToWarehouse, setDataToWarehouse] = useState([])
    const [dataToShelf, setDataToShelf] = useState([])
    const [code, setCode] = useState('')

    const [validator, showValidationMessage] = Validator()

    const [isAmountSelected, setIsAmountSelected] = useState(false)
    const [isFromWarehouseSelected, setIsFromWarehouseSelected] = useState(false)
    const [isToWarehouseSelected, setIsToWarehouseSelected] = useState(false)
    const [showWarehouse, setShowWarehouse] = useState(false)
    const [isSave, setIsSave] = React.useState(false)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, dataTable.length - page * rowsPerPage);

    const createCode = () => {
        const time = new Date()
        const date = time.getDate() + "" + (time.getMonth() + 1) + "" + time.getFullYear() + "" +
            time.getHours() + "" + time.getMinutes() + "" + time.getSeconds()
        const code = "TF_" + date
        console.log('CREATED: ' + code)
        setCode(code)
    }
    const onChangeFromWarehouse = (e, value) => {
        console.log(e.target.value)
        if (value) {
            setIsFromWarehouseSelected(true)
            setFromWarehouse(e.target.value)
            getDataFromShelf(e.target.value)
            Promise.all([getData('http://127.0.0.1:8000/api/admin/items/searchItem/' + e.target.value + '?token=' + getToken())])
                .then(function (res) {
                    setDataItem(res[0].data)
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setIsFromWarehouseSelected(false)
            setFromWarehouse(null)
        }
        setKD('')
        setAmount(0)
        setAmountCurrent(0)
        setName('')
        setFromShelf(null)
        setIsAmountSelected(false)
    }
    const getDataFromShelf = (id) => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
            .then(function (res) {
                setDataFromShelf(res[0].data)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const onChangeFromShelf = (e, newvalue) => {
        // const index = e.nativeEvent.target.selectedIndex
        if (e.target.value === 0) {
            setIsAmountSelected(false)
        } else {
            setNameFromShelf(newvalue.props.children)
            setFromShelf(e.target.value)
            Promise.all([
                getData('http://127.0.0.1:8000/api/admin/warehouse/itemShelf/' + fromWarehouse + '/' + e.target.value + '?token=' + getToken())
            ])
                .then(function (res) {
                    console.log(res[0].data)
                    setDataItem(res[0].data)
                })
                .catch(error => {
                    if (error.response.status === 403) {
                        history.push('/404')
                    }
                    else if (error.response.status === 401) {
                        history.push('/login')
                    }
                })
        }
        setName('')
        setAmount(0)
        setAmountCurrent(0)
        setKD('')
    }

    const onChangeToWarehouse = (e, newvalue, value) => {
        console.log(e)
        console.log(newvalue.props.children)
        // const index = e.nativeEvent.target.selectedIndex
        if (value) {
            setIsToWarehouseSelected(true)
            setToWarehouse(e.target.value)
            getDataToShelf(e.target.value)
            setNameToWarehouse(newvalue.props.children)
        } else {
            setIsToWarehouseSelected(false)
            setToWarehouse(null)
        }
        setToShelf(null)
        setIsAmountSelected(false)
    }
    const getDataToShelf = (id) => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/shelfWarehouse/' + id + '?token=' + getToken())])
            .then(function (res) {
                setDataToShelf(res[0].data)
            })
            .catch(err => {
                if (err.response.status === 403) {
                    history.push('/404')
                } else if (err.response.status === 401) {
                    history.push('/login')
                }
            })
    }
    const onChangeToShelf = (e, newvalue) => {
        // const index = e.nativeEvent.target.selectedIndex
        if (e.target.value !== 0 && fromShelf !== null && fromShelf !== 'Giá/kệ') {
            setNameToShelf(newvalue.props.children)
            setToShelf(e.target.value)
        } else {
            setIsAmountSelected(false)
        }
    }

    const onChangeName = (e, newValue) => {
        setName(e.target.value)
        if (dataTable.length === 0) createCode()
        setIsAmountSelected(false)
        setAmount(0)

        dataItem.map((item) => {
            if (item.itemname === newValue) {
                setItemID(item.item_id)
                setBatchCode(item.batch_code)
                setCategory(item.category_id)
                setSupplier(item.supplier_id)
                setFromWarehouse(item.warehouse_id)
                setNameFromWarehouse(item.name_warehouse)
                setFromShelf(item.shelf_id)
                setNameFromShelf(item.shelf_name)
                getDataFromShelf(item.warehouse_id)
                setUnit(item.unit)
                setPrice(item.price)
                setName(item.itemname)
                setAmountCurrent(item.amount)
                setIsFromWarehouseSelected(true)
                Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/kd/' + item.item_id + '/' + item.warehouse_id + '/' + item.shelf_id + '?token=' + getToken())])
                    .then(function (res) {
                        setKD(res[0].data)
                    })
            }
        })
    }

    const onChangeAmount = (e) => {
        (e.target.value > 0 && name.length > 0 &&
            toWarehouse !== '' && toWarehouse !== null &&
            toShelf !== '' && toShelf !== 'Giá/kệ' && toShelf.toString() !== fromShelf.toString()) ? setIsAmountSelected(true) : setIsAmountSelected(false)
        if (dataTable.length === 0) createCode()
    }

    const setNull = () => {
        setName('')
        setAmount('')
        setFromWarehouse('')
        setToWarehouse('')
        setDate(new Date())
        setIsAmountSelected(false)
        setFromShelf(null)
        setToShelf(null)
        setKD('')
    }

    const reset = () => {
        setNull()
        setDataTable([])
        setIsSave(false)
    }

    const onRemoveRow = (e, index) => {
        var array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
        setDataTable([...array])
    }



    const onAddTable = (e) => {//Button click, add data table
        console.log('e', dataTable)
        if (validator.allValid() && amount > 0) {
            if (dataTable.length > 0) {
                let amountTotal = 0
                let array = []
                dataTable.map((item, index) => {
                    if (item.item_id === item_id && item.fromWarehouse === fromWarehouse && item.fromShelf === fromShelf && item.toWarehouse === toWarehouse && item.toShelf === toShelf) {
                        amountTotal = parseInt(item.amount) + parseInt(amount)
                        array = index > 0 ? [...dataTable.slice(0, index), ...dataTable.slice(index + 1, dataTable.length)] : [...dataTable.slice(1, dataTable.length)]
                    }
                })
                amountTotal > 0 ? amountTotal = amountTotal : amountTotal = amount
                const data = {
                    item_id: item_id,
                    code: code,
                    batch_code: batch_code,
                    fromWarehouse: fromWarehouse,
                    fromShelf: fromShelf,
                    nameFromWarehouse: nameFromWarehouse,
                    nameFromShelf: nameFromShelf,
                    supplier_id: supplier_id,
                    category_id: category_id,
                    name: name,
                    unit: unit,
                    created_by: getUserID(),//USER
                    amount: amountTotal,
                    price: price,
                    toWarehouse: toWarehouse,
                    toShelf: toShelf,
                    nameToWarehouse: nameToWarehouse,
                    nameToShelf: nameToShelf,
                    note: note,
                }
                console.log(dataTable)
                array.length > 0 ? setDataTable([...array, data]) :
                    (dataTable.length === 1 && dataTable[0].item_id === item_id && dataTable[0].fromWarehouse === fromWarehouse &&
                        dataTable[0].fromShelf === fromShelf && dataTable[0].toWarehouse === toWarehouse &&
                        dataTable[0].toShelf === toShelf ? setDataTable([data]) :
                        setDataTable([...dataTable, data]))
                console.log(dataTable)
            } else {
                const data = {
                    item_id: item_id,
                    code: code,
                    batch_code: batch_code,
                    fromWarehouse: fromWarehouse,
                    fromShelf: fromShelf,
                    nameFromWarehouse: nameFromWarehouse,
                    nameFromShelf: nameFromShelf,
                    supplier_id: supplier_id,
                    category_id: category_id,
                    name: name,
                    unit: unit,
                    created_by: getUserID(),//USER
                    amount: amount,
                    price: price,
                    toWarehouse: toWarehouse,
                    toShelf: toShelf,
                    nameToWarehouse: nameToWarehouse,
                    nameToShelf: nameToShelf,
                    note: note,
                }
                setDataTable([...dataTable, data])
            }
            setAmount(0)
        } else {
            showValidationMessage(true)
            setAmount(0)
        }
        console.log('dataTable', dataTable)
        script()
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleSave = (e) => {
        if (dataTable.length > 0) {
            dataTable.map((item, index) => {
                Promise.all([postData('http://127.0.0.1:8000/api/admin/transfer/store?token=' + getToken(), item)])
                    .then(function (res) {
                        console.log("SAVED")
                        setIsSave(true)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            reset()
        }
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
                'http://127.0.0.1:8000/api/admin/items/searchItem/' + getIdWarehouseRole() + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/auth/user-profile?token=' + getToken())
        ])
            .then(res => {
                console.log(res[0].data)
                setDataItem(res[0].data)
                setDataFromWarehouse(res[1].data)
                setDataToWarehouse(res[1].data)
                setCreatedBy(res[2].data[0].fullname)
                if (getRoleNames() !== 'admin') {
                    setFromWarehouse(getIdWarehouseRole())
                    // getDataShelf(getIdWarehouseRole())
                    setIsFromWarehouseSelected(true)
                    setShowWarehouse(true)
                } else { setShowWarehouse(false) }

            })
            .catch(error => {
                if (error.response.status === 403) {
                    history.push('/404')
                }
            })
    }, [])
    console.log('d', dataTable)
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Luân Chuyển Kho</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Luân chuyển kho</li>
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
                                    <h3 className="card-title">Luân chuyển kho</h3>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className='row'>
                                        <div className="col-md-6">
                                            <Autocomplete
                                                id="itemname"
                                                freeSolo
                                                size='small'
                                                options={dataItem.map((option) => option.itemname)}
                                                inputValue={name}
                                                onInputChange={(e, newValue) => onChangeName(e, newValue)}
                                                renderInput={(params) => <TextField {...params} label="Tên vật tư" />}
                                                disableClearable
                                            />
                                            {validator.message("name", name, "required", {
                                                messages: {
                                                    required: "(*) Nhập tên vật tư"
                                                }
                                            })}
                                        </div>
                                        <div className="col-md-1">
                                            <TextField id=""
                                                fullWidth
                                                size='small'
                                                label="Số lượng"
                                                type={'number'}
                                                inputProps={{ min: 0, max: kd, type: 'number' }}
                                                value={amount}
                                                onChange={(e) => {
                                                    onChangeAmount(e)
                                                    setAmount(e.target.value)
                                                }}
                                                variant="outlined" />
                                            <div style={{ color: 'red', fontStyle: 'italic' }}>
                                                {validator.message("amount", amount, "required", {
                                                    messages: {
                                                        required: "(*) Nhập số lượng",
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div className="col-md-1">
                                            <TextField
                                                // fullWidth
                                                disabled
                                                type={'number'}
                                                size='small'
                                                label="SL khả dụng"
                                                value={kd}
                                                variant="outlined"
                                            />
                                        </div>
                                        <div className="col-md-2">
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
                                        <div className="col-md-1">
                                            <Button size='sm' variant="outlined" onClick={(e) => setNull()}>Làm mới</Button>
                                        </div>
                                        <div className="col-md-1">
                                            <Button size='sm' variant="outlined" onClick={(e) => reset()}>Reset</Button>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-6">
                                            <FormControl fullWidth>
                                                <InputLabel size='small' id="demo-simple-select-label">Chuyển từ kho</InputLabel>
                                                <Select
                                                    size='small'
                                                    labelId="demo-simple-select-label"
                                                    value={fromWarehouse}
                                                    label="Chuyển từ kho"
                                                    onChange={(e) => {
                                                        (parseInt(e.target.value)) ? onChangeFromWarehouse(e, true) : onChangeFromWarehouse(e, false)
                                                    }}
                                                >
                                                    {
                                                        dataFromWarehouse.map((item, index) => (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-6">
                                            <FormControl fullWidth>
                                                <InputLabel size='small' id="demo-simple-select-label">Chuyển đến kho</InputLabel>
                                                <Select
                                                    size='small'
                                                    labelId="demo-simple-select-label"
                                                    value={toWarehouse}
                                                    label="Chuyển đến kho"
                                                    onChange={(e, newvalue) => {
                                                        (parseInt(e.target.value)) ? onChangeToWarehouse(e, newvalue, true) : onChangeToWarehouse(e, newvalue, false)
                                                    }}
                                                >
                                                    {
                                                        dataToWarehouse.map((item, index) => (
                                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-6">
                                            {
                                                (isFromWarehouseSelected) ? (
                                                    <FormControl fullWidth>
                                                        <InputLabel size='small' id="demo-simple-select-label">Chuyển từ kệ</InputLabel>
                                                        <Select
                                                            size='small'
                                                            labelId="demo-simple-select-label"
                                                            value={fromShelf}
                                                            label="Chuyển từ kệ"
                                                            onChange={(e, newvalue) => {
                                                                onChangeFromShelf(e, newvalue)
                                                                setFromShelf(e.target.value)
                                                            }}
                                                        >
                                                            {
                                                                dataFromShelf.map((item, index) => (
                                                                    <MenuItem value={item.shelf_id}>{item.shelf_name}</MenuItem>
                                                                ))}

                                                        </Select>
                                                    </FormControl>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </div>
                                        <div className="col-6">
                                            {
                                                (isToWarehouseSelected) ? (
                                                    <FormControl fullWidth>
                                                        <InputLabel size='small' id="demo-simple-select-label">Chuyển đến kệ</InputLabel>
                                                        <Select
                                                            size='small'
                                                            labelId="demo-simple-select-label"
                                                            value={toShelf}
                                                            label="Chuyển đến kệ"
                                                            onChange={(e, newvalue) => {
                                                                onChangeToShelf(e, newvalue)
                                                                setToShelf(e.target.value)
                                                            }}
                                                        >
                                                            {
                                                                dataToShelf.map((item, index) => (
                                                                    <MenuItem value={item.shelf_id}>{item.shelf_name}</MenuItem>
                                                                ))}

                                                        </Select>
                                                    </FormControl>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col" style={{ textAlign: "end" }}>
                                            {
                                                (isAmountSelected) ? (
                                                    <>
                                                        <button class="btn btn-sm btn-primary" onClick={(e) => {
                                                            onAddTable(e)
                                                            setKD(parseInt(kd) - parseInt(amount))
                                                        }}><i class="fas fa-edit"></i> THÊM VÀO PHIẾU</button>
                                                        {/* <ShowTransfer dataTable={dataTable} code={code} /> */}
                                                    </>
                                                ) : (
                                                    <button class="btn btn-sm btn-secondary" disabled>
                                                        <i class="fas fa-edit"></i> THÊM VÀO PHIẾU
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className="row">
                                        <div className="col" style={{ textAlign: "end" }}>
                                            {
                                                (isSave) ? (
                                                    <button class="btn btn-sm btn-success" disabled>
                                                        <i class="fas fa-edit"></i> Lưu thành công
                                                    </button>
                                                ) : (
                                                    <button class="btn btn-sm btn-primary" onClick={handleSave}>
                                                        <i class="fas fa-edit"></i> Lưu phiếu
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <br/>
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã vật tư</th>
                                                <th>Tên vật tư</th>
                                                <th>Số lượng</th>
                                                <th>ĐVT</th>
                                                <th>Từ kho</th>
                                                <th>Từ kệ</th>
                                                <th>Đến kho</th>
                                                <th>Đến kệ</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataTable.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item_id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.nameFromWarehouse}</td>
                                                        <td>{item.nameFromShelf}</td>
                                                        <td>{item.nameToWarehouse}</td>
                                                        <td>{item.nameToShelf}</td>
                                                        <td>
                                                            <button class="btn btn-sm btn-danger" onClick={(e) => {
                                                                onRemoveRow(e, index)
                                                                setKD(parseInt(kd) + parseInt(item.amount))
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
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    )
}

export default Transfer