/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../components/utils/Api'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'


const StatisticExport = () => {
    const [date, setDate] = useState(new Date())
    const [dataTable, setDataTable] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [isDaySelected, setIsDaySelected] = useState(false)
    const [isMonthSelected, setIsMonthSelected] = useState(false)
    const [isYearSelected, setIsYearSelected] = useState(false)

    const [day, setDay] = useState(date.getDate())
    const [month, setMonth] = useState(date.getMonth() + 1)
    const [year, setYear] = useState(date.getFullYear())
    const [warehouse, setWarehouse] = useState(getDataWarehouseID()[0])


    const data = {
        day: day,
        month: month,
        year: year,
        warehouse_id: warehouse
    }

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const handleReloadYear = (e) => {
        const data = {
            warehouse_id: warehouse,
            year: e.getFullYear()
        }
        setDate(e)
        setYear(e.getFullYear())
        Promise.all([postData('http://127.0.0.1:8000/api/admin/statistic/exportByYear?token=' + getToken(), data)])
            .then(function (res) {
                setDataTable(res[0].data.data)
            })
    }
    const handleReloadMonth = (e) => {
        const data = {
            warehouse_id: warehouse,
            year: e.getFullYear(),
            month: e.getMonth() + 1
        }
        setDate(e)
        setMonth(e.getMonth()+1)
        Promise.all([postData('http://127.0.0.1:8000/api/admin/statistic/exportByMonth?token=' + getToken(), data)])
            .then(function (res) {
                setDataTable(res[0].data.data)
            })
    }
    const handleReloadDay = (e) => {
        const data = {
            warehouse_id: warehouse,
            year: e.getFullYear(),
            month: e.getMonth() + 1,
            day: e.getDate()
        }
        setDate(e)
        setDay(e.getDate())
        Promise.all([postData('http://127.0.0.1:8000/api/admin/statistic/exportByDay?token=' + getToken(), data)])
            .then(function (res) {
                setDataTable(res[0].data.data)
            })
    }

    useEffect(() => {
        Promise.all([
            postData('http://127.0.0.1:8000/api/admin/statistic/exportByYear?token=' + getToken(), data),
            getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + getUserID() + '?token=' + getToken()),
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
                                        <div className='col-md-3'>
                                            <button className='btn btn-sm btn-primary' onClick={(e) => {
                                                setIsDaySelected(true)
                                                setIsMonthSelected(false)
                                                setIsYearSelected(false)
                                            }}>Chọn ngày</button>
                                            <button className='btn btn-sm btn-primary' onClick={(e) => {
                                                setIsMonthSelected(true)
                                                setIsDaySelected(false)
                                                setIsYearSelected(false)
                                            }}>Chọn tháng</button>
                                            <button className='btn btn-sm btn-primary' onClick={(e) => {
                                                setIsYearSelected(true)
                                                setIsMonthSelected(false)
                                                setIsDaySelected(false)
                                            }}>Chọn Năm</button>
                                        </div>
                                        <div className="col-md-2">
                                            {
                                                isDaySelected ?
                                                    <DatePicker
                                                        selected={date}
                                                        onChange={e => handleReloadDay(e)}
                                                        dateFormat="dd/MM/yyyy"
                                                    /> : <></>
                                            }
                                            {
                                                isMonthSelected ?
                                                    <DatePicker
                                                        selected={date}
                                                        onChange={(e) => handleReloadMonth(e)}
                                                        dateFormat="MM/yyyy"
                                                        showMonthYearPicker
                                                        showFullMonthYearPicker
                                                    /> : <></>}
                                            {
                                                isYearSelected ?
                                                    <DatePicker
                                                        selected={date}
                                                        onChange={(e) => handleReloadYear(e)}
                                                        showYearPicker
                                                        dateFormat="yyyy"
                                                    /> : <></>
                                            }
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