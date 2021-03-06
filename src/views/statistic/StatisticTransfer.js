/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { FormControl, InputLabel, MenuItem, Select, TextField, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../components/utils/Api'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'

const StatisticTransfer = () => {
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


    const handleReload = () => {
        const data = {
            warehouse_id: warehouse,
            startDate: startDate.getDate() + '-' + (startDate.getMonth() + 1) + '-' + startDate.getFullYear(),
            endDate: endDate.getDate() + '-' + (endDate.getMonth() + 1) + '-' + endDate.getFullYear()
        }
        Promise.all([postData('/api/admin/statistic/transferByDay', data)])
            .then(function (res) {
                setDataTable(res[0].data.data)
            })
    }

    useEffect(() => {
        Promise.all([
            postData('/api/admin/statistic/transferByYear', data),
            getData('/api/admin/warehouse/show/' + getUserID()),
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
                                                placeholderText='T??? ng??y'
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
                                                placeholderText='?????n ng??y'
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
                                                <InputLabel size='small' id="demo-simple-select-label">Ch???n kho</InputLabel>
                                                <Select
                                                    size='small'
                                                    labelId="demo-simple-select-label"
                                                    value={warehouse}
                                                    label="Chuy???n t??? kho"
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
                                                <th>M?? v???t t??</th>
                                                <th>T??n v???t t??</th>
                                                <th style={{ width: 10 }}>SL</th>
                                                <th style={{ width: 10 }}>??VT</th>
                                                <th>T??? kho</th>
                                                <th>T??? k???</th>
                                                <th>?????n kho</th>
                                                <th>?????n k???</th>
                                                <th>Ng??y t???o</th>
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
                                                        <th>{item.name_from_warehouse}</th>
                                                        <th>{item.name_from_shelf}</th>
                                                        <td>{item.name_to_warehouse}</td>
                                                        <td>{item.name_to_shelf}</td>
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

export default StatisticTransfer