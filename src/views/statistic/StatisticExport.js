/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../components/utils/Api'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'


const StatisticExport = () => {
    const [dataTable, setDataTable] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [warehouse, setWarehouse] = useState(getDataWarehouseID()[0])
    const date = new Date()

    const data = {
        year: date.getFullYear(),
        warehouse_id: warehouse
    }

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }


    const handleReload = (date) => {
        const data = {
            warehouse_id: warehouse,
            startDate: startDate.getDate() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear(),
            endDate: endDate.getDate() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getFullYear()
        }
        Promise.all([postData('/api/admin/statistic/exportByDay?token=' + getToken(), data)])
            .then(function (res) {
                setDataTable(res[0].data.data)
            })
    }

    useEffect(() => {
        Promise.all([
            postData('/api/admin/statistic/exportByYear?token=' + getToken(), data),
            getData('/api/admin/warehouse/show/' + getUserID() + '?token=' + getToken()),
        ]).then(function (res) {
            console.log('ware', res[0].data, 'data', data)
            setDataTable(res[0].data.data)
            script()
            setDataWarehouse(res[1].data)
        })

    }, [])

    return (
        <div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <div className='row'>
                                        <div className="col-md-3">
                                            <DatePicker
                                                placeholderText='Từ ngày'
                                                selected={startDate}
                                                onChange={(e) => {
                                                    setStartDate(e)
                                                }}
                                                selectsStart
                                                showMonthDropdown
                                                startDate={startDate}
                                                endDate={endDate}
                                            />
                                        </div>
                                        <div className='col-md-3'>
                                            <DatePicker
                                                placeholderText='Đến ngày'
                                                selected={endDate}
                                                onChange={(date) => {
                                                    setEndDate(date)
                                                }}
                                                selectsEnd
                                                showMonthDropdown
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                            />
                                        </div>
                                        <div className='col-md-2'>
                                            <Button size='sm' variant="outlined" onClick={(e) => handleReload()}>Load</Button>
                                        </div>
                                        <div className='col-md-2'>
                                            <FormControl fullWidth>
                                                <InputLabel size='small' id="demo-simple-select-label">Chọn kho</InputLabel>
                                                <Select
                                                    size='small'
                                                    labelId="demo-simple-select-label"
                                                    value={warehouse}
                                                    label="Chuyển đến kho"
                                                    onChange={(e) => {
                                                        setWarehouse(e.target.value)
                                                    }}
                                                >
                                                    {
                                                        dataWarehouse.map((item, index) => (
                                                            <MenuItem key={index + 1} value={item.id}>{item.name}</MenuItem>
                                                        ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 10 }}>STT</th>
                                                <th>Mã vật tư</th>
                                                <th>Tên vật tư</th>
                                                <th style={{ width: 10 }}>SL</th>
                                                <th style={{ width: 10 }}>ĐVT</th>
                                                <th>Tại kệ</th>
                                                <th>Ngày tạo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataTable.map((item, index) => (
                                                    <tr key={index + 1}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item_id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.shelf_name}</td>
                                                        <td>{item.created_at}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default StatisticExport