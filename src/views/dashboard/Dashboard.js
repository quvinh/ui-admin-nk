/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
// import Chart from './Charts'
// import { Bar } from 'react-chartjs-2';
// import BarChart from './Chart2';
import { getData } from '../../components/utils/Api'
import { getDataWarehouseID, getRoleNames, getToken } from '../../components/utils/Common'


const Dashboard = () => {
  const [tonKho, setTonKho] = useState([])
  const [importVT, setImportVT] = useState([])
  const [exportVT, setExportVT] = useState([])
  const year = new Date().getFullYear().toString()
  const [nameWarehouse, setNameWarehouse] = useState('')
  const [idWarehouse, setIdWarehouse] = useState('')
  const [totalItem, setTotalItem] = useState('')
  const [amountItem, setAmountItem] = useState('')
  const [status, setStatus] = useState('')

  const arrImportAmount = []
  const arrImportLabel = []
  importVT.map((item, index) => {
    arrImportAmount.push(item.importAmount)
    arrImportLabel.push(item.warehouse_name)
  })
  console.log(arrImportAmount)
  const arrImportMonth = []
  importVT.map((item, index) => {
    arrImportMonth.push(item.month)
  })
  const arrExportMonth = []
  exportVT.map((item, index) => {
    arrExportMonth.push(item.month)
  })
  const arrExportLabel = []
  const arrExportAmount = []
  exportVT.map((item, index) => {
    arrExportAmount.push(item.exportAmount)
    arrExportLabel.push(item.warehouse_name)
  })

  const Charts = () => {
    // var ctx = document.getElementById('myChart');
    // var myChart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [{
    //       label: 'Nhập',
    //       data: [12, 19, 3, 5, 2, 3],
    //       backgroundColor: [
    //         'rgba(255, 99, 132, 0.2)',
    //         'rgba(54, 162, 235, 0.2)',
    //         'rgba(255, 206, 86, 0.2)',
    //         'rgba(75, 192, 192, 0.2)',
    //         'rgba(153, 102, 255, 0.2)',
    //         'rgba(255, 159, 64, 0.2)'
    //       ],
    //       borderColor: [
    //         'rgba(255, 99, 132, 1)',
    //         'rgba(54, 162, 235, 1)',
    //         'rgba(255, 206, 86, 1)',
    //         'rgba(75, 192, 192, 1)',
    //         'rgba(153, 102, 255, 1)',
    //         'rgba(255, 159, 64, 1)'
    //       ],
    //       borderWidth: 1
    //     },
    //   ]
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true
    //       }
    //     }
    //   }
    // });
    // var barChartCanvas = $('#barChart').get(0).getContext('2d')
    var barChartCanvas = document.getElementById('myChart');
    new Chart(barChartCanvas, {
      type: 'bar',
      data: {
        //  ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        labels: arrImportMonth,
        datasets: [
          {
            label: 'Nhập',
            backgroundColor: 'rgba(60,141,188,0.9)',
            borderColor: 'rgba(60,141,188,0.8)',
            pointRadius: false,
            pointColor: '#3b8bba',
            pointStrokeColor: 'rgba(60,141,188,1)',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(60,141,188,1)',
            data: arrImportAmount
          },
          {
            label: 'Xuất',
            backgroundColor: 'rgba(210, 214, 222, 1)',
            borderColor: 'rgba(210, 214, 222, 1)',
            pointRadius: false,
            pointColor: 'rgba(210, 214, 222, 1)',
            pointStrokeColor: '#c1c7d1',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: arrExportAmount
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        },
        datasetFill: false
      }
    })
  }
  

  useEffect(() => {
    {
      getRoleNames() === 'admin' ? (
        Promise.all([
          getData('http://127.0.0.1:8000/api/admin/dashboard/tongTonKho?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/import/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/export/' + year + '?token=' + getToken())
        ])
          .then(function (res) {
            console.log(res)
            // res.header('Access-Control-Allow-Origin: *')
            setTonKho(res[0].data)
            console.log(res[1].data)
            setImportVT(res[1].data)
            console.log(res[2].data)
            setExportVT(res[2].data)
            Charts()
          })
          .catch((error) => {
            console.log(error)
            //   // if (error.response.status === 403) {
            //   //   history.push('/404')
            //   // } else if (error.response.status === 401) {
            //   //   history.push('/login')
            //   // }
            //   // history.push('/404')
          })

      ) : getDataWarehouseID().length > 0 && (
        Promise.all([
          getData('http://127.0.0.1:8000/api/admin/dashboard/listWarehouse/' + getDataWarehouseID()[0] + '/' + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/importByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/exportByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/tonKho/' + getDataWarehouseID()[0] + '?token=' + getToken())
        ])
          .then(function (res) {
            // res.header('Access-Control-Allow-Origin: *')
            console.log(res)
            setTonKho(res[0].data)
            setImportVT(res[1].data)

            setExportVT(res[2].data)
            setNameWarehouse(res[4].data.name)
            setIdWarehouse(res[4].warehouse_id)
            setTotalItem(res[4].total)
            setAmountItem(res[4].tonKho)
            setStatus(res[4].status)
            Charts()
            // setTonKho(res[4].data)
          })
          .catch((error) => {
            console.log(error)
          })
      )
    }
    

  }, [])
  // Promise.all([

  // getData(getRoleNames() === 'admin' ? (
  //   'http://127.0.0.1:8000/api/admin/dashboard/tongTonKho?token=' + getToken(),
  //   'http://127.0.0.1:8000/api/admin/dashboard/import/' + year + '?token=' + getToken(),
  //   'http://127.0.0.1:8000/api/admin/dashboard/export/' + year + '?token=' + getToken()
  // ) : getDataWarehouseID().length > 0 && (
  //   'http://127.0.0.1:8000/api/admin/dashboard/listWarehouse/' + getDataWarehouseID()[0] + '/' + '?token=' + getToken(),
  //   'http://127.0.0.1:8000/api/admin/dashboard/importByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken(),
  //   'http://127.0.0.1:8000/api/admin/dashboard/exportByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken(),
  //   'http://127.0.0.1:8000/api/admin/dashboard/tonKho/' + getDataWarehouseID()[0] + '?token=' + getToken()
  // ))])
  // .then(function (res) {
  //   // res.header('Access-Control-Allow-Origin: *')
  //   setTonKho(res[0].data)
  //   setImportVT(res[1].data)
  //   setExportVT(res[2].data)
  //   setNameItem(res[0].data.name)
  //   setIdItem(res[0].data.item_id)
  //   setTotalItem(res[0].data.total)
  //   setAmountItem(res[0].data.tonKho)
  //   // setImportCode(res[4].data)
  //   // setExportCode(res[5].data)
  // })
  // .catch((error) => {
  //   console.log(error)
  //   // if (error.response.status === 403) {
  //   //   history.push('/404')
  //   // } else if (error.response.status === 401) {
  //   //   history.push('/login')
  //   // }
  //   // history.push('/404')
  // })

  //   Charts()
  // }, [])
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
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Danh sách tồn kho</h3>
                  </div>
                </div>
                <div className="card-body">
                  {
                    getRoleNames() === 'admin' ? (
                      <table id="item" className="table table-hover " style={{ height: "404px" }}>
                        <thead>
                          <tr>
                            <th className='text-center'>STT</th>
                            <th className='text-center'>Tên kho</th>
                            <th className='text-center'>Trạng thái</th>
                            <th className='text-center'>Giá trị tồn</th>
                            <th className='text-center'>Số lượng tồn</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            tonKho.map((item, index) => (
                              <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{item.name}</td>
                                <td className='text-center'>{item.status}</td>
                                <td className='text-center'>{item.total}</td>
                                <td className='text-center'>{item.tonKho}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    ) : getDataWarehouseID().length > 0 && (
                      <table id="item" className="table table-hover " style={{ height: "404px" }}>
                        <thead>
                          <tr>
                            <th className='text-center'>STT</th>
                            <th className='text-center'>Mã VT</th>
                            <th className='text-center'>Tên VT</th>
                            <th className='text-center'>Giá trị tồn</th>
                            <th className='text-center'>Số lượng tồn</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            tonKho.map((item, index) => (
                              <tr key={index}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{item.item_id}</td>
                                <td className='text-center'>{item.name}</td>
                                <td className='text-center'>{item.total}</td>
                                <td className='text-center'>{item.tonKho}</td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </table>
                    )
                  }
                </div>
              </div>

            </div>
            {/* /.col-md-6 */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  {/* <div className="d-flex justify-content-between">
                    <h3 className="card-title">Sales</h3>
                    <a href="javascript:void(0);">View Report</a>
                  </div> */}
                </div>
                <div className="card-body">

                  {/* <div className="d-flex">
                    <p className="d-flex flex-column">
                      <span className="text-bold text-lg">$18,230.00</span>
                      <span>Sales Over Time</span>
                    </p>
                    <p className="ml-auto d-flex flex-column text-right">
                      <span className="text-success">
                        <i className="fas fa-arrow-up" /> 33.1%
                      </span>
                      <span className="text-muted">Since last month</span>
                    </p>
                  </div> */}
                  {/* /.d-flex */}
                  <div className="position-relative mb-4">
                    <canvas id="myChart" height="400"></canvas>
                    {/* <Chart /> */}
                    {/* <BarChart /> */}
                    {/* <canvas id="sales-chart" height={200} /> */}
                    {/* <div className="chart">
                      <canvas id="barChart" style={{ minHeight: 250, height: 250, maxHeight: 250, maxWidth: '100%' }} />
                    </div> */}
                  </div>
                  {/* <div className="d-flex flex-row justify-content-end">
                    <span className="mr-2">
                      <i className="fas fa-square text-primary" /> This year
                    </span>
                    <span>
                      <i className="fas fa-square text-gray" /> Last year
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard