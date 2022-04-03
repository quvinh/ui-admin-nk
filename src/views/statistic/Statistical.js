/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getToken } from '../../components/utils/Common'
import StatisticExport from './StatisticExport'
import StatisticImport from './StatisticImport'
import StatisticTransfer from './StatisticTransfer'

const Statistical = () => {

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thống Kê</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Thông kê</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <div></div>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary card-outline card-outline-tabs">
                                <div className="card-header p-0 border-bottom-0">
                                    <ul className="nav nav-tabs" id="custom-tabs-one-tab" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" id="custom-tabs-one-home-tab" data-toggle="pill" href="#thong-ke-nhap" role="tab" aria-controls="custom-tabs-one-home" aria-selected="true">Nhập</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-one-profile-tab" data-toggle="pill" href="#thong-ke-xuat" role="tab" aria-controls="custom-tabs-one-profile" aria-selected="false">Xuất</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" id="custom-tabs-one-messages-tab" data-toggle="pill" href="#thong-ke-luan-chuyen" role="tab" aria-controls="custom-tabs-one-messages" aria-selected="false">Luân chuyển</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-body">
                                    <div className="tab-content" id="custom-tabs-one-tabContent">
                                        <div className="tab-pane fade show active" id="thong-ke-nhap" role="tabpanel" aria-labelledby="custom-tabs-one-home-tab">
                                            <StatisticImport />
                                        </div>
                                        <div className="tab-pane fade" id="thong-ke-xuat" role="tabpanel" aria-labelledby="custom-tabs-one-profile-tab">
                                            <StatisticExport />
                                        </div>
                                        <div className="tab-pane fade" id="thong-ke-luan-chuyen" role="tabpanel" aria-labelledby="custom-tabs-one-messages-tab">
                                            <StatisticTransfer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div>
            </section>
        </div >
    )
}

export default Statistical