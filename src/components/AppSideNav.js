/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getData } from './utils/Api'
import { getToken, getUserID } from './utils/Common'
import { Link } from 'react-router-dom'

const AppSideNav = () => {
    const [dataUserDetail, setUserDetail] = useState([])

    useEffect(() => {
        Promise.all([
            getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken())
        ])
            .then(function (res) {
                setUserDetail(res[0].data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"/dashboard"} className="brand-link">
                {/* <img src="../../public/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} /> */}
                <span className="brand-text font-weight-light">LOGO</span>
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="../../dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{dataUserDetail[0] && dataUserDetail[0].fullname}</a>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw" />
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <Link to="/dashboard" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Bản tin
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-copy" />
                                <p>
                                    Danh mục
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/category" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Loại vật tư</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/supplier" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Nhà cung cấp</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-edit" />
                                <p>
                                    Chức năng
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/import" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Nhập kho</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/export" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Xuất kho</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/transfer" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Luân chuyển</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/statistic" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Thống kê</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-chart-pie" />
                                <p>
                                    Quản lý kho
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/warehouse" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Kho</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/shelf" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Giá/kệ</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-tree" />
                                <p>
                                    Quản lý phiếu
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/coupon_import" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Phiếu nhập</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/coupon_export" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Phiếu xuất</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/coupon_transfer" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Phiếu luân chuyển</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon far fa-envelope" />
                                <p>
                                    Admin
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/account" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Người dùng</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/role" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Chức vụ - Quyền hạn</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                <i className="nav-icon fas fa-table" />
                                <p>
                                    Thông tin tài khoản
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/notification" className="nav-link">
                                <i className="nav-icon fas fa-table" />
                                <p>
                                    Thông báo
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default AppSideNav