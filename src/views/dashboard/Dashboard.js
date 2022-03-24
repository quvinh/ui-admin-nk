/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
// import Chart from './Charts'
import { Bar } from 'react-chartjs-2';
// import BarChart from './Chart2';
import { getData } from '../../components/utils/Api'
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Link } from 'react-router-dom';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';



const Dashboard = () => {
  const [tonKho, setTonKho] = useState([])
  const [importVT, setImportVT] = useState([])
  const [exportVT, setExportVT] = useState([])
  const year = new Date().getFullYear().toString()
  const [dataWarehouse, setDataWarehouse] = useState([])
  const [warehouse, setWarehouse] = useState('')
  const [totalItem, setTotalItem] = useState('')
  const [amountItem, setAmountItem] = useState('')
  const [status, setStatus] = useState('')

  const arrImportAmount = []
  importVT.map((item, index) => {
    arrImportAmount.push(item.importAmount)
  })
  const arrImportMonth = []
  importVT.map((item, index) => {
    arrImportMonth.push(item.month)
  })
  const arrExportMonth = []
  exportVT.map((item, index) => {
    arrExportMonth.push(item.month)
  })
  const arrExportAmount = []
  exportVT.map((item, index) => {
    arrExportAmount.push(item.exportAmount)
  })

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Biểu đồ số lượng nhập xuất',
      },
    },
  };

  const labels = arrExportMonth.length > arrImportMonth.length ? arrExportMonth : arrImportMonth;
  console.log(labels)
  const data = {
    labels,
    datasets: [
      {
        label: 'Nhập',
        data: arrImportAmount,
        backgroundColor: 'rgba(248, 117, 5, 0.5)',
      },
      {
        label: 'Xuất',
        data: arrExportAmount,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ]
  }

  const onChangeWarehouse = (e) => {
    Promise.all([
      getData('http://127.0.0.1:8000/api/admin/dashboard/importByWarehouse/' + e.target.value + '/' + year + '?token=' + getToken()),
      getData('http://127.0.0.1:8000/api/admin/dashboard/exportByWarehouse/' + e.target.value + '/' + year + '?token=' + getToken()),
    ]).then(function (res) {
      setImportVT(res[0].data)
      setExportVT(res[1].data)
    })
  }

  useEffect(() => {
    {
      getRoleNames() === 'admin' ? (
        Promise.all([
          getData('http://127.0.0.1:8000/api/admin/dashboard/tongTonKho?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/import/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/export/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + getUserID() + '?token=' + getToken()),
        ])
          .then(function (res) {
            setTonKho(res[0].data)
            setImportVT(res[1].data)
            setExportVT(res[2].data)
            setDataWarehouse(res[3].data)
          })
          .catch((error) => {
            console.log(error)
          })

      ) : getDataWarehouseID().length > 0 && (
        Promise.all([
          getData('http://127.0.0.1:8000/api/admin/dashboard/tonKho/' + getUserID() + '/' + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/warehouse/show/' + getUserID() + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/importByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/exportByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()),
        ])
          .then(function (res) {
            console.log('user', res[0].data, getUserID())
            setTonKho(res[0].data)
            setDataWarehouse(res[1].data)
            setImportVT(res[2].data)
            setExportVT(res[3].data)
          })
          .catch((error) => {
            console.log(error)
          })
      )
    }

  }, [])

  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Bản tin</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                <li className="breadcrumb-item active">Bản tin</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="card card-info card-outline">
                <div className="card-body">
                  <div className='row'>
                    {
                      tonKho.map((item, index) => (
                        <div className="col-md-3 small-box bg-white card-warning card-outline ml-1" >
                          <div className="inner">
                            <h5 className="info-box-text">Nhà kho : {item.name}<span className="float-right badge bg-success">Active</span></h5>
                            <p className="info-box-number">Giá trị kho : {parseInt(item.total).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</p>
                          </div>
                          <div className='icon'>
                            <i className="far fa-home"></i>
                          </div>
                          <Link to={"/warehouse-show/" + item.warehouse_id} class="small-box-footer">Chi tiết kho<i class="fas fa-arrow-circle-right"></i></Link>
                          {/* /.info-box-content */}
                        </div>

                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /.col-md-6 */}
          <div className="row">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className='row'>
                    <div className='col-md-8'></div>
                    <div className="col-md-4" >
                      <Box>
                        <FormControl fullWidth>
                          <InputLabel size='small' style={{ fontSize: 12 }}>Nhà kho</InputLabel>
                          <Select
                            size="small"
                            label="Nhà kho"
                            name="warehouse"
                            value={warehouse}
                            onChange={(e) => {
                              onChangeWarehouse(e)
                              setWarehouse(e.target.value)
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
                  <div className="position-relative mb-4">
                    <Bar options={options} data={data} />
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6'>
              {/* <div className='card'>
                <div className='card-body'>
                  <table>
                    <th>a</th>
                  </table>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Dashboard