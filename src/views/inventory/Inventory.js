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
    const data = [1,2,3,4,5,6]

    const [dataItem, setDataItem] = useState([])
    const [difference, setDifference] = useState('')
    const [name, setName] = useState([])

    const handleNameChange = (e) => {
        setName(e.value.target)
    }
    const handleDifference = (e) => {
        setDifference(e.target.value)
    }
    const dataOption = data.map((item, index) => ({
        name: item.itemname,
        value: item.id
    }))

    // useEffect(() => {
    //     Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/listItem/' + getDataWarehouseID() + '?token=' + getToken())
    //     ]).then(function (res) {
    //         setDataItem(res[0].data)
    //     })
    // }, [])
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
                                                    // value={nameSelect}
                                                    onChange={(e, newValue) => handleNameChange(e, newValue)}
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
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    name="amount"
                                                    // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    size='small'
                                                    label="Số lượng"
                                                // value={amount}
                                                // onChange={(e) => {
                                                //     onChangeAmount(e)
                                                //     setAmount(parseInt(e.target.value) > kd ? kd : parseInt(e.target.value))
                                                // }}
                                                />

                                            </div>
                                            <div className='col-md-3'>
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
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel size='small' style={{ fontSize: 12 }}>Nhà kho</InputLabel>
                                                        <Select
                                                            // disabled={showWarehouse}
                                                            size="small"
                                                            label="Nhà kho"
                                                            name="warehouse_id"
                                                        // value={warehouse_id}
                                                        // onChange={(e) => {
                                                        //     (parseInt(e.target.value)) ? onChangeWarehouse(e, true) : onChangeWarehouse(e, false)
                                                        // }}
                                                        >
                                                            {/* {dataWarehouse.map((item, index) => (
                                                                <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                                            ))} */}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </div>
                                            <div className='col-md-6'>
                                                <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                                                    <DateTimePicker
                                                        renderInput={(props) => <TextField size='small' {...props} />}
                                                        label="Ngày nhập"
                                                        // value={date}
                                                        inputFormat={"dd/MM/yyyy hh:mm"}
                                                    // onChange={(newValue) => {
                                                    //     setDate(newValue)
                                                    // }}
                                                    />
                                                </LocalizationProvider>
                                            </div>
                                        </div>
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <Box>
                                                    <FormControl fullWidth>
                                                        <InputLabel size='small' style={{ fontSize: 12 }}>Giá/kệ</InputLabel>
                                                        <Select
                                                            size="small"
                                                            label="Nhà cung cấp"
                                                            name="shelf_id"
                                                        // value={shelf_id}
                                                        // onChange={(e, newValue) => {
                                                        //     onChangeShelf(e, newValue)
                                                        //     setShelfID(e.target.value)
                                                        // }}
                                                        >
                                                            {/* {dataShelf.map((item, index) => (
                                                                <MenuItem key={index} value={item.shelf_id}>{item.shelf_name}</MenuItem>
                                                            ))} */}
                                                        </Select>
                                                    </FormControl>
                                                </Box>
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
                                        <div className='row' style={{ marginBottom: 10 }}>
                                            <div className='col-md-6'>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    name="amount"
                                                    // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    size='small'
                                                    label="Mã vặt tư"
                                                // value={amount}
                                                // onChange={(e) => {
                                                //     onChangeAmount(e)
                                                //     setAmount(parseInt(e.target.value) > kd ? kd : parseInt(e.target.value))
                                                // }}
                                                />
                                            </div>
                                            <div className='col-md-6'>
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    name="amount"
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
                                                <TextField
                                                    fullWidth
                                                    type="number"
                                                    name="amount"
                                                    // inputProps={{ min: 0, max: kd, inputMode: 'numeric', pattern: '[0-9]*' }}
                                                    size='small'
                                                    label="Mã vặt tư"
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
