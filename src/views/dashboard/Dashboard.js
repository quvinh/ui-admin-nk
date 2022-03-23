/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
// import Chart from './Charts'
import { Bar } from 'react-chartjs-2';
// import BarChart from './Chart2';
import { getData } from '../../components/utils/Api'
import { getDataWarehouseID, getRoleNames, getToken } from '../../components/utils/Common'
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
  importVT.map((item, index) => {
    arrImportAmount.push(item.importAmount)
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

  const labels = arrImportMonth;

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
      }
    ]
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
              <div className="card card-info card-outline">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Danh sách kho</h3>
                  </div>
                </div>
                <div className="card-body">
                  {
                    getRoleNames() === 'admin' ? (

                      tonKho.map((item, index) => (
                        <div className="small-box bg-white card-warning card-outline">
                          <div className="inner">
                            <h5 className="info-box-text">Tên nhà kho : {item.name}<span className="float-right badge bg-success">Active</span></h5>
                            <p className="info-box-number">Giá trị kho : {item.total}</p>
                          </div>
                          <div className='icon'>
                             <i className="far fa-home"></i>
                          </div>
                          <Link to={"/warehouse-show/" + item.warehouse_id} class="small-box-footer">More info <i class="fas fa-arrow-circle-right"></i></Link>
                          {/* /.info-box-content */}
                        </div>
                        
                      ))
                    ) : getDataWarehouseID().length > 0 && (
                      <table id="item" className="table table-hover ">
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
                                <td className='text-center'>{item.item_name}</td>
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
                    <Bar options={options} data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Dashboard