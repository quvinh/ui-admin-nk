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

  



  useEffect(() => {
    {
      getRoleNames() === 'admin' ? (
        Promise.all([
          getData('http://127.0.0.1:8000/api/admin/dashboard/tongTonKho?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/import/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/export/' + year + '?token=' + getToken())
        ])
          .then(function (res) {
            setTonKho(res[0].data)
            setImportVT(res[1].data)
            setExportVT(res[2].data)
          })
          .catch((error) => {
            console.log(error)
          })

      ) : getDataWarehouseID().length > 0 && (
        Promise.all([
          getData('http://127.0.0.1:8000/api/admin/dashboard/listWarehouse/' + getDataWarehouseID()[0] + '/' + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/importByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/exportByWarehouse/' + getDataWarehouseID()[0] + '/' + year + '?token=' + getToken()),
          getData('http://127.0.0.1:8000/api/admin/dashboard/tonKho/' + getDataWarehouseID()[0] + '?token=' + getToken())
        ])
          .then(function (res) {
            setTonKho(res[0].data)
            setImportVT(res[1].data)
            setExportVT(res[2].data)
          })
          .catch((error) => {
            console.log(error)
          })
      )
    }

  }, [])

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
                  <div className="position-relative mb-4">
                    <canvas id="myChart" width="400" height="400">
                      Charts()
                    </canvas>
                  </div>
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