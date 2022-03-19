/* eslint-disable no-script-url */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
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
    alert()
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
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Online Store Visitors</h3>
                    <a href="javascript:void(0);">View Report</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex">
                    <p className="d-flex flex-column">
                      <span className="text-bold text-lg">820</span>
                      <span>Visitors Over Time</span>
                    </p>
                    <p className="ml-auto d-flex flex-column text-right">
                      <span className="text-success">
                        <i className="fas fa-arrow-up" /> 12.5%
                      </span>
                      <span className="text-muted">Since last week</span>
                    </p>
                  </div>
                  {/* /.d-flex */}
                  <div className="position-relative mb-4">
                    <canvas id="visitors-chart" height={200} />
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <span className="mr-2">
                      <i className="fas fa-square text-primary" /> This Week
                    </span>
                    <span>
                      <i className="fas fa-square text-gray" /> Last Week
                    </span>
                  </div>
                </div>
              </div>
              
            </div>
            {/* /.col-md-6 */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header border-0">
                  <div className="d-flex justify-content-between">
                    <h3 className="card-title">Sales</h3>
                    <a href="javascript:void(0);">View Report</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex">
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
                  </div>
                  {/* /.d-flex */}
                  <div className="position-relative mb-4">
                    <canvas id="sales-chart" height={200} />
                  </div>
                  <div className="d-flex flex-row justify-content-end">
                    <span className="mr-2">
                      <i className="fas fa-square text-primary" /> This year
                    </span>
                    <span>
                      <i className="fas fa-square text-gray" /> Last year
                    </span>
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